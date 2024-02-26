import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlytintucComponent } from './quanlytintuc.component';

const routes: Routes = [{ path: '', component: QuanlytintucComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlytintucRoutingModule { }
