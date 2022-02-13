import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { GroupProductEntity } from '~/modules/group-products/infra';
import { ProductModel } from '~/modules/products/domain';

@Entity('Products')
export class ProductEntity implements ProductModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  barCode: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => GroupProductEntity, gProduct => gProduct.productId)
  groupProducts: GroupProductEntity[];
}
