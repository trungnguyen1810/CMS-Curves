
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { BaocaocandoRoutingModule } from './baocaocando-routing.module';
import { BaoCaoCanDoComponent } from './baocaocando.component';
import {CalendarModule} from 'primeng/calendar';


@NgModule({
  declarations: [BaoCaoCanDoComponent],
  imports: [
    CommonModule,ToolbarModule,ButtonModule,FormsModule,DropdownModule,InputTextModule,CalendarModule,
    BaocaocandoRoutingModule
  ],
  entryComponents:[]
})
export class BaocaocandoModule { }
