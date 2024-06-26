/* eslint-disable */
          import { DeepPartial, JSDate } from "@/shared/types";
            
import * as Types from "@generated/graphql/graphql.generated";
export namespace FeaturesModule {
  interface DefinedFields {
    Board: 'id' | 'createdAt' | 'updatedAt' | 'title' | 'author' | 'team' | 'imageUrl' | 'isFavorite';
    CreateBoardResponse: 'board';
    RenameBoardResponse: 'board';
    BoardResponse: 'nodes';
    UpdateBoardIsFavoriteResponse: 'isFavorite';
    Query: 'boards' | 'board' | 'team' | 'teams' | 'user';
    Mutation: 'createBoard' | 'deleteBoard' | 'renameBoard' | 'updateBoardIsFavorite' | 'createTeam' | 'createUser';
    RoomUserJoined: 'user';
    RoomCurrentState: 'type' | 'data';
    Subscription: 'roomEvents';
    Team: 'id' | 'name' | 'extra';
    PaginatedTeam: 'nodes';
    CreateTeamResponse: 'team';
    User: 'id' | 'name' | 'email' | 'teams';
    Event: 'type';
  };
  
  interface DefinedInputFields {
    CreateBoardInput: 'title' | 'teamId';
    DeleteBoardInput: 'id' | 'teamId';
    RenameBoardInput: 'id' | 'teamId' | 'name';
    BoardsFilterInput: 'teamId' | 'isFavorite' | 'search';
    UpdateBoardIsFavoriteInput: 'id' | 'teamId' | 'isFavorite';
    RoomEventsInput: 'boardId';
    CreateTeamInput: 'name';
  };
  
  export type Board = Pick<Types.Board, DefinedFields['Board']>;
  export type Date = Types.Date;
  export type User = Pick<Types.User, DefinedFields['User']>;
  export type Team = Pick<Types.Team, DefinedFields['Team']>;
  export type CreateBoardInput = Pick<Types.CreateBoardInput, DefinedInputFields['CreateBoardInput']>;
  export type DeleteBoardInput = Pick<Types.DeleteBoardInput, DefinedInputFields['DeleteBoardInput']>;
  export type RenameBoardInput = Pick<Types.RenameBoardInput, DefinedInputFields['RenameBoardInput']>;
  export type CreateBoardResponse = Pick<Types.CreateBoardResponse, DefinedFields['CreateBoardResponse']>;
  export type RenameBoardResponse = Pick<Types.RenameBoardResponse, DefinedFields['RenameBoardResponse']>;
  export type BoardsFilterInput = Pick<Types.BoardsFilterInput, DefinedInputFields['BoardsFilterInput']>;
  export type BoardResponse = Pick<Types.BoardResponse, DefinedFields['BoardResponse']>;
  export type UpdateBoardIsFavoriteInput = Pick<Types.UpdateBoardIsFavoriteInput, DefinedInputFields['UpdateBoardIsFavoriteInput']>;
  export type UpdateBoardIsFavoriteResponse = Pick<Types.UpdateBoardIsFavoriteResponse, DefinedFields['UpdateBoardIsFavoriteResponse']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Event = Pick<Types.Event, DefinedFields['Event']>;
  export type RoomUserJoined = Pick<Types.RoomUserJoined, DefinedFields['RoomUserJoined']>;
  export type RoomCurrentState = Pick<Types.RoomCurrentState, DefinedFields['RoomCurrentState']>;
  export type RoomEventsInput = Pick<Types.RoomEventsInput, DefinedInputFields['RoomEventsInput']>;
  export type RoomEvent = Types.RoomEvent;
  export type Subscription = Pick<Types.Subscription, DefinedFields['Subscription']>;
  export type PaginatedTeam = Pick<Types.PaginatedTeam, DefinedFields['PaginatedTeam']>;
  export type CreateTeamInput = Pick<Types.CreateTeamInput, DefinedInputFields['CreateTeamInput']>;
  export type CreateTeamResponse = Pick<Types.CreateTeamResponse, DefinedFields['CreateTeamResponse']>;
  
  export type BoardResolvers = Pick<Types.BoardResolvers, DefinedFields['Board'] | '__isTypeOf'>;
  export type CreateBoardResponseResolvers = Pick<Types.CreateBoardResponseResolvers, DefinedFields['CreateBoardResponse'] | '__isTypeOf'>;
  export type RenameBoardResponseResolvers = Pick<Types.RenameBoardResponseResolvers, DefinedFields['RenameBoardResponse'] | '__isTypeOf'>;
  export type BoardResponseResolvers = Pick<Types.BoardResponseResolvers, DefinedFields['BoardResponse'] | '__isTypeOf'>;
  export type UpdateBoardIsFavoriteResponseResolvers = Pick<Types.UpdateBoardIsFavoriteResponseResolvers, DefinedFields['UpdateBoardIsFavoriteResponse'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type RoomUserJoinedResolvers = Pick<Types.RoomUserJoinedResolvers, DefinedFields['RoomUserJoined'] | '__isTypeOf'>;
  export type RoomCurrentStateResolvers = Pick<Types.RoomCurrentStateResolvers, DefinedFields['RoomCurrentState'] | '__isTypeOf'>;
  export type SubscriptionResolvers = Pick<Types.SubscriptionResolvers, DefinedFields['Subscription']>;
  export type TeamResolvers = Pick<Types.TeamResolvers, DefinedFields['Team'] | '__isTypeOf'>;
  export type PaginatedTeamResolvers = Pick<Types.PaginatedTeamResolvers, DefinedFields['PaginatedTeam'] | '__isTypeOf'>;
  export type CreateTeamResponseResolvers = Pick<Types.CreateTeamResponseResolvers, DefinedFields['CreateTeamResponse'] | '__isTypeOf'>;
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;
  export type EventResolvers = Pick<Types.EventResolvers, DefinedFields['Event']>;
  
  export interface Resolvers {
    Board?: BoardResolvers;
    CreateBoardResponse?: CreateBoardResponseResolvers;
    RenameBoardResponse?: RenameBoardResponseResolvers;
    BoardResponse?: BoardResponseResolvers;
    UpdateBoardIsFavoriteResponse?: UpdateBoardIsFavoriteResponseResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    RoomUserJoined?: RoomUserJoinedResolvers;
    RoomCurrentState?: RoomCurrentStateResolvers;
    Subscription?: SubscriptionResolvers;
    Team?: TeamResolvers;
    PaginatedTeam?: PaginatedTeamResolvers;
    CreateTeamResponse?: CreateTeamResponseResolvers;
    User?: UserResolvers;
  };
}