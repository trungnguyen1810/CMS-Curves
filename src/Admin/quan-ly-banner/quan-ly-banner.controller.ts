import { Controller, Post, Get, Request, Body, Delete,Param } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import {QuanLyBannerService} from './quan-ly-banner.service'
@Controller('admin/banner')
export class QuanLyBannerController {
    private response: CoreResponse;
    constructor(private readonly quanlybanner: QuanLyBannerService) {
        this.response = {};
    }

    @Get('getall')
    async FindAll(){

        try {
            let data= await this.quanlybanner.GetALL();
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
            let data= await this.quanlybanner.Them_Sua(body.Id,body.DuongDanAnh,body.TinhTrang, body.ThuTuSapXep, UserId);
     
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

    @Delete('delete/:id')
    async deleteTinTuc(@Param() params) {
        try {
            let data= await this.quanlybanner.Xoa(params.id);
            this.response.errorcode=0;
            this.response.message='Xóa thành công',
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
