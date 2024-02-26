import { Controller, Get, Post, Put, Delete, Body, Param, Request, Response, Headers } from '@nestjs/common';
import { CoreResponse } from '../../core.respone';
import { ApiSocialService } from './api-social.service';
import { AppConfig } from '../../app.config';
import * as jwt from 'jsonwebtoken';

@Controller('mobile/noauth/social')
export class ApiSocialController {
    private response: CoreResponse;
    constructor(private readonly service: ApiSocialService) {
        this.response = {};
    }

    @Post('/login')
    async LoginGmail(@Body() body, @Request() req) {
        let item = body;
        console.log(body);
        try {
            let access_token = body.access_token;
            if (!access_token) {
                this.response.errorcode = 1;
                this.response.message = 'Login gmail : tham số access_token bắt buộc truyền';
                this.response.data = {};
                return this.response;
            }
            let SERVICE = body.service;
            if (SERVICE == "FACEBOOK") {
                let options = {
                    url: `https://graph.facebook.com/v3.1/me?fields=id,name,email&access_token=${access_token}`,
                    method: 'GET',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
                    }
                };

                let response = await this.promisifiedRequest(options);
                let body = response['body'];
                let code = response['statusCode'];
                if (code == 200) {
                    let email = JSON.parse(body).email;
                    let data = await this.service.Login(email, item.MaMayUuid, item.MaHeDieuHanh, item.Tokenfirebase);
                    // gen new token
                    this.response.errorcode = 0;
                    this.response.message = 'Đăng nhập thành công';
                    let user = JSON.parse(JSON.stringify(data[0][0]));
                    let data_res = {
                        token: jwt.sign({ user: user }, AppConfig.Key_Token_Mobile, { expiresIn: AppConfig.Time_Expire_Mobile }),
                        user: user
                    };
                    this.response.data = data_res;
                    return this.response;
                } else {
                    this.response.errorcode = 1;
                    this.response.message = 'token facebook không đúng hoặc hết hạn';
                    this.response.data = {};
                    return this.response;
                }
            }
            if (SERVICE == "GMAIL") {
                let options = {
                    url: `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${access_token}`,
                    method: 'GET',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
                    }
                };

                let response = await this.promisifiedRequest(options);
                let body = response['body'];
                let code = response['statusCode'];
                if (code == 200) {
                    let email = JSON.parse(body).email;
                    let data = await this.service.Login(email, item.MaMayUuid, item.MaHeDieuHanh, item.Tokenfirebase);
                    // gen new token
                    this.response.errorcode = 0;
                    this.response.message = 'Đăng nhập thành công';
                    let user = JSON.parse(JSON.stringify(data[0][0]));
                    let data_res = {
                        token: jwt.sign({ user: user }, AppConfig.Key_Token_Mobile, { expiresIn: AppConfig.Time_Expire_Mobile }),
                        user: user
                    };
                    this.response.data = data_res;
                    return this.response;
                } else {
                    this.response.errorcode = 1;
                    this.response.message = 'token gmail không đúng hoặc hết hạn';
                    this.response.data = {};
                    return this.response;
                }
            }
            if (SERVICE == "APPLE") {
                let decoded = this.parseJwt(access_token);
                if (decoded != {}) {
                    let email = decoded.email;
                    let data = await this.service.Login(email, item.MaMayUuid, item.MaHeDieuHanh, item.Tokenfirebase);
                    // gen new token
                    this.response.errorcode = 0;
                    this.response.message = 'Đăng nhập thành công';
                    let user = JSON.parse(JSON.stringify(data[0][0]));
                    let data_res = {
                        token: jwt.sign({ user: user }, AppConfig.Key_Token_Mobile, { expiresIn: AppConfig.Time_Expire_Mobile }),
                        user: user
                    };
                    this.response.data = data_res;
                    return this.response;
                } else {
                    this.response.errorcode = 1;
                    this.response.message = 'token apple không đúng hoặc hết hạn';
                    this.response.data = {};
                    return this.response;
                }
            }

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString();
            this.response.data = {};
            return this.response;
        }
    }
    parseJwt(token) {
        try {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (error) {
            return {};
        }
    }
    promisifiedRequest(options) {
        return new Promise((resolve, reject) => {
            let request = require('request');
            request(options, (error, response, body) => {
                if (response) {
                    return resolve(response);
                }
                if (error) {
                    return reject(error);
                }
            });
        });
    };

}