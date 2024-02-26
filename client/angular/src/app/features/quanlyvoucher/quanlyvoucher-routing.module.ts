import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlyvoucherComponent } from './quanlyvoucher.component';

const routes: Routes = [{ path: '', component: QuanlyvoucherComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlyvoucherRoutingModule { }
