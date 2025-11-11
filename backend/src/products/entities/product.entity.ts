import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from '../../categories/category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column({ nullable: true, type: 'simple-json' })
  images: string[];

  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
