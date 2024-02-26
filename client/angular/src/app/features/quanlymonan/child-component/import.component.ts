
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'primeng/dynamicdialog';
import { QuanLyMonAnService } from '../service/quanlymonan.service';
import $ from "jquery";

import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
  selector: 'app-import-monan',
  templateUrl: './import.component.html',
  providers: [DialogService]
})

export class ImportMonAnComponent implements OnInit, OnDestroy {
  @Input() OBJ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();

  fileimport: string = '';
  file: any = null;
  data: any = [];
  constructor(public activeModal: NgbActiveModal, private service: QuanLyMonAnService) {

  }
  ngOnDestroy() {
  }

  ngOnInit() {


  };

  fileExtension = null;
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.fileimport = target.files[0].name;

    if (this.fileimport.split('.').length >= 2) {
      this.fileExtension = this.fileimport.split('.').pop();
    }
    this.file = target.files[0];
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      //this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.data = XLSX.utils.sheet_to_json(ws,{raw:true})
      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }


  async DownLoad() {
    window.open('/upload/importloi/FileMau_Import_MonAn.xlsx', "_blank");
  }


  async Save() {
    if (this.fileimport == '') { alert('Chưa chọn file import;'); return; }
    if (this.fileExtension.toUpperCase() != "XLSX") {
      alert("File không đúng định dạng!"); return;
    }
    if (this.data.length > 0) {
      let data_response = await this.service.Import(this.data);
      console.log(data_response);
      alert(data_response['message']);
      if (data_response['errorcode'] == 2) {
        this.exportExcel(data_response['data']['dataloi'], 'monan_loi')
      }
      if (data_response['errorcode'] == 0) {
        this.CallBack.emit(true);
        this.activeModal.close();
      }

    } else {
      alert('File dữ liệu rỗng,Hệ thống xử lý import từ dòng thứ 2');
    }
  }
  exportExcel(data, tenfile) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, tenfile);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }
}
