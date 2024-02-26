import { Request, Response } from 'express';

import { AppConfig } from './../app.config';
import * as jwt from 'jsonwebtoken';
import { AppService } from './../app.service';
export function auth(req: Request, res: Response, next: Function) {
    let path = req.path;
    if (path.includes('api/admin')) {
        if (path == '/api/admin/user/login' || path == '/api/admin/tintuc/ckeditor_upload') {
            next();
        } else {
            isAuthenticatedAdmin(req, res, next);
        }
    } else {

        if (path.includes('api/mobile/noauth')) {
            isAuThenticatedTokenDev(req, res, next);
        } else {
            if (path.includes('api/mobile/auth')) {
                isAuthenticatedMobile(req, res, next);
            } else {
                next();
            }
        }
    }
    // }else{
    //     if (path.includes('api/mobile/noauth')) {
    //         isAuThenticatedTokenDev(req, res, next);
    //     } 
    //     if(path.includes('api/mobile/auth')){
    //         isAuthenticatedMobile(req, res, next);        
    //     }
    //     if (path.includes('upload/')) {
    //         console.log(path)
    //         next();
    //     }
    //     next();
    // }    
};
function isAuthenticatedAdmin(req, res, next) {
    let token = req.headers.token;
    if (!token || token == undefined) {
        return res.status(401).send({ errorcode: 401, message: 'token không đúng hoặc phiên đăng nhập hết hạn', statusCode: 401, timestamp: new Date().toISOString(), path: req.path });
    }
    try {
        var decoded = jwt.verify(token, AppConfig.Key_Token_QuanTri);
        req['user'] = decoded.user;
        next();
    } catch (err) {
        return res.status(401).send({ errorcode: 401, message: 'token không đúng hoặc phiên đăng nhập hết hạn', statusCode: 401, timestamp: new Date().toISOString(), path: req.path });
    }
}
async function isAuthenticatedMobile(req, res, next) {
    
    let token = req.headers.token;
    if (!token || token == undefined) {
        return res.status(401).send({ errorcode: 401, message: 'token không đúng hoặc phiên đăng nhập hết hạn', statusCode: 401, timestamp: new Date().toISOString(), path: req.path });

    }
    let MaMayUuid = req.headers.mamayuuid;
    if (!MaMayUuid || MaMayUuid == undefined) {
        return res.status(401).send({ errorcode: 401, message: 'MaMayUuid bắt buộc truyền', statusCode: 401, timestamp: new Date().toISOString(), path: req.path });
    }
    try {
        var decoded = jwt.verify(token, AppConfig.Key_Token_Mobile);
        req['user'] = decoded.user;
        let data = await CheckMaMayUuid(decoded.user.Id, MaMayUuid);
        let errorcode = data[0][0].errorcode;
        if (errorcode == 1) {
            return res.status(401).send({ errorcode: 401, message: data[0][0].message, statusCode: 401, timestamp: new Date().toISOString(), path: req.path });
        } else {
            next();
        }
    } catch (err) {
        console.log(err)
        return res.status(401).send({ errorcode: 401, message: 'token không đúng hoặc phiên đăng nhập hết hạn', statusCode: 401, timestamp: new Date().toISOString(), path: req.path });
    }
}
function isAuThenticatedTokenDev(req, res, next) {
    let token_dev = req.headers.tokendev;
    if (!token_dev || token_dev == undefined) {
        return res.status(401).send({ errorcode: 401, message: 'tham số token dev bắt buộc truyền', statusCode: 401, timestamp: new Date().toISOString(), path: req.path });
    }
    if (token_dev != AppConfig.Token_dev) {
        return res.status(401).send({ errorcode: 401, message: 'token dev không đúng', statusCode: 401, timestamp: new Date().toISOString(), path: req.path });

    } else {
        next();
    }
}
async function CheckMaMayUuid(UserId, MaMayUuid) {
    var pool = require('./db');

    return new Promise(function (resolve, reject) {
        pool.query(`CALL API_Mobile_CheckMaMayUuid(${UserId},'${MaMayUuid}')`, function (err, result, fields) {
            if (err) {
                throw new Error(err);
            } else {
                resolve(result);
            }
        })
    });

}
