import { Jugador } from "../Jugador/jugador";

export class Equip {
  nomEquip!: string;
  jugador1!: Jugador;
  jugador2!: Jugador;


  constructor(nomEquip: string, jugador1: Jugador, jugador2: Jugador) {
    this.nomEquip = nomEquip;
    this.jugador1 = jugador1;
    this.jugador2 = jugador2;
  }
}
