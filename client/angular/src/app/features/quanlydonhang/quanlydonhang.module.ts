import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { QuanlydonhangRoutingModule } from './quanlydonhang-routing.module';
import { QuanlydonhangComponent } from './quanlydonhang.component';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  declarations: [QuanlydonhangComponent],
  imports: [
    CommonModule,TableModule,TooltipModule,ToolbarModule,ButtonModule,FormsModule,DropdownModule,InputTextModule,
    QuanlydonhangRoutingModule
  ]
})
export class QuanlydonhangModule { }
