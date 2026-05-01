// scripts/sheets/heroSheet.mjs
import { PLAYBOOKS, BASIC_MOVES } from "../playbookData.mjs";
import { rollStat, rollMove } from "../efdi.mjs";

export class EfdiHeroSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["efdi", "sheet", "actor", "hero"],
      template: "systems/escape-from-dino-island/templates/actors/hero-sheet.hbs",
      width: 720,
      height: 680,
      tabs: [
        {
          navSelector: ".efdi-tabs",
          contentSelector: ".efdi-tab-content",
          initial: "main"
        }
      ],
      resizable: true
    });
  }

  // ── Daten aufbereiten ──────────────────────────────────────────
  async getData() {
    const data = await super.getData();
    const system = this.actor.system;

    // Playbook-Daten laden
    const playbookId = system.playbook ?? null;
    const playbookDef = playbookId ? PLAYBOOKS[playbookId] : null;

    // Stat-Modifier Anzeige
    const stats = {};
    for (const stat of ["clever", "fit", "steady"]) {
      const val = system.stats?.[stat] ?? 0;
      stats[stat] = {
        value: val,
        label: game.i18n.localize(`EFDI.Stats.${stat}`),
        display: val > 0 ? `+${val}` : `${val}`
      };
    }

    // Alle verfügbaren Playbooks
    const allPlaybooks = Object.entries(PLAYBOOKS).map(([id, pb]) => ({
      id,
      label: game.i18n.localize(pb.label)
    }));

    // Manöver aufbereiten
    const perilMoves = BASIC_MOVES.peril.map(m => ({
      ...m,
      statLabel: m.stat && m.stat !== "none" && m.stat !== "any"
        ? game.i18n.localize(`EFDI.Stats.${m.stat}`)
        : m.stat === "any" ? "beliebig" : null
    }));
    const safetyMoves = BASIC_MOVES.safety.map(m => ({
      ...m,
      statLabel: m.stat
        ? game.i18n.localize(`EFDI.Stats.${m.stat}`)
        : null
    }));

    // Spezial- und Fortschritts-Manöver aus Playbook
    const specialMoves = playbookDef?.specialMoves ?? [];
    const advanceMoves = playbookDef?.advanceMoves ?? [];

    // Gespeicherte Unlock-States aus Actor laden
    const unlockedAdvances = system.unlockedAdvances ?? {};
    const advanceMovesWithState = advanceMoves.map(m => ({
      ...m,
      unlocked: unlockedAdvances[m.id] ?? m.unlocked ?? false
    }));

    // Verletzungen
    const injuries = {
      injury1: system.injuries?.injury1 ?? { text: "", treated: false },
      injury2: system.injuries?.injury2 ?? { text: "", treated: false },
      outOfCommission: system.injuries?.outOfCommission ?? false
    };

    // Gear
    const gear = system.gear ?? (playbookDef?.gear ?? []);

    // Stories
    const stories = system.stories ?? (playbookDef?.stories?.map(s => ({ text: s, told: false })) ?? []);

    // Roll-Bonus
    const rollBonus = system.rollBonus ?? 0;

    return {
      ...data,
      system,
      stats,
      allPlaybooks,
      playbookId,
      playbookDef,
      perilMoves,
      safetyMoves,
      specialMoves,
      advanceMovesWithState,
      injuries,
      gear,
      stories,
      rollBonus,
      hasAge: playbookDef?.hasAge ?? false,
      hasHovel: playbookDef?.hasHovel ?? false,
      playbookLabel: playbookDef ? game.i18n.localize(playbookDef.label) : null
    };
  }

  // ── Event-Listener ─────────────────────────────────────────────
  activateListeners(html) {
    super.activateListeners(html);

    if (!this.isEditable) return;

    // Playbook-Auswahl
    html.find(".efdi-playbook-select").on("change", (ev) => {
      const newPlaybook = ev.currentTarget.value;
      this._onPlaybookChange(newPlaybook);
    });

    // Stat-Würfelbuttons
    html.find(".efdi-roll-stat").on("click", (ev) => {
      const stat = ev.currentTarget.dataset.stat;
      rollStat(stat, this.actor.id);
    });

    // Manöver-Würfelbuttons
    html.find(".efdi-roll-move").on("click", (ev) => {
      const moveId = ev.currentTarget.dataset.moveId;
      rollMove(moveId, this.actor.id);
    });

    // Advance Moves freischalten
    html.find(".efdi-unlock-advance").on("click", async (ev) => {
      const moveId = ev.currentTarget.dataset.moveId;
      const current = this.actor.system.unlockedAdvances ?? {};
      current[moveId] = !current[moveId];
      await this.actor.update({ "system.unlockedAdvances": current });
    });

    // Verletzungs-Checkboxen
    html.find(".efdi-injury-treated").on("change", async (ev) => {
      const field = ev.currentTarget.dataset.field;
      await this.actor.update({ [`system.injuries.${field}`]: ev.currentTarget.checked });
    });

    html.find(".efdi-out-of-commission").on("change", async (ev) => {
      await this.actor.update({ "system.injuries.outOfCommission": ev.currentTarget.checked });
    });

    // Verletzungstext
    html.find(".efdi-injury-text").on("blur", async (ev) => {
      const field = ev.currentTarget.dataset.field;
      await this.actor.update({ [`system.injuries.${field}.text`]: ev.currentTarget.value });
    });

    // Gear: Checkbox Carried
    html.find(".efdi-gear-carried").on("change", async (ev) => {
      const idx = parseInt(ev.currentTarget.dataset.idx);
      const gear = foundry.utils.duplicate(this.actor.system.gear ?? []);
      gear[idx].carried = ev.currentTarget.checked;
      await this.actor.update({ "system.gear": gear });
    });

    // Gear: Item hinzufügen
    html.find(".efdi-add-gear").on("click", async () => {
      const gear = foundry.utils.duplicate(this.actor.system.gear ?? []);
      gear.push({ name: "Neuer Gegenstand", carried: true });
      await this.actor.update({ "system.gear": gear });
    });

    // Gear: Item löschen
    html.find(".efdi-delete-gear").on("click", async (ev) => {
      const idx = parseInt(ev.currentTarget.dataset.idx);
      const gear = foundry.utils.duplicate(this.actor.system.gear ?? []);
      gear.splice(idx, 1);
      await this.actor.update({ "system.gear": gear });
    });

    // Gear: Inline-Bearbeitung
    html.find(".efdi-gear-name").on("blur", async (ev) => {
      const idx = parseInt(ev.currentTarget.dataset.idx);
      const gear = foundry.utils.duplicate(this.actor.system.gear ?? []);
      gear[idx].name = ev.currentTarget.value;
      await this.actor.update({ "system.gear": gear });
    });

    // Stories: als erzählt markieren
    html.find(".efdi-story-told").on("change", async (ev) => {
      const idx = parseInt(ev.currentTarget.dataset.idx);
      const stories = foundry.utils.duplicate(this.actor.system.stories ?? []);
      stories[idx].told = ev.currentTarget.checked;
      await this.actor.update({ "system.stories": stories });
    });

    // Roll-Bonus
    html.find(".efdi-roll-bonus").on("change", async (ev) => {
      await this.actor.update({ "system.rollBonus": parseInt(ev.currentTarget.value) || 0 });
    });

    // Inline-Editing für Stats
    html.find(".efdi-stat-input").on("change", async (ev) => {
      const stat = ev.currentTarget.dataset.stat;
      const val = parseInt(ev.currentTarget.value) || 0;
      await this.actor.update({ [`system.stats.${stat}`]: val });
    });
  }

  // ── Playbook wechseln ──────────────────────────────────────────
  async _onPlaybookChange(playbookId) {
    const pb = PLAYBOOKS[playbookId];
    if (!pb) return;

    // Stat-Vorschlag aus Playbook laden
    const stats = { clever: 0, fit: 0, steady: 0 };
    if (pb.stats) Object.assign(stats, pb.stats);

    await this.actor.update({
      "system.playbook": playbookId,
      "system.stats": stats,
      "system.gear": pb.gear ?? [],
      "system.stories": (pb.stories ?? []).map(s => ({ text: s, told: false })),
      "system.unlockedAdvances": {}
    });
  }

  // ── Drop ───────────────────────────────────────────────────────
  async _onDropItemCreate(itemData) {
    return super._onDropItemCreate(itemData);
  }
}
