import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlykhachhangnoneComponent } from './quanlykhachhangnone.component';

const routes: Routes = [{ path: '', component: QuanlykhachhangnoneComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlykhachhangnoneRoutingModule { }
