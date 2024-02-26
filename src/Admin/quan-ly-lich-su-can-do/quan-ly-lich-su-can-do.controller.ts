import { Controller, Post, Get, Request, Response, Body, Delete, Param } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import { QuanLyLichSuCanDoService } from './quan-ly-lich-su-can-do.service';
import{AppConfig} from './../../app.config';
// import { Xlsx } from 'exceljs';
import * as Excel from 'exceljs';

@Controller('admin/lichsucando')
export class QuanLyLichSuCanDoController {
    private response: CoreResponse;
    constructor(private readonly quanly: QuanLyLichSuCanDoService) {
        this.response = {};
    }
    @Get('getall')
    async FindAll(@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.quanly.GetALL(UserId);
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
    
    @Post('xemchitiet')
    async XemChiTiet(@Body() body){
        try {
            let data= await this.quanly.XemChiTiet(body.Id);
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
    @Post('ADD')
    async ADD(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.quanly.ThemChiSoCoThe_themmoi(body.Id, body.SoDienThoai, body.CanNang, body.ChieuCao, body.LuongMoCoThe, body.MatDoCo, body.MatDoXuong, body.BMI, body.DCI, body.TuoiSinhHoc, body.LuongNuocCoThe, body.MoNoiTang, body.Nguc, body.Eo, body.Bung, body.Mong, body.Dui, body.Tay, body.NgayCanDo, UserId);
            let message = 'Thêm mới lịch sử cân đo thành công';
            this.response.errorcode=0;
            this.response.message=message,
            this.response.data=data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }

    @Delete('delete/:id')
    async delete(@Param() params) {
        try {
            let data= await this.quanly.XoaLS(params.id);
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

    @Post('Add_Edit')
    async Edit(@Body() body, @Request() req, @Response() res) {
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
                    // var checkFileEmpty = false;
                    // for (var i = 1; i <= ws.rowCount; i++) {
                    //     console.log(ws.getCell("A" + i).value );
                    //     if (ws.getCell("A" + i).value != null || ws.getCell("B" + i).value != null ||
                    //         ws.getCell("C" + i).value != null || ws.getCell("D" + i).value != null ||
                    //         ws.getCell("E" + i).value != null) {
                    //         checkFileEmpty = true;
                    //         break;
                    //     }
                    // }
                    var arr = [];
                    for (var i = 2; i <= ws.rowCount; i++) {

                        let Id, Ngay, CanNang, ChieuCao, LuongMoCoThe, MatDoCo, MatDoXuong, BMI, DCI, TuoiSinhHoc, LuongNuocCoThe, MoNoiTang, Nguc, Eo, Bung, Mong, Dui, Tay;

                        //    Id = ws.getCell("A" + i).value;
                        if (!ws.getCell("A" + i).value) {
                            Id = '';
                        } else {
                            Id = ws.getCell("A" + i).value;
                        }
                        if (!ws.getCell("B" + i).value) {
                            Ngay = '';
                        } else {
                            Ngay = ws.getCell("B" + i).value;
                        }
                        if (!ws.getCell("C" + i).value) {
                            CanNang = '';
                        } else {
                            CanNang = ws.getCell("C" + i).value;
                        }
                        if (!ws.getCell("D" + i).value) {
                            ChieuCao = '';
                        } else {
                            ChieuCao = ws.getCell("D" + i).value;
                        }
                        if (!ws.getCell("E" + i).value) {
                            LuongMoCoThe = '';
                        } else {
                            LuongMoCoThe = ws.getCell("E" + i).value;
                        }
                        if (!ws.getCell("F" + i).value) {
                            MatDoCo = '';
                        } else {
                            MatDoCo = ws.getCell("F" + i).value;
                        }
                        if (!ws.getCell("G" + i).value) {
                            MatDoXuong = '';
                        } else {
                            MatDoXuong = ws.getCell("G" + i).value;
                        }
                        if (!ws.getCell("H" + i).value) {
                            BMI = '';
                        } else {
                            BMI = ws.getCell("H" + i).value;
                        }
                        if (!ws.getCell("I" + i).value) {
                            DCI = '';
                        } else {
                            DCI = ws.getCell("I" + i).value;
                        }
                        if (!ws.getCell("J" + i).value) {
                            TuoiSinhHoc = '';
                        } else {
                            TuoiSinhHoc = ws.getCell("J" + i).value;
                        }
                        if (!ws.getCell("K" + i).value) {
                            LuongNuocCoThe = '';
                        } else {
                            LuongNuocCoThe = ws.getCell("K" + i).value;
                        }
                        if (!ws.getCell("L" + i).value) {
                            MoNoiTang = '';
                        } else {
                            MoNoiTang = ws.getCell("L" + i).value;
                        }
                        if (!ws.getCell("M" + i).value) {
                            Nguc = '';
                        } else {
                            Nguc = ws.getCell("M" + i).value;
                        }
                        if (!ws.getCell("N" + i).value) {
                            Eo = '';
                        } else {
                            Eo = ws.getCell("N" + i).value;
                        }
                        if (!ws.getCell("O" + i).value) {
                            Bung = '';
                        } else {
                            Bung = ws.getCell("O" + i).value;
                        }
                        if (!ws.getCell("P" + i).value) {
                            Mong = '';
                        } else {
                            Mong = ws.getCell("P" + i).value;
                        }
                        if (!ws.getCell("Q" + i).value) {
                            Dui = '';
                        } else {
                            Dui = ws.getCell("Q" + i).value;
                        }
                        if (!ws.getCell("R" + i).value) {
                            Tay = '';
                        } else {
                            Tay = ws.getCell("R" + i).value;
                        }
                        // var itemImport = {
                        //     STT: ws.getCell("A" + i).value + '',
                        //     SoDienThoai: ws.getCell("B" + i).value + '',
                        //     SoDiem: ws.getCell("C" + i).value + '',
                        //     NgayBatDau: ws.getCell("D" + i).value + '',
                        //     NgayKetThuc: ws.getCell("E" + i).value + ''
                        // }
                        // console.log(itemImport);

                        data = await self.quanly.API_Mobile_ThemChiSoCoThe_import(Id, Ngay, CanNang, ChieuCao, LuongMoCoThe, MatDoCo, MatDoXuong, BMI, DCI, TuoiSinhHoc, LuongNuocCoThe, MoNoiTang, Nguc, Eo, Bung, Mong, Dui, Tay, UserId);
                        if (data[0][0].errorcode == 1) {
                            var a = {
                                SoDienThoai: Id,
                                Ngay: Ngay,
                                CanNang: CanNang,
                                ChieuCao: ChieuCao,
                                LuongMoCoThe: LuongMoCoThe,
                                MatDoCo: MatDoCo,
                                MatDoXuong: MatDoXuong,
                                BMI: BMI,
                                DCI: DCI,
                                TuoiSinhHoc: TuoiSinhHoc,
                                LuongNuocCoThe: LuongNuocCoThe,
                                MoNoiTang: MoNoiTang,
                                Nguc: Nguc,
                                Eo: Eo,
                                Bung: Bung,
                                Mong: Mong,
                                Dui: Dui,
                                Tay: Tay,
                                GhiChu: data[0][0].message
                            };
                            arr.push(a);
                        }
                    }
                    console.log(arr);

                    if (arr.length > 0) {
                        var workbook2 = new Excel.Workbook();
                        var worksheet2 = workbook2.addWorksheet('import_KhachHang_Loi', { properties: { tabColor: { argb: 'FF00FF00' } } });
                        worksheet2.columns = [
                            { header: 'STT', key: 'STT', width: 5 },
                            { header: 'Số điện thoại(*)', key: 'SoDienThoai', width: 15 },
                            { header: 'Ngày', key: 'Ngay', width: 15 },
                            { header: 'Cân nặng', key: 'CanNang', width: 15 },
                            { header: 'Chiều cao ', key: 'ChieuCao', width: 15 },
                            { header: 'Lượng mỡ cơ thể', key: 'LuongMoCoThe', width: 15 },
                            { header: 'Mật độ cơ ', key: 'MatDoCo', width: 15 },
                            { header: 'Mật động xương', key: 'MatDoXuong', width: 15 },
                            { header: 'BMI', key: 'BMI', width: 15 },
                            { header: 'DCI', key: 'DCI', width: 15 },
                            { header: 'Tuổi sinh học ', key: 'TuoiSinhHoc', width: 15 },
                            { header: 'Lượng nước cơ thể', key: 'LuongNuocCoThe', width: 15 },
                            { header: 'Mỡ nội tạng', key: 'MoNoiTang', width: 15 },
                            { header: 'Ngực', key: 'Nguc', width: 15 },
                            { header: 'Eo', key: 'Eo', width: 15 },
                            { header: 'Bụng', key: 'Bung', width: 15 },
                            { header: 'Mông', key: 'Mong', width: 15 },
                            { header: 'Đùi', key: 'Dui', width: 15 },
                            { header: 'Tay', key: 'Tay', width: 15 },
                            { header: 'Nội dung lỗi', key: 'GhiChu', width: 30 }
                        ];
                        var data_loi = arr;
                        var length = data_loi.length;
                        for (var i = 0; i < length; i++) {
                            var GhiChu = data_loi[i].GhiChu;
                            GhiChu = GhiChu.substring(0, GhiChu.length - 1);
                            var SoDienThoai = data_loi[i].SoDienThoai != 'null' ? data_loi[i].SoDienThoai : '';
                            var Ngay = data_loi[i].Ngay != 'null' ? data_loi[i].Ngay : '';
                            var CanNang = data_loi[i].CanNang != 'null' ? data_loi[i].CanNang : '';
                            var ChieuCao = data_loi[i].ChieuCao != 'null' ? data_loi[i].ChieuCao : '';
                            var LuongMoCoThe = data_loi[i].LuongMoCoThe != 'null' ? data_loi[i].LuongMoCoThe : '';
                            var MatDoCo = data_loi[i].MatDoCo != 'null' ? data_loi[i].MatDoCo : '';
                            var MatDoXuong = data_loi[i].MatDoXuong != 'null' ? data_loi[i].MatDoXuong : '';
                            var BMI = data_loi[i].BMI != 'null' ? data_loi[i].BMI : '';
                            var DCI = data_loi[i].DCI != 'null' ? data_loi[i].DCI : '';
                            var TuoiSinhHoc = data_loi[i].TuoiSinhHoc != 'null' ? data_loi[i].TuoiSinhHoc : '';
                            var LuongNuocCoThe = data_loi[i].LuongNuocCoThe != 'null' ? data_loi[i].LuongNuocCoThe : '';
                            var MoNoiTang = data_loi[i].MoNoiTang != 'null' ? data_loi[i].MoNoiTang : '';
                            var Nguc = data_loi[i].Nguc != 'null' ? data_loi[i].Nguc : '';
                            var Eo = data_loi[i].Eo != 'null' ? data_loi[i].Eo : '';
                            var Bung = data_loi[i].Bung != 'null' ? data_loi[i].Bung : '';
                            var Mong = data_loi[i].Mong != 'null' ? data_loi[i].Mong : '';
                            var Dui = data_loi[i].Dui != 'null' ? data_loi[i].Dui : '';
                            var Tay = data_loi[i].Tay != 'null' ? data_loi[i].Tay : '';
                            var LyDo = data_loi[i].GhiChu != 'null' ? data_loi[i].GhiChu : '';
                            worksheet2.addRow({
                                STT: (i + 1),   SoDienThoai: SoDienThoai,
                                Ngay: Ngay,
                                CanNang: CanNang,
                                ChieuCao: ChieuCao,
                                LuongMoCoThe: LuongMoCoThe,
                                MatDoCo: MatDoCo,
                                MatDoXuong: MatDoXuong,
                                BMI: BMI,
                                DCI: DCI,
                                TuoiSinhHoc: TuoiSinhHoc,
                                LuongNuocCoThe: LuongNuocCoThe,
                                MoNoiTang: MoNoiTang,
                                Nguc: Nguc,
                                Eo: Eo,
                                Bung: Bung,
                                Mong: Mong,
                                Dui: Dui,
                                Tay: Tay,
                                GhiChu: LyDo
                            });
                        }
                        var date = new Date();
                        var filename = 'Import_LSCanDo_FileLoi_' + date.getTime() + '.xlsx';
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

}
