// scripts/efdi.mjs
// Escape from Dino Island – Foundry VTT System v1.0.0

import { PLAYBOOKS, BASIC_MOVES } from "./playbookData.mjs";
import { EfdiHeroSheet } from "./sheets/heroSheet.mjs";
import { EfdiDinosaurSheet } from "./sheets/dinosaurSheet.mjs";
import { EfdiNpcSheet } from "./sheets/npcSheet.mjs";
import { EfdiRollDialog } from "./dialogs/rollDialog.mjs";

// ─────────────────────────────────────────────
//  System Initialisierung
// ─────────────────────────────────────────────
Hooks.once("init", () => {
  console.log("EFDI | Escape from Dino Island wird geladen…");

  // Globale Konfiguration
  CONFIG.EFDI = {
    playbooks: PLAYBOOKS,
    basicMoves: BASIC_MOVES,
    stats: ["clever", "fit", "steady"],
    statLabels: {
      clever: "EFDI.Stats.clever",
      fit: "EFDI.Stats.fit",
      steady: "EFDI.Stats.steady"
    }
  };

  // Actor-Typen registrieren
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("efdi", EfdiHeroSheet, {
    types: ["hero"],
    makeDefault: true,
    label: "EFDI Hero Sheet"
  });
  Actors.registerSheet("efdi", EfdiDinosaurSheet, {
    types: ["dinosaur"],
    makeDefault: true,
    label: "EFDI Dinosaurier Sheet"
  });
  Actors.registerSheet("efdi", EfdiNpcSheet, {
    types: ["npc"],
    makeDefault: true,
    label: "EFDI NPC Sheet"
  });

  // Datenmodelle registrieren
  CONFIG.Actor.trackableAttributes = {
    hero: {
      bar: [
        { attr: "injuries.count", max: "injuries.max" }
      ],
      value: []
    }
  };

  // Handlebars-Hilfsfunktionen
  registerHandlebarsHelpers();

  // Vorlagen vorabladen
  preloadTemplates();

  console.log("EFDI | System geladen.");
});

// ─────────────────────────────────────────────
//  Ready-Hook: Makros registrieren
// ─────────────────────────────────────────────
Hooks.once("ready", () => {
  // Globale Würfel-Funktion für Makros
  game.efdi = {
    rollStat: rollStat,
    rollMove: rollMove,
    openDmScreen: openDmScreen,
    playbooks: PLAYBOOKS,
    basicMoves: BASIC_MOVES
  };
});

// ─────────────────────────────────────────────
//  Würfelsystem
// ─────────────────────────────────────────────
export async function rollStat(stat, actorId, bonus = 0, moveName = null, moveDescription = null) {
  const actor = actorId ? game.actors.get(actorId) : null;
  let statValue = 0;
  let bonusFromActor = bonus;

  if (actor && actor.type === "hero") {
    statValue = actor.system.stats[stat] ?? 0;
    bonusFromActor = actor.system.rollBonus ?? 0;
  }

  const totalBonus = statValue + bonusFromActor + bonus;
  const roll = new Roll("2d6");
  await roll.evaluate();

  const d1 = roll.terms[0].results[0].result;
  const d2 = roll.terms[0].results[1].result;
  const diceTotal = d1 + d2;
  const total = diceTotal + totalBonus;

  let resultKey, resultClass;
  if (total >= 10) {
    resultKey = "EFDI.Roll.Success";
    resultClass = "efdi-success";
  } else if (total >= 7) {
    resultKey = "EFDI.Roll.Partial";
    resultClass = "efdi-partial";
  } else {
    resultKey = "EFDI.Roll.Miss";
    resultClass = "efdi-miss";
  }

  const statLabel = stat !== "none" && stat !== "any"
    ? game.i18n.localize(`EFDI.Stats.${stat}`)
    : stat === "any" ? game.i18n.localize("EFDI.Moves.takemyhand").split("(")[1]?.replace(")", "") ?? ""
    : "";

  const bonusParts = [];
  if (stat !== "none" && stat !== "any") bonusParts.push(`${statValue >= 0 ? "+" : ""}${statValue} ${statLabel}`);
  if (bonusFromActor !== 0) bonusParts.push(`${bonusFromActor >= 0 ? "+" : ""}${bonusFromActor} Bonus`);
  if (bonus !== 0) bonusParts.push(`${bonus >= 0 ? "+" : ""}${bonus} Mod`);
  const bonusStr = bonusParts.length > 0 ? bonusParts.join(", ") : "—";

  const chatContent = await renderTemplate(
    "systems/escape-from-dino-island/templates/chat/roll-result.hbs",
    {
      moveName: moveName ?? (stat !== "none" ? `Würfelwurf: ${statLabel}` : "Würfelwurf"),
      moveDescription: moveDescription,
      d1, d2, diceTotal,
      totalBonus,
      total,
      bonusStr,
      resultText: game.i18n.localize(resultKey),
      resultClass,
      actorName: actor?.name ?? "Unbekannt",
      actorImg: actor?.img ?? "icons/svg/mystery-man.svg"
    }
  );

  await ChatMessage.create({
    content: chatContent,
    speaker: ChatMessage.getSpeaker({ actor }),
    rolls: [roll],
    type: CONST.CHAT_MESSAGE_TYPES?.OTHER ?? 0
  });

  return { total, resultKey };
}

export async function rollMove(moveId, actorId) {
  const actor = game.actors.get(actorId);
  if (!actor) return;

  // Finde das Manöver in den Basic Moves oder Playbook Moves
  let move = null;
  for (const category of Object.values(BASIC_MOVES)) {
    move = category.find(m => m.id === moveId);
    if (move) break;
  }
  if (!move && actor.system.playbook) {
    const pb = PLAYBOOKS[actor.system.playbook];
    if (pb) {
      move = [...(pb.specialMoves ?? []), ...(pb.advanceMoves ?? [])].find(m => m.id === moveId);
    }
  }
  if (!move) return;

  if (move.stat === null) {
    // Kein Würfelwurf (Best-Laid Plans)
    return ChatMessage.create({
      content: `<div class="efdi-chat-card"><p class="efdi-move-name">${move.name}</p><p>${move.description}</p></div>`,
      speaker: ChatMessage.getSpeaker({ actor })
    });
  }

  if (move.stat === "any") {
    // Dialog für Stat-Auswahl öffnen
    return EfdiRollDialog.showStatChoice(actor, move);
  }

  await rollStat(move.stat, actorId, move.bonus ?? 0, move.name, move.description);
}

// ─────────────────────────────────────────────
//  DM-Bildschirm
// ─────────────────────────────────────────────
export async function openDmScreen() {
  const content = await renderTemplate(
    "systems/escape-from-dino-island/templates/dm-screen/dm-screen.hbs",
    { dmData: getDmData() }
  );

  new Dialog({
    title: "🦕 DM-Bildschirm – Escape from Dino Island",
    content,
    buttons: {
      close: { label: "Schließen" }
    },
    default: "close",
    render: (html) => {
      html.find(".efdi-dm-roll-btn").on("click", async (ev) => {
        const table = ev.currentTarget.dataset.table;
        await rollDmTable(table);
      });
    }
  }, {
    width: 900,
    height: 700,
    resizable: true,
    classes: ["efdi-dm-screen"]
  }).render(true);
}

function getDmData() {
  return {
    rumors: [
      "Meeresströmungen und Unterwasserfelsen machen es nahezu unmöglich, die Insel per Boot zu erreichen.",
      "Jemand züchtet neue Pflanzen- und Tierarten auf der Insel.",
      "Kein Mensch hatte vor letztem Jahr einen Fuß auf die Insel gesetzt.",
      "Die chinesische Regierung hat ihre Finger im Spiel.",
      "Es gibt Einheimische, die Dinosaurier als Götter verehren.",
      "Manchmal gibt es seltsame violette Gewitterwolken über der Insel.",
      "Ein betrunkener Freund erzählte dir, was er auf der Insel gesehen hat. Größtenteils Unsinn, aber er starb bald danach unter mysteriösen Umständen.",
      "Du hast einen Freund oder Verwandten, der auf diese Insel gegangen ist und nie zurückgekehrt ist.",
      "Menschen machen zweiJahres-Touren, und selbst die Hausmeister verdienen siebenstellig.",
      "Kompasse funktionieren dort nicht ganz richtig.",
      "Es gibt Spinnen so groß wie eine Kokosnuss.",
      "Das Naturhistorische Museum eröffnet bald eine neue Ausstellung, die so geheim ist, dass selbst die meisten Kuratoren nicht wissen, was sie zeigt."
    ],
    dmMoves: [
      "Zeige Anzeichen eines nahen Dinosauriers",
      "Ein Dinosaurier taucht auf! Gib ihm eine Eigenart!",
      "Verletze sie wie etabliert",
      "Ihre Verletzungen verursachen Probleme",
      "Führe einen nützlichen NPC ein (gib ihm ein Ziel!)",
      "Töte einen nützlichen NPC",
      "Dessorientiere sie",
      "Biete ihnen, was sie brauchen, mit Gefahr im Weg",
      "Sag ihnen, was sie brauchen und lass sie es herausfinden",
      "Trenne sie",
      "Enthülle etwas Mysteriöses",
      "Zeit vergeht (Nacht bricht an, sie müssen ruhen, eine Möglichkeit läuft ab)"
    ],
    npcGoals: [
      "Zu einem geliebten Menschen woanders auf der Insel gelangen",
      "Bleib, bis alles vorbeigeht",
      "Dinosaurier um jeden Preis vermeiden",
      "Rache an der Person nehmen, die sie für den ganzen Schlamassel verantwortlich machen",
      "In bar bezahlt werden",
      "Niemand kann gehen",
      "Sicherungskopien aller Daten wiederherstellen",
      "Ihre Forschung abschließen",
      "Alles wieder auf Kurs bringen",
      "Ein persönliches Geheimnis um jeden Preis schützen"
    ],
    npcOffers: [
      "Zugang zu einem Bereich (Schlüsselkarten, Passwörter, etc.)",
      "Führung zu einem Ort oder einer Person",
      "Eine Waffe und/oder die Fähigkeit, sie zu benutzen",
      "Wissen über einen Dinosaurier",
      "Wissen über einen Cache (Waffen, Treibstoff, Artefakte, etc.)",
      "Fahrzeugkenntnisse",
      "Fähigkeiten mit einem technischen System",
      "Medizinische Versorgung"
    ],
    dinoNicknames: [
      "MMDs (Menschengemachte Dinosaurier)",
      "KPT (Künstliche Prähistorische Tiere)",
      "Crichtons",
      "Paleys",
      "Waybacks",
      "FIDOs"
    ],
    organizations: [
      "Das Hallet Institut",
      "恐龙 (Kǒnglóng)",
      "Mantell Industries",
      "Hilltop",
      "SynGen",
      "D.F.I (Dinosaurier-Forschungsinstitut)"
    ],
    obstacles: [
      "Der einzige Weg führt durch die Deinonychus-Gehege/-Territorium.",
      "Die Einschienenbahn ist der einzige Weg zum Ziel, und sie ist offline.",
      "Wir müssen diesen verdammten Sturm aussitzen.",
      "Wir können nicht gehen, ohne unsere Mission abzuschließen.",
      "Wir müssen in den Komplex, aber er ist abgeriegelt.",
      "Unser Weg von der Insel ist beschädigt, unerreichbar oder noch nicht angekommen."
    ],
    mysteries: [
      "Warum habt ihr den Kontakt zur Außenwelt verloren?",
      "Wer hat eure Mission sabotiert? (und warum?)",
      "Warum hat euer Kontakt euch nicht getroffen, und wo sind sie?",
      "Was ist die Quelle der seltsamen Sendung, die eure Signale überwältigt?",
      "Warum funktionieren eure Kompasse nicht... und wo ist Norden?",
      "Wer sind die schattenhaften Figuren, die euch aus den Büschen beobachten und was wollen sie?"
    ],
    extinctionEvents: [
      "Der Vulkan bricht aus!",
      "Es ist ein Monsun!",
      "Die Dinosaurier haben sich entwickelt!",
      "Sie haben ein Killerteam geschickt!",
      "Die Dinosaurier werden das Festland erreichen… ihr müsst sie aufhalten!",
      "Die Zeitanomalie kollabiert!"
    ],
    dinoGimmicks: Array.from({length: 20}, (_, i) => {
      const gimmicks = [
        "Sehschärfe: Kann nur Bewegung wahrnehmen",
        "Giftsäcke: Hat einen giftigen Biss oder speit tödliche Toxine",
        "Gifthaut: Seine Haut ist giftig und verursacht Schmerz, Lähmung, Blindheit oder Halluzinationen",
        "Tarnung: Kann seine Farbe ändern, um sich in die Umgebung einzufügen",
        "Intelligent: Fähig zu komplexem Problemlösen",
        "Rudeljäger: Arbeitet zusammen, um Beute zu jagen",
        "Baumartig: Lebt in Bäumen",
        "Territorial: Markiert und verteidigt spezifische Grenzen",
        "Kannibalistisch: Frisst seine eigene Art",
        "Mimikry: Kann Geräusche imitieren – wie Dinosaurier, Menschen oder Maschinen",
        "Elektrisch: Speichert und entlädt starke elektrische Entladungen",
        "Regeneration: Kann verlorene Gliedmaßen schnell heilen und nachwachsen lassen",
        "Sonar: Jagt mit Echos von Geräuschen",
        "Klettern: Geschickt im Klettern oder klebt sogar an Oberflächen",
        "Katzenminze: Besessen von einer modernen Substanz angezogen",
        "Fallenbauer: Baut eine natürliche Falle – ein Netz, eine Grube, etc.",
        "Schallschrei: Macht ein Geräusch, das Gegner verletzen, desorientieren oder zurückwerfen kann",
        "Fruchtbar: Reproduziert sich schnell",
        "Gefahrenzeichen: Signalisiert seine Nähe, vielleicht mit einer Rassel, Krause, Heulen oder leuchtenden Farben",
        "Greifbar: Benutzt seinen Schwanz – oder vielleicht einen Rüssel – um Dinge zu halten"
      ];
      return `${i+1}. ${gimmicks[i]}`;
    })
  };
}

async function rollDmTable(table) {
  const data = getDmData();
  const items = data[table];
  if (!items || !items.length) return;
  const result = items[Math.floor(Math.random() * items.length)];
  const tableNames = {
    rumors: "Gerücht",
    npcGoals: "NPC-Ziel",
    npcOffers: "NPC-Angebot",
    dinoNicknames: "Dino-Spitzname",
    organizations: "Geheimnisvolle Organisation",
    obstacles: "Hindernis",
    mysteries: "Geheimnis",
    extinctionEvents: "Auslöschungsereignis",
    dinoGimmicks: "Dino-Eigenart"
  };
  ChatMessage.create({
    content: `<div class="efdi-chat-card efdi-dm-roll">
      <div class="efdi-chat-header"><span class="efdi-move-name">🎲 ${tableNames[table] ?? table}</span></div>
      <p class="efdi-roll-result-text">${result}</p>
    </div>`,
    speaker: { alias: "DM-Bildschirm" }
  });
}

// ─────────────────────────────────────────────
//  Handlebars Helpers
// ─────────────────────────────────────────────
function registerHandlebarsHelpers() {
  Handlebars.registerHelper("efdiLocalize", (key) => game.i18n.localize(key));

  Handlebars.registerHelper("efdiStatMod", (value) => {
    if (value > 0) return `+${value}`;
    return `${value}`;
  });

  Handlebars.registerHelper("efdiChecked", (value) => value ? "checked" : "");

  Handlebars.registerHelper("efdiEq", (a, b) => a === b);

  Handlebars.registerHelper("efdiGt", (a, b) => a > b);

  Handlebars.registerHelper("times", (n, block) => {
    let result = "";
    for (let i = 0; i < n; i++) result += block.fn(i);
    return result;
  });

  Handlebars.registerHelper("efdiPlaybookLabel", (id) => {
    return game.i18n.localize(PLAYBOOKS[id]?.label ?? id);
  });
}

// ─────────────────────────────────────────────
//  Template Vorabladen
// ─────────────────────────────────────────────
async function preloadTemplates() {
  const templates = [
    "systems/escape-from-dino-island/templates/actors/hero-sheet.hbs",
    "systems/escape-from-dino-island/templates/actors/hero-tab-main.hbs",
    "systems/escape-from-dino-island/templates/actors/hero-tab-moves.hbs",
    "systems/escape-from-dino-island/templates/actors/hero-tab-gear.hbs",
    "systems/escape-from-dino-island/templates/actors/hero-tab-stories.hbs",
    "systems/escape-from-dino-island/templates/actors/dinosaur-sheet.hbs",
    "systems/escape-from-dino-island/templates/actors/npc-sheet.hbs",
    "systems/escape-from-dino-island/templates/chat/roll-result.hbs",
    "systems/escape-from-dino-island/templates/dm-screen/dm-screen.hbs",
    "systems/escape-from-dino-island/templates/dialogs/roll-dialog.hbs"
  ];
  return loadTemplates(templates);
}
