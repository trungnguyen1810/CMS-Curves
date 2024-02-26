import { Injectable } from '@nestjs/common';
import { Core } from './core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppConfig } from './../app.config';
@Injectable()
export class CoreService {
  constructor(

    @InjectRepository(Core)
    private readonly coreRepo: Repository<Core>,
  ) { }

  async QueryDB(query: string) {
    return await this.coreRepo.query(query);
  }
  async SendMail(to, title, content) {
    const nodemailer = require('nodemailer');
    let mailTransporter = nodemailer.createTransport({
      //service: 'gmail',
      host: AppConfig.host_mail,
      port: AppConfig.port_mail,
      secure: true, // true for 587, false for other ports
      requireTLS: true,
      auth: {
        user: AppConfig.username_mail,
        pass: AppConfig.password_mail
      }
    });
    let mailDetails = {
      from: AppConfig.mailfrom,
      to: to,
      subject: title,
      text: content
    };
    return new Promise(resolve=>{
      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log(err)
          resolve({errorcode:1,message:err.toString()});
        } else {
          resolve({errorcode:0,message:'send mail success'});
        }
      });
    })
   
  }
}