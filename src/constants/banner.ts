import figlet from "figlet";
import standardFont from "figlet/fonts/Standard";

/**
 * ASCII Art Banner for Terminal
 *
 * To change the font:
 * 1. Import a different font from 'figlet/fonts/FontName'
 * 2. Update BANNER_FONT below
 * 3. Update the import statement and variable name
 *
 * Popular fonts: 'Standard', 'Slant', 'Big', 'Small', 'Doom', 'Graffiti', 'Star Wars'
 */

const BANNER_FONT = "Standard";

// Preload the font for synchronous usage
figlet.parseFont(BANNER_FONT, standardFont);

export function getBannerLines(): string[] {
  const banner = figlet.textSync("MZX", { font: BANNER_FONT });
  return banner.split("\n");
}
