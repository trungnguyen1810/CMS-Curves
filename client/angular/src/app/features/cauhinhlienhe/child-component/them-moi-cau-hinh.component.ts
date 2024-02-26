
import { Component, Input, Output, EventEmitter, OnInit, ViewChild,OnDestroy  } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {CauHinhLienHeService} from '../service/cauhinhlienhe.service';
import $ from "jquery";


@Component({
  selector: 'app-them-moi-cau-hinh',
  templateUrl: './them-moi-cau-hinh.component.html',
  providers: [DialogService]  
})

export class ThemMoiCauHinhComponent implements OnInit,OnDestroy  {
  @Input() OBJ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  // NguonTin: string = '';
  Title: string = 'Sửa cấu hình';
  SoDienThoai: string = '';
  SoDienThoaiZalo:string='';
  Idmessenger:string='';
  IdTiktok: string='';
  IdZalo:string='';
  IdFacebook:any='';
  IdYoutube:any='';
  TuKhoa:any="";
  showImg:boolean=false;
  loading =false;
  file:any=null;
  ckeConfig: any;
  mycontent: string;
  dataupload:any={};
  datasave:any={};
  
  constructor(public activeModal: NgbActiveModal,private tintucservice :CauHinhLienHeService) { 
    
  }
  ngOnDestroy() {
  }

   ngOnInit() {
    this.SoDienThoai = this.OBJ.SoDienThoai;
    this.SoDienThoaiZalo=this.OBJ.SoDienThoaiZalo;
    this.Idmessenger=this.OBJ.Idmessenger;
    this.IdTiktok = this.OBJ.IdTiktok;
    this.IdZalo = this.OBJ.IdZalo
    this.IdFacebook = this.OBJ.IdFacebook;
    this.IdYoutube = this.OBJ.IdYoutube;
   
  };



  
 Save() {    
    if(!this.SoDienThoai){
      alert('Số điện thoại bắt buộc nhập');return;
    }
   
    if(!this.SoDienThoaiZalo){
      alert('Số điện thoại zalo bắt buộc nhập');return;
    } 
    
    if(!this.Idmessenger){
      alert('Idmessenger bắt buộc nhập');return;
    }   
    if(!this.IdTiktok){
      alert('IdTiktok bắt buộc nhập');return;
    }   
    if(!this.IdZalo){
      alert('IdZalo bắt buộc nhập');return;
    }   
    if(!this.IdFacebook){
      alert('IdFacebook bắt buộc nhập');return;
    }   
    if(!this.IdYoutube){
      alert('IdYoutube bắt buộc nhập');return;
    } 

    let body = {
      SoDienThoai: this.SoDienThoai.trim(),
      SoDienThoaiZalo: this.SoDienThoaiZalo.trim(),
      Idmessenger: this.Idmessenger.trim(),
      IdTiktok: this.IdTiktok.trim(),
      IdZalo: this.IdZalo.trim(),
      IdFacebook:this.IdFacebook.trim(),
      IdYoutube:this.IdYoutube.trim()
    }   
   
    this.activeModal.close();
    this.loading=true;
 
      this.SaveBody(body);
  }
  async SaveBody(body){
      let data = await this.tintucservice.saveData(body);
      this.loading=false;
      this.datasave = data;
      // console.log(data)
       if (this.datasave.errorcode == 0) {
          alert('Sửa thành công')
        
        this.CallBack.emit(true);
        this.activeModal.close();
       } else {
       
          alert('Sửa lỗi')
         
        return;

      }
  }




  
}
