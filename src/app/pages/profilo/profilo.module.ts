import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfiloRoutingModule } from './profilo-routing.module';
import { ProfiloComponent } from './profilo.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ProfiloComponent],
  imports: [CommonModule, ProfiloRoutingModule, SharedModule],
})
export class ProfiloModule {}
