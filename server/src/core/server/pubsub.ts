import { PubSub } from "graphql-subscriptions";

/**
 * Todo: use redis
 */
export const pubsub = new PubSub();
// let i = 0;
// setInterval(() => {
//   pubsub.publish("asd", { data: i++, type: "sub" });
// }, 1000);
