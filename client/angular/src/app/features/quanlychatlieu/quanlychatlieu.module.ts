
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ThemMoiChatLieuComponent} from './themmoi.component'
import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { QuanlychatlieuRoutingModule } from './quanlychatlieu-routing.module';
import { QuanlychatlieuComponent } from './quanlychatlieu.component';


@NgModule({
  declarations: [QuanlychatlieuComponent,ThemMoiChatLieuComponent],
  imports: [
    CommonModule,TableModule,ToolbarModule,ButtonModule,FormsModule,DropdownModule,InputTextModule,
    QuanlychatlieuRoutingModule
  ],
  entryComponents:[ThemMoiChatLieuComponent]
})
export class QuanlychatlieuModule { }