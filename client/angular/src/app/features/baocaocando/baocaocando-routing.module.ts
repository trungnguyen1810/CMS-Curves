import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaoCaoCanDoComponent } from './baocaocando.component';

const routes: Routes = [{ path: '', component: BaoCaoCanDoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaocaocandoRoutingModule { }
