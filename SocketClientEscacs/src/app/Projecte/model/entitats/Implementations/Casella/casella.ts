import { Peça } from '../Peça/peça';

export class Casella {
  id: string;
  fila: number;
  columna: number;
  peca!: Peça;
  color!: string;
  contePeca!: boolean;

  constructor(id: string, fila: number, columna: number) {
    this.id = id;
    this.fila = fila;
    this.columna = columna;
  }

  setPeça(peça: Peça) {
    this.peca = peça;
    this.contePeca = true;
    this.peca.img =
      '../../../../assets/' + this.peca.tipus + this.peca.color + '.png';
  }
}
