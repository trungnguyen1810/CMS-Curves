
import { Controller, Get, Post, Put, Delete, Body, Param, Request, Response, Headers, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import { ApiMobileService } from './api-mobile.service';
import { AppConfig } from './../../app.config';
@Controller('mobile')
export class ApiChatController {
    private response: CoreResponse;
    constructor(private readonly apiService: ApiMobileService) {
        this.response = {};
    }
    @Post('noauth/pushchat')
    async PushChat(@Body() body) {

    }
    async PushNotification(@Body() body){
        //type :=1 : tin tức, 2 : khuyến mãi, 3 : hết hạn đăng ký gói, 4 : Ngày lễ, 5 : chúc mừng sn,6 : theo danh sách
        
    }
    async PushFirebase(title,body,data){
        var FCM = require('fcm-node');
        var fcm = new FCM(AppConfig.Server_Key_Token);
        var message = { 
            to: AppConfig.Topic,             
            notification: {
                title: title, 
                body: body 
            },            
            data: data
        };
        return fcm.send(message, function(err, response){
            if (err) {
                console.log(err);
                return {Error:1,Message:'Có lỗi xảy ra: '+ err.toString()};
            } else {
                console.log(response);
                return {Error:0,Message:'Gửi thành công'};
            }
        });
    }
}
