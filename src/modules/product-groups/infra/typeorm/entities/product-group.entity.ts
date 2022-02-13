import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { GroupProductEntity } from '~/modules/group-products/infra';
import { ProductGroupModel } from '~/modules/product-groups/domain';
import { UserEntity } from '~/modules/users/infra';

@Entity('ProductGroups')
export class ProductGroupEntity implements ProductGroupModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.productGroups, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'userId' })
  userId: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdatedAt: Date;

  @OneToMany(() => GroupProductEntity, gProduct => gProduct.groupId, {
    cascade: true,
  })
  groupProducts: GroupProductEntity[];
}
