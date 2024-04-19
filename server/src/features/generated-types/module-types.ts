/* eslint-disable */
import * as Types from "@generated/graphql/graphql.generated";
export namespace FeaturesModule {
  interface DefinedFields {
    Team: 'id' | 'name' | 'extra';
    Query: 'team' | 'user';
    User: 'id' | 'name' | 'teams';
  };
  
  export type Team = Pick<Types.Team, DefinedFields['Team']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type User = Pick<Types.User, DefinedFields['User']>;
  
  export type TeamResolvers = Pick<Types.TeamResolvers, DefinedFields['Team'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Team?: TeamResolvers;
    Query?: QueryResolvers;
    User?: UserResolvers;
  };
}