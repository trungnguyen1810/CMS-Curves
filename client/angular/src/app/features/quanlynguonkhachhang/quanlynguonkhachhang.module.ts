
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';

import { QuanlynguonkhachhangRoutingModule } from './quanlynguonkhachhang-routing.module';
import { QuanlynguonkhachhangComponent } from './quanlynguonkhachhang.component';
import {ThemMoiNguonKhachHangComponent} from './child-component/them-moi-nguon-khach-hang.component'


@NgModule({
  declarations: [QuanlynguonkhachhangComponent,ThemMoiNguonKhachHangComponent],
  imports: [
    CommonModule,
    QuanlynguonkhachhangRoutingModule,
    FormsModule,
    
    TableModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    CheckboxModule,
    ToastModule,
    DropdownModule,
    PanelModule

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[ThemMoiNguonKhachHangComponent]
})
export class QuanlynguonkhachhangModule { }
