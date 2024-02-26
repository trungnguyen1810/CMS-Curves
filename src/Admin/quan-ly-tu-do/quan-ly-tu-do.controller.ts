import { Controller, Post, Get, Request, Body, Delete,Param } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import {QuanLyTuDoService} from './quan-ly-tu-do.service'
@Controller('admin/quanlytudo')
export class QuanLyTuDoController {
    private response: CoreResponse;
    constructor(private readonly quanlytudo: QuanLyTuDoService) {
        this.response = {};
    }

    @Get('getall')
    async FindAll(@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.quanlytudo.GetALL(UserId);
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
    // @Get('getcaulacbo')
    // async GetTinhThanh(){

    //     try {
    //         let data= await this.quanlytudo.GetCauLacBo();
    //         this.response.errorcode=0;
    //         this.response.message='thành công',
    //         this.response.data={data:data[0]};
    //         return this.response;
    //     } catch (error) {
    //         this.response.errorcode=1;
    //         this.response.message='có lỗi xảy ra :'+error.toString(),
    //         this.response.data={};
    //         return this.response;
    //     }     
    // }
    @Post('Add_Edit')
    async Edit(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.quanlytudo.Add_Edit(body.Id,body.TenCauHinh,UserId, body.GiaThueTheoNgay, body.TuNgay,body.DenNgay);
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

    @Post('xoacauhinh')
    async deleteColor(@Body() body) {
        try {
            let data = await this.quanlytudo.Xoa(body.Id);
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
