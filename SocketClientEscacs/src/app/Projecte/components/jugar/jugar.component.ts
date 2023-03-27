import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Jugador } from '../../model/entitats/Implementations/Jugador/jugador';
import { PartidaService } from '../../model/services/partida.service';

@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.component.html',
  styleUrls: ['./jugar.component.scss'],
})
export class JugarComponent {
  jugador!: Jugador;

  constructor(
    private partidaService: PartidaService,
    private _ngZone: NgZone,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getJugador();
    this.startPartida();
  }

  play() {
    this.partidaService.jugar();
  }

  startPartida() {
    this.partidaService.comencaPartida().subscribe((data) => {
       this.goTo('partida', this.jugador);
    });
  }

  getJugador() {
    this.partidaService.getJugador().subscribe((jugador) => {
      this.jugador = jugador;
    });
  }

  goTo(comp: string, param: any) {
    this._ngZone.run(() => {
      this._router.navigate([comp, param]);
    });
  }
}
