export interface UserAwarenessData {
  user: {
    id: string;

    // The same user could connect multiple times to the same Room, so `id` is not unique
    // but `sessionId` is.
    sessionId: string;
    name: string;
    color: string;
  };
  cursor: {
    x: number;
    y: number;
  };
}
