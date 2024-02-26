import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlycaulacboComponent } from './quanlycaulacbo.component';

const routes: Routes = [{ path: '', component: QuanlycaulacboComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlycaulacboRoutingModule { }
