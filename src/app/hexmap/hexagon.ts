import { BIOME } from './biome';
import { Hex } from 'hexmap-lib';

export class Hexagon extends Hex {
    radius: number;
    public get h() { return this.height * 10; }
    public get x() { return this.radius + this.radius * Math.sqrt(3) * (this.q + this.r / 2); }
    public get y() { return this.radius + this.radius * 3 / 2 * this.r; }
    get fill() { return BIOME[Math.floor(this.h) + 10]; }
    constructor(hex: Hex) {
        super(hex.i, hex.j);
        this.height = hex.height ;
        this.radius = 5;
    }
}
