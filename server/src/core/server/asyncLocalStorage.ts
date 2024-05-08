import { GqlContext } from "@/shared/types";
import { AsyncLocalStorage, executionAsyncId } from "async_hooks";

export interface LocalStorageState {
  ctx: GqlContext;
}

/**
 * Store shared by all functions that run inside a request
 * Useful to share the request context without passing it explicitly everywhere
 */
export const asyncLocalStorage = new AsyncLocalStorage<LocalStorageState>();

export function getGqlContextOrThrow() {
  const store = asyncLocalStorage.getStore();
  if (!store?.ctx) {
    throw new Error("Could not get GQLContext");
  }
  return store.ctx;
}

// const withContext = <T, U, V, X>(fn: (parent: T, args: U, ctx: V) => X) => {
//   return (p: T, a: U, c: V): X => {
//     return asyncLocalStorage.run(
//       {
//         ctx: c as any,
//       },
//       () => fn(p, a, c)
//     );
//   };
// };
