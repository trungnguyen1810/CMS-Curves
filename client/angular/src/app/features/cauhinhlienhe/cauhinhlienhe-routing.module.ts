import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CauhinhlienheComponent } from './cauhinhlienhe.component';

const routes: Routes = [{ path: '', component: CauhinhlienheComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CauhinhlienheRoutingModule { }
