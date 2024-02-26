import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThongtinsanphamComponent } from './thongtinsanpham.component';

const routes: Routes = [{ path: '', component: ThongtinsanphamComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThongtinsanphamRoutingModule { }
