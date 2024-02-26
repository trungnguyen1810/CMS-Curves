import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ThemMoiThongBaoComponent} from './child-component/themmoi.component'
import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { QuanlythongbaoRoutingModule } from './quanlythongbao-routing.module';
import { QuanlythongbaoComponent } from './quanlythongbao.component';


@NgModule({
  declarations: [QuanlythongbaoComponent,ThemMoiThongBaoComponent],
  imports: [
    CommonModule,TableModule,ToolbarModule,ButtonModule,FormsModule,DropdownModule,InputTextModule,
    QuanlythongbaoRoutingModule
  ],
  entryComponents:[ThemMoiThongBaoComponent]
})
export class QuanlythongbaoModule { }
