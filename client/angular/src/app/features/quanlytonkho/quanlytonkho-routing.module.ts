import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanLyTonKhoComponent } from './quanlytonkho.component';

const routes: Routes = [{ path: '', component: QuanLyTonKhoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyTonKhoRoutingModule { }
