import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlythongbaoComponent } from './quanlythongbao.component';

const routes: Routes = [{ path: '', component: QuanlythongbaoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlythongbaoRoutingModule { }
