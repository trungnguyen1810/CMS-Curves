import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThucDonThamKhaoComponent } from './thucdonthamkhao.component';

const routes: Routes = [{ path: '', component: ThucDonThamKhaoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThucDonThamKhaoRoutingModule { }
