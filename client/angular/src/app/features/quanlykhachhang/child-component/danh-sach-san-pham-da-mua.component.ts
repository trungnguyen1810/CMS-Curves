import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyKhacHangcService } from '../service/quanlykhachhang.service';
import { MessageService } from 'primeng/api';
import {convertDateObjToYMD} from './../../../core/utils/common-functions';
import { AppSettings } from '../../../core/constants/Const';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-themmoisanphammuadamua',
  templateUrl: './danh-sach-san-pham-da-mua.component.html',
  providers: [MessageService]
})

export class DanhSachSanPhamDaMuaComponent implements OnInit {

  @Input() KhachHangId :any ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();


  sanphams: any = [];
  sanpham:any;
  constructor(public activeModal: NgbActiveModal, private service: QuanLyKhacHangcService, private messageService: MessageService,private http:HttpClient) {

   }
  ngOnInit() {
    this.GetDanhSachSanPhamDaMua();

  }

  async GetDanhSachSanPhamDaMua(){
    let body = {
      Id: this.KhachHangId
    }
    this.service.DanhSachSanPhamDaMua(body).then((data) => {
      this.sanpham = data;
      this.sanphams= this.sanpham.data;
    });
  }


}
