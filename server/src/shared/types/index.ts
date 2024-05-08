import DataLoader from "dataloader";

/**
 * Type Alias of the builtin "Date"
 * Needed inside generated types cause the builtin "Date" type is overwritten
 */
export type JSDate = Date;
export type ID = string | number;

export interface GqlContext {
  user: {
    id: ID;
  };
  dataLoaders: { [k: string]: DataLoader<any, any> };
  getOrCreateLoader: <K, V>(
    name: string,
    createLoaderFn: () => DataLoader<K, V>
  ) => DataLoader<K, V>;
}

export declare type Maybe<T> = null | undefined | T;
/**
 * Marks as optional all properties that are lazily resolved
 */
type Scalars = string | Date | number | boolean | undefined | null;

export type Resolved<T> = {
  [P in keyof T as T[P] extends Scalars ? P : never]: T[P];
} & {
  [P in keyof T as T[P] extends Scalars ? never : P]?: T[P];
};
// // type B  = Resolved<User>
// // const b: B=  {} as any;
// // b.
// // type C = Extract<User, string>
// // const c: C = {} as any;
// // c.

export type DeepPartial<T> = T extends
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  | symbol
  | Date
  ? T | undefined
  : // Arrays, Sets and Maps and their readonly counterparts have their items made
  // deeply partial, but their own instances are left untouched
  T extends Array<infer ArrayType>
  ? Array<DeepPartial<ArrayType>>
  : T extends ReadonlyArray<infer ArrayType>
  ? ReadonlyArray<ArrayType>
  : T extends Set<infer SetType>
  ? Set<DeepPartial<SetType>>
  : T extends ReadonlySet<infer SetType>
  ? ReadonlySet<SetType>
  : T extends Map<infer KeyType, infer ValueType>
  ? Map<DeepPartial<KeyType>, DeepPartial<ValueType>>
  : T extends ReadonlyMap<infer KeyType, infer ValueType>
  ? ReadonlyMap<DeepPartial<KeyType>, DeepPartial<ValueType>>
  : // ...and finally, all other objects.
    {
      [K in keyof T]?: DeepPartial<T[K]>;
    };

// type OptionalArrayOr<T, Otherwise> = T extends T[]
//   ? T[] | undefined
//   : Otherwise;
// type OptionalUndefinedOr<T, Otherwise> = T extends undefined
//   ? undefined
//   : Otherwise;
// type OptionalNullOr<T, Otherwise> = T extends null
//   ? null | undefined
//   : Otherwise;
// type OptionalStringOr<T, Otherwise> = T extends string
//   ? T | undefined
//   : Otherwise;
// type OptionalNumberOr<T, Otherwise> = T extends number
//   ? T | undefined
//   : Otherwise;
// type OptionalBooleanOr<T, Otherwise> = T extends boolean
//   ? boolean | undefined
//   : Otherwise;

// export type DeepPartial<T> = OptionalStringOr<
//   T,
//   OptionalNumberOr<
//     T,
//     OptionalBooleanOr<
//       T,
//       OptionalNullOr<
//         T,
//         OptionalUndefinedOr<
//           T,
//           OptionalArrayOr<
//             T,
//             T extends object
//               ? { [Key in keyof T]?: DeepPartial<T[Key]> }
//               : undefined
//           >
//         >
//       >
//     >
//   >
// >;
