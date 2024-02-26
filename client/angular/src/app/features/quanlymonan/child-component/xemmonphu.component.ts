import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyMonAnService } from '../service/quanlymonan.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ThemmoiMonAnComponent } from './themmoi.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-xemmonphu',
  templateUrl: './xemmonphu.component.html',
  providers: [MessageService]
})

export class XemMonPhuComponent implements OnInit {
  @ViewChild('dt') table: Table;
  monans: any = [];
  show: boolean = true;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  constructor(public activeModal: NgbActiveModal, private monanervice: QuanLyMonAnService, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.GetMonAnPhu();

  }
  async GetMonAnPhu() {
    this.monans = await this.monanervice.GetMonAnPhu();
  }
  Sua(monan) {
    var title = 'Sửa thông tin món ăn phụ';
    this.show = false;
    const modalRe = this.modalService.open(ThemmoiMonAnComponent, { size: 'lg', backdrop: 'static' });

    var data = { title: title, monan: monan };
    modalRe.componentInstance.data = data;
    modalRe.componentInstance.CallBack.subscribe(data => {
      if (data) {
        this.GetMonAnPhu();
      }
      this.show = true;
    });
  }
  async Xoa(monan) {
    var r = confirm("Bạn có chắc muốn xóa món ăn này không ?");
    if (r == true) {
      let data = await this.monanervice.Xoa(monan);
      alert(data['message']);
      if (data['errorcode'] == 0) {
        this.GetMonAnPhu();
      }
    }
  }
  async Chuyen(monan) {
    var r = confirm("Bạn có chắc muốn chuyển món ăn này sang danh sách món ăn chính không ?");
    if (r == true) {
      let data = await this.monanervice.Chuyen(monan);
      alert(data['message']);
      if (data['errorcode'] == 0) {
        this.GetMonAnPhu();
        this.CallBack.emit(true);
      }
    }
  }


}
