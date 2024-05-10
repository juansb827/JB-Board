import { PubSub } from "graphql-subscriptions";

/**
 * Todo: use redis
 */
export const pubsub = new PubSub();
// let i = 0;
// setInterval(() => {
//   pubsub.publish("asd", {
//     __typename: "RoomUserJoined",
//     data: i++,
//     type: "sub",
//   });
// }, 1000);
