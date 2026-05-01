// scripts/dialogs/rollDialog.mjs
import { rollStat } from "../efdi.mjs";

export class EfdiRollDialog extends Dialog {

  static async showStatChoice(actor, move) {
    const stats = [
      { id: "clever", label: game.i18n.localize("EFDI.Stats.clever") },
      { id: "fit", label: game.i18n.localize("EFDI.Stats.fit") },
      { id: "steady", label: game.i18n.localize("EFDI.Stats.steady") }
    ];

    const content = await renderTemplate(
      "systems/escape-from-dino-island/templates/dialogs/roll-dialog.hbs",
      { move, stats, actor }
    );

    return new Promise((resolve) => {
      const d = new Dialog({
        title: `${move.name} – Wert wählen`,
        content,
        buttons: {
          clever: {
            label: game.i18n.localize("EFDI.Stats.clever"),
            callback: () => { rollStat("clever", actor.id, 0, move.name, move.description); resolve(); }
          },
          fit: {
            label: game.i18n.localize("EFDI.Stats.fit"),
            callback: () => { rollStat("fit", actor.id, 0, move.name, move.description); resolve(); }
          },
          steady: {
            label: game.i18n.localize("EFDI.Stats.steady"),
            callback: () => { rollStat("steady", actor.id, 0, move.name, move.description); resolve(); }
          }
        },
        default: "clever"
      }, { classes: ["efdi", "efdi-dialog"] });
      d.render(true);
    });
  }

  static async showBonusRoll(actor, stat) {
    const content = `
      <div class="efdi-dialog-content">
        <p>Bonus für diesen Wurf:</p>
        <input type="number" id="efdi-bonus-val" value="0" min="-3" max="3" style="width:60px;text-align:center;font-size:1.4em;">
      </div>`;

    return new Promise((resolve) => {
      new Dialog({
        title: "Bonus-Würfelwurf",
        content,
        buttons: {
          roll: {
            label: "Würfeln",
            callback: (html) => {
              const bonus = parseInt(html.find("#efdi-bonus-val").val()) || 0;
              rollStat(stat, actor.id, bonus);
              resolve(bonus);
            }
          },
          cancel: { label: "Abbrechen", callback: () => resolve(null) }
        },
        default: "roll"
      }, { classes: ["efdi", "efdi-dialog"] }).render(true);
    });
  }
}
