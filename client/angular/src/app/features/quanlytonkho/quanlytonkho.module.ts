import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyTonKhoRoutingModule } from './quanlytonkho-routing.module';
import { QuanLyTonKhoComponent } from './quanlytonkho.component';
import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button';
import {ThemmoiTonKhoComponent} from './child-component/themmoi.component';
import {FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  declarations: [QuanLyTonKhoComponent,ThemmoiTonKhoComponent],
  imports: [
    CommonModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    FormsModule,
    DropdownModule,
    MultiSelectModule,
    QuanLyTonKhoRoutingModule,
    CKEditorModule
  ],
  entryComponents:[ThemmoiTonKhoComponent]
})
export class QuanLyTonKhoModule { }
