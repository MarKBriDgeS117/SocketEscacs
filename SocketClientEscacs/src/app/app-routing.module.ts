import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrupCreacioComponent } from './Projecte/components/grup-creacio/grup-creacio.component';
import { JugarComponent } from './Projecte/components/jugar/jugar.component';
import { PartidaComponent } from './Projecte/components/partida/partida.component';

const routes: Routes = [
  { path: '', redirectTo: 'crearGrups', pathMatch: 'full' },
  { path: 'partida', component: PartidaComponent},
  { path: 'crearGrups', component: GrupCreacioComponent},
  { path: 'jugar', component: JugarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
