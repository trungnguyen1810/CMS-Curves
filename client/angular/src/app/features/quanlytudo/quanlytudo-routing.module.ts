import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlyTuDoComponent } from './quanlytudo.component';

const routes: Routes = [{ path: '', component: QuanlyTuDoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlytudoRoutingModule { }
