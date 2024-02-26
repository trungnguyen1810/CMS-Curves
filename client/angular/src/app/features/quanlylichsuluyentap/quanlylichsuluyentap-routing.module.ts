import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlylichsuluyentapComponent } from './quanlylichsuluyentap.component';

const routes: Routes = [{ path: '', component: QuanlylichsuluyentapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlylichsuluyentapRoutingModule { }
