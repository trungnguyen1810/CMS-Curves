import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyKhacHangcService } from '../service/quanlykhachhang.service';
import { MessageService } from 'primeng/api';
import {convertDateObjToYMD} from './../../../core/utils/common-functions';
import { AppSettings } from '../../../core/constants/Const';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {SuaHoaDonComponent} from './sua-hoa-don.component';

@Component({
  selector: 'app-chitiethoadon',
  templateUrl: './danh-sach-hoa-don.component.html',
  providers: [MessageService]
})

export class DanhSachHoaDonComponent implements OnInit {

  @Input() OBJ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();


  sanphams: any = [];
  sanpham:any;
  dataxoa:any={};
  constructor(public activeModal: NgbActiveModal, private service: QuanLyKhacHangcService, private messageService: MessageService,private http:HttpClient, private modalService: NgbModal) {

   }
  ngOnInit() {
    this.GetDanhSachHoaDon(this.OBJ.KhachHangId, this.OBJ.Id);

  }

  async GetDanhSachHoaDon(Id, IdHoaDon){
    var item = {
      Id: Id,
      KhachHangGoiTapId: IdHoaDon
    }
    let data = await this.service.DanhSachThanhToanTheoDot_KhachHang(item).then((data) => {
      console.log(data);
      this.sanpham = data;
      this.sanphams= this.sanpham.data[0];
    });
  }

  SuaHoaDonGoiTap(thongtin){
    const modalRef = this.modalService.open(SuaHoaDonComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    thongtin.KhachHangId = this.OBJ.KhachHangId;
    modalRef.componentInstance.OBJ = thongtin;
    modalRef.componentInstance.CallBack.subscribe(data =>
      {this.GetDanhSachHoaDon(this.OBJ.KhachHangId, this.OBJ.Id);
      }
     );
  }

  async delete(khachhang){
    var r = confirm("Bạn có chắc muốn xóa thanh toán này không ?");
    if (r == true) {
      var item = {
        Id: khachhang.Id,
        KhachHangId: this.OBJ.KhachHangId
      }
      let data =  await this.service.XoaThanhToanGoiTap(item);
      this.dataxoa = data;
      console.log(data)
       if (this.dataxoa.errorcode == 0) {
         
          alert('Xóa thành công')
          this.GetDanhSachHoaDon(this.OBJ.KhachHangId, this.OBJ.Id);
       } else {
          alert(this.dataxoa.message)
        
        return;
    
      }
    }
  
  }
  DongLai(){
    this.CallBack.emit(true);
    this.activeModal.close();
  }


}
