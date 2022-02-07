import * as faker from 'faker';
import { Factory } from 'fishery';

export const optionalFactory = {
  build<DataType = any>(data: DataType): DataType | undefined {
    return Factory.define<DataType | undefined>(() => {
      const shouldRender = faker.datatype.boolean();

      if (shouldRender) {
        return data;
      }

      return undefined;
    }).build();
  },
};
