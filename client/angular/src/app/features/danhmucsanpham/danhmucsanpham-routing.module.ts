import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DanhmucsanphamComponent } from './danhmucsanpham.component';

const routes: Routes = [{ path: '', component: DanhmucsanphamComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhmucsanphamRoutingModule { }
