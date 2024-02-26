
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { BaoCaoRoutingModule } from './baocao-routing.module';
import { BaoCaoComponent } from './baocao.component';
import {CalendarModule} from 'primeng/calendar';


@NgModule({
  declarations: [BaoCaoComponent],
  imports: [
    CommonModule,ToolbarModule,ButtonModule,FormsModule,DropdownModule,InputTextModule,CalendarModule,
    BaoCaoRoutingModule
  ],
  entryComponents:[]
})
export class BaoCaoModule { }