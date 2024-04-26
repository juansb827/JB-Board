/* eslint-disable */
import * as Types from "@generated/graphql/graphql.generated";
export namespace FeaturesModule {
  interface DefinedFields {
    Board: 'id' | 'title' | 'author' | 'team' | 'imageUrl';
    CreateBoardResponse: 'board';
    Mutation: 'createBoard' | 'createTeam' | 'createUser';
    Team: 'id' | 'name' | 'extra';
    PaginatedTeam: 'nodes';
    Query: 'team' | 'teams' | 'user';
    CreateTeamResponse: 'team';
    User: 'id' | 'name' | 'email' | 'teams';
  };
  
  interface DefinedInputFields {
    CreateBoardInput: 'title' | 'teamId';
    CreateTeamInput: 'name';
  };
  
  export type Board = Pick<Types.Board, DefinedFields['Board']>;
  export type User = Pick<Types.User, DefinedFields['User']>;
  export type Team = Pick<Types.Team, DefinedFields['Team']>;
  export type CreateBoardInput = Pick<Types.CreateBoardInput, DefinedInputFields['CreateBoardInput']>;
  export type CreateBoardResponse = Pick<Types.CreateBoardResponse, DefinedFields['CreateBoardResponse']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type PaginatedTeam = Pick<Types.PaginatedTeam, DefinedFields['PaginatedTeam']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type CreateTeamInput = Pick<Types.CreateTeamInput, DefinedInputFields['CreateTeamInput']>;
  export type CreateTeamResponse = Pick<Types.CreateTeamResponse, DefinedFields['CreateTeamResponse']>;
  
  export type BoardResolvers = Pick<Types.BoardResolvers, DefinedFields['Board'] | '__isTypeOf'>;
  export type CreateBoardResponseResolvers = Pick<Types.CreateBoardResponseResolvers, DefinedFields['CreateBoardResponse'] | '__isTypeOf'>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type TeamResolvers = Pick<Types.TeamResolvers, DefinedFields['Team'] | '__isTypeOf'>;
  export type PaginatedTeamResolvers = Pick<Types.PaginatedTeamResolvers, DefinedFields['PaginatedTeam'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type CreateTeamResponseResolvers = Pick<Types.CreateTeamResponseResolvers, DefinedFields['CreateTeamResponse'] | '__isTypeOf'>;
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Board?: BoardResolvers;
    CreateBoardResponse?: CreateBoardResponseResolvers;
    Mutation?: MutationResolvers;
    Team?: TeamResolvers;
    PaginatedTeam?: PaginatedTeamResolvers;
    Query?: QueryResolvers;
    CreateTeamResponse?: CreateTeamResponseResolvers;
    User?: UserResolvers;
  };
}