import { Controller, Post, Get, Request, Body, Delete,Param } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import {QuanLyNguonKhachHangService} from './quan-ly-nguon-khach-hang.service'
@Controller('admin/quanlynguonkhachhang')
export class QuanLyNguonKhachHangController {

    private response: CoreResponse;
    constructor(private readonly quanly: QuanLyNguonKhachHangService) {
        this.response = {};
    }

    @Get('getall')
    async FindAll(){

        try {
            let data= await this.quanly.GetAll();
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
            let data= await this.quanly.Them_Sua(body.Id,body.TenNguonKhachHang,UserId);
     
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
            let data= await this.quanly.Xoa(params.id);
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
