import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaocaohoiviencolichcandoComponent } from './baocaohoiviencolichcando.component';

const routes: Routes = [{ path: '', component: BaocaohoiviencolichcandoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaocaohoiviencolichcandoRoutingModule { }
