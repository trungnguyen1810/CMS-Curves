import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('core')
export class Core {

  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 200,unique:true })
  name: string;

}
