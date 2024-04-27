/* eslint-disable */
              type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] } 
            
import * as Types from "@generated/graphql/graphql.generated";
export namespace SchemaModule {
  interface DefinedFields {
    Tweet: 'id' | 'body' | 'date' | 'Author' | 'Stats';
    Stat: 'views' | 'likes' | 'retweets' | 'responses';
    Notification: 'id' | 'date' | 'type';
    Meta: 'count';
    Query: 'Tweet' | 'Tweets' | 'TweetsMeta';
    Mutation: 'createTweet' | 'deleteTweet' | 'markTweetRead';
  };
  
  export type Tweet = Pick<Types.Tweet, DefinedFields['Tweet']>;
  export type User = Types.User;
  export type Stat = Pick<Types.Stat, DefinedFields['Stat']>;
  export type Notification = Pick<Types.Notification, DefinedFields['Notification']>;
  export type Meta = Pick<Types.Meta, DefinedFields['Meta']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  
  export type Scalars = Pick<Types.Scalars, 'Url' | 'Date'>;
  export type UrlScalarConfig = Types.UrlScalarConfig;
  export type DateScalarConfig = Types.DateScalarConfig;
  
  export type TweetResolvers = Pick<Types.TweetResolvers, DefinedFields['Tweet'] | '__isTypeOf'>;
  export type StatResolvers = Pick<Types.StatResolvers, DefinedFields['Stat'] | '__isTypeOf'>;
  export type NotificationResolvers = Pick<Types.NotificationResolvers, DefinedFields['Notification'] | '__isTypeOf'>;
  export type MetaResolvers = Pick<Types.MetaResolvers, DefinedFields['Meta'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  
  export interface Resolvers {
    Tweet?: TweetResolvers;
    Stat?: StatResolvers;
    Notification?: NotificationResolvers;
    Meta?: MetaResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    Url?: Types.Resolvers['Url'];
    Date?: Types.Resolvers['Date'];
  };
}