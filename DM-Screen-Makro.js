// ╔══════════════════════════════════════════════════════════╗
// ║  ESCAPE FROM DINO ISLAND – DM-Bildschirm Makro           ║
// ║  In Foundry VTT als "Script"-Makro einfügen              ║
// ╚══════════════════════════════════════════════════════════╝

if (typeof game.efdi !== "undefined") {
  // System ist geladen – eingebaute Funktion nutzen
  game.efdi.openDmScreen();
} else {
  // Fallback: Standalone-Version ohne System
  ui.notifications.warn("Das Escape from Dino Island System muss aktiv sein.");
}
