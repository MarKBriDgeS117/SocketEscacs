import { IPeça } from "../../Interfaces/Peça/IPeça";

export class Peça implements IPeça {
    color!: string;
    tipus!: string;
    img!: string;

    constructor( tipus:string, color:string) {
        this.tipus = tipus;
        this.color = color;
    }
}
