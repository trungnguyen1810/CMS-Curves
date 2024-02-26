import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DanhMucSanPhamService} from '../service/danhmucsanpham.service';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-themmoidanhmucsanpham',
  templateUrl: './themmoi.component.html',
  providers:[MessageService]
})

export class ThemmoiDanhMucSanPhamComponent implements OnInit {
  @Input() data;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  TenDanhMuc:string='';
  isChecked:boolean=true;
  imageSrc: string='';
  AnhDaiDien:string='';
  showImg:boolean=false;
  file:any=null;
  dataupload:any={};

  constructor( public activeModal: NgbActiveModal,private danhmucsanphamservice :DanhMucSanPhamService,private messageService: MessageService) { }
  ngOnInit(): void {
    if(this.data.danhmuc.Id !=0){
      this.bindDataEdit();
    }
   }

  CheckTinhTrang(event) {
    this.isChecked= event.target.checked;   
  }
  async saveData(){
    if(!this.TenDanhMuc){
      alert('Tên danh mục bắt buộc nhập');return;
    }  
    if(!this.AnhDaiDien){
      alert('Ảnh đại diện bắt buộc chọn');return;
    } 
    let body = {
      Id:this.data.danhmuc.Id,
      TenDanhMuc:this.TenDanhMuc,
      TinhTrang:this.isChecked?1:0,
      AnhDaiDien:this.AnhDaiDien
    }
    this.activeModal.close();
    if(this.file!=null){
      this.PostImage(body);
    }else{
      this.SaveBody(body);
    }    
  }

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
      this.showImg = true;
      this.file = event.target.files[0];  
      this.AnhDaiDien = '1';   
    }
  }
  
  async SaveBody(body){
    let data = await this.danhmucsanphamservice.saveData(body);
    if(data['errorcode']==0){
      this.CallBack.emit(true);
      this.activeModal.close();
      alert(data['message']);
    }  else{
      alert(data['message']); return;
    }  
  }
  async PostImage(body){   
    var data = new FormData(); data.append('file', this.file);
    
    this.dataupload = await this.danhmucsanphamservice.upload(data);
    if (this.dataupload.errorcode == 0){
         body.AnhDaiDien = '/upload/' + this.dataupload.data.filename;
         this.SaveBody(body);
    } else {
      alert ('Upload ảnh lỗi');return;
    }  
}
bindDataEdit(){
  this.TenDanhMuc = this.data.danhmuc.TenDanhMuc;
  this.AnhDaiDien = this.data.danhmuc.AnhDaiDien;
  this.imageSrc = this.AnhDaiDien;
  this.showImg = true;
  this.isChecked = this.data.danhmuc.TinhTrang==1?true:false;
}
 
}
