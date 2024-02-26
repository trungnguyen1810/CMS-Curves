import { Controller, Post, Get, Request, Body, Delete, Param } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import { QuanLyThongBaoService } from './quan-ly-thongbao.service'
@Controller('admin/thongbao')
export class QuanLyThongBaoController {
    private response: CoreResponse;
    constructor(private readonly thongbaoservice: QuanLyThongBaoService) {
        this.response = {};
    }

    @Get('getall')
    async FindAll() {

        try {
            let data = await this.thongbaoservice.GetALL();
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
    @Post('Add_Edit')
    async Edit(@Body() body, @Request() req) {
        try {
            let UserId = req.user.Id;
            let data = await this.thongbaoservice.Them_Sua(body.Id, body.TieuDe,body.TomTat, body.NoiDung, body.Type, body.IdThongBao, UserId);
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

    @Post('XoaThongBao')
    async deleteThongBao(@Body() body) {
        try {
            let data = await this.thongbaoservice.Xoa(body.Id);
            this.response.errorcode = 0;
            this.response.message = 'Xóa thông báo thành công',
                this.response.data = {};
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString(),
            this.response.data = {};
            return this.response;
        }
    }
    @Post('SendNotification')
    async SendNotification(@Body() body, @Request() req) {
        let UserId = req.user.Id;
        try {
            let data_send = await this.thongbaoservice.PushFirebase(body.TieuDe, body.NoiDung, {IdThongBao:body.Id,Type:"ThongBao", TypeThongBao: body.Type, IdBaiViet: body.IdThongBao });
            if (data_send['Error'] == 0) {
                let data = await this.thongbaoservice.SendNotification(body.Id);
                this.response.errorcode = 0;
                this.response.message = 'Gửi thông báo thành công',
                this.response.data = {};
            } else {
                this.response.errorcode = 1;
                this.response.message = 'có lỗi xảy ra ';
                this.response.data = {};
            }
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }

    @Post('LoadBaiViet')
    async LoadBaiViet(@Body() body, @Request() req) {
        try {
            // let UserId = req.user.Id;
            let data = await this.thongbaoservice.BaiViet(body.Id);
            this.response.errorcode = 0;
            this.response.message = 'Thành công';
            this.response.data = data[0] ;
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
}
