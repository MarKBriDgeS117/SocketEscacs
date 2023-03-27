import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Equip } from '../../model/entitats/Implementations/Equip/equip';
import { Jugador } from '../../model/entitats/Implementations/Jugador/jugador';
import { PartidaService } from '../../model/services/partida.service';

@Component({
  selector: 'app-grup-creacio',
  templateUrl: './grup-creacio.component.html',
  styleUrls: ['./grup-creacio.component.scss'],
})
export class GrupCreacioComponent {
  constructor(
    private fb: FormBuilder,
    private partidaService: PartidaService
  ) {}

  equip = this.fb.group({
    nomEquip: ['', Validators.required],
    jugador1: ['', Validators.required],
    jugador2: ['', Validators.required],
  });

  save() {
    if (this.equip.valid) {
      let nouEquip = new Equip(
        this.equip.get('nomEquip')?.value!,
        new Jugador(this.equip.get('jugador1')?.value!, '', '', ''),
        new Jugador(this.equip.get('jugador2')?.value!, '', '', '')
      );
      this.partidaService.addEquip(nouEquip);
    }
  }
}
