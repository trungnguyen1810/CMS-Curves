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

@NgModule({
  declarations: [ThongtinsanphamComponent,ThemmoiSanPhamComponent, ThemSoLuongComponent],
  imports: [
    CommonModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    FormsModule,
    DropdownModule,
    MultiSelectModule,

    ThongtinsanphamCLBRoutingModule,
    CKEditorModule
  ],
  entryComponents:[ThemmoiSanPhamComponent, ThemSoLuongComponent]
})
export class ThongtinsanphamCLBModule { }
