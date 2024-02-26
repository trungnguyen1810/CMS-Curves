import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlybannerComponent } from './quanlybanner.component';

const routes: Routes = [{ path: '', component: QuanlybannerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlybannerRoutingModule { }
