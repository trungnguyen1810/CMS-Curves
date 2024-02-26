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

import { QuanlyvoucherRoutingModule } from './quanlyvoucher-routing.module';
import { QuanlyvoucherComponent } from './quanlyvoucher.component';
import {ThemMoiVoucherComponent} from './child-component/them-moi-voucher.component';
import {ImportVoucherComponent} from './child-component/import.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from 'ng2-ckeditor'
import {MultiSelectModule} from 'primeng/multiselect';


@NgModule({
  declarations: [QuanlyvoucherComponent, ThemMoiVoucherComponent, ImportVoucherComponent],
  imports: [
    CommonModule,
    QuanlyvoucherRoutingModule,
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
    CheckboxModule,
    NgSelectModule,
    CKEditorModule,
    MultiSelectModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[ThemMoiVoucherComponent, ImportVoucherComponent]
})
export class QuanlyvoucherModule { }
