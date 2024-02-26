import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlychatlieuComponent } from './quanlychatlieu.component';

const routes: Routes = [{ path: '', component: QuanlychatlieuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlychatlieuRoutingModule { }
