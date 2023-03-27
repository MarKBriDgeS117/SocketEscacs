import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Equip } from '../entitats/Implementations/Equip/equip';
import { Observable, Subject } from 'rxjs';
import { Jugador } from '../entitats/Implementations/Jugador/jugador';
import { Partida } from '../entitats/Implementations/Partida/partida';
//import { io } from 'socket.io-client';
//const socket = io('http://localhost:4444');

@Injectable({
  providedIn: 'root',
})
export class PartidaService {

  partida!: Partida;
  constructor(private socket: Socket) {}

  addEquip(equip: Equip) {
    this.socket.emit('addEquip', equip);
  }

   createJugador(data: Jugador) {
    return new Jugador(data.jugador, data.taulell, data.roomNumber, data.color);
  }
  
   createEquip(data:any,nomEquip:string) {
    return new Equip(nomEquip, this.createJugador(data[0]), this.createJugador(data[1]));
  }
  
  comencaPartida() {
    return new Observable((subscriber) => {
      this.socket.on('comencaPartida', (data: any) => {
        console.log('startPartida');
        let Equip1 = this.createEquip(data.slice(0, 2),data[0].equip);
        let Equip2 = this.createEquip(data.slice(2, 4),data[2].equip);
        this.partida = new Partida(Equip1, Equip2);
        subscriber.next(data);
      });
    });
  }

  mourePeca(moviment: any) {
    this.socket.emit('mourePeca', moviment);
  }

  getPecaMoguda() {
    return new Observable((subscriber) => {
      console.log('getPecaMoguda');
      this.socket.on('moviment', (data: any) => {
        console.log('moviment');
        console.log(data);
        subscriber.next(data);
      });
    });
  }

  getPartida() {
    return this.partida;
  }

  getJugador() {
    return new Observable<Jugador>((subscriber) => {
      this.socket.on('jugador', (data: any) => {
        console.log('jugador');
        subscriber.next(data);
      });
    });
  }

  jugar() {
    this.socket.emit('jugar');
  }
}
