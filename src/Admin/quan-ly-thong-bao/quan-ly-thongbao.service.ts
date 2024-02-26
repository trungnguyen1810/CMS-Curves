import { Injectable } from '@nestjs/common';
import { CoreService } from '../../baseservice/core.service';
import {AppConfig} from './../../app.config';
@Injectable()
export class QuanLyThongBaoService extends CoreService {
    GetALL() {
        return this.QueryDB('Call QuanLyThongBao_GetAll();');
      }
      Them_Sua(Id, TieuDe,TomTat, NoiDung,Type, IdThongBao, UserId) {
        return this.QueryDB(`Call QuanLyThongBao_Them_Sua(${Id},'${TieuDe}','${TomTat}','${NoiDung}',${Type},${IdThongBao},${UserId});`);
      }

      Xoa(Id){
        return this.QueryDB(`DELETE FROM thongbao WHERE Id = ${Id};`);
      }  
      SendNotification(Id){
        return this.QueryDB(`update thongbao set TinhTrang = 1,NgayGuiThongBao = now() where Id = ${Id};`);
      }
      PushFirebase(title,body,data){
        return new Promise(resolve=>{
          var FCM = require('fcm-node');
          var fcm = new FCM(AppConfig.Server_Key_Token);
          var message = { 
              to: AppConfig.Topic,             
              notification: {
                  title: title, 
                  body: body,
				          sound: "default"
              },            
              data: data
          };
          fcm.send(message, function(err, response){
              if (err) {
                  console.log(err);
                  resolve ({Error:1,Message:'Có lỗi xảy ra: '+ err.toString()});
              } else {
                  console.log(response);
                  resolve ({Error:0,Message:'Gửi thành công'});
              }
          });
        })
        
    }

    BaiViet(Type) {
      return this.QueryDB(`Call DanhSachTinThongBao(${Type});`);
    }
}
