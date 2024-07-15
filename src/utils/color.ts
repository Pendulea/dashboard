/**
 * Convert HEX to HSL
 * @param {string} hex - The HEX color value
 * @returns {HSL} - An object containing the HSL values
 */
function hexToHSL(hex: string): { h: number, s: number, l: number } {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    // Calculate hue
    // No difference
    if (delta == 0) h = 0;
    // Red is max
    else if (cmax == r) h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g) h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l };
}

/**
 * Convert HSL to HEX
 * @param {number} h - The hue value
 * @param {number} s - The saturation value
 * @param {number} l - The lightness value
 * @returns {string} - The HEX color value
 */
function hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }

    let rHex = Math.round((r + m) * 255).toString(16);
    let gHex = Math.round((g + m) * 255).toString(16);
    let bHex = Math.round((b + m) * 255).toString(16);

    if (rHex.length == 1) rHex = "0" + rHex;
    if (gHex.length == 1) gHex = "0" + gHex;
    if (bHex.length == 1) bHex = "0" + bHex;

    return "#" + rHex + gHex + bHex;
}

/**
 * Generate a random shade of a given color
 * @param {string} color - The base color in HEX format
 * @param {number} idx - The index to vary the shade
 * @returns {string} - The generated shade in HEX format
 */
export function generateRandomShade(color: string, idx: number): string {
    const { h, s, l } = hexToHSL(color);
    if (idx === 0){
        return color
    }
    const randomFactor = Math.abs(idx) / 10000;
    const newL = Math.min(Math.max(l + (randomFactor - 0.5) * 20, 0), 100);
    return hslToHex(h, s, newL);
}
