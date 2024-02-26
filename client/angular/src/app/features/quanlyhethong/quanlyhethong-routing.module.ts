import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlyhethongComponent } from './quanlyhethong.component';

const routes: Routes = [{ path: '', component: QuanlyhethongComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlyhethongRoutingModule { }
