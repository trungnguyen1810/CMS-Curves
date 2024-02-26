import { Controller, Post, Get, Request, Response, Body, Delete, Param } from '@nestjs/common';
import { CoreResponse } from '../../core.respone';
import { BaoCaoQuanLyHoiVienService } from './bao-cao-quan-ly-hoi-vien.service';
const ExcelJS = require('exceljs');
import { AppConfig } from '../../app.config';

@Controller('admin/baocaohoivien')
export class BaoCaoHoiVienController {
    private response: CoreResponse;
    constructor(private readonly service: BaoCaoQuanLyHoiVienService) {
        this.response = {};
    }
    @Get('getcaulacbo')
    async DanhSachCauLacBo(@Request() req){

        try {      
            console.log(req.user)    
            let userid = req.user.Id;
            let data= await this.service.DanhSachCauLacBo(userid);
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
    @Get('BaoCao_DanhSachKhachHangDangBaoLuu')
    async BaoCao_DanhSachKhachHangDangBaoLuu(@Request() req){

        try {
            //@Body() body
            let userid = req.user.Id;
            let data= await this.service.BaoCao_DanhSachKhachHangDangBaoLuu(userid);
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

    @Get('BaoCao_DanhSachKhachHangHetHan')
    async BaoCao_DanhSachKhachHangHetHan(@Request() req){

        try {
            //@Body() body
            let userid = req.user.Id;
            let data= await this.service.BaoCao_DanhSachKhachHangHetHan(userid);
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

    @Get('BaoCao_DanhSachKhachHangHuy')
    async BaoCao_DanhSachKhachHangHuy(@Request() req){

        try {
            //@Body() body
            let userid = req.user.Id;
            let data= await this.service.BaoCao_DanhSachKhachHangHuy(userid);
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
    @Post('BaoCao_DanhSachKhachHangHuy_KhoangTIME')
    async BaoCao_DanhSachKhachHangHuy_KhoangTIME(@Body() body,@Request() req){

        try {
          
            let userid = req.user.Id;
            let data= await this.service.BaoCao_DanhSachKhachHangHuy_KhoangTIME(userid,body.TuNgay,body.DenNgay);
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

    @Post('BaoCao_DanhSachKhachHangChuyenCLB_KhoangTIME')
    async BaoCao_DanhSachKhachHangChuyenCLB_KhoangTIME(@Body() body,@Request() req){

        try {
          
            let userid = req.user.Id;
            let data= await this.service.BaoCao_DanhSachKhachHangChuyenCLB_KhoangTIME(userid,body.TuNgay,body.DenNgay);
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
    @Post('BaoCao_DanhSachHoiVienCoSinhNhat_KhoangTIME')
    async BaoCao_DanhSachHoiVienCoSinhNhat_KhoangTIME(@Body() body,@Request() req){

        try {
          
            let userid = req.user.Id;
            let data= await this.service.BaoCao_DanhSachHoiVienCoSinhNhat_KhoangTIME(userid,body.TuNgay,body.DenNgay);
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

    @Post('BaoCao_DanhSachHoiVienSapHetHan_KhoangTime')
    async BaoCao_DanhSachHoiVienSapHetHan_KhoangTime(@Body() body,@Request() req){

        try {
          
            let userid = req.user.Id;
            let data= await this.service.BaoCao_DanhSachHoiVienSapHetHan_KhoangTime(userid,body.TuNgay,body.DenNgay);
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

    @Post('DanhSachVoucher_DaSuDung_KhoangTime')
    async DanhSachVoucher_DaSuDung_KhoangTime(@Body() body,@Request() req){

        try {
            let userid = req.user.Id;
            let data= await this.service.DanhSachVoucher_DaSuDung_KhoangTime(userid, body.TuNgay,body.DenNgay);
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

    @Post('BaoCaoDanhSachThueTuDo_TheoKhoangTime')
    async BaoCaoDanhSachThueTuDo_TheoKhoangTime(@Body() body,@Request() req){

        try {
          
            let userid = req.user.Id;
            let data= await this.service.BaoCaoDanhSachThueTuDo_TheoKhoangTime(userid,body.TuNgay,body.DenNgay);
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

    @Get('DanhSachThueTuDo')
    async DanhSachThueTuDo(@Request() req){

        try {
          
            let userid = req.user.Id;
            let data= await this.service.DanhSachThueTuDo(userid);
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

    @Post('BaoCao_DanhSachKhachHangDangBaoLuu_TuNgay_DenNgay')
    async BaoCao_DanhSachKhachHangDangBaoLuu_TuNgay_DenNgay(@Body() body,@Request() req){

        try {
          
            let userid = req.user.Id;
            let data= await this.service.BaoCao_DanhSachKhachHangDangBaoLuu_TuNgay_DenNgay(userid,body.TuNgay,body.DenNgay);
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

    @Post('BaoCaoDanhSachHoiVien_HenTra')
    async BaoCaoDanhSachHoiVien_HenTra(@Body() body,@Request() req){

        try {
          
            let userid = req.user.Id;
            let data= await this.service.BaoCaoDanhSachHoiVien_HenTra(userid,body.TuNgay,body.DenNgay);
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

    @Get('BaoCaoKhachHangTreHenTraNo_GoiTap')
    async BaoCaoKhachHangTreHenTraNo_GoiTap(@Request() req){

        try {
          
            let userid = req.user.Id;
            let data= await this.service.BaoCaoKhachHangTreHenTraNo_GoiTap(userid);
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

    
    @Get('BaoCaoKhachHangChuaVaCoGoiTap')
    async BaoCaoKhachHangChuaVaCoGoiTap(@Request() req){

        try {
          
            let userid = req.user.Id;
            let data= await this.service.BaoCaoKhachHangChuaVaCoGoiTap(userid);
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

    @Get('BaoCaoKhachHangTiemNang')
    async BaoCaoKhachHangTiemNang(@Request() req){

        try {
          
            let userid = req.user.Id;
            let data= await this.service.BaoCaoKhachHangTiemNang();
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

    @Post('danhsachhoivientanggiamcan')
    async DanhSachHoiVienTangGiamCan(@Body() body,@Request() req){

        try {          
            let userid = req.user.Id;
            let data= await this.service.DanhSachHoiVienTangGiamCan(body.TuNgay,body.DenNgay,body.CauLacBoId);
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
    @Post('baocaohoivientanggiamcan')
    async BaoCaoHoiVienTangGiamCan(@Body() body,@Request() req){
            let data = await this.service.DanhSachHoiVienTangGiamCan(body.TuNgay,body.DenNgay,body.CauLacBoId);
            if (data[0].length > 0) {
                var filename = await this.buildBaoCaoDanhSachHoiVienTangGiamCan(data[0], body.TuNgay, body.DenNgay);
                this.response.errorcode = 0;
                this.response.message = 'thành công';
                this.response.data = { filename: filename };
            } else {
                this.response.errorcode = 1;
                this.response.message = 'Không có dữ liệu';
                this.response.data = {};
            }
            return this.response;    
    }
    @Post('danhsachhoivientrehen')
    async DanhSachHoiVienTreHen(@Body() body,@Request() req){

        try {
          
            let userid = req.user.Id;
            let data= await this.service.DanhSachHoiVienTreHen(userid,body.CauLacBoId);
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
    @Post('baocaohoivientrehen')
    async BaoCaoHoiVienTreHen(@Body() body,@Request() req){
        let userid = req.user.Id;
        let data = await this.service.DanhSachHoiVienTreHen(userid,body.CauLacBoId);
        if (data[0].length > 0) {
            var filename = await this.buildBaoCaoDanhSachHoiVienTreHen(data[0]);
            this.response.errorcode = 0;
            this.response.message = 'thành công';
            this.response.data = { filename: filename };
        } else {
            this.response.errorcode = 1;
            this.response.message = 'Không có dữ liệu';
            this.response.data = {};
        }
        return this.response;    
           
    }
    @Post('danhsachhoiviencolichcando')
    async DanhSachHoiVienCoLichCanDo(@Body() body,@Request() req){

        try {
          
            let userid = req.user.Id;
            let data= await this.service.DanhSachHoiVienCoLichCanDo(userid,body.CauLacBoId,body.TuNgay,body.DenNgay);
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
    @Post('baocaohoiviencolichcando')
    async BaoCaoHoiVienCoLichCanDo(@Body() body,@Request() req){
        let userid = req.user.Id;
        let data = await this.service.DanhSachHoiVienCoLichCanDo(userid,body.CauLacBoId,body.TuNgay,body.DenNgay);
        if (data[0].length > 0) {
            var filename = await this.buildBaoCaoDanhSachHoiVienCoLichCanDo(data[0]);
            this.response.errorcode = 0;
            this.response.message = 'thành công';
            this.response.data = { filename: filename };
        } else {
            this.response.errorcode = 1;
            this.response.message = 'Không có dữ liệu';
            this.response.data = {};
        }
        return this.response;    
           
    }

    @Post('DanhSachHoiVienThamGiaTapLuyen')
    async BaoCaoDanhSachHoiVienThamGiaTapLuyen(@Body() body,@Request() req){

        try {
          
            let userid = req.user.Id;
            let data= await this.service.BaoCaoDanhSachHoiVienThamGiaTapLuyen(userid,body.TuNgay,body.DenNgay);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data= data[0];
            
            return this.response;

            // if (data[0].length > 0) {
            //     var filename = await this.buildBaoCaoDanhSachHoiVienThamGiaTapLuyen(data[0]);
            //     this.response.errorcode = 0;
            //     this.response.message = 'thành công';
            //     this.response.data = { filename: filename };
            // } else {
            //     this.response.errorcode = 1;
            //     this.response.message = 'Không có dữ liệu';
            //     this.response.data = {};
            // }

        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }     
    }


    @Post('DanhSachHoiVienConHanKhongTap')
    async BaoCaoDanhSachHoiVienConHanKhongTap(@Body() body,@Request() req){

        try {
          
            let userid = req.user.Id;
            let data= await this.service.BaoCaoDanhSachHoiVienConHanKhongTap(userid,body.TuNgay,body.DenNgay);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data= data[0];
            
            return this.response;

            // if (data[0].length > 0) {
            //     var filename = await this.buildBaoCaoDanhSachHoiVienCoLichCanDo(data[0]);
            //     this.response.errorcode = 0;
            //     this.response.message = 'thành công';
            //     this.response.data = { filename: filename };
            // } else {
            //     this.response.errorcode = 1;
            //     this.response.message = 'Không có dữ liệu';
            //     this.response.data = {};
            // }

        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }     
    }


    async   buildBaoCaoDanhSachHoiVienTangGiamCan (data, TuNgay, DenNgay) {
        return new Promise(async resolve => {
            let filename = 'BaoCaoDanhSachHoiVienTangGiamCan.xlsx';
            let workbook = new ExcelJS.Workbook();
            let worksheet = workbook.addWorksheet('BaoCaoDanhSachHoiVienTangGiamCan');
            let tungay = this.convertDateYMDToDMY(TuNgay);
            let denngay = this.convertDateYMDToDMY(DenNgay);
            worksheet.mergeCells('A1:E1');
            worksheet.getCell('A1').value = `Báo cáo danh sách hội viên tăng giảm cân từ ngày ${tungay} đến ngày ${denngay}`;
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
            worksheet.getRow(3).values = ['STT', 'Họ tên', 'Số điện thoại', 'Email', 'Câu lạc bộ','Zalo/fb','Ngày bắt đầu','Cân nặng bắt đầu','Ngày kết thúc','Cân nặng kết thúc','Chênh lệch','Kết luận'];
            worksheet.getRow(3).font = { bold: true };
            worksheet.columns = [
                { key: 'Id', width: 15 },
                { key: 'HoVaTen', width: 32 },
                { key: 'SoDienThoai', width: 20, outlineLevel: 1 },
                { key: 'Email', width: 20, outlineLevel: 1 },
                { key: 'CauLacBo', width: 22, outlineLevel: 1 },
                { key: 'Zalofb', width: 22, outlineLevel: 1 },
                { key: 'NgayBatDau', width: 22, outlineLevel: 1 },
                { key: 'CanNangBatDau', width: 22, outlineLevel: 1 },
                { key: 'NgayKetThuc', width: 22, outlineLevel: 1 },
                { key: 'CanNangKetThuc', width: 22, outlineLevel: 1 },
                { key: 'ChenhLech', width: 22, outlineLevel: 1 },
                { key: 'KetLuan', width: 22, outlineLevel: 1 }

            ];
            
            let count = data.length;
            for (let i = 0; i < count; i++) {
                let item = data[i];
                worksheet.addRow({ STT: item.Id, HoVaTen: item.HoVaTen, SoDienThoai: item.SoDienThoai,  Email: item.Email,CauLacBo:item.CauLacBo,Zalofb:item.Zalofb,
                NgayBatDau:item.NgayBatDau,CanNangBatDau:item.CanNangBatDau,NgayKetThuc:item.NgayKetThuc,CanNangKetThuc:item.CanNangKetThuc,ChenhLech:item.ChenhLech,
            KetLuan:item.KetLuan });
            }     

            await workbook.xlsx.writeFile(AppConfig.Dir_upload + '/baocao/' + filename);
            resolve('/upload/baocao/' + filename);
        })
    }

    async buildBaoCaoDanhSachHoiVienTreHen(data){
        return new Promise(async resolve => {
            let filename = 'BaoCaoDanhSachHoiVienTreHen.xlsx';
            let workbook = new ExcelJS.Workbook();
            let worksheet = workbook.addWorksheet('BaoCaoDanhSachHoiVienTreHen');        
            worksheet.mergeCells('A1:E1');
            worksheet.getCell('A1').value = `Báo cáo danh sách hội viên trễ hẹn`;
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
            worksheet.getRow(3).values = ['STT', 'Họ tên', 'Số điện thoại', 'Email', 'Câu lạc bộ'];
            worksheet.getRow(3).font = { bold: true };
            worksheet.columns = [
                { key: 'STT', width: 15 },
                { key: 'HoVaTen', width: 32 },
                { key: 'SoDienThoai', width: 20, outlineLevel: 1 },
                { key: 'Email', width: 20, outlineLevel: 1 },
                { key: 'TenCauLacBo', width: 22, outlineLevel: 1 }              

            ];
            
            let count = data.length;
            for (let i = 0; i < count; i++) {
                let item = data[i];
                worksheet.addRow({ STT: item.STT, HoVaTen: item.HoVaTen, SoDienThoai: item.SoDienThoai,  Email: item.Email,CauLacBo:item.TenCauLacBo});
            }     

            await workbook.xlsx.writeFile(AppConfig.Dir_upload + '/baocao/' + filename);
            resolve('/upload/baocao/' + filename);
        })
    }

    async buildBaoCaoDanhSachHoiVienThamGiaTapLuyen(data){
        return new Promise(async resolve => {
            let filename = 'BaoCaoDanhSachHoiVienThamGiaTapLuyen.xlsx';
            let workbook = new ExcelJS.Workbook();
            let worksheet = workbook.addWorksheet('BaoCaoDanhSachHoiVienThamGiaTapLuyen');        
            worksheet.mergeCells('A1:E1');
            worksheet.getCell('A1').value = `Báo cáo danh sách hội viên tham gia tập luyện`;
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
            worksheet.getRow(3).values = ['STT', 'Họ tên', 'Zalo, Facebook', 'Câu lạc bộ', 'Số buổi tập', 'Xếp hạng'];
            worksheet.getRow(3).font = { bold: true };
            worksheet.columns = [
                { key: 'STT', width: 15 },
                { key: 'HoVaTen', width: 32 },
                { key: 'Zalofb', width: 20, outlineLevel: 1 },
                { key: 'TenCauLacBo', width: 20, outlineLevel: 1 },
                { key: 'SoBuoiTap', width: 20, outlineLevel: 1 },
                { key: 'XepHang', width: 20, outlineLevel: 1 }              

            ];
            
            let count = data.length;
            for (let i = 0; i < count; i++) {
                let item = data[i];
                worksheet.addRow({ STT: item.STT, HoVaTen: item.HoVaTen, SoDienThoai: item.SoDienThoai,  Email: item.Email,CauLacBo:item.TenCauLacBo});
            }     

            await workbook.xlsx.writeFile(AppConfig.Dir_upload + '/baocao/' + filename);
            resolve('/upload/baocao/' + filename);
        })
    }

    async buildBaoCaoDanhSachHoiVienCoLichCanDo(data){
        return new Promise(async resolve => {
            let filename = 'BaoCaoDanhSachHoiVienCoLichCanDo.xlsx';
            let workbook = new ExcelJS.Workbook();
            let worksheet = workbook.addWorksheet('BaoCaoDanhSachHoiVienCoLichCanDo');        
            worksheet.mergeCells('A1:E1');
            worksheet.getCell('A1').value = `Báo cáo danh sách hội viên có lịch cân đo`;
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
            worksheet.getRow(3).values = ['STT', 'Họ tên', 'Số điện thoại', 'Email', 'Câu lạc bộ','Zalo/fb'];
            worksheet.getRow(3).font = { bold: true };
            worksheet.columns = [
                { key: 'STT', width: 15 },
                { key: 'HoVaTen', width: 32 },
                { key: 'SoDienThoai', width: 20, outlineLevel: 1 },
                { key: 'Email', width: 20, outlineLevel: 1 },
                { key: 'TenCauLacBo', width: 22, outlineLevel: 1 }, 
                { key: 'Zalofb', width: 22, outlineLevel: 1 }
                            

            ];
            
            let count = data.length;
            for (let i = 0; i < count; i++) {
                let item = data[i];
                worksheet.addRow({ STT: item.STT, HoVaTen: item.HoVaTen, SoDienThoai: item.SoDienThoai,  Email: item.Email,CauLacBo:item.TenCauLacBo,Zalofb:item.Zalofb});
            }     

            await workbook.xlsx.writeFile(AppConfig.Dir_upload + '/baocao/' + filename);
            resolve('/upload/baocao/' + filename);
        })
    }


    convertDateYMDToDMY(d) {

        let dArr = d.split("-");  // ex input "2020-01-18"
        return dArr[2] + "/" + dArr[1] + "/" + dArr[0]; //ex out: "18/01/2020"

    }
    convertNumberToMoney(n) {
        n = n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        return n;
    }

}
