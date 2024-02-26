import { Controller, Get, Param, Post, Body, Put, Request, UseInterceptors,UploadedFile, Delete   } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import * as jwt from 'jsonwebtoken';
import { AppConfig } from './../../app.config';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { CauHinhLienHeService } from './cau-hinh-lien-he.service';

@Controller('admin/cauhinh')
export class CauHinhLienHeController {
    private response: CoreResponse;
    constructor(private readonly cauhinhLienHeService: CauHinhLienHeService) {
        this.response = {};
    }
    @Get('getall')
    async FindAll(){

        try {
            let data= await this.cauhinhLienHeService.GetCauHinh();
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data={data:data[0]};
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }     
    }

    @Post('Add_Edit')
    async Edit(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.cauhinhLienHeService.SuaCauHinh(body.SoDienThoai,body.SoDienThoaiZalo,body.Idmessenger,body.IdTiktok,body.IdZalo,body.IdFacebook, body.IdYoutube,UserId);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data={};
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }
}
