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
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from 'ng2-ckeditor';
import {CalendarModule} from 'primeng/calendar';

import { QuanlynhuongquyenRoutingModule } from './quanlynhuongquyen-routing.module';
import { QuanlynhuongquyenComponent } from './quanlynhuongquyen.component';
import { ThemMoiNhuongQuyenComponent } from './child-component/them-moi-nhuong-quyen.component'


@NgModule({
  declarations: [QuanlynhuongquyenComponent, ThemMoiNhuongQuyenComponent],
  imports: [
    CommonModule,
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
    NgSelectModule,
    CKEditorModule,
    CalendarModule,
    QuanlynhuongquyenRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[ThemMoiNhuongQuyenComponent]
})
export class QuanlynhuongquyenModule { }
