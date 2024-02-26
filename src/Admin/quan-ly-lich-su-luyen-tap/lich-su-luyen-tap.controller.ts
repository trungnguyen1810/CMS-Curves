import { Controller, Post, Get, Request, Response, Body, Delete, Param } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import { LichSuLuyenTapService } from './lich-su-luyen-tap.service';
const ExcelJS = require('exceljs');
import { AppConfig } from './../../app.config';
@Controller('admin/lichsuluyentap')
export class LichSuLuyenTapController {
    private response: CoreResponse;
    constructor(private readonly service: LichSuLuyenTapService) {
        this.response = {};
    }
    @Post('getall')
    async FindAll(@Body() body,@Request() req){
        let UserId = req.user.Id;
        let first = body.first;
        let row = body.row;
        let TenHoiVien = body.TenHoiVien;
        let SoDienThoai= body.SoDienThoai;
        let SoThe = body.SoThe;
        let ThangNam = body.ThangNam;
        let NgayTap = body.NgayTap;
        try {
            let data= await this.service.GetALL(UserId,first,row,TenHoiVien,SoDienThoai,SoThe,ThangNam,NgayTap);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data= data;
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }     
    }
    @Get('gethoivien')
    async GetHoiVien(@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.service.GetListHoiVien(UserId);
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
    @Post('getThongTinSoThe')
    async ThongTinSoThe(@Body() body,@Request() req){
        let UserId = req.user.Id;
        let MaThe = body.SoThe;
        try {
            let data= await this.service.ThongTinSoThe(UserId,MaThe);
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
    
    @Post('Add_Edit')
    async Edit(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data = await this.service.ThemMoiEdit(body.KhachHangId,body.NgayTap,UserId);           
            this.response.errorcode=0;
            this.response.message='Thành công';
            this.response.data={};
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }
    

    @Post('delete')
    async delete(@Body() body) {
        try {
            let data= await this.service.Delete(body.Id,body.KhachHangId);
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
    @Post('BaoCao')
    async BaoCao(@Body() body,@Request() req) {
        try {
            let UserId = req.user.Id;
            let data= await this.service.BaoCao(UserId,body.TuNgay,body.DenNgay);           
            if (data[0].length > 0) {
                var filename = await this.buildBaoCao(data[0],body.TuNgay,body.DenNgay);
                this.response.errorcode = 0;
                this.response.message = 'thành công';
                this.response['filename'] = filename;
            } else {
                this.response.errorcode = 1;
                this.response.message = 'Không có dữ liệu';
                this.response.data = {};
            }
            return this.response; 
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }
    async  buildBaoCao(data, TuNgay, DenNgay){
        return new Promise(async resolve => {
            let filename = 'BaoCaoLichSuLuyenTap.xlsx';
            let workbook = new ExcelJS.Workbook();
            let worksheet = workbook.addWorksheet('BaoCaoLichSuLuyenTap');        
            let tungay = this.convertDateYMDToDMY(TuNgay);
            let denngay = this.convertDateYMDToDMY(DenNgay);
            worksheet.mergeCells('A1:E1');
            worksheet.getCell('A1').value = `Báo cáo lịch sử luyện tập từ ngày ${tungay} đến ngày ${denngay}`;
            worksheet.getCell('A1').font = {
                name: 'Arial',
                color: { argb: '0F0301' },
                family: 2,
                size: 13,
                italic: false,
                'bold': true,
            };
            worksheet.getCell('A1').border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            
            worksheet.getRow(3).values = ['STT', 'Tên hội viên', 'Số điện thoại', 'Số thẻ','Thông tin zalo/facebook', 'Mục tiêu tập luyện','Tháng/ năm tập','Ngày tập luyện'];
            worksheet.getRow(3).font = { bold: true };
            worksheet.columns = [
                { key: 'STT', width: 15 },
                { key: 'TenHoiVien', width: 20 },
                { key: 'SoDienThoai', width: 25, outlineLevel: 1 },
                { key: 'SoThe', width: 15, outlineLevel: 1 },
                { key: 'Zalofb', width: 22, outlineLevel: 1 }  ,
                { key: 'MucTieuTapLuyen', width: 20, outlineLevel: 1 },
                { key: 'ThangNamTap', width: 15, outlineLevel: 1 } ,              
                { key: 'NgayTapLuyen', width: 15, outlineLevel: 1 }  ,             
            ];
            
            let count = data.length;
            for (let i = 0; i < count; i++) {
                let item = data[i];
                worksheet.addRow({ STT: item.STT, TenHoiVien: item.TenHoiVien, SoDienThoai: item.SoDienThoai, 
                    SoThe: item.SoThe,Zalofb:item.Zalofb,MucTieuTapLuyen:item.MucTieuTapLuyen,
                    ThangNamTap:item.ThangNam,NgayTapLuyen:item.NgayTap});
            }     

            await workbook.xlsx.writeFile(AppConfig.Dir_upload + '/baocao/' + filename);
            resolve('/upload/baocao/' + filename);
        })
    }

    convertDateYMDToDMY(d) {
        let dArr = d.split("-");  // ex input "2020-01-18"
        return dArr[2] + "/" + dArr[1] + "/" + dArr[0]; //ex out: "18/01/2020"

    }
    
}
