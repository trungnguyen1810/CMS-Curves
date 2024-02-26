import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar'
import { QuanlynhomquyenRoutingModule } from './quanlynhomquyen-routing.module';
import { QuanlynhomquyenComponent } from './quanlynhomquyen.component';
import {ThemmoinhomquyenComponent} from './child-component/themmoinhomquyen.component';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [QuanlynhomquyenComponent,ThemmoinhomquyenComponent],
  imports: [
    CommonModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    CheckboxModule,
    FormsModule,
    ToastModule,
    QuanlynhomquyenRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[ThemmoinhomquyenComponent]
})
export class QuanlynhomquyenModule { }
