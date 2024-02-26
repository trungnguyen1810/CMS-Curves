import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlydangkynhuongquyenComponent } from './quanlydangkynhuongquyen.component';

const routes: Routes = [{ path: '', component: QuanlydangkynhuongquyenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlydangkynhuongquyenRoutingModule { }
