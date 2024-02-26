
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { QuanlymenuRoutingModule } from './quanlymenu-routing.module';
import { QuanlymenuComponent } from './quanlymenu.component';


@NgModule({
  declarations: [QuanlymenuComponent],
  imports: [
    CommonModule,TableModule,ToolbarModule,ButtonModule,FormsModule,DropdownModule,InputTextModule,
    QuanlymenuRoutingModule
  ],
  entryComponents:[]
})
export class QuanlymenuModule { }