import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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


import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from 'ng2-ckeditor';

import { DanhmuctinhthanhRoutingModule } from './danhmuctinhthanh-routing.module';
import { DanhmuctinhthanhComponent } from './danhmuctinhthanh.component';
import {ThemMoiTinhThanhComponent} from './child-component/them-moi-tinh-thanh.component';


@NgModule({
  declarations: [DanhmuctinhthanhComponent,ThemMoiTinhThanhComponent],
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
    ToastModule,
    CheckboxModule,
    NgSelectModule,
    CKEditorModule,
    DanhmuctinhthanhRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[ThemMoiTinhThanhComponent]
})
export class DanhmuctinhthanhModule { }
