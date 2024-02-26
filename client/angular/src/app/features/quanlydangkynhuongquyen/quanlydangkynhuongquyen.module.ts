import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';

import { QuanlydangkynhuongquyenRoutingModule } from './quanlydangkynhuongquyen-routing.module';
import { QuanlydangkynhuongquyenComponent } from './quanlydangkynhuongquyen.component';


@NgModule({
  declarations: [QuanlydangkynhuongquyenComponent],
  imports: [
    CommonModule,TableModule,ToolbarModule,ButtonModule,FormsModule,DropdownModule,InputTextModule,CalendarModule,
    QuanlydangkynhuongquyenRoutingModule
  ]
})
export class QuanlydangkynhuongquyenModule { }
