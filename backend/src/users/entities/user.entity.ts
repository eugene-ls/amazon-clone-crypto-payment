import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Wishlist } from '../../wishlist/entities/wishlist.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishlist: Wishlist[];
}