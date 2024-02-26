import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanlyhethongRoutingModule } from './quanlyhethong-routing.module';
import { QuanlyhethongComponent } from './quanlyhethong.component';


@NgModule({
  declarations: [QuanlyhethongComponent],
  imports: [
    CommonModule,
    QuanlyhethongRoutingModule
  ]
})
export class QuanlyhethongModule { }
