
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ThemMoiPhieuThuComponent} from './themmoi.component'
import {XemDonHangComponent} from './xemdonhang.component'

import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { QuanlyphieuthuRoutingModule } from './quanlyphieuthu-routing.module';
import { QuanlyPhieuThuComponent } from './quanlyphieuthu.component';
import {CalendarModule} from 'primeng/calendar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {MultiSelectModule} from 'primeng/multiselect';
import {ThemMoiPhieuThuGoiTapComponent} from './themmoigoitap.component'

@NgModule({
  declarations: [QuanlyPhieuThuComponent,ThemMoiPhieuThuComponent,XemDonHangComponent,ThemMoiPhieuThuGoiTapComponent],
  imports: [
    CommonModule,TableModule,ToolbarModule,ButtonModule,FormsModule,DropdownModule,InputTextModule,
    QuanlyphieuthuRoutingModule,CalendarModule,RadioButtonModule,MultiSelectModule
  ],
  entryComponents:[ThemMoiPhieuThuComponent,ThemMoiPhieuThuGoiTapComponent]
})
export class QuanlyPhieuThuModule { }
