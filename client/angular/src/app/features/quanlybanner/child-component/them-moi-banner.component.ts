
import { Component, Input, Output, EventEmitter, OnInit, ViewChild,OnDestroy  } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {QuanLyBannerService} from '../service/quanlybanner.service';
import $ from "jquery";
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

interface City {
  Id: number;
  TenDiaBan: string;
}
@Component({
  selector: 'app-them-moi-banner',
  templateUrl: './them-moi-banner.component.html',
  providers: [DialogService, MessageService]  
})

export class ThemMoiBannerComponent implements OnInit,OnDestroy  {
  @Input() OBJ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  // NguonTin: string = '';
  Title: string = 'Sửa tin tức';
  TinhTrang: boolean=false;
  HienThi:boolean=false;
  imageSrc: string='';
  AnhDaiDien:string='';
  showImg:boolean=false;
  loading =false;
  file:any=null;
  ckeConfig: any;
  mycontent: string;
  dataupload:any={};
  datasave:any={};
  ThuTuSapXep: number = 1;
  
  
  constructor(public activeModal: NgbActiveModal,private caulacboservice :QuanLyBannerService, private messageService: MessageService, private primengConfig: PrimeNGConfig) { 

  }
  ngOnDestroy() {
  }

   ngOnInit() {
    
    this.primengConfig.ripple = true;
    this.Title = this.OBJ.Title;
    this.AnhDaiDien = this.OBJ.DuongDanAnh;
    this.ThuTuSapXep = this.OBJ.ThuTuSapXep;
    this.HienThi = this.OBJ.TinhTrang?true:false;
    this.imageSrc = this.OBJ.DuongDanAnh;
    if(this.OBJ.DuongDanAnh!='' &&this.OBJ.DuongDanAnh!=null){
      this.showImg = true;
      $('.preview1').addClass('it');
      $('.btn-rmv1').addClass('rmv');
    } 
  };
  
  readURL(event:any) {
    let namefile = event.target.files[0].name;
    let typefile = namefile.split('.').pop();
    if(typefile.toUpperCase()!='JPG'&&typefile.toUpperCase()!='PNG'){
      alert('File không hỗ trợ');return;
    }
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event:any) => {
       this.imageSrc = event.target.result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
      $('.preview1').addClass('it');
      $('.btn-rmv1').addClass('rmv');
      this.showImg = true;
      this.file = event.target.files[0];  
      this.AnhDaiDien = '1';   
    }
  }
  removeImg(event:any){
    $('.preview1').removeClass('it');
    $('.btn-rmv1').removeClass('rmv');
    this.showImg = false;
    this.imageSrc = '';
    this.file = null;
    this.AnhDaiDien='';
  }


  
 Save() {    
    if(!this.AnhDaiDien){
      this.showWarn('Ảnh đại diện bắt buộc chọn'); return;
    }
    
  
    let body = {
      Id: this.OBJ.Id,
      DuongDanAnh: this.AnhDaiDien.trim(),
      TinhTrang: this.HienThi?1:0,
      ThuTuSapXep: this.ThuTuSapXep
    }   
    this.activeModal.close();
    this.loading=true;
    if(this.file!=null){
      this.PostImage(body);
    }else{
      this.SaveBody(body);
    }
  }
  async SaveBody(body){
      let data = await this.caulacboservice.saveData(body);
      this.loading=false;
      this.datasave = data;
      console.log(data)
       if (this.datasave.errorcode == 0) {
         if(this.OBJ.Id == 0){
          alert('Thêm mới thành công');
         }else{
          alert('Sửa thành công');
         }
        
        this.CallBack.emit(true);
        this.activeModal.close();
       } else {
          alert(this.datasave.message);
        return;

      }
  }

  async PostImage(body){   
      var data = new FormData(); data.append('file', this.file);
      let data1 = await this.caulacboservice.upload(data);
      this.dataupload = data1;
      if (this.dataupload.errorcode == 0){
           body.DuongDanAnh = '/upload/' + this.dataupload.data.filename;
           this.SaveBody(body);
      } else {
        alert ('Upload ảnh lỗi');
      }
    
  }

  
showWarn(detail) {
    this.messageService.add({key: 'bc',severity:'warn', summary: 'Lỗi', detail: detail});
}
showInfo(detail) {
  this.messageService.add({key: 'bc',severity:'info', summary: 'Info', detail: detail});
}

onReject() {
  this.messageService.clear('c');
}


  
}
