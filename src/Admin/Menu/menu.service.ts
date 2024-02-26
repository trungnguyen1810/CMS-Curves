import { Injectable } from '@nestjs/common';
import { Menu } from './menu.interface';
import {CoreService} from './../../baseservice/core.service';
@Injectable()
export class MenusService extends CoreService{
  private readonly menus: Menu[] = [];

  GetMenu(UserId){
    return this.QueryDB(`call QuanLyMenu_GetAll(${UserId});`)
  }
  Edit(UserId,Id,Name,Icon,Order,Status){
    return this.QueryDB(`call QuanLyMenu_Edit(${UserId},${Id},'${Name}','${Icon}',${Order},${Status});`)
  }
}