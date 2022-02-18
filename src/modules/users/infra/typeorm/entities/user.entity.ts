import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProductGroupEntity } from '~/modules/product-groups/infra/typeorm/entities';
import { UserModel } from '~/modules/users/domain';

@Entity('Users')
export class UserEntity implements UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken?: string;

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
