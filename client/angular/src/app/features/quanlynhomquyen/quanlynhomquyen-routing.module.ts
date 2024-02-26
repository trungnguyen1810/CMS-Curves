import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlynhomquyenComponent } from './quanlynhomquyen.component';

const routes: Routes = [{ path: '', component: QuanlynhomquyenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlynhomquyenRoutingModule { }
