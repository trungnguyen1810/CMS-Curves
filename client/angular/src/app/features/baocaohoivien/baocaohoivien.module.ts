
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { BaocaohoivienRoutingModule } from './baocaohoivien-routing.module';
import { BaoCaoHoiVienComponent } from './baocaohoivien.component';
import {CalendarModule} from 'primeng/calendar';


@NgModule({
  declarations: [BaoCaoHoiVienComponent],
  imports: [
    CommonModule,ToolbarModule,ButtonModule,FormsModule,DropdownModule,InputTextModule,CalendarModule,
    BaocaohoivienRoutingModule
  ],
  entryComponents:[]
})
export class BaocaohoivienModule { }
