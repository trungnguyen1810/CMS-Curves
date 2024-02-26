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
import {PanelModule} from 'primeng/panel';

import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar';
import { NgxBarCodePutModule } from 'ngx-barcodeput';

import { QuanlylichsucandoRoutingModule } from './quanlylichsucando-routing.module';
import { QuanlylichsucandoComponent } from './quanlylichsucando.component';
import {ThemMoiLichSuCanDoComponent} from './child-component/them-moi-lich-su-can-do.component'
import {ThemMoiComponent} from './child-component/them-moi.component'


@NgModule({
  declarations: [QuanlylichsucandoComponent, ThemMoiLichSuCanDoComponent, ThemMoiComponent],
  imports: [
    CommonModule,
    QuanlylichsucandoRoutingModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    ToastModule,
    PanelModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    NgxBarCodePutModule,
    CheckboxModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[ThemMoiLichSuCanDoComponent, ThemMoiComponent]
})
export class QuanlylichsucandoModule { }
