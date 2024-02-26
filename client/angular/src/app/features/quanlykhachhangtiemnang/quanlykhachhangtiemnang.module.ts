
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
import {CalendarModule} from 'primeng/calendar';

import { QuanlykhachhangtiemnangRoutingModule } from './quanlykhachhangtiemnang-routing.module';
import { QuanlykhachhangtiemnangComponent } from './quanlykhachhangtiemnang.component';
import {ThemMoiKhachHangTiemNangComponent} from './child-component/them-moi-khach-hang-tiem-nang.component';
import {ThemNhatKyComponent} from './child-component/them-nhat-ky.component';
import {SuaNhatKyComponent} from './child-component/sua-nhat-ky.component';


@NgModule({
  declarations: [QuanlykhachhangtiemnangComponent,ThemMoiKhachHangTiemNangComponent, ThemNhatKyComponent, SuaNhatKyComponent],
  imports: [
    CommonModule,
    QuanlykhachhangtiemnangRoutingModule,
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
    CalendarModule,
    PanelModule

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[ThemMoiKhachHangTiemNangComponent, ThemNhatKyComponent, SuaNhatKyComponent]
})
export class KhachhangtiemnangModule { }
