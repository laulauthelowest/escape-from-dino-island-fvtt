// scripts/sheets/dinosaurSheet.mjs
export class EfdiDinosaurSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["efdi", "sheet", "actor", "dinosaur"],
      template: "systems/escape-from-dino-island/templates/actors/dinosaur-sheet.hbs",
      width: 560,
      height: 500,
      resizable: true
    });
  }

  async getData() {
    const data = await super.getData();
    const dinoTypes = [
      "Aquatische Kreaturen", "Ankylosauriden", "Ceratopsiden",
      "Dromaeosauriden", "Hadrosauriden", "Ornithomimiden",
      "Pachyzephalosauriden", "Pterosaurier", "Sauropoden",
      "Kleine Theropoden", "Spinosauriden", "Stegosauriden",
      "Therizinosauren", "Theropoden", "Xenosaurier"
    ];
    return { ...data, dinoTypes };
  }

  activateListeners(html) {
    super.activateListeners(html);
    if (!this.isEditable) return;

    html.find(".efdi-dino-move-add").on("click", async () => {
      const moves = foundry.utils.duplicate(this.actor.system.moves ?? []);
      moves.push({ text: "Neues Manöver" });
      await this.actor.update({ "system.moves": moves });
    });

    html.find(".efdi-dino-move-del").on("click", async (ev) => {
      const idx = parseInt(ev.currentTarget.dataset.idx);
      const moves = foundry.utils.duplicate(this.actor.system.moves ?? []);
      moves.splice(idx, 1);
      await this.actor.update({ "system.moves": moves });
    });
  }
}

// scripts/sheets/npcSheet.mjs
export class EfdiNpcSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["efdi", "sheet", "actor", "npc"],
      template: "systems/escape-from-dino-island/templates/actors/npc-sheet.hbs",
      width: 480,
      height: 420,
      resizable: true
    });
  }

  async getData() {
    const data = await super.getData();
    const goalOptions = [
      "Zu einem geliebten Menschen gelangen",
      "Bleib, bis alles vorbeigeht",
      "Dinosaurier vermeiden",
      "Rache nehmen",
      "In bar bezahlt werden",
      "Niemand kann gehen",
      "Daten sichern",
      "Forschung abschließen",
      "Alles wieder normalisieren",
      "Geheimnis schützen"
    ];
    const offerOptions = [
      "Zugang zu einem Bereich",
      "Führung",
      "Waffe",
      "Dinosaurier-Wissen",
      "Cache-Wissen",
      "Fahrzeugkenntnisse",
      "Technisches System-Wissen",
      "Medizinische Versorgung"
    ];
    return { ...data, goalOptions, offerOptions };
  }

  activateListeners(html) {
    super.activateListeners(html);
  }
}
