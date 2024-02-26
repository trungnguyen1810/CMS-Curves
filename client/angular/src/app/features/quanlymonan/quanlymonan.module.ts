import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanlymonanRoutingModule } from './quanlymonan-routing.module';
import { QuanlymonanComponent } from './quanlymonan.component';
import {ThemmoiMonAnComponent} from './child-component/themmoi.component';
import {XemMonPhuComponent} from './child-component/xemmonphu.component';

import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';



@NgModule({
  declarations: [QuanlymonanComponent, ThemmoiMonAnComponent,XemMonPhuComponent],
  imports: [
    CommonModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    QuanlymonanRoutingModule
  ],
  entryComponents:[ThemmoiMonAnComponent,XemMonPhuComponent]
})
export class QuanlymonanModule { }
