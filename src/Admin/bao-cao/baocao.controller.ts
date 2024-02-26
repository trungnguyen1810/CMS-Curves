import { Controller, Post, Get, Request, Response, Body, Delete, Param } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import { BaoCaoService } from './baocao.service';

@Controller('admin/baocao')
export class BaoCaoController {
    private response: CoreResponse;
    constructor(private readonly service: BaoCaoService) {
        this.response = {};
    }
    @Get('khachhangdangtap')
    async BaoCaoKhachHangDangTap(@Request() req){

        try {
            //@Body() body
            let userid = req.user.Id;
            let data= await this.service.KhachHangDangTap(userid);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data= data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }     
    }
    @Get('khachhangchuacogoitap')
    async BaoCaoKhachHangChuaCoGoiTap(@Request() req){

        try {
            //@Body() body
            let userid = req.user.Id;
            let data= await this.service.KhachHangChuaCoGoiTap(userid);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data= data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }     
    }
    @Post('khachhanghethan')
    async BaoCaoKhachHangHetHan(@Body() body,@Request() req){

        try {
            //@Body() body
            let userid = req.user.Id;
            let data= await this.service.KhachHangHetHan(userid,body.TuNgay,body.DenNgay);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data= data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }     
    }
    @Post('khachhangmoidangkygoitap')
    async KhachHangMoiDangKyGoiTap(@Body() body,@Request() req){

        try {
            //@Body() body
            let userid = req.user.Id;
            let data= await this.service.KhachHangMoiDangKyGoiTap(userid,body.TuNgay,body.DenNgay);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data= data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }     
    }
    
    @Post('khachhangcolichcando')
    async KhachHangCoLichCanDo(@Body() body,@Request() req){

        try {
            //@Body() body
            let userid = req.user.Id;
            let data= await this.service.KhachHangCoLichCanDo(userid,body.TuNgay,body.DenNgay);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data= data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }     
    }

 @Post('khachhangtrehencando')
    async KhachHangTreHenCanDo(@Body() body,@Request() req){

        try {
            //@Body() body
            let userid = req.user.Id;
            let data= await this.service.KhachHangTreHenCanDo(userid);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data= data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }     
    }
}
