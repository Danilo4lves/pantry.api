import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { GroupProductStorePriceModel } from '~/modules/group-products/domain';
import { StoreEntity } from '~/modules/stores/infra/typeorm/entities';

import { GroupProductEntity } from './group-product.entity';

@Entity('GroupProductStorePrices')
export class GroupProductStorePriceEntity
  implements GroupProductStorePriceModel
{
  @ManyToOne(() => StoreEntity, store => store.id, { primary: true })
  @JoinColumn({ name: 'storeId' })
  storeId: number;

  @ManyToOne(() => GroupProductEntity, gProduct => gProduct.id, {
    primary: true,
  })
  @JoinColumn({ name: 'groupProductId' })
  groupProductId: number;

  @Column()
  price: number;

  @Column()
  date: Date;
}
