import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaocaohoivientrehencandoComponent } from './baocaotrehencando.component';

const routes: Routes = [{ path: '', component: BaocaohoivientrehencandoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaocaotrehencandoRoutingModule { }
