
import { Casella } from '../../Implementations/Casella/casella';
import { Jugador } from '../../Implementations/Jugador/jugador';
import { Peça } from '../../Implementations/Peça/peça';

export interface ITaulell {
  id: string;
  roomNumber: string;
  caselles: Casella[][];
  pecesjugador1: Peça[];
  pecesjugador2: Peça[];
  jugador1: Jugador;
  jugador2: Jugador;
  equips: string;
  letters: string[];
  numbers: number[];
  color: string;
  torn: boolean;
  girat: boolean;
  
  generarTaulell(): void;
  assignarEquips(): void;
  drop(
    ev: any,
    filaDesti: number,
    columnaDesti: number,
    disableDragAndDrop: boolean
  ): void;
  allowDrop(ev: any, disableDragAndDrop: boolean): void;
  drag(ev: any, fila: number, columna: number, disableDragAndDrop: boolean): void;
}