import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlycolorComponent } from './quanlycolor.component';

const routes: Routes = [{ path: '', component: QuanlycolorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlycolorRoutingModule { }
