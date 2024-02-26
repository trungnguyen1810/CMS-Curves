import { Controller, Post, Get, Request, Response, Body, Delete, Param } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import { BaoCaoQuanLyCanDoService } from './bao-cao-quan-ly-can-do.service';
const ExcelJS = require('exceljs');
import { AppConfig } from './../../app.config';

@Controller('admin/bao-cao-quan-ly-can-do')
export class BaoCaoQuanLyCanDoController {
    private response: CoreResponse;
    constructor(private readonly service: BaoCaoQuanLyCanDoService) {
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
    @Post('BaoCaoXuatTonKho')
    async BaoCaoXuatTonKho(@Body() body,@Request() req){
        let userid = req.user.Id;
        let data = await this.service.BaoCaoXuatTonKho(body.CauLacBoId,body.TuNgay,body.DenNgay);
        if (data[0].length > 0) {
            var filename = await this.buildBaoCaoXuatTonKho(data[0],body.TuNgay,body.DenNgay);
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
    @Post('timkiemdoanhthu')
    async timkiemdoanhthu(@Body() body,@Request() req){
        let userid = req.user.Id;
        let data = await this.service.TimKiemDoanhThu(body.TuNgay,body.DenNgay,body.CauLacBoId,body.LoaiThanhToan);
        if (data[0].length > 0) {
            this.response.errorcode = 0;
            this.response.message = 'thành công';
            this.response.data = data[0];
        } else {
            this.response.errorcode = 1;
            this.response.message = 'Không có dữ liệu';
            this.response.data = {};
        }
        return this.response;    
           
    }
    @Post('xuatbaocaodoanhthu')
    async xuatbaocaodoanhthu(@Body() body,@Request() req){
        let userid = req.user.Id;
        let data = await this.service.TimKiemDoanhThu(body.TuNgay,body.DenNgay,body.CauLacBoId,body.LoaiThanhToan);
        if (data[0].length > 0) {
            var filename = await this.buildBaoCaoXuatDoanhThu(data[0],body.TuNgay,body.DenNgay);
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
    @Post('baocaobiendongcando')
    async baocaobiendongcando(@Body() body,@Request() req){
        let userid = req.user.Id;
        let data = await this.service.BaoCaoBienDongCanDo(body.TuNgay,body.DenNgay,userid);
        if (data[0].length > 0) {
            var filename = await this.buildBaoCaoBienDongCanDo(data[0],body.TuNgay,body.DenNgay);
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
            worksheet.getRow(3).values = ['STT', 'Họ tên', 'Số điện thoại', 'Email', 'Câu lạc bộ','Zalo/fb','Ngày hẹn cân đo'];
            worksheet.getRow(3).font = { bold: true };
            worksheet.columns = [
                { key: 'STT', width: 15 },
                { key: 'HoVaTen', width: 32 },
                { key: 'SoDienThoai', width: 20, outlineLevel: 1 },
                { key: 'Email', width: 20, outlineLevel: 1 },
                { key: 'TenCauLacBo', width: 22, outlineLevel: 1 },
                { key: 'Zalofb', width: 22, outlineLevel: 1 }     ,
                { key: 'NgayHenCanDo', width: 22, outlineLevel: 1 }             

            ];
            
            let count = data.length;
            for (let i = 0; i < count; i++) {
                let item = data[i];
                worksheet.addRow({ STT: item.STT, HoVaTen: item.HoVaTen, SoDienThoai: item.SoDienThoai,  Email: item.Email,CauLacBo:item.TenCauLacBo,Zalofb:item.Zalofb,NgayHenCanDo:item.NgayHenCanDo});
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
            worksheet.getRow(3).values = ['STT', 'Họ tên', 'Số điện thoại', 'Email', 'Câu lạc bộ','Zalo/fb','Ngày hẹn cân đo'];
            worksheet.getRow(3).font = { bold: true };
            worksheet.columns = [
                { key: 'STT', width: 15 },
                { key: 'HoVaTen', width: 32 },
                { key: 'SoDienThoai', width: 20, outlineLevel: 1 },
                { key: 'Email', width: 20, outlineLevel: 1 },
                { key: 'TenCauLacBo', width: 22, outlineLevel: 1 }  ,
                { key: 'Zalofb', width: 22, outlineLevel: 1 },
                { key: 'NgayHenCanDo', width: 22, outlineLevel: 1 }                   

            ];
            
            let count = data.length;
            for (let i = 0; i < count; i++) {
                let item = data[i];
                worksheet.addRow({ STT: item.STT, HoVaTen: item.HoVaTen, SoDienThoai: item.SoDienThoai,  Email: item.Email,CauLacBo:item.TenCauLacBo,Zalofb:item.Zalofb,NgayHenCanDo:item.NgayHenCanDo});
            }     

            await workbook.xlsx.writeFile(AppConfig.Dir_upload + '/baocao/' + filename);
            resolve('/upload/baocao/' + filename);
        })
    }
    async buildBaoCaoXuatTonKho(data, TuNgay, DenNgay){
        return new Promise(async resolve => {
            let filename = 'BaoCaoTonKho.xlsx';
            let workbook = new ExcelJS.Workbook();
            let worksheet = workbook.addWorksheet('BaoCaoTonKho');        
            let tungay = this.convertDateYMDToDMY(TuNgay);
            let denngay = this.convertDateYMDToDMY(DenNgay);
            worksheet.mergeCells('A1:F1');
            worksheet.getCell('A1').value = `Báo cáo danh sách tồn kho và xuất bán từ ngày ${tungay} đến ngày ${denngay}`;
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
           
            worksheet.getRow(3).values = ['STT', 'Mã sản phẩm', 'Tên sản phẩm','Số lượng nhập', 'Số lượng tồn','Số lượng bán','Số lượng tặng','Số lượng điều chỉnh giảm' ,'Câu lạc bộ'];
            worksheet.getRow(3).font = { bold: true };
            worksheet.columns = [
                { key: 'STT', width: 15 },
                { key: 'MaSanPham', width: 32 },
                { key: 'TenSanPham', width: 20, outlineLevel: 1 },
                { key: 'SoLuongNhap', width: 15, outlineLevel: 1 },
                { key: 'SoLuong', width: 15, outlineLevel: 1 },
                { key: 'SoLuongXuatBan', width: 15, outlineLevel: 1 }  ,
                { key: 'SoLuongChoTang', width: 15, outlineLevel: 1 }  ,
                { key: 'SoLuongDieuChinhGiam', width: 15, outlineLevel: 1 }  ,                
                { key: 'TenCauLacBo', width: 25, outlineLevel: 1 }               

            ];
            
            let count = data.length;
            for (let i = 0; i < count; i++) {
                let item = data[i];
                worksheet.addRow({ STT: item.STT, MaSanPham: item.MaSanPham, TenSanPham: item.TenSanPham, SoLuongNhap: item.SoLuongNhap,  SoLuong: item.SoLuong,SoLuongXuatBan:item.SoLuongXuatBan,
                    SoLuongChoTang:item.SoLuongChoTang,SoLuongDieuChinhGiam:item.SoLuongDieuChinhGiam,TenCauLacBo:item.TenCauLacBo});
            }     

            await workbook.xlsx.writeFile(AppConfig.Dir_upload + '/baocao/' + filename);
            resolve('/upload/baocao/' + filename);
        })
    }
    async  buildBaoCaoXuatDoanhThu(data, TuNgay, DenNgay){
        return new Promise(async resolve => {
            let filename = 'BaoCaoDoanhThu.xlsx';
            let workbook = new ExcelJS.Workbook();
            let worksheet = workbook.addWorksheet('BaoCaoDoanhThu');        
            let tungay = this.convertDateYMDToDMY(TuNgay);
            let denngay = this.convertDateYMDToDMY(DenNgay);
            worksheet.mergeCells('A1:E1');
            worksheet.getCell('A1').value = `Báo cáo doanh thu từ ngày ${tungay} đến ngày ${denngay}`;
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
            
            worksheet.getRow(3).values = ['STT', 'Mã phiếu thu', 'Tên khách hàng', 'Số điện thoại','Câu lạc bộ', 'Nội dung thanh toán','Số tiền thanh toán','Hình thức thanh toán','Ngày cập nhật'];
            worksheet.getRow(3).font = { bold: true };
            worksheet.columns = [
                { key: 'STT', width: 15 },
                { key: 'MaPhieuThu', width: 20 },
                { key: 'TenKhachHang', width: 25, outlineLevel: 1 },
                { key: 'SoDienThoai', width: 15, outlineLevel: 1 },
                { key: 'TenCauLacBo', width: 22, outlineLevel: 1 }  ,
                { key: 'NoiDungThanhToan', width: 20, outlineLevel: 1 },
                { key: 'SoTienThanhToan', width: 15, outlineLevel: 1 } ,              
                { key: 'HinhThucThanhToan', width: 15, outlineLevel: 1 }  ,             
                { key: 'NgayCapNhat', width: 15, outlineLevel: 1 }     
            ];
            
            let count = data.length;
            for (let i = 0; i < count; i++) {
                let item = data[i];
                worksheet.addRow({ STT: item.STT, MaPhieuThu: item.MaPhieuThu, TenKhachHang: item.TenKhachHang, 
                     SoDienThoai: item.SoDienThoai,TenCauLacBo:item.TenCauLacBo,NoiDungThanhToan:item.NoiDungThanhToan,
                     SoTienThanhToan:item.SoTienThanhToan,HinhThucThanhToan:item.HinhThucThanhToan,NgayCapNhat:item.NgayCapNhat});
            }     

            await workbook.xlsx.writeFile(AppConfig.Dir_upload + '/baocao/' + filename);
            resolve('/upload/baocao/' + filename);
        })
    }
    async buildBaoCaoBienDongCanDo(data, TuNgay, DenNgay){
        return new Promise(async resolve => {
            let filename = 'BaoCaoBienDongChiSo.xlsx';
            let workbook = new ExcelJS.Workbook();
            let worksheet = workbook.addWorksheet('BaoCaoBienDongChiSo');        
            let tungay = this.convertDateYMDToDMY(TuNgay);
            let denngay = this.convertDateYMDToDMY(DenNgay);
            worksheet.mergeCells('A1:F1');
            worksheet.getCell('A1').value = `Báo cáo biến động cân đo từ ngày ${tungay} đến ngày ${denngay}`;
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
            
            worksheet.getRow(3).values = ['STT', 'Tên khách hàng','Zalo/fb', 'Cân nặng','Chiều cao', 'Lượng mỡ cơ thể','Mật độ cơ',
            'Mật độ xương','BMI','DCI','Lượng nước cơ thể','Mỡ nội tạng','Ngực','Eo','Bụng','Mông','Đùi','Tay','Tuổi sinh học'];
            worksheet.getRow(3).font = { bold: true };
            worksheet.columns = [
                { key: 'STT', width: 15 },
                { key: 'TenKhachHang', width: 20 },
                { key: 'Zalofb', width: 20 },
                { key: 'CanNang', width: 25, outlineLevel: 1 },
                { key: 'ChieuCao', width: 15, outlineLevel: 1 },
                { key: 'LuongMoCoThe', width: 22, outlineLevel: 1 }  ,
                { key: 'MatDoCo', width: 20, outlineLevel: 1 },
                { key: 'MatDoXuong', width: 15, outlineLevel: 1 } ,              
                { key: 'BMI', width: 15, outlineLevel: 1 }  ,      
                { key: 'DCI', width: 15, outlineLevel: 1 }  ,             
                { key: 'LuongNuocCoThe', width: 15, outlineLevel: 1 }  ,             
                { key: 'MoNoiTang', width: 15, outlineLevel: 1 }  ,             
                { key: 'Nguc', width: 15, outlineLevel: 1 }  ,             
                { key: 'Eo', width: 15, outlineLevel: 1 }  ,             
                { key: 'Bung', width: 15, outlineLevel: 1 }  ,             
                { key: 'Mong', width: 15, outlineLevel: 1 }  ,             
                { key: 'Dui', width: 15, outlineLevel: 1 }  ,             
                { key: 'Tay', width: 15, outlineLevel: 1 }  ,
                { key: 'TuoiSinhHoc', width: 15, outlineLevel: 1 }  
            ];
            
            let count = data.length;
            for (let i = 0; i < count; i++) {
                let item = data[i];
                worksheet.addRow({ STT: item.STT, TenKhachHang: item.TenKhachHang,Zalofb:item.Zalofb, CanNang: item.CanNang, 
                    ChieuCao: item.ChieuCao,LuongMoCoThe:item.LuongMoCoThe,MatDoCo:item.MatDoCo,
                    MatDoXuong:item.MatDoXuong,BMI:item.BMI,DCI:item.DCI,LuongNuocCoThe:item.LuongNuocCoThe,MoNoiTang:item.MoNoiTang,
                    Nguc:item.Nguc,Eo:item.Eo,Bung:item.Bung,Mong:item.Mong,Dui:item.Dui,Tay:item.Tay,TuoiSinhHoc:item.TuoiSinhHoc});
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
