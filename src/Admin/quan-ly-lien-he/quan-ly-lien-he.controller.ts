import { Controller, Post, Get, Request, Body, Delete, Param } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import { QuanLyLienHeService } from './quan-ly-lien-he.service'

@Controller('admin/lienhe')
export class QuanLyLienHeController {
    private response: CoreResponse;
    constructor(private readonly orderservice: QuanLyLienHeService) {
        this.response = {};
    }

    @Get('getall')
    async FindAll() {

        try {
            let data = await this.orderservice.GetALL();
            this.response.errorcode = 0;
            this.response.message = 'thành công',
            this.response.data = data[0] ;
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString(),
            this.response.data = {};
            return this.response;
        }
    }
    @Post('XuLyLienHe')
    async XuLyDonHang(@Body() body, @Request() req) {
        try {
            let UserId = req.user.Id;
            let data = await this.orderservice.XuLyDonHang(body.Id, UserId);
            this.response.errorcode = 0;
            this.response.message = data[0][0].message,
            this.response.data = {};
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString(),
                this.response.data = {};
            return this.response;
        }
    }

    @Post('XoaLienHe')
    async deleteThongBao(@Body() body) {
        try {
            let data = await this.orderservice.Xoa(body.Id);
            this.response.errorcode = 0;
            this.response.message = 'Xóa liên hệ đăng ký gói tập thành công',
                this.response.data = {};
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString(),
                this.response.data = {};
            return this.response;
        }
    }

    @Post('baocao')
    async baocao(@Body() body,@Request() req){

        try {
            //@Body() body
            let data= await this.orderservice.BaoCao(body.TuNgay,body.DenNgay);
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
