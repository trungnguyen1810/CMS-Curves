import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlykhachhangComponent } from './quanlykhachhang.component';

const routes: Routes = [{ path: '', component: QuanlykhachhangComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlykhachhangRoutingModule { }
