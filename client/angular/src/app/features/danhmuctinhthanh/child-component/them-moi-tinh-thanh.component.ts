
import { Component, Input, Output, EventEmitter, OnInit, ViewChild,OnDestroy  } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {DanhMucDiaBanService} from '../service/danhmucdiaban.service';
import $ from "jquery";


@Component({
  selector: 'app-them-moi-tinh-thanh',
  templateUrl: './them-moi-tinh-thanh.component.html',
  providers: [DialogService]  
})

export class ThemMoiTinhThanhComponent implements OnInit,OnDestroy  {
  @Input() OBJ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  // NguonTin: string = '';
  Title: string = '';
  TenDiaBan: string = '';
  tintuc:number = 0;
  HienThi:boolean=false;
  TomTat:string='';
  NoiDung:string='';
  imageSrc: string='';
  AnhDaiDien:string='';
  NgayCapNhat:any='';
  TuKhoa:any="";
  showImg:boolean=false;
  loading =false;
  file:any=null;
  ckeConfig: any;
  mycontent: string;
  dataupload:any={};
  datasave:any={};
  
  constructor(public activeModal: NgbActiveModal,private tintucservice :DanhMucDiaBanService) { 
    
  }
  ngOnDestroy() {
  }

   ngOnInit() {
  this.Title = this.OBJ.Title;
    this.tintuc=this.OBJ.tintuc;
    this.TenDiaBan = this.OBJ.TenDiaBan;
    this.AnhDaiDien = this.OBJ.AnhDaiDien;
    this.TomTat=this.OBJ.TomTat;
    this.NoiDung = this.OBJ.NoiDung;
    this.HienThi = this.OBJ.TinhTrang?true:false;
    this.imageSrc = this.OBJ.AnhDaiDien;
    if(this.OBJ.AnhDaiDien!='' &&this.OBJ.AnhDaiDien!=null){
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
    if(!this.TenDiaBan){
      alert('Tên địa bàn bắt buộc nhập');return;
    }
   
    if(!this.AnhDaiDien){
      alert('Ảnh đại diện bắt buộc chọn');return;
    }     

   
  
    
    let body = {
      Id: this.OBJ.Id,
      TenDiaBan: this.TenDiaBan.trim(),
      TinhTrang: this.HienThi?1:0,
      AnhDaiDien:this.AnhDaiDien
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
      let data = await this.tintucservice.saveData(body);
      this.loading=false;
      this.datasave = data;
      // console.log(data)
       if (this.datasave.errorcode == 0) {
         console.log(this.OBJ);
         if(this.OBJ.Id == 0){
          alert('Thêm mới thành công')
         }else{
          alert('Sửa thành công')
         }
        
        this.CallBack.emit(true);
        this.activeModal.close();
       } else {
        if(this.OBJ.Id == 0){
          alert('Thêm mới lỗi')
         }else{
          alert('Sửa lỗi')
         }
        return;

      }
  }

  async PostImage(body){   
      var data = new FormData(); data.append('file', this.file);
      let data1 = await this.tintucservice.upload(data);
      this.dataupload = data1;
      if (this.dataupload.errorcode == 0){
           body.AnhDaiDien = '/upload/' + this.dataupload.data.filename;
           this.SaveBody(body);
      } else {
        alert ('Upload ảnh lỗi');
      }
    
  }


  
}
