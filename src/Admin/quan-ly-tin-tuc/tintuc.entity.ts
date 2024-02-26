import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as crypto from 'crypto';
import { ApiProperty } from '@nestjs/swagger';
@Entity('tintuc')
export class TinTuc {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    Id: number;

    @Column({ length: 255})
    @ApiProperty()
    TieuDe: string;
    @Column({ type:'text' })
    @ApiProperty()
    TomTat: string;

    @Column({ type:'longtext' })
    @ApiProperty()
    NoiDung: string;

    @Column({ length: 200 })
    @ApiProperty()
    AnhDaiDien: string;

    @Column()
    @ApiProperty()
    TinhTrang: number;

    @Column()
    @ApiProperty()
    NguoiTaoId: Number;

    @Column()
    @ApiProperty()
    NguoiCapNhatId: Number;

    @Column()
    @ApiProperty()
    LoaiTinTucId: Number;

    @Column({ nullable: true})
    @ApiProperty()
    NgayTao: Date;

    @Column()
    @ApiProperty()
    NgayCapNhat: Date;
}
