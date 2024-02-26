

import { Component, OnInit, ViewChild } from '@angular/core';
import { QuanLyMenuService } from './service/quanlymenu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-quanlymenu',
  templateUrl: './quanlymenu.component.html',
})
export class QuanlymenuComponent implements OnInit {
  datas: any = [];
  statuses: any[];
  @ViewChild('dt') table: Table;
  clonedProducts: { [s: string]: any; } = {};
  constructor(private readonly service: QuanLyMenuService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.GetAll();
  }
  async GetAll() {
    this.datas = await this.service.GetAll();
  }
  onRowEditInit(product) {
    this.clonedProducts[product.id] = { ...product };
  }
  async onRowEditSave(product) {
    let body = {
      Id: product.Id,
      TenMenu: product.Name,
      IconClass: product.IconClass,
      Order: product.Order,
      Status: product.Status
    }
    let data = await this.service.saveData(body);
    alert(data['message']);
    this.GetAll();
    delete this.clonedProducts[product.id];

  }

  onRowEditCancel(product, index) {
    delete this.clonedProducts[product.id];
  }

}

