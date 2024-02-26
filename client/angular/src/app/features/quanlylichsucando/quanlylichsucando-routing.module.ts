import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlylichsucandoComponent } from './quanlylichsucando.component';

const routes: Routes = [{ path: '', component: QuanlylichsucandoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlylichsucandoRoutingModule { }
