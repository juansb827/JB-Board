/* eslint-disable */
import * as Types from "@generated/graphql/graphql.generated";
export namespace FeaturesModule {
  interface DefinedFields {
    Team: 'id' | 'name' | 'extra';
    PaginatedTeam: 'nodes';
    Query: 'team' | 'teams' | 'user';
    CreateTeamResponse: 'team';
    Mutation: 'createTeam' | 'createUser';
    User: 'id' | 'name' | 'email' | 'teams';
  };
  
  interface DefinedInputFields {
    CreateTeamInput: 'name';
  };
  
  export type Team = Pick<Types.Team, DefinedFields['Team']>;
  export type PaginatedTeam = Pick<Types.PaginatedTeam, DefinedFields['PaginatedTeam']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type CreateTeamInput = Pick<Types.CreateTeamInput, DefinedInputFields['CreateTeamInput']>;
  export type CreateTeamResponse = Pick<Types.CreateTeamResponse, DefinedFields['CreateTeamResponse']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type User = Pick<Types.User, DefinedFields['User']>;
  
  export type TeamResolvers = Pick<Types.TeamResolvers, DefinedFields['Team'] | '__isTypeOf'>;
  export type PaginatedTeamResolvers = Pick<Types.PaginatedTeamResolvers, DefinedFields['PaginatedTeam'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type CreateTeamResponseResolvers = Pick<Types.CreateTeamResponseResolvers, DefinedFields['CreateTeamResponse'] | '__isTypeOf'>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Team?: TeamResolvers;
    PaginatedTeam?: PaginatedTeamResolvers;
    Query?: QueryResolvers;
    CreateTeamResponse?: CreateTeamResponseResolvers;
    Mutation?: MutationResolvers;
    User?: UserResolvers;
  };
}