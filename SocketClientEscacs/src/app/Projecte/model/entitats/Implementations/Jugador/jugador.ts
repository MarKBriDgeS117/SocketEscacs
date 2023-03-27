import { IJugador } from '../../Interfaces/Jugador/IJugador';
export class Jugador  implements IJugador {
  jugador!: string;
  taulell!: string;
  roomNumber!: string;
  color!: string;

  constructor(jugador: string, taulell: string, roomNumber: string, color: string) {
    this.jugador = jugador;
    this.taulell = taulell;
    this.roomNumber = roomNumber;
    this.color = color;
  }
}
