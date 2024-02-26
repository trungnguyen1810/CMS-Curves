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


import { QuanlytintucRoutingModule } from './quanlytintuc-routing.module';
import { QuanlytintucComponent } from './quanlytintuc.component';
import {ThemMoiTinTucComponent} from './child-component/them-moi-tin-tuc.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from 'ng2-ckeditor';
import $ from "jquery";
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [QuanlytintucComponent, ThemMoiTinTucComponent],
  imports: [
    CommonModule,
    FormsModule,
    QuanlytintucRoutingModule,
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
    CKEditorModule
  ],
  
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[ThemMoiTinTucComponent]
})
export class QuanlytintucModule { }
