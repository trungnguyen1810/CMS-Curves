
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ThemMoiSizeComponent} from './themmoi.component'
import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { QuanlysizeRoutingModule } from './quanlysize-routing.module';
import { QuanlysizeComponent } from './quanlysize.component';


@NgModule({
  declarations: [QuanlysizeComponent,ThemMoiSizeComponent],
  imports: [
    CommonModule,TableModule,ToolbarModule,ButtonModule,FormsModule,DropdownModule,InputTextModule,
    QuanlysizeRoutingModule
  ],
  entryComponents:[ThemMoiSizeComponent]
})
export class QuanlysizeModule { }