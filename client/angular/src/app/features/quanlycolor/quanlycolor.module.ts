
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ThemMoiColorComponent} from './themmoi.component'
import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { QuanlycolorRoutingModule } from './quanlycolor-routing.module';
import { QuanlycolorComponent } from './quanlycolor.component';


@NgModule({
  declarations: [QuanlycolorComponent,ThemMoiColorComponent],
  imports: [
    CommonModule,TableModule,ToolbarModule,ButtonModule,FormsModule,DropdownModule,InputTextModule,
    QuanlycolorRoutingModule
  ],
  entryComponents:[ThemMoiColorComponent]
})
export class QuanlycolorModule { }