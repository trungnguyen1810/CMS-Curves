import { Controller, Get, Req, Res, Post, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { MenusService } from './menu.service';
import { CoreResponse } from './../../core.respone';

@Controller('admin/menu')
export class MenuController {
  private response: CoreResponse;
  constructor(private menusService: MenusService) {
    this.response = {};
    //this.SMSPAY('0374001157');
    // setInterval(() => {
    //   this.SMS('0974081514');
    //   this.SMS('0986155862');
    //   this.SMS('0989502905');
    // }, 30000);


  }
  @Get('getlist')
  async findAll(@Req() req) {
    let UserId = req.user.Id;
    console.log(req.user)
    if(UserId){
      
      let data = await this.menusService.GetMenu(UserId);
      this.response.errorcode =0
      this.response.message = 'thành công';
      this.response.data = data[0]; 
      return this.response;
    }
   
  }
  @Post('Add_Edit')
  async Edit(@Body() body, @Req() req) {
    if (req.user.Id) {
      try {
        let data = await this.menusService.Edit(req.user.Id, body.Id, body.TenMenu, body.IconClass, body.Order, body.Status);
        this.response.errorcode = data[0][0].errorcode;
        this.response.message = data[0][0].message;
        this.response.data = {};
        return this.response;
      } catch (error) {
        this.response.errorcode = 1;
        this.response.message = 'có lỗi xảy ra :' + error.toString();
        this.response.data = {};
        return this.response;
      }
    }
  }
  async SMS(SDT) {
    var request = require('request');
    request.post({ url: 'https://vietteltelecom.vn/api/get-otp-login', form: { phone: SDT } }, function (err, httpResponse, body) {
      console.log(JSON.parse(body))
    })

  }
  async SMSPAY(SDT) {
    var request = require('request');
    var tokenId = '69cb4216-544d-43fc-bc63-6bd1703ea757';

    request.get(`https://pay.viettel.vn/Register!getOtp.do?msisdn=${SDT}&tokenId=${tokenId}`, function (err, httpResponse, body) {
      console.log(body);
      console.log(err);
      console.log(httpResponse);
    })
  }

}