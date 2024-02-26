import { Controller, Get, Param, Post, Body, Put, Response, Request, UseInterceptors,UploadedFile, Delete } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import * as jwt from 'jsonwebtoken';
import { AppConfig } from './../../app.config';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { QuanLyVoucherService } from './quan-ly-voucher.service';
import * as Excel from 'exceljs';
@Controller('admin/voucher')
export class QuanLyVoucherController {
    private response: CoreResponse;
    constructor(private readonly Service: QuanLyVoucherService) {
        this.response = {};
    }

    @Get('getall')
    async FindAll(@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.Service.GetVoucher(UserId);
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

    @Get('getsanpham')
    async GetSanPham(){

        try {
            let data= await this.Service.GetSanPham();
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data=data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }     
    }

    @Post('Add_Edit')
    async Edit(@Body() body, @Request() req) {
        let UserId = req.user.Id;
        try {
            let data = await this.Service.Them_SuaVoucher(body.Id, body.MaVoucher, body.NgayHetHan, body.TinhTrang, body.LoaiMa, body.soluongngay, body.sotien, body.sanphamid, body.tensanpham, UserId);
            if(data[0][0].Id == -1){
                this.response.errorcode = 1;
                this.response.message = 'Mã voucher đã tồn tại';
                this.response.data = data[0];
                return this.response;
            }else{
                this.response.errorcode = 0;
                this.response.message = 'thành công';
                this.response.data = data[0];
                return this.response;
            }
           
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }

    @Post('Import')
    async Import(@Body() body, @Request() req, @Response() res) {
        console.log(body);
        var workbook = new Excel.Workbook();
        let UserId = req.user.Id;
        let self = this;
        let data = {};
        try {
            workbook.xlsx.readFile(body.destination + '/' + body.filename)
                .then(async function () {

                    var ws = workbook.getWorksheet(1);
                    if (ws == null) {
                        throw new Error('File dữ liệu không đúng định dạng!');
                    }

                    if (ws.rowCount <= 1) {
                        throw new Error('File import không có dữ liệu');
                    }
                    var arr = [];
                    for (var i = 2; i <= ws.rowCount; i++) {

                        let MaVoucher, LoaiMa, SoNgay, SoTien, MaSanPham, NgayHetHan;

                        //    Id = ws.getCell("A" + i).value;
                        if (!ws.getCell("A" + i).value) {
                            MaVoucher = '';
                        } else {
                            MaVoucher = ws.getCell("A" + i).value;
                        }
                        if (!ws.getCell("B" + i).value) {
                            LoaiMa = '';
                        } else {
                            LoaiMa = ws.getCell("B" + i).value;
                        }
                        if (!ws.getCell("C" + i).value) {
                            SoNgay = '';
                        } else {
                            SoNgay = ws.getCell("C" + i).text;
                        }
                        if (!ws.getCell("D" + i).value) {
                            MaSanPham = '';
                        } else {
                            MaSanPham = ws.getCell("D" + i).text;
                        }
                        if (!ws.getCell("E" + i).value) {
                            SoTien = '';
                        } else {
                            SoTien = ws.getCell("E" + i).value;
                        }
                        if (!ws.getCell("F" + i).value) {
                            NgayHetHan = '';
                        } else {
                            NgayHetHan = ws.getCell("F" + i).value;
                        }
                        
                        
                        // var itemImport = {
                        //     STT: ws.getCell("A" + i).value + '',
                        //     SoDienThoai: ws.getCell("B" + i).value + '',
                        //     SoDiem: ws.getCell("C" + i).value + '',
                        //     NgayBatDau: ws.getCell("D" + i).value + '',
                        //     NgayKetThuc: ws.getCell("E" + i).value + ''
                        // }
                        // console.log(itemImport);

                        data = await self.Service.API_Voucher_import(MaVoucher, LoaiMa, SoNgay, MaSanPham, SoTien, NgayHetHan, UserId);
                        if (data[0][0].errorcode == 1) {
                            var a = {
                                MaVoucher: MaVoucher,
                                LoaiMa: LoaiMa,
                                SoNgay: SoNgay,
                                MaSanPham: MaSanPham,
                                SoTien: SoTien,
                                NgayHetHan: NgayHetHan,
                                GhiChu: data[0][0].message
                            };
                            arr.push(a);
                        }
                    }
                    console.log(arr);

                    if (arr.length > 0) {
                        var workbook2 = new Excel.Workbook();
                        var worksheet2 = workbook2.addWorksheet('import_Voucher_Loi', { properties: { tabColor: { argb: 'FF00FF00' } } });
                        worksheet2.columns = [
                            { header: 'STT', key: 'STT', width: 5 },
                            { header: 'Mã voucher', key: 'MaVoucher', width: 15 },
                            { header: 'Loại mã', key: 'LoaiMa', width: 15 },
                            { header: 'Số ngày', key: 'SoNgay', width: 15 },
                            { header: 'Mã sản phẩm', key: 'MaSanPham', width: 15 },
                            { header: 'Số tiền', key: 'SoTien', width: 15 },
                            { header: 'Ngày hết hạn', key: 'NgayHetHan', width: 15 },
                            { header: 'Nội dung lỗi', key: 'GhiChu', width: 30 }
                        ];
                        var data_loi = arr;
                        var length = data_loi.length;
                        for (var i = 0; i < length; i++) {
                            var GhiChu = data_loi[i].GhiChu;
                            GhiChu = GhiChu.substring(0, GhiChu.length - 1);
                            var MaVoucher = data_loi[i].MaVoucher != 'null' ? data_loi[i].MaVoucher : '';
                            var LoaiMa = data_loi[i].LoaiMa != 'null' ? data_loi[i].LoaiMa : '';
                            var SoNgay = data_loi[i].SoNgay != 'null' ? data_loi[i].SoNgay : '';
                            var MaSanPham = data_loi[i].MaSanPham != 'null' ? data_loi[i].MaSanPham : '';
                            var SoTien = data_loi[i].SoTien != 'null' ? data_loi[i].SoTien : '';
                            var NgayHetHan = data_loi[i].NgayHetHan != 'null' ? data_loi[i].NgayHetHan : '';
                          
                            var LyDo = data_loi[i].GhiChu != 'null' ? data_loi[i].GhiChu : '';
                            worksheet2.addRow({
                                STT: (i + 1),   
                                MaVoucher: MaVoucher,
                                LoaiMa: LoaiMa,
                                SoNgay: SoNgay,
                                MaSanPham: MaSanPham,
                                SoTien:SoTien,
                                NgayHetHan: NgayHetHan,
                                GhiChu: LyDo
                            });
                        }
                        var date = new Date();
                        var filename = 'Import_Voucher_FileLoi_' + date.getTime() + '.xlsx';
                        var thucmuc = AppConfig.Dir_upload+'/importloi/' + filename;
                        
                        workbook2.xlsx.writeFile(thucmuc)
                            .then(function () {
                                self.response.errorcode = -1;
                                self.response.message = 'Có lỗi xảy ra, vui lòng xem file lỗi',
                                self.response.data = data[0][0];
                                res.send({ errorcode: -1, message: 'Có lỗi xảy ra, vui lòng xem file lỗi', file: '/upload/importloi/'+filename});
                                return;
                            });
                    }else {
                        self.response.errorcode = 0;
                        self.response.message = 'thành công',
                        self.response.data = data[0][0];
                        res.send({ errorcode: 0, message: 'Import thành công', data: {errorcode : 0, message:'Import thành công' } });
                        return;
                    }
                   
                })

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString(),
                this.response.data = {};
            return this.response;
        }
    }

    @Delete('delete/:id')
    async deleteVoucher(@Param() params, @Request() req) {
        let UserId = req.user.Id;
        try {
            let data = await this.Service.XoaVouCher(params.id, UserId);
            this.response.errorcode = data[0][0].ercode;
            this.response.message = data[0][0].massage;
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
