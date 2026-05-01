// scripts/playbookData.mjs
// Alle Playbook-Definitionen für Escape from Dino Island

export const PLAYBOOKS = {
  doctor: {
    id: "doctor",
    label: "EFDI.Playbook.doctor",
    tagline: "Du rettest Leben. Es ist dein Segen, wenn du Erfolg hast, und dein Fluch, wenn du scheiterst.",
    suggestedStat: "steady",
    stats: { clever: 0, fit: 0, steady: 2 },
    gear: [
      { name: "Erste-Hilfe-Koffer", carried: true },
      { name: "Taschenlampe", carried: true },
      { name: "Schmerztabletten", carried: true }
    ],
    stories: [
      "Warum du Ärztin geworden bist",
      "Ein Moment, in dem du wirklich Angst hattest",
      "Ein beinahe tödlicher Fehler",
      "Als jemand auf wundersame Weise durchkam",
      "Wie du Dampf ablässt"
    ],
    specialMoves: [
      {
        id: "treatWounds",
        name: "Wunden behandeln",
        description: "Wenn du dir einen ruhigen Moment nimmst, um jemand anderen zu behandeln und die richtige Ausrüstung hast, erzähl ihnen eine Geschichte (auch wenn sie bewusstlos sind). Streiche dann die Verletzung durch.\n\nWenn die Bedingungen nicht ideal sind, erzähl trotzdem eine Geschichte, dann…\n• In einer gefährlichen Situation: würfle+BESONNEN.\n• Ohne die richtige Ausrüstung: würfle+CLEVER.\n(Wenn beides zutrifft, würfle ohne Bonus.)\n\nBei 10+: Du behandelst ihre Wunde. Bei einem Helden: streiche die Verletzung durch. Bei 7–9: Du könntest es… wenn die Bedingungen stimmen. Die DM sagt dir, was du brauchst. Wenn du es hast, streiche die Verletzung durch.\n\nBei einem Misserfolg: Die DM sagt dir, wie du die Lage verschlimmert hast.",
        unlocked: true,
        isBase: true
      }
    ],
    advanceMoves: [
      {
        id: "backFromBrink",
        name: "Zurück vom Rand",
        description: "Du kannst einen Charakter behandeln, der Außer Gefecht ist, um ihn wiederzubeleben. Er behält seine vorherige Verletzung.",
        unlocked: false
      },
      {
        id: "healThyself",
        name: "Heile dich selbst",
        description: "Du kannst das Manöver WUNDEN BEHANDELN an dir selbst anwenden.",
        unlocked: false
      },
      {
        id: "veterinarian",
        name: "Tierärztin",
        description: "Du kannst Wunden von Dinosauriern und Tieren behandeln.",
        unlocked: false
      }
    ]
  },

  engineer: {
    id: "engineer",
    label: "EFDI.Playbook.engineer",
    tagline: "Es gibt kein Problem, das Menschen nicht mit Einfallsreichtum und etwas Schmierfett lösen können. Selbst dieses.",
    suggestedStat: "clever",
    stats: { clever: 2, fit: 0, steady: 0 },
    gear: [
      { name: "Werkzeugkoffer (Schraubenzieher, Klebeband, etc.)", carried: true },
      { name: "Tablet mit robustem Gehäuse", carried: true },
      { name: "Stirnlampe", carried: true }
    ],
    stories: [
      "Etwas Ineffizientes, das dich wahnsinnig macht",
      "Etwas, das perfekt konstruiert ist",
      "Das Ding, das du dir erträumst zu bauen",
      "Ein Moment einfacher Freude",
      "Eine Zeit, in der du Abkürzungen nehmen musstest"
    ],
    specialMoves: [
      {
        id: "juryRig",
        name: "Improvisierte Lösung",
        description: "Wann immer du eine behelfsmäßige Lösung für ein Problem zusammenbastelst, würfle+CLEVER.\n\nBei 10+: Sie wird funktionieren. Bei 7–9: Sie funktioniert, aber wähle 1:\n• Du musst etwas anderes auseinandernehmen.\n• Sie hält nicht lange.\n• Es dauert eine Weile.\n\nBei einem Misserfolg: Dein Herumbasteln beschädigt etwas oder jemanden.",
        unlocked: true,
        isBase: true
      }
    ],
    advanceMoves: [
      {
        id: "construct",
        name: "Konstruieren",
        description: "Wenn du ein Team leitest, um etwas Substanzielles zu bauen (ein Floß, eine Brücke, einen Unterschlupf, etc.), weise eine Person als Bauleiter zu. Du machst das Design. Würfle+CLEVER.\n\nBei 10+: Exzellente Ingenieursarbeit. Bei 7–9: wähle 1:\n• Du brauchst etwas, das du nicht hast. Die DM sagt dir was und wo.\n• Es ist ein guter Plan, hat aber einen unvermeidlichen Fehler. Die DM sagt ihn dir.\n\nBei einem Misserfolg: Es gibt einen Fehler, den du nicht bemerkt hast.",
        unlocked: false
      },
      {
        id: "nuclearOption",
        name: "Die Atomorption",
        description: "Du weißt, wie man eine mächtige Bombe baut. Wenn du eine baust, erkläre der Gruppe, wie mächtig sie ist und wie sie gezündet wird. Die DM sagt dir, wie lange der Bau dauert und was du brauchst. Wenn die Bombe gezündet wird, würfle+CLEVER.\n\nBei 10+: Sie geht reibungslos hoch. BOOM. Bei 7–9: wähle 1:\n• Die Bombe muss manuell von jemandem direkt daneben gezündet werden.\n• Die Bombe ist stärker oder schwächer als geplant, DM-Entscheidung.\n\nBei einem Misserfolg: Die Bombe geht zum falschen Zeitpunkt hoch – dem schlimmstmöglichen.",
        unlocked: false
      }
    ]
  },

  hunter: {
    id: "hunter",
    label: "EFDI.Playbook.hunter",
    tagline: "Du hast die meisten Dinge gejagt, die dich jagen können, aber die Art, wie sich diese Wesen bewegen…",
    suggestedStat: "clever",
    stats: { clever: 2, fit: 0, steady: 0 },
    gear: [
      { name: "Betäubungsgewehr (5 Pfeile) ODER Jagdbogen (10 Pfeile)", carried: true },
      { name: "Tarnkleidung", carried: true },
      { name: "Jagdmesser", carried: true },
      { name: "Tüte Dörrfleisch", carried: true }
    ],
    stories: [
      "Dein beeindruckendster Fang",
      "Eine Zeit, in der du in der Wildnis verloren warst",
      "Eine Sache, in der Tiere Menschen übertreffen",
      "Das seltsamste Essen, das du je gegessen hast",
      "Etwas, das ein Idiot tat, das ihn das Leben kostete"
    ],
    specialMoves: [
      {
        id: "tracker",
        name: "Fährtenleserin",
        description: "Wenn du deine unmittelbare Umgebung nach Spuren untersuchst, würfle+CLEVER. Bei einem Treffer weißt du, welche Tiere hier kürzlich waren (auch wenn du die genaue Dinosaurierart nicht kennst) und die Größe ihrer Gruppe(n).\n\nZusätzlich: bei 10+ stelle 3 Fragen; bei 7–9 stelle 1 Frage:\n• Woher kamen die Tiere?\n• Wohin sind die Tiere unterwegs?\n• Wie kann ich sie unvorbereitet erwischen?\n• Was in der Nähe sollte ich sonst noch wissen?\n\nBei einem Misserfolg: Du bemerkst einen Raubtier, der sich zum Angriff bereit macht.",
        unlocked: true,
        isBase: true
      }
    ],
    advanceMoves: [
      {
        id: "trapper",
        name: "Fallensteller",
        description: "Mit der richtigen Ausrüstung kannst du eine Falle für einen Dinosaurier oder ein anderes Tier aufstellen und es fangen. Beschreibe deinen Plan. Wenn du ihn umsetzt, würfle+CLEVER. Bei 10+: Du fängst den Dinosaurier sicher und zuverlässig.\n\nBei 7–9, wähle 1:\n• Der Dinosaurier wird unverletzt gefangen.\n• Der Dinosaurier wird sicher gefangen und bricht nicht frei.\n• Niemand wurde beim Fangen verletzt.\n\nBei einem Misserfolg: Du hast den Dinosaurier nicht fangen können, dich oder einen Freund in Gefahr gebracht, und der Dinosaurier ist auch noch wütend.",
        unlocked: false
      },
      {
        id: "tooQuiet",
        name: "Es ist zu still",
        description: "Du weißt immer, wenn du gejagt wirst, und kannst nicht überrascht werden. Um die anderen zu warnen, ohne deinen Feind zu alarmieren, musst du EINFACH MACHEN!",
        unlocked: false
      }
    ]
  },

  kid: {
    id: "kid",
    label: "EFDI.Playbook.kid",
    tagline: "Du bist nur ein Kind!",
    suggestedStat: null,
    stats: { clever: 1, fit: 1, steady: -1 },
    statSpread: "+1, +1, -1",
    gear: [
      { name: "Spielzeug-Dinosaurier", carried: true },
      { name: "Schweizer Taschenmesser", carried: true },
      { name: "Schokoriegel + Dose Cola", carried: true }
    ],
    stories: [
      "Eine Zeit, in der du wirklich mutig warst",
      "Die nervigste Angewohnheit deines Elternteils",
      "Eine Erklärung für etwas, das Erwachsene verblüfft",
      "Etwas Tolles, das dir ein Freund beigebracht hat",
      "Wovor du heimlich Angst hast"
    ],
    specialMoves: [
      {
        id: "iKnowThis",
        name: "Das weiß ich!",
        description: "Wenn niemand sonst eine entscheidende Fertigkeit hat, kannst du enthüllen, dass du – weil du ein aufgewecktes Kind bist – diese Fertigkeit tatsächlich hast. Die Verwendung der Fertigkeit erfordert immer EINFACH MACHEN!",
        unlocked: true,
        isBase: true
      },
      {
        id: "ahhhhhh",
        name: "Aaaaaaaah!",
        description: "Wann immer du einen anderen Helden um Hilfe anrufst, müssen sie deinem Ruf antworten.",
        unlocked: true,
        isBase: true
      }
    ],
    advanceMoves: [
      {
        id: "inspireHeroism",
        name: "Heldenmut inspirieren",
        description: "Wenn ein anderer Held seine eigene Sicherheit deinen Bedürfnissen unterordnet (auch als Reaktion auf AAAAAAAAH!), werden alle Würfelwürfe, die sie machen, um eine Stufe verbessert. Ein Misserfolg wird zu 7–9, ein 7–9 wird zu 10+.",
        unlocked: false
      },
      {
        id: "goodListener",
        name: "Gute Zuhörerin",
        description: "Wenn du dich für eine schwierige Aufgabe meldest und jemand anderes dich ANLEIT, behandeln sie einen Misserfolg so, als hätten sie 7–9 gewürfelt.",
        unlocked: false
      }
    ],
    hasAge: true
  },

  paleontologist: {
    id: "paleontologist",
    label: "EFDI.Playbook.paleontologist",
    tagline: "Du hast Dinosaurier anhand ihrer Fossilspuren studiert – wird dieses Wissen dich vor dem echten Ding schützen?",
    suggestedStat: "clever",
    stats: { clever: 2, fit: 0, steady: 0 },
    gear: [
      { name: "Einfache Ausgrabungswerkzeuge", carried: true },
      { name: "Bandana", carried: true },
      { name: "Feldflasche", carried: true },
      { name: "Kleines Fossil mit Erinnerungswert", carried: true }
    ],
    stories: [
      "Wie du dich in Dinosaurier verliebt hast",
      "Warum dein Erzrivale ein Scharlatan ist",
      "Etwas, das du an Menschen nie verstanden hast",
      "Eine Lebenslektion, die dein Mentor dich lehrte",
      "Die Geschichte hinter dem Fossil, das du bei dir trägst"
    ],
    specialMoves: [
      {
        id: "dinosaurExpert",
        name: "Dinosaurier-Expertin",
        description: "Wenn du dein Wissen einsetzt, um mit einem echten Dinosaurier umzugehen, würfle+CLEVER.\n\nBei einem Treffer kannst du seine Art, sein Geschlecht und ob er ein Pflanzen- oder Fleischfresser ist identifizieren. Zusätzlich: bei 10+ stelle 3 Fragen; bei 7–9 stelle 1:\n• Was ist sein Antrieb?\n• Was sind seine Manöver?\n• In welcher Gruppengröße reist er?\n• Was ist seine Schwäche?\n\nBei einem Misserfolg: Es stellt sich heraus, dass lebende Dinosaurier anders sind als du dachtest – zu deinem Nachteil.\n\nDu kannst dieses Manöver nur einmal pro Art anwenden, es sei denn, du hast die Möglichkeit, ein lebendes Exemplar genauer zu studieren.",
        unlocked: true,
        isBase: true
      }
    ],
    advanceMoves: [
      {
        id: "lizardBrain",
        name: "Reptiliengehirn",
        description: "Wenn du mit DINOSAURIER-EXPERTIN einen Treffer landest, kannst du anstatt eine Frage zu stellen, einem Dinosaurier mit Körpersprache und Lauten eine einfache Emotion einflößen (Angst, Gleichgültigkeit, Wut, etc.).",
        unlocked: false
      },
      {
        id: "curiosityKilled",
        name: "Neugier tötete den Quetzalcoatlus",
        description: "Wenn du dich auf der Suche nach Wissen oder bei der Untersuchung eines Geheimnisses in Gefahr begibst, erhältst du +1 auf deinen Würfelwurf.",
        unlocked: false
      },
      {
        id: "polymath",
        name: "Universalgelehrter",
        description: "Deine deduktiven und induktiven Fähigkeiten gehen über Fossilien und prähistorisches Leben hinaus. Wenn du Zeit damit verbringst, etwas wahrhaft Geheimnisvolles zu untersuchen, erzähl eine Geschichte und würfle dann+CLEVER.\n\nBei 10+: Die DM sagt dir etwas Interessantes und Nützliches, das du über das Thema ableiten kannst. Bei 7–9: Die DM sagt dir, was du brauchst – ein Werkzeug, spezifisches Wissen, etc. – um es herauszufinden.\n\nBei einem Misserfolg: Du entdeckst etwas Schreckliches.",
        unlocked: false
      }
    ]
  },

  soldier: {
    id: "soldier",
    label: "EFDI.Playbook.soldier",
    tagline: "Du bist ein Krieger von Beruf, aber ist dein Training genug, um einen Feind zu bezwingen, der durch 179 Millionen Jahre Evolution geschärft wurde?",
    suggestedStat: "steady",
    stats: { clever: 0, fit: 0, steady: 2 },
    gear: [
      { name: "Sturmgewehr", carried: true },
      { name: "Handfeuerwaffe", carried: true },
      { name: "Taschenlampe", carried: true },
      { name: "Kampfmesser", carried: true },
      { name: "Ein extra Magazin", carried: true }
    ],
    stories: [
      "Das Mal, als du dem Tod von der Schippe gesprungen bist",
      "Warum du eingetreten bist",
      "Ein Insider-Witz, den du mit deinem Trupp geteilt hast",
      "Etwas, das dich heimsucht",
      "Ein Aberglaube, der dich am Leben hält"
    ],
    specialMoves: [
      {
        id: "killOrBeKilled",
        name: "Töten oder getötet werden",
        description: "Wenn du das Feuer auf einen Dinosaurier oder eine Gruppe von Dinosauriern eröffnest, würfle+BESONNEN.\n\nBei einem Treffer: Du streckst sie nieder. Bei 7–9: Du verbrauchst zu viel Munition – du bist leer.\n\nBei einem Misserfolg: Du wirst niedergemetzelt und machst sofort den UNFALL-Zug. (Miss nicht.)",
        unlocked: true,
        isBase: true
      }
    ],
    advanceMoves: [
      {
        id: "leaveNoOneBehind",
        name: "Niemanden zurücklassen",
        description: "Wenn ein nahes Verbündeter verletzt, getötet oder von der Gruppe getrennt werden soll, kannst du +1 auf Würfelwürfe erhalten, um ihnen zu helfen.",
        unlocked: false
      },
      {
        id: "gunToHead",
        name: "Pistole an den Kopf",
        description: "Wenn du einen Menschen mit körperlicher Gewalt bedrohst, müssen sie tun, was du sagst, oder eine Verletzung deiner Wahl erleiden.",
        unlocked: false
      },
      {
        id: "closeQuarters",
        name: "Nahkampf-Experte",
        description: "Wenn du KÄMPFST!, wird dein Würfelwurf um eine Stufe verbessert. Ein Misserfolg wird zu 7–9, ein 7–9 wird zu 10+.",
        unlocked: false
      }
    ]
  },

  survivor: {
    id: "survivor",
    label: "EFDI.Playbook.survivor",
    tagline: "Du bist nicht von hier, aber du hast lange allein auf der Insel überlebt.",
    suggestedStat: "clever",
    stats: { clever: 2, fit: 0, steady: 0 },
    gear: [
      { name: "Speer", carried: true },
      { name: "Tarnlappen", carried: true },
      { name: "Essbare Pflanzen", carried: true },
      { name: "Alter Rucksack", carried: true },
      { name: "Ein schrecklicher Gestank", carried: true }
    ],
    stories: [
      "Eine nützliche Überlebensfertigkeit, die du hier gelernt hast",
      "Die Person, auf deren Wiedersehen du hoffst",
      "Der alltägliche Komfort, den du am meisten vermisst",
      "Was du anders machen wirst, wenn du von der Insel kommst",
      "Die Sache an der Insel, die du eigentlich magst"
    ],
    specialMoves: [
      {
        id: "beenAround",
        name: "Schon überall gewesen",
        description: "Wenn jemand zum ersten Mal einen bestimmten Ort auf der Insel erwähnt, würfle+CLEVER, wenn du dort gewesen bist.\n\nBei 10+: Du weißt genau, wo er ist. Markiere ihn auf der Karte und erhalte +1 auf alle Würfelwürfe während der Reise dorthin. Bei 7–9: Du erinnerst dich, wo er ist, und den Grund, warum er schwer zu erreichen ist. Sag ihn.\n\nBei einem Misserfolg: Die DM sagt dir, warum du geschworen hast, nie zurückzugehen.\n\nUnabhängig von deinem Wurf: Erzähl ihnen von deinem letzten Besuch dort.",
        unlocked: true,
        isBase: true
      },
      {
        id: "homewardBound",
        name: "Heimwärts",
        description: "Wenn du zu deinem Unterschlupf wanderst, würfle+CLEVER.\n\nBei 10+: Du kommst nach sicherer Reise an. Bei 7–9: Du schaffst es trotzdem, aber wähle 1:\n• Du bist gezwungen, einen Umweg zu nehmen und kommst Stunden später als geplant an.\n• Es wartet eine Bedrohung auf dich.\n\nBei einem Misserfolg: Du kannst nicht dorthin. Die DM sagt dir warum und bietet dir eine Wahl, wohin du stattdessen gehen kannst.",
        unlocked: true,
        isBase: true
      }
    ],
    advanceMoves: [
      {
        id: "hoarder",
        name: "Hamsterer",
        description: "Du hast viele nützliche Dinge auf der Insel zusammengesucht – Schlüsselkarten, Maschinenteile, Flaschen mit Tyrannosaurus-Urin, etc. Wenn du vielleicht genau das Richtige haben könntest, würfle+CLEVER.\n\nBei 10+: Du hast es, oder etwas ähnlich Gutes. Bei 7–9, wähle 1:\n• Du hast etwas Ähnliches, aber nicht so Gutes.\n• Du hast das Ding, aber es ist in deinem Unterschlupf.\n\nBei einem Misserfolg: Deine Suche kommt zu kurz und kostet dich wertvolle Zeit.",
        unlocked: false
      },
      {
        id: "fadeAway",
        name: "Im Schatten verschwinden",
        description: "Solange du in der Wildnis bist, behandle deinen Würfelwurf beim VERSTECKEN! immer als 10+, selbst wenn dein Feind dich im Blick hat. Deine Freunde sind auf sich allein gestellt.",
        unlocked: false
      }
    ],
    hasHovel: true
  },

  smuggler: {
    id: "smuggler",
    label: "EFDI.Playbook.smuggler",
    tagline: "Du hast ein bisschen Schmuggel betrieben und deinen Teil Gras durch die Gegend transportiert.",
    suggestedStat: "clever",
    stats: { clever: 2, fit: 0, steady: 0 },
    gear: [
      { name: "Schlüssel zu deinem Fahrzeug", carried: true },
      { name: "Gefälschte Dokumente", carried: true },
      { name: "Unschuldiges Objekt mit Geheimfach", carried: true },
      { name: "Feldflasche", carried: true },
      { name: "Gitarre", carried: true }
    ],
    stories: [
      "Ein gefährliches Zusammentreffen mit dem Gesetz",
      "Wie du die Liebe deines Lebens ruiniert hast",
      "Ein Kumpel, der ein schlechtes Ende nahm",
      "Dein wildster Saufgelage",
      "Deine Rentenpläne"
    ],
    specialMoves: [
      {
        id: "unreliable",
        name: "Unzuverlässig",
        description: "Wenn du zu einem ungünstigen Zeitpunkt verschwindest, um deinen eigenen Zielen nachzugehen, sag, wohin du gegangen bist. Würfle dann+CLEVER, um zu sehen, was du gefunden hast.\n\nBei einem Treffer: Es ist etwas Wertvolles. Bei 10+, wähle zusätzlich 1:\n• Es ist nützlich.\n• Es lässt sich leicht vor den anderen verbergen.\n\nBei einem Misserfolg: Du hast Ärger gefunden.",
        unlocked: true,
        isBase: true
      }
    ],
    advanceMoves: [
      {
        id: "priceless",
        name: "Unbezahlbar",
        description: "Wenn ein Held (einschließlich dir) eine Wunde erleiden würde, kannst du etwas Wertvolles opfern, um sie zu vermeiden. Dein Leben zählt immer als wertvoll, auch wenn du darauf bestehst, dass es das nicht ist.",
        unlocked: false
      },
      {
        id: "exitStrategy",
        name: "Ausstiegsstrategie",
        description: "Du hast einen geheimen Weg von der Insel, der bereit und wartend ist. Wähle 1:\n• Ein Schnellboot\n• Ein Propellerflugzeug\n• Eine Methode, Partner zu kontaktieren, die direkt vor der Küste sind\n\nErzähl den anderen Helden davon. Oder auch nicht.\n\nNichts hindert dich daran, UNZUVERLÄSSIG zu nutzen, um zu deinem Ausgang zu entkommen.",
        unlocked: false
      }
    ]
  }
};

export const BASIC_MOVES = {
  peril: [
    {
      id: "run",
      name: "Rennen!",
      stat: "fit",
      description: "Wenn du rennst, würfle+FIT.\n\nBei 10+: Du entkommunst an einen sicheren Ort. Die DM beschreibt ihn. Du weißt ungefähr, wo du bist. Bei 7–9, wähle 1:\n• Du erreichst einen neuen Ort, wirst aber immer noch verfolgt.\n• Du entkommst der Bedrohung… in eine neue gefährliche Situation.\n\nBei einem Misserfolg: Du wirst verletzt, und die Bedrohung ist noch da."
    },
    {
      id: "hide",
      name: "Verstecken!",
      stat: "clever",
      description: "Wenn du dich vor einem Raubtier versteckst, sag wo du dich versteckst und würfle+CLEVER.\n\nBei einem Treffer: Es kann dich weder finden noch erreichen. Du bist sicher. Bei 7–9: Jemand anderes ist exponiert. Wenn du versteckt bleibst, geht es dir gut, aber ihnen nicht. Wenn du allein bist, bietet die DM dir eine andere schwere Entscheidung.\n\nBei einem Misserfolg: Überraschung! Es ist genau über dir."
    },
    {
      id: "justDoIt",
      name: "Einfach machen!",
      stat: "steady",
      description: "Wenn du unter Druck etwas tust, das du normalerweise leicht kannst (z.B. eine Tür aufschließen, leise einen Raum überqueren oder Auto fahren), sag, was passiert, wenn du es vermasselst, dann würfle+BESONNEN.\n\nBei einem Treffer: Du schaffst es. Bei 7–9: Du hast gestolpert, gezögert oder Abkürzungen genommen. Die DM bietet dir eine schwere Entscheidung an.\n\nBei einem Misserfolg: Nun, du weißt, was passiert."
    },
    {
      id: "holdOnYourButt",
      name: "Festhalten!",
      stat: "fit",
      description: "Wenn du dich auf purer Körperlichkeit verlässt, um durch Schwierigkeiten zu kommen oder eine lähmende Verletzung zu ignorieren, würfle+FIT.\n\nBei einem Treffer: Du hältst durch. Bei 7–9: Du schaffst es, bist aber erschöpft – nimm -1 auf deinen nächsten FIT-Wurf.\n\nBei einem Misserfolg: Du wirst ernsthaft verletzt."
    },
    {
      id: "lookOverThere",
      name: "Schau da drüben!",
      stat: "clever",
      description: "Wenn du eine Ablenkung schaffst, um einen Freund zu schützen, sag was es ist und würfle+CLEVER.\n\nBei 10+: Du lenkst die Aufmerksamkeit des Dinosauriers dorthin, wo du es beabsichtigst. Dein Freund ist sicher. Bei 7–9: Der Dinosaurier bemerkt dich.\n\nBei einem Misserfolg: Das Beste, was du tun kannst, ist den Treffer für deinen Freund zu nehmen. Wirst du?\n\nWenn du wählst, die Aufmerksamkeit des Dinosauriers auf dich zu lenken, gelingt es dir immer."
    },
    {
      id: "takeMyHand",
      name: "Nimm meine Hand!",
      stat: "any",
      description: "Wenn du aufhörst, was du tust, um jemandem in Not zu helfen, würfle+was am meisten Sinn ergibt.\n\nBei einem Treffer: Sie schaffen es, mit deiner Hilfe. Bei 7–9, wähle 1:\n• Ihr beiden werdet von der Gruppe getrennt.\n• Du löst ihr Problem, schaffst aber eines für dich.\n\nBei einem Misserfolg: Du hast es für beide schlimmer gemacht."
    },
    {
      id: "fight",
      name: "Kämpfen!",
      stat: "none",
      bonus: 1,
      description: "Wenn du um dein Leben kämpfst, würfle ohne Bonus, oder +1 wenn du eine Waffe hast.\n\nBei einem Treffer: Du kaufst einen kostbaren Moment, damit jemand dir helfen kann. Bei 7–9, wähle zusätzlich 1:\n\nBei 10+: beides.\n• Du wirst nicht verletzt.\n• Du verletzt den Feind. Die DM entscheidet wie.\n\nBei einem 6-: Mache den UNFALL-Zug. Es tut mir leid.\n\nDie DM kann immer entscheiden, dass du gegen einen Dinosaurier nicht kämpfen kannst."
    }
  ],
  safety: [
    {
      id: "layOfLand",
      name: "Lage erkunden",
      stat: "clever",
      description: "Wenn du und ein Begleiter euch einen ruhigen Moment nehmt, einen guten Aussichtspunkt zu erreichen und euch zu orientieren, erzähl eine Geschichte, dann würfle+CLEVER.\n\nBei einem Treffer: Die DM sagt euch zwei Orientierungspunkte – einen natürlichen, einen künstlichen – die ihr sehen könnt. Bei 10+: Sie zeigt euch auch, wo ihr auf der Karte seid.\n\nBei einem Misserfolg: Ihr entdeckt eine unmittelbar bevorstehende Gefahr."
    },
    {
      id: "instruct",
      name: "Anleiten",
      stat: "steady",
      description: "Wenn du einen anderen Helden durch eine riskante Aufgabe führst, die du weißt zu tun, aber die er ausführen muss (vielleicht weil ihr über Funkgeräte kommuniziert, auf gegenüberliegenden Seiten eines Zauns seid oder du verletzt bist), erzähl eine Geschichte und würfle+BESONNEN.\n\nBei einem Treffer: Du bist ein guter Lehrer. Sie schaffen es. Bei 7–9, wähle 1:\n• Es dauert länger als erwartet.\n• Es setzt sie Gefahr aus.\n• Es setzt dich Gefahr aus.\n\nBei einem Misserfolg: Du verwirrst, ärgerst oder ablenkst sie. (Ihre Wahl.) Die Aufgabe ist jenseits jeder Rettung versaut und du hast die Lage verschlimmert."
    },
    {
      id: "scavenge",
      name: "Suchen",
      stat: "clever",
      description: "Wenn du und ein anderer Held euch einen ruhigen Moment nehmt, um nach nützlichen Gegenständen oder Informationen zu suchen, erzähl ihnen eine Geschichte und würfle+CLEVER.\n\nBei 10+: Du findest etwas Nützliches. Vielleicht sogar genau das, was du gehofft hast. Bei 7–9: Du findest etwas Handliches, aber du machst viel Lärm. Du kannst so tun, als ob kein Dinosaurier es gehört hätte, wenn du willst.\n\nBei einem Misserfolg: Du findest etwas Schlechtes."
    },
    {
      id: "bestLaidPlans",
      name: "Die besten Pläne…",
      stat: null,
      description: "Wenn ihr zu lange braucht, um euren Handlungsplan zu diskutieren, macht die DM einen Zug."
    }
  ]
};
