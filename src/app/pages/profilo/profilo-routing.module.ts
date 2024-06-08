import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfiloComponent } from './profilo.component';
import { PreferitiComponent } from './preferiti/preferiti.component';
import { PreferGuard } from '../../auth/preferiti.guard';

const routes: Routes = [
  { path: '', component: ProfiloComponent },
  {
    path: 'preferiti',
    component: PreferitiComponent,
    canActivate: [PreferGuard],
    canActivateChild: [PreferGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfiloRoutingModule {}
