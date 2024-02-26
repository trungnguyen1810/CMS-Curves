import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlynguonkhachhangComponent } from './quanlynguonkhachhang.component';

const routes: Routes = [{ path: '', component: QuanlynguonkhachhangComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlynguonkhachhangRoutingModule { }
