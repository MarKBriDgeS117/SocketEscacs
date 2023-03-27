import { PartidaService } from '../../../services/partida.service';
import { ITaulell } from '../../Interfaces/Taulell/ITaulell';
import { Casella } from '../Casella/casella';
import { Jugador } from '../Jugador/jugador';
import { Peça } from '../Peça/peça';

export class Taulell implements ITaulell {
  id!: string;
  roomNumber!: string;
  caselles: Casella[][] = [];
  pecesjugador1: Peça[] = [];
  pecesjugador2: Peça[] = [];
  jugador1: Jugador;
  jugador2: Jugador;
  equips: string = '';
  letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  numbers = [8, 7, 6, 5, 4, 3, 2, 1];
  color!: string;
  torn!: boolean;
  girat: boolean = false;
  constructor(
    private partidaService: PartidaService,
    id: string,
    roomNumber: string,
    color: string,
    jugador1: Jugador,
    jugador2: Jugador
  ) {
    this.id = id;
    this.color = color;
    this.roomNumber = roomNumber;
    this.jugador1 = jugador1;
    this.jugador2 = jugador2;
    this.generarTaulell();
    this.assignarEquips();
    if (color === 'Blanc') this.torn = true;
    else this.torn = false;
  }

  generarTaulell() {
    for (let fila = 0; fila < 8; fila++) {
      this.caselles[fila] = [];
      for (let columna = 0; columna < 8; columna++) {
        this.caselles[fila][columna] = new Casella(
          this.letters[fila] + columna,
          fila,
          columna
        );
        if (fila == 0) {
          if (columna == 0 || columna == 7)
            this.caselles[fila][columna].setPeça(new Peça('Torre', 'Blanc'));
          else if (columna == 1 || columna == 6)
            this.caselles[fila][columna].setPeça(new Peça('Cavall', 'Blanc'));
          else if (columna == 2 || columna == 5)
            this.caselles[fila][columna].setPeça(new Peça('Alfil', 'Blanc'));
          else if (columna == 3)
            this.caselles[fila][columna].setPeça(new Peça('Rei', 'Blanc'));
          else if (columna == 4)
            this.caselles[fila][columna].setPeça(new Peça('Reina', 'Blanc'));
        } else if (fila == 1)
          this.caselles[fila][columna].setPeça(new Peça('Peó', 'Blanc'));
        else if (fila == 6)
          this.caselles[fila][columna].setPeça(new Peça('Peó', 'Negre'));
        else if (fila == 7) {
          if (columna == 0 || columna == 7)
            this.caselles[fila][columna].setPeça(new Peça('Torre', 'Negre'));
          else if (columna == 1 || columna == 6)
            this.caselles[fila][columna].setPeça(new Peça('Cavall', 'Negre'));
          else if (columna == 2 || columna == 5)
            this.caselles[fila][columna].setPeça(new Peça('Alfil', 'Negre'));
          else if (columna == 3)
            this.caselles[fila][columna].setPeça(new Peça('Rei', 'Negre'));
          else if (columna == 4)
            this.caselles[fila][columna].setPeça(new Peça('Reina', 'Negre'));
        }
      }
    }
  }

  drop(
    ev: any,
    filaDesti: number,
    columnaDesti: number,
    disableDragAndDrop: boolean
  ) {
    if (disableDragAndDrop) {
      ev.preventDefault();
      const filaOrigen = parseInt(ev.dataTransfer.getData('fila'), 10);
      const columnaOrigen = parseInt(ev.dataTransfer.getData('columna'), 10);
      if (!Number.isNaN(filaOrigen) && !Number.isNaN(columnaOrigen)) {
        if (filaDesti != filaOrigen || columnaDesti != columnaOrigen) {
          const peça = this.caselles[filaOrigen][columnaOrigen].peca;
          this.partidaService.mourePeca({
            filaOrigen: filaOrigen,
            filaDesti: filaDesti,
            columnaOrigen: columnaOrigen,
            columnaDesti: columnaDesti,
            peca: peça,
            taulell: this.id,
            roomNumber: this.roomNumber,
          });
        }
      }
    }
  }

  allowDrop(ev: any, disableDragAndDrop: boolean) {
    if (disableDragAndDrop) ev.preventDefault();
  }

  drag(ev: any, fila: number, columna: number, disableDragAndDrop: boolean) {
    const peça = this.caselles[fila][columna].peca;
    console.log(peça);
    if (disableDragAndDrop && peça.color == this.color && this.torn) {
      ev.dataTransfer.setData('fila', fila);
      ev.dataTransfer.setData('columna', columna);
    }
  }

  enviarPeçaMortes(Desti: Casella) {
    const pecaDesti = Desti.peca;
    if (!pecaDesti) return;
    const jugador =
      pecaDesti.color === 'Blanc'
        ? this.girat
          ? this.pecesjugador1
          : this.pecesjugador2
        : this.girat
        ? this.pecesjugador2
        : this.pecesjugador1;
    jugador.push(pecaDesti);
  }
  mourePeça(
    peçaDesti: Casella,
    filaOrigen: number,
    columnaOrigen: number,
    filaDesti: number,
    columnaDesti: number
  ) {
    this.enviarPeçaMortes(peçaDesti);
    const peça = this.caselles[filaOrigen][columnaOrigen].peca;
    this.caselles[filaOrigen][columnaOrigen].contePeca = false;
    this.caselles[filaDesti][columnaDesti].peca = peça;
    this.caselles[filaDesti][columnaDesti].contePeca = true;
  }

  girarTauler() {
    this.girat = !this.girat;
    this.assignarEquips();
    const taulerTemporal = [...this.caselles.map((fila) => [...fila])];
    for (let fila = 0; fila < 8; fila++) {
      for (let columna = 0; columna < 8; columna++) {
        this.caselles[fila][columna] = taulerTemporal[7 - fila][7 - columna];
      }
    }
  }

  invertPositions() {
    this.letters = [...this.letters].reverse();
    this.numbers = [...this.numbers].reverse();
  }

  assignarEquips() {
    let partida = this.partidaService.getPartida();
    if (this.girat)
      this.equips = partida.equip1.nomEquip + ' vs ' + partida.equip2.nomEquip;
    else
      this.equips = partida.equip2.nomEquip + ' vs ' + partida.equip1.nomEquip;
  }
  mourePeçaAutomaticament(
    filaOrigen: number,
    columnaOrigen: number,
    filaDesti: number,
    columnaDesti: number
  ) {
    const peçaDesti = this.caselles[filaDesti][columnaDesti];
    const peçaOrigen = this.caselles[filaOrigen][columnaOrigen];
    if (filaDesti != filaOrigen || columnaDesti != columnaOrigen) {
      if (peçaOrigen.color != this.color) this.torn = !this.torn;
      this.mourePeça(
        peçaDesti,
        filaOrigen,
        columnaOrigen,
        filaDesti,
        columnaDesti
      );
    }
  }
}
