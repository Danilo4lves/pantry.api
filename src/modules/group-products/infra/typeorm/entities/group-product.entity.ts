import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { GroupProductModel } from '~/modules/group-products/domain';
import { ProductGroupEntity } from '~/modules/product-groups/infra';
import { ProductEntity } from '~/modules/products/infra';

@Entity('GroupProducts')
export class GroupProductEntity implements GroupProductModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, product => product.groupProducts)
  @JoinColumn({ name: 'productId' })
  productId: number;

  @ManyToOne(() => ProductGroupEntity, pGroup => pGroup.groupProducts, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'groupId' })
  groupId: number;

  @Column()
  price: number;

  @Column()
  expirationDate: Date;

  @Column()
  buyDate: Date;
}
