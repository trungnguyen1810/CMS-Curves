import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlymenuComponent } from './quanlymenu.component';

const routes: Routes = [{ path: '', component: QuanlymenuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlymenuRoutingModule { }
