
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ThemMoiTuDoComponent} from './themmoi.component'
import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { QuanlytudoRoutingModule } from './quanlytudo-routing.module';
import { QuanlyTuDoComponent } from './quanlytudo.component';
import {CalendarModule} from 'primeng/calendar';


@NgModule({
  declarations: [QuanlyTuDoComponent,ThemMoiTuDoComponent],
  imports: [
    CommonModule,TableModule,ToolbarModule,ButtonModule,FormsModule,DropdownModule,InputTextModule,
    QuanlytudoRoutingModule,CalendarModule
  ],
  entryComponents:[ThemMoiTuDoComponent]
})
export class QuanlyTuDoModule { }
