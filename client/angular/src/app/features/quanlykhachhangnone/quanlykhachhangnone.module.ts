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
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';

import { QuanlykhachhangnoneRoutingModule } from './quanlykhachhangnone-routing.module';
import { QuanlykhachhangnoneComponent } from './quanlykhachhangnone.component';
import {ThemMoiKhachHangComponent} from './child-component/them-moi-khach-hangcomponent';
import {DoiMatKhauKhachHangComponent} from './child-component/doi-mat-khau-khach-hangcomponent';
import {ThemTuDoComponent} from './child-component/them-tu-docomponent';
import {ImportKhachHangComponent} from './child-component/import.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from 'ng2-ckeditor'


@NgModule({
  declarations: [QuanlykhachhangnoneComponent, ThemMoiKhachHangComponent, DoiMatKhauKhachHangComponent, ImportKhachHangComponent, ThemTuDoComponent],
  imports: [
    CommonModule,
    QuanlykhachhangnoneRoutingModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    ToastModule,
    CalendarModule,
    DropdownModule,
    MultiSelectModule,
    CheckboxModule,
    NgSelectModule,
    CKEditorModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[ThemMoiKhachHangComponent, DoiMatKhauKhachHangComponent, ImportKhachHangComponent, ThemTuDoComponent]
})
export class QuanlykhachhangnoneModule { }
