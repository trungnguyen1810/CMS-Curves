import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
export function logger(req: Request, res: Response, next: Function) {
    next();
};

