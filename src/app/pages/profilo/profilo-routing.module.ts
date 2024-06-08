import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfiloComponent } from './profilo.component';
import { PreferitiComponent } from './preferiti/preferiti.component';

const routes: Routes = [
  { path: '', component: ProfiloComponent },
  { path: 'preferiti', component: PreferitiComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfiloRoutingModule {}
