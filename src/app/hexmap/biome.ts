
function range(begin, end, step) {
    const res = [];
    for (let i = 0; begin + (step * i) <= end; i++) { res[i] = begin + (step * i); }
    return res;
}

function inititateBiome() {
    const height = range(-10, 10, 1);
    const moist = range(0, 10, 1);

    return height.map(function (p) {
        if (p > 0) {
            return '#' + shadeColor('#00FF00', (-p / 10) * 100);
        } else if (p < 0) {
            return '#' + shadeColor('#0000FF', (p / 10) * 100);
        }
        return '#FFFF00';
    });
}

function shadeColor(color, percent) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    const amt = Math.round(2.55 * percent);
    let R = parseInt(result[1], 16) + amt;
    R = R < 255 ? R < 1 ? 0 : R : 255;
    let G = parseInt(result[2], 16) + amt;
    G = G < 255 ? G < 1 ? 0 : G : 255;
    let B = parseInt(result[3], 16) + amt;
    B = B < 255 ? B < 1 ? 0 : B : 255;
    return (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}
export const BIOME = inititateBiome();
