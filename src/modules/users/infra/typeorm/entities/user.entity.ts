import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserModel } from '~/modules/users/domain';

import { ProductGroupEntity } from './product-group.entity';

@Entity('Users')
export class UserEntity implements UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdatedAt: Date;

  @Column({ nullable: true })
  phone?: number;

  @OneToMany(() => ProductGroupEntity, pGroup => pGroup.userId, {
    cascade: true,
  })
  productGroups: ProductGroupEntity[];
}
