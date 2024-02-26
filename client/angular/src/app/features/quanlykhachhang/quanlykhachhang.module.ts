import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';

import { QuanlykhachhangRoutingModule } from './quanlykhachhang-routing.module';
import { QuanlykhachhangComponent } from './quanlykhachhang.component';
import {ThemMoiKhachHangComponent} from './child-component/them-moi-khach-hangcomponent';
import {ThemMoiSanPhamComponent} from './child-component/them-moi-san-pham.component';
import {DanhSachSanPhamDaMuaComponent} from './child-component/danh-sach-san-pham-da-mua.component';


import {DoiMatKhauKhachHangComponent} from './child-component/doi-mat-khau-khach-hangcomponent';
import {ImportKhachHangComponent} from './child-component/import.component';
import {ThemTuDoComponent} from './child-component/them-tu-docomponent';
import {HuyKhachHangComponent} from './child-component/huy-khach-hang.component';
import {InXacNhanComponent} from './child-component/inxacnhan.component';
import {InXacNhanTrangChuComponent} from './child-component/inxacnhantrangchu.component';
import {SuaTuDoComponent} from './child-component/sua-tu-do.component';
import {SuaBaoLuuComponent} from './child-component/sua-bao-luu.component';
import {ThanhToanGoiTapComponent} from './child-component/thanhtoangoitap.component';
import {InHoaDonGoiTapComponent} from './child-component/inhoadongoitap.component';
import {DanhSachHoaDonComponent} from './child-component/danh-sach-hoa-don.component';
import {SuaHoaDonComponent} from './child-component/sua-hoa-don.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from 'ng2-ckeditor';
import {InHoaDonSanPhamComponent} from './child-component/inhoadonsanpham.component';


@NgModule({
  declarations: [QuanlykhachhangComponent, ThemMoiKhachHangComponent, DoiMatKhauKhachHangComponent,
     ImportKhachHangComponent, ThemTuDoComponent, InXacNhanComponent, HuyKhachHangComponent,ThemMoiSanPhamComponent,
      InXacNhanTrangChuComponent,DanhSachSanPhamDaMuaComponent, SuaTuDoComponent, ThanhToanGoiTapComponent, InHoaDonGoiTapComponent,
      SuaBaoLuuComponent,DanhSachHoaDonComponent, SuaHoaDonComponent,InHoaDonSanPhamComponent],
  imports: [
    CommonModule,
    QuanlykhachhangRoutingModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    ToastModule,
    CalendarModule,
    DropdownModule,
    MultiSelectModule,
    CheckboxModule,
    NgSelectModule,
    CKEditorModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[ThemMoiKhachHangComponent, DoiMatKhauKhachHangComponent, ImportKhachHangComponent,ThemTuDoComponent,
     InXacNhanComponent, HuyKhachHangComponent, InXacNhanTrangChuComponent,ThemMoiSanPhamComponent,DanhSachSanPhamDaMuaComponent,
      SuaTuDoComponent, ThanhToanGoiTapComponent,InHoaDonGoiTapComponent,SuaBaoLuuComponent, DanhSachHoaDonComponent, SuaHoaDonComponent,InHoaDonSanPhamComponent]
})
export class QuanlykhachhangModule { }
