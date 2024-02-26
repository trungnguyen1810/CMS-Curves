import { Injectable } from '@nestjs/common';
import { CoreService } from '../../baseservice/core.service';
import {AppConfig} from './../../app.config';
@Injectable()
export class QuanLyThuocTinhService extends CoreService {
      FindColorAll() {
        return this.QueryDB('Call QuanLyColor_GetAll();');
      }
      FindSizeAll(){
        return this.QueryDB('Call QuanLySize_GetAll();');
      }
      FindChatLieuAll(){
        return this.QueryDB('Call QuanLyCHatLieu_GetAll();');
      }
      Them_SuaColor(Id, TenMau, MaMau) {
        return this.QueryDB(`Call QuanLyColor_Add_Edit(${Id},'${TenMau}','${MaMau}');`);
      }

      deleteColor(Id){
        return this.QueryDB(`Call QuanLyColor_Delete(${Id});`);
      }  
      deleteSize(Id){
        return this.QueryDB(`Call QuanLySize_Delete(${Id});`);
      } 
      deleteChatLieu(Id){
        return this.QueryDB(`Call QuanLyChatLieu_Delete(${Id});`);
      } 
      Them_SuaChatLieu(Id, Ten) {
        return this.QueryDB(`Call QuanLyChatLieu_Add_Edit(${Id},'${Ten}');`);
      }
      Them_SuaSize(Id, Ten) {
        return this.QueryDB(`Call QuanLySize_Add_Edit(${Id},'${Ten}');`);
      }
      
      
}
