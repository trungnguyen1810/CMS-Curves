import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { DanhmucsanphamRoutingModule } from './danhmucsanpham-routing.module';
import { DanhmucsanphamComponent } from './danhmucsanpham.component';
import {ThemmoiDanhMucSanPhamComponent} from './child-component/themmoi.component';
import {FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
  declarations: [DanhmucsanphamComponent,ThemmoiDanhMucSanPhamComponent],
  imports: [
    CommonModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    DanhmucsanphamRoutingModule
  ],
  entryComponents:[ThemmoiDanhMucSanPhamComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
})
export class DanhmucsanphamModule { }
