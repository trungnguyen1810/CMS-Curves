import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlykhachhangtiemnangComponent } from './quanlykhachhangtiemnang.component';

const routes: Routes = [{ path: '', component: QuanlykhachhangtiemnangComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlykhachhangtiemnangRoutingModule { }
