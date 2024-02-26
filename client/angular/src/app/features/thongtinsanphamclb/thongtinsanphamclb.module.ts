import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThongtinsanphamCLBRoutingModule } from './thongtinsanphamclb-routing.module';
import { ThongtinsanphamComponent } from './thongtinsanpham.component';
import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {ThemmoiSanPhamComponent} from './child-component/themmoi.component';
import {ThemSoLuongComponent} from './child-component/themsoluong.component';
import {FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import { CKEditorModule } from 'ng2-ckeditor';
import {BaoCaoTonKhoComponent} from './child-component/baocaotonkho.component';
import {CalendarModule} from 'primeng/calendar';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [ThongtinsanphamComponent,ThemmoiSanPhamComponent, ThemSoLuongComponent,BaoCaoTonKhoComponent],
  imports: [
    CommonModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    FormsModule,
    DropdownModule,
    MultiSelectModule,
    TooltipModule,
    CalendarModule,
    ThongtinsanphamCLBRoutingModule,
    CKEditorModule
  ],
  entryComponents:[ThemmoiSanPhamComponent, ThemSoLuongComponent,BaoCaoTonKhoComponent]
})
export class ThongtinsanphamCLBModule { }
