import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlylienheComponent } from './quanlylienhe.component';

const routes: Routes = [{ path: '', component: QuanlylienheComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlylienheRoutingModule { }
