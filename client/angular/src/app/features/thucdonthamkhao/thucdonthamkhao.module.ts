import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThucDonThamKhaoRoutingModule } from './thucdonthamkhao-routing.module';
import { ThucDonThamKhaoComponent } from './thucdonthamkhao.component';
import {ThemmoiThucDonComponent} from './child-component/themmoi.component';
import {ChiTietThucDonComponent} from './child-component/chitiet.component'
import { ThemmoibuaanComponent } from './child-component/themmoibuaan.component';
import {CopyThucDonComponent} from './child-component/copythucdon.component';

import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar';



@NgModule({
  declarations: [ThucDonThamKhaoComponent, ThemmoiThucDonComponent,ChiTietThucDonComponent,ThemmoibuaanComponent,CopyThucDonComponent],
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
    ThucDonThamKhaoRoutingModule
  ],
  entryComponents:[ThemmoiThucDonComponent,ChiTietThucDonComponent,ThemmoibuaanComponent,CopyThucDonComponent]
})
export class ThucDonThamKhaoModule { }
