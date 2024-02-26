import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanlylichsuluyentapRoutingModule } from './quanlylichsuluyentap-routing.module';
import { QuanlylichsuluyentapComponent } from './quanlylichsuluyentap.component';
import {ThemMoiLichSuComponent} from './child-component/themmoi.component';
import {QuetMaVachComponent} from './child-component/quetmavach.component';
import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar';
import { NgxBarCodePutModule } from 'ngx-barcodeput';
@NgModule({
  declarations: [QuanlylichsuluyentapComponent,ThemMoiLichSuComponent,QuetMaVachComponent],
  imports: [
    CommonModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    NgxBarCodePutModule,
    QuanlylichsuluyentapRoutingModule
  ],
  entryComponents:[ThemMoiLichSuComponent,QuetMaVachComponent]
})
export class QuanlylichsuluyentapModule { }
