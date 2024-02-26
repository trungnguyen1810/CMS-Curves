import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlynhanvienComponent } from './quanlynhanvien.component';

const routes: Routes = [{ path: '', component: QuanlynhanvienComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlynhanvienRoutingModule { }
