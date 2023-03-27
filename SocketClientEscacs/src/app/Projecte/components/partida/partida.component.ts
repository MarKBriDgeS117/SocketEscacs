import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Jugador } from '../../model/entitats/Implementations/Jugador/jugador';
import { Taulell } from '../../model/entitats/Implementations/Taulell/taulell';
import { PartidaService } from '../../model/services/partida.service';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.scss'],
})
export class PartidaComponent {
  disableTaulell1: boolean = false;
  disableTaulell2: boolean = false;
  taulell1!: Taulell;
  taulell2!: Taulell;
  jugador!: Jugador;

  constructor(private partidaService: PartidaService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getParamsRoute();
    let partida = this.partidaService.getPartida();
    this.taulell1 = new Taulell(this.partidaService,'1',this.jugador.roomNumber ,this.jugador.color,partida.equip1.jugador1,partida.equip2.jugador2);
    this.taulell2 = new Taulell(this.partidaService,'2',this.jugador.roomNumber ,this.jugador.color,partida.equip1.jugador2,partida.equip2.jugador1);
    this.taulell1.invertPositions();
    this.taulell1.girarTauler();
    this.getMoviment();
    if (this.jugador.taulell === '1') this.disableTaulell1 = true;
    else this.disableTaulell2 = true;
  }
  
  getParamsRoute(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.jugador = {jugador: params.get('jugador')!,taulell: params.get('taulell')!,roomNumber: params.get('roomNumber')!,color: params.get('color')!};
    });
  }

  getMoviment() {
    this.partidaService
      .getPecaMoguda().subscribe((peca: any) => {
        const taulell = peca.taulell === '1' ? this.taulell1 : this.taulell2;
        taulell.mourePeçaAutomaticament(
          peca.filaOrigen,
          peca.columnaOrigen,
          peca.filaDesti,
          peca.columnaDesti
        );
      });
  }
}
