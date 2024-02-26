
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'primeng/dynamicdialog';
import { QuanLyLichSuCanDoService } from '../service/quanlylichsucando.service';
import $ from "jquery";

import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
  selector: 'app-them-moi-lich-su-can-do',
  templateUrl: './them-moi-lich-su-can-do.component.html',
  providers: [DialogService]
})

export class ThemMoiLichSuCanDoComponent implements OnInit, OnDestroy {
  @Input() OBJ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  // NguonTin: string = '';
  Title: string = 'Import lịch sử cân đo';
  HoVaTen: string = '';
  SoDienThoai: string = '';
  Email: string = '';
  fileimport: string = '';
  tinhtrang: number = 0;
  HienThi: boolean = false;
  MatKhau: string = '';
  NhapLaiMatKhau: string = '';
  NoiDung: string = '';
  imageSrc: string = '';
  imageSrc2: string = '';
  AnhDaiDien: string = '';
  AnhBia: string = '';
  NgayCapNhat: any = '';
  TuKhoa: any = "";
  password: boolean = true;
  showImg: boolean = false;
  showImg2: boolean = false;
  loading = false;
  file: any = null;
  file2: any = null;
  ckeConfig: any;
  mycontent: string;
  dataupload: any = {};
  datasave: any = {};
  dataluu: any = {};

  constructor(public activeModal: NgbActiveModal, private tintucservice: QuanLyLichSuCanDoService) {

  }
  ngOnDestroy() {
  }

  ngOnInit() {


  };

  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
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
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  // readURL(event:any) {
  //   let namefile = event.target.files[0].name;
  //   let typefile = namefile.split('.').pop();
  //   if(typefile.toUpperCase()!='XLS'&&typefile.toUpperCase()!='XLSX'){
  //     alert('File không hỗ trợ');return;
  //   }
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.onload = (event:any) => {
  //      this.imageSrc = event.target.result;
  //     }

  //     reader.readAsDataURL(event.target.files[0]);
  //     this.showImg = true;
  //     this.file = event.target.files[0];  
  //     this.AnhDaiDien = '1';   
  //   }
  // }


  async DownLoad() {
    window.open('/upload/importloi/Fileimport.xlsx', "_blank");
  }


  async Save() {

    
    if (this.fileimport == '') {alert('Chưa chọn file import'); return;}

    if (this.fileExtension.toUpperCase() != "XLSX") {
      alert("File không đúng định dạng!"); return;
    }
    // this.activeModal.close();
    this.loading = true;

    var fd = new FormData();
    fd.append('file', this.file );
    let data1 = await this.tintucservice.upload(fd);

    this.datasave = data1;
    
    if(this.datasave.errorcode == 0)
    {
      let data = await this.tintucservice.saveData( this.datasave.data );
      this.dataluu = data ;
      console.log(data);
      if(this.dataluu.errorcode == 0)
      {
        alert(this.dataluu.message)
        this.loading = false;
        this.activeModal.close();
      } else if (this.dataluu.errorcode == -1){
        window.open(this.dataluu.file, "_blank");
        alert(this.dataluu.message)
       
      }
      else{
        this.loading = false;
        alert(this.dataluu.message)
      }
      
    }

  }



}
