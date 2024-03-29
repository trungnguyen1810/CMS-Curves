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

import { QuanlycaulacboRoutingModule } from './quanlycaulacbo-routing.module';
import { QuanlycaulacboComponent } from './quanlycaulacbo.component';
import {ThemMoiCauLacBoComponent} from './child-component/them-moi-cau-lac-bo.component';
import { from } from 'rxjs';


@NgModule({
  declarations: [QuanlycaulacboComponent, ThemMoiCauLacBoComponent],
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
    DropdownModule,
    PanelModule,
    CheckboxModule,
    NgSelectModule,
    CKEditorModule,
    QuanlycaulacboRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[ThemMoiCauLacBoComponent]
})
export class QuanlycaulacboModule { }
