
import { Component, Input, Output, EventEmitter, OnInit, ViewChild,OnDestroy  } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {CamNangDinhDuongService} from '../service/camnangdinhduong.service';
import $ from "jquery";


@Component({
  selector: 'app-them-moi-cam-nang-dinh-duong',
  templateUrl: './them-moi-cam-nang-dinh-duong.component.html',
  providers: [DialogService]  
})

export class ThemMoiCamNangDinhDuongComponent implements OnInit,OnDestroy  {
  @Input() OBJ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  // NguonTin: string = '';
  Title: string = 'Sửa tin tức';
  TenCamNang: string = '';
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
  
  constructor(public activeModal: NgbActiveModal,private camnangservice :CamNangDinhDuongService) { 
    
  }
  ngOnDestroy() {
  }

   ngOnInit() {
  this.Title = this.OBJ.Title;
    this.TenCamNang = this.OBJ.TenCamNang;
    this.AnhDaiDien = this.OBJ.AnhDaiDien;
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
    if(!this.TenCamNang){
      alert('Tiêu đề bắt buộc nhập');return;
    }

    if(!this.AnhDaiDien){
      alert('Ảnh đại diện bắt buộc chọn');return;
    }  

    if(!this.NoiDung.trim()){
      alert('Nội dung bắt buộc nhập');return;
    }  
   

   
  
    
    let body = {
      Id: this.OBJ.Id,
      TenCamNang: this.TenCamNang.trim(),
      TinhTrang: this.HienThi?1:0,
      NoiDung:this.NoiDung,
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
      let data = await this.camnangservice.saveData(body);
      this.loading=false;
      this.datasave = data;
      console.log(data)
       if (this.datasave.errorcode == 0) {
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
      // this.http.post('/api/upload/uploadImage', data).subscribe(d => {
      // let result = d.json();
      //   if(result.ErrorCode==0){
      //     body.AnhDaiDien = result.Link;
      //     this.SaveBody(body);
      //   }
      // })
      let data1 = await this.camnangservice.upload(data);
      this.dataupload = data1;
      if (this.dataupload.errorcode == 0){
           body.AnhDaiDien = '/upload/' + this.dataupload.data.filename;
           this.SaveBody(body);
      } else {
        alert ('Upload ảnh lỗi');
      }
    
  }


  
}
