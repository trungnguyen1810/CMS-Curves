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


import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from 'ng2-ckeditor';

import { CamnangdinhduongRoutingModule } from './camnangdinhduong-routing.module';
import { CamnangdinhduongComponent } from './camnangdinhduong.component';
import {ThemMoiCamNangDinhDuongComponent} from './child-component/them-moi-cam-nang-dinh-duong.component'


@NgModule({
  declarations: [CamnangdinhduongComponent, ThemMoiCamNangDinhDuongComponent],
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
    PanelModule,
    NgSelectModule,
    CKEditorModule,
    CamnangdinhduongRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[ThemMoiCamNangDinhDuongComponent]
})
export class CamnangdinhduongModule { }
