import { Maybe } from "graphql/jsutils/Maybe";

/**
 * TODO: move to features
 */
export interface UserAwarenessData {
  user?: {
    id: string;

    // The same user could connect multiple times to the same Room, so `id` is not unique
    // but `sessionId` is.
    connectionId: string;
    name: string;
    color: string;
    // Color for the fallback avatar image shown when the user does not have a profile picture
    avatarColorClassName: string;
    avatarUrl?: string;
    nameInitials: string;
  };
  cursor?: {
    x: number;
    y: number;
  };
}

export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}
