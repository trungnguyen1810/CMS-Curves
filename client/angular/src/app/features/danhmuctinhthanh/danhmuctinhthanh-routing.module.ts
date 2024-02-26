import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DanhmuctinhthanhComponent } from './danhmuctinhthanh.component';

const routes: Routes = [{ path: '', component: DanhmuctinhthanhComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhmuctinhthanhRoutingModule { }
