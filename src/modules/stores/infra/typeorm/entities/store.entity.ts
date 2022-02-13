import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { GroupProductStorePriceEntity } from '~/modules/group-products/infra/typeorm/entities';
import { StoreModel } from '~/modules/stores/domain';

@Entity('Stores')
export class StoreEntity implements StoreModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => GroupProductStorePriceEntity, x => x.storeId)
  groupProductStorePrices: GroupProductStorePriceEntity[];
}
