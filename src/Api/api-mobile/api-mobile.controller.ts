import { Controller, Get, Post, Put, Delete, Body, Param, Request, Response, Headers, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import { ApiMobileService } from './api-mobile.service';
import * as jwt from 'jsonwebtoken';
import { AppConfig } from './../../app.config';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('mobile')
export class ApiMobileController {
    private response: CoreResponse;
    constructor(private readonly apiService: ApiMobileService) {
        this.response = {};
    }
    @Post('noauth/login')
    async Login(@Body() body) {
        if (!body.Email_SDT) {
            this.response.errorcode = 1;
            this.response.message = 'Email/Số điện thoại bắt buộc nhập',
                this.response.data = {};
            return this.response;
        }
        if (!body.MatKhau) {
            this.response.errorcode = 1;
            this.response.message = 'Mật khẩu bắt buộc nhập',
                this.response.data = {};
            return this.response;
        }
        try {
            let data = await this.apiService.LoginApp(body.Email_SDT, body.MatKhau, body.Tokenfirebase, body.MaMayUuid, body.MaHeDieuHanh);
            if (data[0].length > 0) {
                this.response.errorcode = 0;
                this.response.message = 'Đăng nhập thành công';
                let data_res = {
                    token: jwt.sign({ user: data[0][0] }, AppConfig.Key_Token_Mobile, { expiresIn: AppConfig.Time_Expire_Mobile }),
                    user: data[0][0]
                };
                this.response.data = data_res;
                return this.response;
            } else {
                this.response.errorcode = 1;
                this.response.message = 'Thông tin đăng nhập không đúng,vui lòng kiểm tra lại',
                    this.response.data = {};
                return this.response;
            }

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString(),
                this.response.data = {};
            return this.response;
        }
    }

    @Post('noauth/dangky')
    async DangKyHoiVien(@Body() body) {
        if (!body.Email_SDT) {
            this.response.errorcode = 1;
            this.response.message = 'Email/Số điện thoại bắt buộc nhập';
            this.response.data = {};
            return this.response;
        }
        if (!body.MatKhau) {
            this.response.errorcode = 1;
            this.response.message = 'Mật khẩu bắt buộc nhập',
                this.response.data = {};
            return this.response;
        }
        if (!body.ReMatKhau) {
            this.response.errorcode = 1;
            this.response.message = 'Nhập lại mật khẩu bắt buộc nhập';
            this.response.data = {};
            return this.response;
        }
        if (body.ReMatKhau != body.MatKhau) {
            this.response.errorcode = 1;
            this.response.message = 'Mật khẩu không khớp';
            this.response.data = {};
            return this.response;
        }
        let phone = 0;
        if (!this.validatePhone(body.Email_SDT)) {
            phone = 0
        } else {
            phone = 1;
        }


        if (!this.validatePhone(body.Email_SDT) && !this.validateEmail(body.Email_SDT)) {
            this.response.errorcode = 1;
            this.response.message = 'Email/Số điện thoại sai định dạng';
            this.response.data = {};
            return this.response;
        }
        try {
            let data = await this.apiService.DangKyHoiVien(body.Email_SDT, body.MatKhau, phone);

            if (data[0][0].errorcode == 1) {
                this.response.errorcode = 1;
                this.response.message = data[0][0].message,
                    this.response.data = {};
            } else {
                this.response.errorcode = 0;
                this.response.message = 'Thành công';
                this.response.data = {};
            }

            return this.response;

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString(),
                this.response.data = {};
            return this.response;
        }
    }

    @Post('noauth/quenmatkhau')
    async QuenMatKhau(@Body() body) {
        var nodemailer = require('nodemailer');
        if (!body.Email) {
            this.response.errorcode = 1;
            this.response.message = 'Email bắt buộc nhập',
                this.response.data = {};
            return this.response;
        }

        if (!this.validateEmail(body.Email)) {
            this.response.errorcode = 1;
            this.response.message = 'Email sai định dạng',
                this.response.data = {};
            return this.response;
        }
        try {
            let data = await this.apiService.QuenMatKhau(body.Email);
            if (data[0][0].errorcode == 1) {
                this.response.errorcode = 1;
                this.response.message = data[0][0].message,
                    this.response.data = {};
            } else {
                // console.log(data[0][0].MaXacNhan);
                var transporter = nodemailer.createTransport({ // config mail server
                    service: 'gmail',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'curvesve@gmail.com',
                        pass: 'app@1234'
                    }, tls: {
                        rejectUnauthorized: true
                    }
                });

                var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                    from: 'curvesve@gmail.com',
                    to: body.Email,
                    subject: 'OTP quên mật khẩu',
                    text: 'Bạn nhận 1 tin nhắn từ ' + body.Email,
                    html: '<p><b>OTP Quên mật khẩu của bạn là :' + data[0][0].MaXacNhan + ' </b></p>'
                }
                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                        // this.response.errorcode = 1;
                        // this.response.message = 'Lỗi gửi mail',
                        // this.response.data = {};
                        //return 0;
                    } else {
                        console.log('Message sent: ' + info.response);
                        // this.response.errorcode = 0;
                        // this.response.message = 'Thành công',
                        // this.response.data = {};
                        // return 1;
                    }

                });

                this.response.errorcode = 0;
                this.response.message = 'Thành công',
                    this.response.data = {};
            }

            return this.response;


        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString(),
                this.response.data = {};
            return this.response;
        }
    }

    @Post('noauth/xacnhanquenmatkhau')
    async XacNhanQuenMatKhau(@Body() body) {
        var nodemailer = require('nodemailer');
        if (!body.Email) {
            this.response.errorcode = 1;
            this.response.message = 'Email bắt buộc nhập',
                this.response.data = {};
            return this.response;
        }

        if (!body.MaXacNhan) {
            this.response.errorcode = 1;
            this.response.message = 'Mã xác nhận bắt buộc nhập',
                this.response.data = {};
            return this.response;
        }

        if (!this.validateEmail(body.Email)) {
            this.response.errorcode = 1;
            this.response.message = 'Email sai định dạng',
                this.response.data = {};
            return this.response;
        }
        try {
            let data = await this.apiService.XacNhanQuenMatKhau(body.Email, body.MaXacNhan);
            if (data[0][0].Valid == 2) {
                this.response.errorcode = 1;
                this.response.message = 'Mã xác nhập hết hạn',
                    this.response.data = {};
            } else if (data[0][0].Valid == 3) {
                this.response.errorcode = 1;
                this.response.message = 'Mã xác nhận không đúng',
                    this.response.data = {};
            }
            else {
                // console.log(data[0][0].MaXacNhan);
                // var transporter = nodemailer.createTransport({ // config mail server
                //     service: 'smtp.gmail.com',
                //     port: 465,
                //     secure: false,
                //     auth: {
                //         user: 'hokhacnam91@gmail.com',
                //         pass: 'hokhacnam1991'
                //     }, tls: {
                //               rejectUnauthorized: false
                //             }
                // });

                // var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                //     from: 'hokhacnam91@gmail.com',
                //     to: body.Email,
                //     subject: 'OTP quên mật khẩu',
                //     text: 'Bạn nhận 1 tin nhắn từ ' + body.Email,
                //     html: '<p><b>Mật khẩu của bạn là :'+data[0][0].MatKhau+' </b></p>'
                // }
                // transporter.sendMail(mainOptions, function (err, info) {
                //     if (err) {
                //         console.log(err);
                //         // this.response.errorcode = 1;
                //         // this.response.message = 'Lỗi gửi mail',
                //         // this.response.data = {};
                //         //return 0;
                //     } else {
                //         console.log('Message sent: ' + info.response);
                //         // this.response.errorcode = 0;
                //         // this.response.message = 'Thành công',
                //         // this.response.data = {};
                //        // return 1;
                //     }

                // });

                let data1 = await this.apiService.QuenMatKhauDangNhap(body.Email, data[0][0].MatKhau);
                if (data1[0].length > 0) {
                    this.response.errorcode = 0;
                    this.response.message = 'Đăng nhập thành công';
                    let data_res = {
                        token: jwt.sign({ user: data1[0][0] }, AppConfig.Key_Token_Mobile, { expiresIn: AppConfig.Time_Expire_Mobile }),
                        user: data1[0][0]
                    };
                    this.response.data = data_res;
                    // return this.response;
                } else {
                    this.response.errorcode = 1;
                    this.response.message = 'Thông tin đăng nhập không đúng,vui lòng kiểm tra lại',
                        this.response.data = {};
                    // return this.response;
                }

                // this.response.errorcode = 0;
                // this.response.message = 'Mật khẩu đã gửi tới khách hàng qua email',
                // this.response.data = {};
            }

            return this.response;


        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString(),
                this.response.data = {};
            return this.response;
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


    validatePhone(phone) {
        var re = /^[0-9]+$/;
        console.log(phone.replace(/\s+/g, ''));
        return re.test(phone.replace(/\s+/g, ''));
    }

    // SendEmail(des, title, content) {
    //     var deferred = require('deferred');
    //     try {

    //         var mailSend = {
    //             //service: 'gmail',
    //             host: '118.71.206.105',
    //             port: 25,
    //             secure: false, // true for 465, false for other ports
    //             auth: {
    //                 user: 'hokhacnam91@gmail.com',
    //                 pass: 'hokhacnam1991'
    //             }
    //         }

    //         var nodemailer = require('nodemailer');
    //         let transporter = nodemailer.createTransport(mailSend);
    //         var mailOptions = {
    //             from: mailSend.auth.user,
    //             to: des,
    //             subject: title,
    //             html: content,
    //         };
    //         transporter.sendMail(mailOptions, function (error, info) {
    //             if (error) {
    //                 console.log(error);
    //                 console.log("Send mail Fail.");
    //                 this.response.errorcode = 1;
    //                 this.response.message = "Send mail Fail.",
    //                     this.response.data = {};
    //                 // return this.response;
    //                 deferred.resolve({ errorcode: 1, message: "Lỗi gửi email!" });
    //             } else {
    //                 var message = "Email của quý khách là " + des +
    //                     ". Một email có chứa mã xác nhận của Quý khách sẽ được gửi tới email này. Vui lòng kiểm tra hòm thư và tiếp tục!";
    //                 console.log(message);
    //                 this.response.errorcode = 0;
    //                 this.response.message = message,
    //                     this.response.data = {};
    //                 deferred.resolve({ errorcode: 0, message: message });
    //             }
    //         });
    //     }
    //     catch (error) {
    //         this.response.errorcode = 1;
    //         this.response.message = 'có lỗi xảy ra :' + error.toString(),
    //             this.response.data = {};
    //         deferred.resolve({ errorcode: 1, message: 'có lỗi xảy ra :' + error.toString() });
    //     }
    //     return deferred.promise;
    // }

    @Post('auth/quenmatkhaudoipass')
    async changePasswordQMK(@Body() body, @Request() req) {
        let UserId = req.user.Id;
        if (!body.MatKhauMoi) {
            this.response.errorcode = 1;
            this.response.message = 'Mật khẩu mới bắt buộc nhập',
                this.response.data = {};
            return this.response;
        }
        if (!body.ReMatKhauMoi) {
            this.response.errorcode = 1;
            this.response.message = 'Nhập lại mật khẩu mới bắt buộc nhập',
                this.response.data = {};
            return this.response;
        }
        if (body.ReMatKhauMoi != body.MatKhauMoi) {
            this.response.errorcode = 1;
            this.response.message = 'Mật khẩu mới không khớp',
                this.response.data = {};
            return this.response;
        }
        if (body.MatKhauMoi.length < 6) {
            this.response.errorcode = 1;
            this.response.message = 'Mật khẩu mới có ít nhất 6 ký tự',
                this.response.data = {};
            return this.response;
        }
        try {
            let data = await this.apiService.ChangePasswordQMK(UserId, body.MatKhauMoi);
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
    @Post('auth/CapNhatThongTin')
    async ChangeThongTinTaiKhoan(@Body() body, @Request() req) {
        let UserId = req.user.Id;
        if (!body.HoVaTen) {
            this.response.errorcode = 1;
            this.response.message = 'Họ và tên bắt buộc nhập',
                this.response.data = {};
            return this.response;
        }
        if (!body.SoDienThoai) {
            this.response.errorcode = 1;
            this.response.message = 'Số điện thoại bắt buộc nhập',
                this.response.data = {};
            return this.response;
        }
        if (!body.Email) {
            this.response.errorcode = 1;
            this.response.message = 'Email bắt buộc nhập',
                this.response.data = {};
            return this.response;
        }
        if (!body.DiaChi) {
            this.response.errorcode = 1;
            this.response.message = 'Địa chỉ bắt buộc nhập',
                this.response.data = {};
            return this.response;
        }
        try {
            let data = await this.apiService.ChangeThongTin(UserId, body.HoVaTen, body.SoDienThoai, body.Email, body.DiaChi);
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

    @Post('auth/ThongTinTaiKhoan')
    async ThongTinTaiKhoan(@Request() req) {
        let UserId = req.user.Id;
        try {
            let data = await this.apiService.ThongTinKhachHang(UserId);
            this.response.errorcode = 0;
            this.response.message = 'Thành công';
            this.response.data = data[0][0];
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }



    @Post('auth/CapNhatAnhDaiDien')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: AppConfig.Dir_upload
            , filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async upload(@UploadedFile() file, @Request() req) {

        if (!file) {
            this.response.errorcode = 1;
            this.response.message = 'Vui lòng chọn ảnh đại diện';
            this.response.data = {};
            return this.response;
        }

        if (!file.filename) {
            this.response.errorcode = 1;
            this.response.message = 'Upload ảnh đại diện không thành công',
                this.response.data = file;
            return this.response;
        }

        let data = await this.apiService.ChangeAnh(req.user.Id, 1, '/upload/' + file.filename);
        this.response.errorcode = 0;
        this.response.message = 'Upload ảnh đại diện thành công';
        this.response.data = file;
        return this.response;
    }

    @Post('auth/CapNhatAnhBia')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: AppConfig.Dir_upload
            , filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async uploadanhbia(@UploadedFile() file, @Request() req) {

        if (!file) {
            this.response.errorcode = 1;
            this.response.message = 'Vui lòng chọn ảnh đại diện',
                this.response.data = {};
            return this.response;
        }

        if (!file.filename) {
            this.response.errorcode = 1;
            this.response.message = 'Upload ảnh đại diện không thành công',
                this.response.data = file;
            return this.response;
        }

        let data = await this.apiService.ChangeAnh(req.user.Id, 2, '/upload/' + file.filename);
        this.response.errorcode = 0;
        this.response.message = 'Upload ảnh đại diện thành công',
            this.response.data = file;
        return this.response;
    }

    @Post('auth/changepassword')
    async changePassword(@Body() body, @Request() req) {
        let UserId = req.user.Id;
        if (!body.MatKhauCu) {
            this.response.errorcode = 1;
            this.response.message = 'Mật khẩu cũ bắt buộc nhập',
                this.response.data = {};
            return this.response;
        }
        if (!body.MatKhauMoi) {
            this.response.errorcode = 1;
            this.response.message = 'Mật khẩu mới bắt buộc nhập',
                this.response.data = {};
            return this.response;
        }
        if (!body.ReMatKhauMoi) {
            this.response.errorcode = 1;
            this.response.message = 'Nhập lại mật khẩu mới bắt buộc nhập',
                this.response.data = {};
            return this.response;
        }
        if (body.ReMatKhauMoi != body.MatKhauMoi) {
            this.response.errorcode = 1;
            this.response.message = 'Mật khẩu mới không khớp',
                this.response.data = {};
            return this.response;
        }
        if (body.MatKhauMoi.length < 6) {
            this.response.errorcode = 1;
            this.response.message = 'Mật khẩu mới có ít nhất 6 ký tự';
            this.response.data = {};
            return this.response;
        }
        try {
            let data = await this.apiService.ChangePassword(UserId, body.MatKhauCu, body.MatKhauMoi);
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
    @Get('auth/khoataikhoan')
    async KhoaTaiKhoan( @Request() req) {
        let UserId = req.user.Id;       
        try {
            let data = await this.apiService.KhoaTaiKhoan(UserId);
            this.response.errorcode = 0;
            this.response.message = 'Xóa tài khoản thành công';
            this.response.data = {};
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    
    @Get('noauth/danhmucsanpham/getlistdanhmuc')
    async getDanhMucSanPham() {
        try {
            let data = await this.apiService.GetListDanhMucSanPham(100, 0);
            this.response.errorcode = 0;
            this.response.message = 'thành công';
            this.response.data = { data: data[0] };
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }

    @Get('noauth/cauhinhlienhe')
    async getCauHinhLienHe() {
        try {
            let data = await this.apiService.API_Mobile_LienHe_CauHinh();
            this.response.errorcode = 0;
            this.response.message = 'thành công';
            this.response.data = data[0][0];
            return this.response;
        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }

}
