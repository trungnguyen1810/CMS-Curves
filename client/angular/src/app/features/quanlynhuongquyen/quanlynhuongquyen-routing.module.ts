import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlynhuongquyenComponent } from './quanlynhuongquyen.component';

const routes: Routes = [{ path: '', component: QuanlynhuongquyenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlynhuongquyenRoutingModule { }
