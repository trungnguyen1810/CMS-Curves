import { Controller, Post, Get, Request, Body, Delete, Param } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import { QuanLyDonHangService } from './quan-ly-donhang.service'
@Controller('admin/donhang')
export class QuanLyDonHangController {
    private response: CoreResponse;
    constructor(private readonly orderservice: QuanLyDonHangService) {
        this.response = {};
    }

    @Get('getall')
    async FindAll(@Request() req) {

        try {
            let UserId = req.user.Id;
            let data = await this.orderservice.GetALL(UserId);
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
    @Post('XuLyDonHang')
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

    @Post('XoaDonHang')
    async deleteThongBao(@Body() body) {
        try {
            let data = await this.orderservice.Xoa(body.Id);
            this.response.errorcode = 0;
            this.response.message = 'Xóa đơn hàng thành công',
                this.response.data = {};
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString(),
                this.response.data = {};
            return this.response;
        }
    }
    
}
