import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaocaobiendongcannangComponent } from './baocaobiendongcannang.component';

const routes: Routes = [{ path: '', component: BaocaobiendongcannangComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaocaobiendongcannangRoutingModule { }
