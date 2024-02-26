import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlydonhangComponent } from './quanlydonhang.component';

const routes: Routes = [{ path: '', component: QuanlydonhangComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlydonhangRoutingModule { }
