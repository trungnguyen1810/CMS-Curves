import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import {CalendarModule} from 'primeng/calendar';

import { BaocaotrehencandoRoutingModule } from './baocaotrehencando-routing.module';
import { BaocaohoivientrehencandoComponent } from './baocaotrehencando.component';


@NgModule({
  declarations: [BaocaohoivientrehencandoComponent],
  imports: [
    MultiSelectModule,CommonModule,TableModule,ToolbarModule,ButtonModule,FormsModule,DropdownModule,InputTextModule,CalendarModule,
    BaocaotrehencandoRoutingModule
  ]
})
export class BaocaohoiviencolichcandoModule { }
