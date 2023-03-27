import { Component, Input, HostListener, OnChanges, SimpleChanges  } from '@angular/core';
import { Router } from '@angular/router';
import { Taulell } from '../../model/entitats/Implementations/Taulell/taulell';


@Component({
  selector: 'app-taulell',
  templateUrl: './taulell.component.html',
  styleUrls: ['./taulell.component.scss'],
})
export class TaulellComponent implements OnChanges{
  @Input() disableDragAndDrop!: boolean;
  @Input() Taulell!: Taulell;

  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Taulell'].currentValue == undefined) {
      this.router.navigate(['/crearGrups']);
    }
  }

}
