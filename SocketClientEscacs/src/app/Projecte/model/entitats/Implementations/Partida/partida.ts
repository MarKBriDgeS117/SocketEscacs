import { IPartida } from '../../Interfaces/Partida/IPartida';
import { Equip } from '../Equip/equip';

export class Partida implements IPartida {
  equip1!: Equip;
  equip2!: Equip;

  constructor(equip1: Equip, equip2: Equip) {
    this.equip1 = equip1;
    this.equip2 = equip2;
  }
  
}
