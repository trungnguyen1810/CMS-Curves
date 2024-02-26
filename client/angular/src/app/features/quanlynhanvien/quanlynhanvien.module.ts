import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanlynhanvienRoutingModule } from './quanlynhanvien-routing.module';
import { QuanlynhanvienComponent } from './quanlynhanvien.component';
import {ThemmoiNhanVienComponent} from './child-component/themmoi.component'
import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
 
@NgModule({
  declarations: [QuanlynhanvienComponent,ThemmoiNhanVienComponent],
  imports: [
    CommonModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    QuanlynhanvienRoutingModule
  ],
  entryComponents:[ThemmoiNhanVienComponent]
})
export class QuanlynhanvienModule { }
