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

import { QuanlybannerRoutingModule } from './quanlybanner-routing.module';
import { QuanlybannerComponent } from './quanlybanner.component';
import {ThemMoiBannerComponent} from './child-component/them-moi-banner.component'


@NgModule({
  declarations: [QuanlybannerComponent, ThemMoiBannerComponent],
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
    QuanlybannerRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[ThemMoiBannerComponent]
})
export class QuanlybannerModule { }
