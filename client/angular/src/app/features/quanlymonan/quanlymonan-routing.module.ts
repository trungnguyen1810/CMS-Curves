import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlymonanComponent } from './quanlymonan.component';

const routes: Routes = [{ path: '', component: QuanlymonanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlymonanRoutingModule { }
