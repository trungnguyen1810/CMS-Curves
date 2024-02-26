import { Controller, Get, Param, Post, Body, Put, Request, UseInterceptors,UploadedFile, Delete  } from '@nestjs/common';

import {NotifiService} from './service';
import {AppConfig} from './../app.config';
@Controller('jobtudong')
export class JobNotification {

  constructor(private service : NotifiService) {
   this.SendNotiNhacLichAn();
   this.SendNotiHetHanGoi();
  }
  async SendNotiHetHanGoi(){
    // lấy danh sách hội viên hết hạn gói tập,gửi thông báo hết hạn
    //24 tiếng chạy 1 lần
    var Server_Key = AppConfig.Server_Key_Token;
    var FCM = require('fcm-node'); 
    var fcm = new FCM(Server_Key);
    var time  =24*60*60*1000;
    setInterval(async () => {
      try {
        let data = await this.service.GetDanhSachHetHanGoiTap();
        for(let i=0;i<data[0].length;i++){
          let token = data[0][i].Tokenfirebase;
          var message = { 
                to: token,
                notification: {
                    title: "Curves: Bạn đã hết hạn gói tập !", 
                    body: "Đến thời điểm gia hạn gói tập,vui lòng kiểm tra lại thông tin",
                    sound: "default"
                },        
                data: {  
                    Type:"HetHanGoiTap"
                }
            }
            fcm.send(message, function(err, response){
                if (err) {
                    console.log("Loi gui thong bao!");
                    console.log(err);
                } else {
                    console.log("Gui thong bao thanh cong: ", response);
                }
            });
        }
      } catch (error) {
        console.log(error)
      }     
    }, time);
 
  }
  // 1 phút chạy 1 lần
  async SendNotiNhacLichAn(){
    var Server_Key = AppConfig.Server_Key_Token;
    var FCM = require('fcm-node'); 
    var fcm = new FCM(Server_Key);
    setInterval(async () => {
      try {
        let data = await this.service.GetDanhSachNhacNho();
        for(let i=0;i<data[0].length;i++){
          let token = data[0][i].Tokenfirebase;
          var message = { 
                to: token,
                notification: {
                    title: "Curves: Bạn có lịch nhắc nhở vào bây giờ !", 
                    body: "Đến thời điểm thực hiện chế độ, vui lòng kiểm tra",
                    sound: "default"
                },        
                data: {  
                    Type:"NhacNhoBuaAn"
                }
            }
            fcm.send(message, function(err, response){
                if (err) {
                    console.log("Loi gui thong bao!");
                    console.log(err);
                } else {
                    console.log("Gui thong bao thanh cong: ", response);
                }
            });
        }
      } catch (error) {
        console.log(error)
      }
      

    }, 60*1000);
  }

}