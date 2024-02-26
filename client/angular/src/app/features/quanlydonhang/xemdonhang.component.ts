import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-xemdonhang',
  templateUrl: './xemdonhang.component.html',
  providers: [MessageService]
})

export class XemDonHangComponent implements OnInit {

  @Input() data;
  TinhTrangDonHang:string = "Chưa xử lý";
  TongTien:number = 0; 
  ThongTinSanPham:string ='';
  @Output('CallBack') CallBack = new EventEmitter<boolean>();



  constructor(public activeModal: NgbActiveModal) { }
  ngOnInit(): void {
   console.log(this.data.donhang);
   if(this.data.donhang.TinhTrangDonHang==2){
    this.TinhTrangDonHang = "Đã xử lý";
   }
  //  {"Colors":[{"MaMau":"#ff6730","TenMau":"Màu đỏ","Id":"1"}],"Sizes":[]}
   this.TongTien = this.data.donhang.SoLuong * this.data.donhang.Gia;
   var a = JSON.parse(this.data.donhang.ThongTinSanPham);
   if(a.Colors!=undefined){
     let color = a.Colors;
     
     let tenmau = [];
     for(let i=0;i<color.length;i++){
      tenmau.push(color[i].TenMau);
     }
     if(tenmau.length>0){
      this.ThongTinSanPham = '- Màu sắc :';
      this.ThongTinSanPham+= tenmau.toString();
     }
     
   }
   if(a.Sizes!=undefined){
    let size = a.Sizes;   
    let tensize  = [];
    for(let i=0;i<size.length;i++){
      tensize.push(size[i].TenSize);
    }
    if(tensize.length>0){
      this.ThongTinSanPham += ' - Size : ';
      this.ThongTinSanPham+= tensize.toString();
    }
  }
    if(a.Materials!=undefined){
      let mate = a.Materials;   
      let ten  = [];
      for(let i=0;i<mate.length;i++){
        ten.push(mate[i].TenChatLieu);
      }
      if(ten.length>0){
        this.ThongTinSanPham += ' - Chất liệu : ';
        this.ThongTinSanPham+= ten.toString();
      }
  }
}
}
