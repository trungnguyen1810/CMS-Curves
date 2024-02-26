import { Controller, Get, Post, Put, Delete, Body, Param, Request, Response, Headers, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import { ApiMobileService } from './api-mobile.service';
import { AppConfig } from './../../app.config';
@Controller('mobile')
export class ApiCurvesController {
    private response: CoreResponse;
    constructor(private readonly apiService: ApiMobileService) {
        this.response = {};
    }
    // ok đã sửa
    @Post('auth/danhsachthucdonthamkhao')
    async GetDanhSachThucDonThamKhao(@Body() body, @Request() req) {
        try {
            if (!body.Ngay) {
                this.response.errorcode = 1;
                this.response.message = 'Tham số Ngay bắt buộc truyền,định dạng dd/mm/yyyy';
                this.response.data = {};
                return this.response;
            }
            let KhachHangId = req.user.Id;
            let data = await this.apiService.GetDanhSachThucDonThamKhao(body.Ngay, KhachHangId);
            let listmonan = data[0];
            let DanhSach = [];
            let arrBuaAnId = await this.apiService.GetDanhSachTenBuaAnTheoNgay(body.Ngay, 0);
            let BuaAnId = arrBuaAnId[0];
            for (let i = 0; i < BuaAnId.length; i++) {
                let BuaId = BuaAnId[i].Id;
                let TenBua = BuaAnId[i].TenBua;
                let ListMonAn = [];
                let TongCalo = 0;
                for (let j = 0; j < listmonan.length; j++) {
                    if (listmonan[j].BuaId == BuaId) {
                        let MonAnId = listmonan[j].MonAnId;
                        let TenMonAn = listmonan[j].TenMonAn;
                        let Calo = listmonan[j].Calo;
                        let SoLuong = listmonan[j].SoLuong;
                        let TinhTrang = listmonan[j].TinhTrang;
                        let DonViKhoiLuongId = listmonan[j].DonViKhoiLuongId;
                        let TenDonVi = listmonan[j].TenDonVi;
                        TongCalo = TongCalo + (Calo * SoLuong);
                        ListMonAn.push({ MonAnId: MonAnId, TenMonAn: TenMonAn, TinhTrang: TinhTrang, Calo: Calo, SoLuong: SoLuong, TenDonVi: TenDonVi, DonViKhoiLuongId: DonViKhoiLuongId })
                    }
                }
                DanhSach.push({ BuaId: BuaId, TenBua: TenBua, TongCalo: TongCalo, ListMonAn: ListMonAn });
            }
            this.response.errorcode = 0;
            this.response.message = 'Get danh sách thành công',
                this.response.data = DanhSach;
            return this.response;

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    // ok đã sửa
    @Post('auth/hoanthanhmonan')
    async HoanThanhMonAn(@Body() body, @Request() req) {
        try {
            if (!body.Ngay) {
                this.response.errorcode = 1;
                this.response.message = 'Tham số Ngay bắt buộc truyền dd/mm/yyyy';
                this.response.data = {};
                return this.response;
            }
            let UserId = req.user.Id;
            let data = await this.apiService.ApDungThucDonThamKhao(UserId, body.Ngay);
            this.response.errorcode = 0;
            this.response.message = 'Áp dụng thực đơn tham khảo thành công';
            this.response.data = {};
            return this.response;

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    // ok đã sửa
    @Post('auth/getdanhsachthucdontheongay')
    async GetDanhSachThucDonTheoNgay(@Body() body, @Request() req) {
        try {
            if (!body.Ngay) {
                this.response.errorcode = 1;
                this.response.message = 'Tham số Ngay bắt buộc truyền';
                this.response.data = {};
                return this.response;
            }
            let UserId = req.user.Id;
            let data = await this.apiService.GetDanhSachThucDonTheoNgay(body.Ngay, UserId);
            let listmonan = data[0];
            let DanhSach = [];
            let arrBuaAnId = await this.apiService.GetDanhSachTenBuaAnTheoNgay(body.Ngay, UserId);
            let BuaAnId = arrBuaAnId[0];
            for (let i = 0; i < BuaAnId.length; i++) {
                let BuaId = BuaAnId[i].Id;
                let TenBua = BuaAnId[i].TenBua;
                let ListMonAn = [];
                let TongCalo = 0;
                let ThoiGianNhacNho = null;
                for (let j = 0; j < listmonan.length; j++) {
                    if (listmonan[j].BuaId == BuaId) {
                        let MonAnId = listmonan[j].MonAnId;
                        let TenMonAn = listmonan[j].TenMonAn;
                        let Calo = listmonan[j].Calo;
                        let Id = listmonan[j].Id;
                        let SoLuong = listmonan[j].SoLuong;
                        let DonViKhoiLuongId = listmonan[j].DonViKhoiLuongId;
                        let TenDonVi = listmonan[j].TenDonVi;
                        ThoiGianNhacNho = listmonan[j].ThoiGianNhacNho
                        TongCalo = TongCalo + (Calo * SoLuong);
                        ListMonAn.push({ MonAnId: MonAnId, Id: Id, TenMonAn: TenMonAn, Calo: Calo, SoLuong: SoLuong, TenDonVi: TenDonVi, DonViKhoiLuongId: DonViKhoiLuongId })
                    }
                }
                DanhSach.push({ BuaId: BuaId, TenBua: TenBua, TongCalo: TongCalo, ThoiGianNhacNho: ThoiGianNhacNho, ListMonAn: ListMonAn });
            }
            this.response.errorcode = 0;
            this.response.message = 'get danh sách thực đơn của khách hàng thành công',
                this.response.data = DanhSach;
            return this.response;

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    // ok đã sửa
    @Post('auth/themmoimonan')
    async ThemMoiMonAnHoiVien(@Body() body, @Request() req) {
        try {
            if (!body.Ngay) {
                this.response.errorcode = 1;
                this.response.message = 'Tham số Ngay bắt buộc truyền dd/mm/yyyy';
                this.response.data = {};
                return this.response;
            }
            if (!body.BuaAnId) {
                this.response.errorcode = 1;
                this.response.message = 'Tham số BuaAnId bắt buộc truyền';
                this.response.data = {};
                return this.response;
            }
            if (!body.MonAnId) {
                this.response.errorcode = 1;
                this.response.message = 'Tham số MonAnId bắt buộc truyền';
                this.response.data = {};
                return this.response;
            }
            if (!body.SoLuong) {
                this.response.errorcode = 1;
                this.response.message = 'Tham số SoLuong bắt buộc truyền';
                this.response.data = {};
                return this.response;
            }
            let UserId = req.user.Id;
            let data = await this.apiService.ThemMoiMonAnHoiVien(UserId, body.Ngay, body.BuaAnId, body.MonAnId, body.SoLuong);
            let message = 'Thêm mới món ăn thành công';
            this.response.errorcode = 0;
            this.response.message = message;
                this.response.data = {};
            return this.response;

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    // ok đã sửa
    @Post('auth/editmonan')
    async EditMonAnHoiVien(@Body() body, @Request() req) {
        try {
            let UserId = req.user.Id;
            if (!body.Id) {
                this.response.errorcode = 1;
                this.response.message = 'Tham số Id bắt buộc truyền';
                this.response.data = {};
                return this.response;
            }
            if (!body.SoLuong) {
                this.response.errorcode = 1;
                this.response.message = 'Tham số SoLuong bắt buộc truyền';
                this.response.data = {};
                return this.response;
            }
            if (body.EditTaoMoi == 0) {
                if (!body.MonAnId) {
                    this.response.errorcode = 1;
                    this.response.message = 'Tham số MonAnId bắt buộc truyền';
                    this.response.data = {};
                    return this.response;
                }
                let data = await this.apiService.EditMonAnHoiVien(UserId, body.Id, body.MonAnId, body.SoLuong);
            } else {
                if (!body.TenMonAn) {
                    this.response.errorcode = 1;
                    this.response.message = 'Tham số TenMonAn bắt buộc truyền';
                    this.response.data = {};
                    return this.response;
                }
                if (!body.Calo) {
                    this.response.errorcode = 1;
                    this.response.message = 'Tham số Calo bắt buộc truyền';
                    this.response.data = {};
                    return this.response;
                }
                if (!body.DonViKhoiLuongId) {
                    this.response.errorcode = 1;
                    this.response.message = 'Tham số DonViKhoiLuongId bắt buộc truyền';
                    this.response.data = {};
                    return this.response;
                }
                let data = await this.apiService.EditMonAnHoiVien_TaoMoi(UserId, body.Id, body.TenMonAn, body.DonViKhoiLuongId, body.Calo, body.SoLuong);
            }

            let message = 'Sửa món ăn thành công';
            this.response.errorcode = 0;
            this.response.message = message;
            this.response.data = {};
            return this.response;

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    // ok đã sửa
    @Post('auth/datnhacnhomonan')
    async DatNhacNhoMonAn(@Body() body, @Request() req) {
        try {


            if (body.DatNhacNho == undefined) {
                this.response.errorcode = 1;
                this.response.message = 'Tham số DatNhacNho bắt buộc truyền';
                this.response.data = {};
                return this.response;
            }
            if (body.ThoiGianNhacNho == undefined) {
                this.response.errorcode = 1;
                this.response.message = 'Tham số ThoiGianNhacNho bắt buộc truyền';
                this.response.data = {};
                return this.response;
            }
            if (body.Ngay == undefined) {
                this.response.errorcode = 1;
                this.response.message = 'Tham số Ngay bắt buộc truyền';
                this.response.data = {};
                return this.response;
            }
            if (body.BuaId == undefined) {
                this.response.errorcode = 1;
                this.response.message = 'Tham số BuaId bắt buộc truyền';
                this.response.data = {};
                return this.response;
            }


            let UserId = req.user.Id;
            let data = await this.apiService.DatNhacNhoMonAn(UserId, body.Ngay, body.BuaId, body.DatNhacNho, body.ThoiGianNhacNho);
            let message = 'Đặt lịch nhắc nhở món ăn thành công';
            this.response.errorcode = 0;
            this.response.message = message;
            this.response.data = {};
            return this.response;

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Get('auth/getdanhsachmonan')
    async GetDanhSachMonAn() {
        try {
            let data = await this.apiService.GetDanhSachMonAn();
            let message = 'get danh sách món ăn thành công';
            this.response.errorcode = 0;
            this.response.message = message,
                this.response.data = data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Get('auth/getdanhsachdonvitinh')
    async GetDanhSachDonViTinh() {
        try {
            let data = await this.apiService.GetDanhSachDonViTinh();
            let message = 'get danh sách đơn vị tính thành công';
            this.response.errorcode = 0;
            this.response.message = message,
                this.response.data = data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }



    @Post('auth/getdanhsachthongbao')
    async GetDanhSachThongBao(@Body() body, @Request() req) {
        try {
            if (body.PageIndex == undefined) {
                this.response.errorcode = 1;
                this.response.message = 'Tham số PageIndex bắt buộc truyền';
                this.response.data = {};
                return this.response;
            }

            if (!body.PageSize) {
                this.response.errorcode = 1;
                this.response.message = 'Tham số PageSize bắt buộc truyền';
                this.response.data = {};
                return this.response;
            }
            let UserId = req.user.Id; 
            //let UserId = 1;
            let data = await this.apiService.GetDanhSachThongBao(UserId, body.PageSize, body.PageIndex);
            let message = 'get danh sách thông báo thành công';
            this.response.errorcode = 0;
            this.response.message = message;
            this.response.data = data[0];
            this.response['TongSoChuaDoc'] = data[1][0].TongSoChuaDoc;
            return this.response;

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('auth/capnhatinhtrangdocthongbao')
    async CapNhatTinhTrangDoc(@Body() body, @Request() req) {
        try {
            if (body.ThongBaoId == undefined) {
                this.response.errorcode = 1;
                this.response.message = 'Tham số ThongBaoId bắt buộc truyền';
                this.response.data = {};
                return this.response;
            }
            let UserId = req.user.Id;
            let data = await this.apiService.CapNhatTinhTrangDoc(UserId, body.ThongBaoId);
            let message = 'thành công';
            this.response.errorcode = 0;
            this.response.message = message;
            this.response.data = {};
            return this.response;

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('auth/chitietthongbao')
    async ChiTietThongBao(@Body() body, @Request() req) {
        try {
            if (body.ThongBaoId == undefined) {
                this.response.errorcode = 1;
                this.response.message = 'Tham số ThongBaoId bắt buộc truyền';
                this.response.data = {};
                return this.response;
            }
            let UserId = req.user.Id;
            let data = await this.apiService.ChiTietThongBao(UserId,body.ThongBaoId);
            let message = 'thành công';
            this.response.errorcode = 0;
            this.response.message = message;
            this.response.data = data[0][0];
            return this.response;

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('auth/getlichsuluyentap')
    async GetLichSuLuyenTap(@Body() body, @Request() req) {
        try {
            if (!body.NamThang) {
                this.response.errorcode = 1;
                this.response.message = 'Tham số NamThang bắt buộc truyền';
                this.response.data = {};
                return this.response;
            }
            let UserId = req.user.Id;
            let data = await this.apiService.GetLichSuLuyenTap(body.NamThang, UserId);
            let message = 'Get lịch sử luyện tập thành công';
            this.response.errorcode = 0;
            this.response.message = message;
            this.response.data = data[0];
            return this.response;

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('auth/themlichsuluyentap')
    async ThemLichSuLuyenTap(@Body() body, @Request() req) {
        try {

            let UserId = req.user.Id;
            var ListDay = body.NgayTapLuyen.split(",");
            for (let i = 0; i < ListDay.length; i++) {
                this.apiService.ThemLichSuLuyenTap(ListDay[i], UserId);
            }
            let message = 'Thêm lịch sử luyện tập thành công';
            this.response.errorcode = 0;
            this.response.message = message,
                this.response.data = {};
            return this.response;

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Get('noauth/curvescomplete')
    async GetCurvesComplete(@Body() body, @Request() req) {
        try {
            let data = await this.apiService.GetCurvesComplete();

            let message = 'get thành công';
            this.response.errorcode = 0;
            this.response.message = message;
            this.response.data = data[0][0];
            return this.response;

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('noauth/chitietcurvescomplete')
    async Api_Mobile_ChiTietCurvesComplete(@Body() body, @Request() req) {
        try {
            if (!body.CauHinhId) {
                this.response.errorcode = 1;
                this.response.message = 'Tham số Id bắt buộc truyền';
                this.response.data = {};
                return this.response;
            }
            let data = await this.apiService.Api_Mobile_ChiTietCurvesComplete(body.CauHinhId);

            let message = 'get thành công';
            this.response.errorcode = 0;
            this.response.message = message;
            this.response.data = data[0][0];
            return this.response;

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Get('noauth/listcurvescomplete')
    async API_Mobile_GetDanhSachCurvesComplete(@Body() body, @Request() req) {
        try {
            let data = await this.apiService.API_Mobile_GetDanhSachCurvesComplete();

            let message = 'get thành công';
            this.response.errorcode = 0;
            this.response.message = message;
            this.response.data = data[0];
            return this.response;

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('auth/tickmonan')
    async TickMonAn(@Body() body, @Request() req) {
        try {
            let UserId = req.user.Id;
            let Ngay = body.Ngay;
            let MonAnId = body.MonAnId;
            let BuaId = body.BuaId;
            let SoLuong = body.SoLuong;
            let TinhTrang = body.TinhTrang;
            let data = await this.apiService.TickMonAn(UserId, Ngay, MonAnId, SoLuong, TinhTrang, BuaId);
            let message = 'thành công';
            this.response.errorcode = 0;
            this.response.message = message;
            this.response.data = {};
            return this.response;

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('auth/xoamonan')
    async XoaMonAn(@Body() body, @Request() req) {
        try {
            let UserId = req.user.Id;
            let Ngay = body.Ngay;
            let Id = body.Id;
            let BuaId = body.BuaId;
            let data = await this.apiService.XoaMonAn(UserId, Id);
            let message = 'Xóa món ăn thành công';
            this.response.errorcode = 0;
            this.response.message = message,
                this.response.data = {};
            return this.response;

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('auth/themmonan_nhaptay')
    async ThemMoiMonAn_NhapTay(@Body() body, @Request() req) {
        try {
            let UserId = req.user.Id;
            let Ngay = body.Ngay;
            let BuaId = body.BuaId;
            let TenMonAn = body.TenMonAn;
            let Calo = body.Calo;
            let SoLuong = body.SoLuong;
            let DonViKhoiLuongId = body.DonViKhoiLuongId;
            let data = await this.apiService.ThemMoiMonAn_NhapTay(UserId, TenMonAn, DonViKhoiLuongId, Calo, SoLuong, Ngay, BuaId);
            let message = 'Thêm mới món ăn thành công';
            this.response.errorcode = 0;
            this.response.message = message,
                this.response.data = {};
            return this.response;

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('auth/danhsachtenbuaantheongaycuahoivien')
    async GetDanhSachTenBuaAnTheoNgay(@Body() body, @Request() req) {
        try {
            if (!body.Ngay) {
                this.response.errorcode = 1;
                this.response.message = "Tham số Ngay bắt buộc nhập đúng định dạng dd/mm/yyyy";
                this.response.data = [];
                return this.response;
            }
            let UserId = req.user.Id;
            let arrBuaAnId = await this.apiService.GetDanhSachTenBuaAnTheoNgay(body.Ngay, UserId);
            let message = 'get thành công';
            this.response.errorcode = 0;
            this.response.message = message,
                this.response.data = arrBuaAnId[0];
            return this.response;

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('auth/thembuaanhoivien')
    async ThemBuaAnHoiVien(@Body() body, @Request() req) {
        try {
            if (!body.Ngay) {
                this.response.errorcode = 1;
                this.response.message = "Tham số Ngay bắt buộc nhập đúng định dạng dd/mm/yyyy";
                this.response.data = [];
                return this.response;
            }
            if (!body.TenBuaAn) {
                this.response.errorcode = 1;
                this.response.message = "Tham số TenBuaAn bắt buộc nhập đúng định dạng dd/mm/yyyy";
                this.response.data = [];
                return this.response;
            }
            let UserId = req.user.Id;
            let data = await this.apiService.ThemBuaAnHoiVien(body.Ngay, body.TenBuaAn, UserId);

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

    @Post('auth/editbuaanhoivien')
    async EditBuaAnHoiVien(@Body() body, @Request() req) {
        try {

            if (!body.TenBuaAn) {
                this.response.errorcode = 1;
                this.response.message = "Tham số TenBuaAn bắt buộc nhập đúng định dạng dd/mm/yyyy";
                this.response.data = [];
                return this.response;
            }
            let UserId = req.user.Id;
            let data = await this.apiService.EditBuaAnHoiVien(body.BuaId, body.TenBuaAn, UserId, body.DatNhacNho, body.ThoiGianNhacNho);

            this.response.errorcode = data[0][0].errorcode;
            this.response.message = data[0][0].message,
                this.response.data = {};
            return this.response;

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    @Post('auth/xoabuaanhoivien')
    async XoaBuaAnHoiVien(@Body() body, @Request() req) {
        try {

            if (!body.BuaId) {
                this.response.errorcode = 1;
                this.response.message = "Tham số BuaId bắt buộc nhập đúng";
                this.response.data = [];
                return this.response;
            }
            let UserId = req.user.Id;
            let data = await this.apiService.XoaBuaAnHoiVien(body.BuaId, UserId);

            this.response.errorcode = 0;
            this.response.message = 'Xóa bữa ăn thành công',
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