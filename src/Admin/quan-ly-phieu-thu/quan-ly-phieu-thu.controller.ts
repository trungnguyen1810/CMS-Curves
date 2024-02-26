import { Controller, Post, Get, Request, Body, Delete,Param } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import {QuanLyPhieuThuService} from './quan-ly-phieu-thu.service'
@Controller('admin/quanlyphieuthu')
export class QuanLyPhieuThuController {
    private response: CoreResponse;
    constructor(private readonly quanlyphieuthu: QuanLyPhieuThuService) {
        this.response = {};
    }

    @Get('getall')
    async FindAll(){

        try {
            let data= await this.quanlyphieuthu.GetALL();
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
    @Get('getkhachhang')
    async GetKhachHang(@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.quanlyphieuthu.GetAllKhachHang(UserId);
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
    @Post('inphieuthugoitap')
    async Edit(@Body() body,@Request() req){
        let UserId = req.user.Id;
        var html_to_pdf = require('html-pdf-node');
        let options = { format: 'A4' };
        let content = `<table class=" cke_show_border" style="height: 110px;" border="0" width="633" cellspacing="0" cellpadding="0">
        <tbody>
        <tr style="height: 46px;">
        <td style="height: 46px; width: 621.4px;">
        <p><strong>C&acirc;u lạc bộ:Curves Trần Duy Hưng</strong></p>
        </td>
        <td style="height: 46px; width: 5.6px;">
        <p align="center">&nbsp;</p>
        </td>
        </tr>
        <tr style="height: 46px;">
        <td style="height: 46px; width: 621.4px;">
        <p><strong>Địa chỉ: 90 Trần Duy Hưng,H&agrave; Nội</strong></p>
        </td>
        <td style="height: 46px; width: 5.6px;">&nbsp;</td>
        </tr>
        <tr style="height: 18px;">
        <td style="height: 18px; width: 621.4px;">&nbsp;</td>
        <td style="height: 18px; width: 5.6px;">&nbsp;</td>
        </tr>
        </tbody>
        </table>
        <p><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;PHIẾU THU&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
        <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<em>Ng&agrave;y 10 th&aacute;ng 12 năm 2021</em>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>
        <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>
        <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
        <p>Kh&aacute;ch h&agrave;ng :</p>
        <p>Số điện thoại :</p>
        <p>Email :</p>
        <p>Địa chỉ:</p>
        <p>Nội dung : Thanh to&aacute;n tiền mua sản phẩm</p>
        <p>Số tiền: 300.000 vnđ</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <table class=" cke_show_border" border="0" width="677" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
        <td style="width: 261px;">
        <p align="center"><strong>Người nộp</strong></p>
        <p align="center"><strong>tiền</strong></p>
        </td>
        <td style="width: 410px;" colspan="2">
        <p align="center"><strong>Người lập phiếu</strong></p>
        </td>
        </tr>
        <tr>
        <td style="width: 261px;">
        <p align="center"><em>(K&yacute;, họ t&ecirc;n)</em></p>
        </td>
        <td style="width: 410px;" colspan="2">
        <p align="center"><em>(K&yacute;, họ t&ecirc;n)</em></p>
        </td>
        </tr>
        </tbody>
        </table>
        <p>&nbsp;</p>`;
        let file = { content: content};
        

html_to_pdf.generatePdf(file, options).then(output => {
    let fs = require('fs');
    fs.writeFile("test.pdf", output,  "binary",function(err) { });
 
});
        try {
            // let data= await this.quanlyphieuthu.Add_Edit(body.Id,body.TenCauHinh,body.CauLacBoId, body.GiaThueTheoNgay, body.TuNgay,body.DenNgay);
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
            let data = await this.quanlyphieuthu.Xoa(body.Id);
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
    @Post('GetGoiTap')
    async GetGoiTap(@Body() body) {
        try {
            let data = await this.quanlyphieuthu.GetGoiTap(body.KhachHangId);
            this.response.errorcode = 0;
            this.response.message = 'thành công';
            this.response.data = data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    
}
