/* eslint-disable */
          import { DeepPartial, JSDate } from "@/shared/types";
            
import * as Types from "@generated/graphql/graphql.generated";
export namespace FeaturesModule {
  interface DefinedFields {
    Board: 'id' | 'createdAt' | 'updatedAt' | 'title' | 'author' | 'team' | 'imageUrl';
    CreateBoardResponse: 'board';
    BoardResponse: 'nodes';
    Query: 'boards' | 'team' | 'teams' | 'user';
    Mutation: 'createBoard' | 'deleteBoard' | 'createTeam' | 'createUser';
    Team: 'id' | 'name' | 'extra';
    PaginatedTeam: 'nodes';
    CreateTeamResponse: 'team';
    User: 'id' | 'name' | 'email' | 'teams';
  };
  
  interface DefinedInputFields {
    CreateBoardInput: 'title' | 'teamId';
    DeleteBoardInput: 'id' | 'teamId';
    BoardsFilterInput: 'teamId';
    CreateTeamInput: 'name';
  };
  
  export type Board = Pick<Types.Board, DefinedFields['Board']>;
  export type Date = Types.Date;
  export type User = Pick<Types.User, DefinedFields['User']>;
  export type Team = Pick<Types.Team, DefinedFields['Team']>;
  export type CreateBoardInput = Pick<Types.CreateBoardInput, DefinedInputFields['CreateBoardInput']>;
  export type DeleteBoardInput = Pick<Types.DeleteBoardInput, DefinedInputFields['DeleteBoardInput']>;
  export type CreateBoardResponse = Pick<Types.CreateBoardResponse, DefinedFields['CreateBoardResponse']>;
  export type BoardsFilterInput = Pick<Types.BoardsFilterInput, DefinedInputFields['BoardsFilterInput']>;
  export type BoardResponse = Pick<Types.BoardResponse, DefinedFields['BoardResponse']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type PaginatedTeam = Pick<Types.PaginatedTeam, DefinedFields['PaginatedTeam']>;
  export type CreateTeamInput = Pick<Types.CreateTeamInput, DefinedInputFields['CreateTeamInput']>;
  export type CreateTeamResponse = Pick<Types.CreateTeamResponse, DefinedFields['CreateTeamResponse']>;
  
  export type BoardResolvers = Pick<Types.BoardResolvers, DefinedFields['Board'] | '__isTypeOf'>;
  export type CreateBoardResponseResolvers = Pick<Types.CreateBoardResponseResolvers, DefinedFields['CreateBoardResponse'] | '__isTypeOf'>;
  export type BoardResponseResolvers = Pick<Types.BoardResponseResolvers, DefinedFields['BoardResponse'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type TeamResolvers = Pick<Types.TeamResolvers, DefinedFields['Team'] | '__isTypeOf'>;
  export type PaginatedTeamResolvers = Pick<Types.PaginatedTeamResolvers, DefinedFields['PaginatedTeam'] | '__isTypeOf'>;
  export type CreateTeamResponseResolvers = Pick<Types.CreateTeamResponseResolvers, DefinedFields['CreateTeamResponse'] | '__isTypeOf'>;
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Board?: BoardResolvers;
    CreateBoardResponse?: CreateBoardResponseResolvers;
    BoardResponse?: BoardResponseResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    Team?: TeamResolvers;
    PaginatedTeam?: PaginatedTeamResolvers;
    CreateTeamResponse?: CreateTeamResponseResolvers;
    User?: UserResolvers;
  };
}