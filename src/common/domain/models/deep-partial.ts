export declare type DeepPartial<TModel> = {
  [P in keyof TModel]?: TModel[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : TModel[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<TModel[P]> | TModel[P];
};
