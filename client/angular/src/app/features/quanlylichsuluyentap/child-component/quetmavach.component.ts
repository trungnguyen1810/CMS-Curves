import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyLichSuService } from '../service/lichsu.service';
import { MessageService } from 'primeng/api';
import { convertDateObjToDMY } from './../../../core/utils/common-functions';
import * as $ from 'jquery';
@Component({
  selector: 'app-quetmavach',
  templateUrl: './quetmavach.component.html',
  providers: [MessageService]
})

export class QuetMaVachComponent implements OnInit {

  @Input() data;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  MaVach : string ='';
  ThongBao:string = '';
  NgayTap: any = new Date();
  hoivien :any = {};
  showhoivien :boolean = false;
  constructor(public activeModal: NgbActiveModal, private service: QuanLyLichSuService, private messageService: MessageService) { }
  ngOnInit(): void {
    setTimeout(() => {
     $('.quetmavach').focus();
    }, 100);
    this.MaVach = '';

  }
  async saveData() {
    if(this.showhoivien){
      let body = { KhachHangId: this.hoivien.Id, NgayTap: convertDateObjToDMY(this.NgayTap) }
      let data = await this.service.saveData(body);
      let message = "Thêm mới lịch sử luyện tập thành công";
      if (data['errorcode'] == 0) {

        this.CallBack.emit(true);
        this.showhoivien = false;
        this.MaVach = '';
        this.hoivien = {};
        //this.activeModal.close();
      } else {
        alert(data['message']);
      }
    }else{
      alert('Không có thông tin hội viên tại câu lạc bộ');return;
    }

  }

  onDetected(event) {
    this.MaVach = '';
    this.MaVach = event.value;
    if(this.MaVach){
      this.getThongTinHoiVien(this.MaVach);
    }
    ;
    /* {event: KeyboardEvent, value: "sezmars", time: 0.07083499999716878, type: "scanner"} */
    /* {event: KeyboardEvent, value: "3333333", time: 0.17083499999716878, type: "keyboard"} */
  }

   onDelete(event) {
    console.log(event);
    /* {event: KeyboardEvent, value: "3333333", type: "delete"} */
  }



  async getThongTinHoiVien(MaVach) {
    this.ThongBao = '';
    let data = await this.service.QuetMaVach(MaVach);
    if(data['data'].length>0){
      this.showhoivien = true;
        this.hoivien = data['data'][0];
        setTimeout(() => {
          this.saveData();
          this.MaVach = '';
        }, 700);
    }else{
      this.MaVach = '';
      this.showhoivien = false;
      this.ThongBao = `Không có thông tin hội viên hoặc hội viên đang trong quá trình bảo lưu tương ứng với mã vạch : ${MaVach}  ở câu lạc bộ này.`
    }

  }
}
