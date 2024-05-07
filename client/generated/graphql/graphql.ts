/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  Url: { input: any; output: any; }
};

export type Board = {
  __typename?: 'Board';
  author: User;
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  isFavorite: Scalars['Boolean']['output'];
  team: Team;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type BoardResponse = {
  __typename?: 'BoardResponse';
  nodes: Array<Board>;
};

export type BoardsFilterInput = {
  isFavorite?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  teamId: Scalars['ID']['input'];
};

export type CreateBoardInput = {
  teamId: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBoardResponse = {
  __typename?: 'CreateBoardResponse';
  board: Board;
};

export type CreateTeamInput = {
  name: Scalars['String']['input'];
};

export type CreateTeamResponse = {
  __typename?: 'CreateTeamResponse';
  team: Team;
};

export type DeleteBoardInput = {
  id: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
};

export type Meta = {
  __typename?: 'Meta';
  count?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: CreateBoardResponse;
  createTeam?: Maybe<CreateTeamResponse>;
  createTweet?: Maybe<Tweet>;
  createUser: User;
  deleteBoard: Scalars['Boolean']['output'];
  deleteTweet?: Maybe<Tweet>;
  markTweetRead?: Maybe<Scalars['Boolean']['output']>;
  renameBoard: RenameBoardResponse;
  updateBoardIsFavorite: UpdateBoardIsFavoriteResponse;
};


export type MutationCreateBoardArgs = {
  input: CreateBoardInput;
};


export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


export type MutationCreateTweetArgs = {
  body?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateUserArgs = {
  input?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteBoardArgs = {
  input: DeleteBoardInput;
};


export type MutationDeleteTweetArgs = {
  id: Scalars['ID']['input'];
};


export type MutationMarkTweetReadArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRenameBoardArgs = {
  input: RenameBoardInput;
};


export type MutationUpdateBoardIsFavoriteArgs = {
  input: UpdateBoardIsFavoriteInput;
};

export type Notification = {
  __typename?: 'Notification';
  date?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type PaginatedTeam = {
  __typename?: 'PaginatedTeam';
  nodes: Array<Team>;
};

export type Query = {
  __typename?: 'Query';
  Tweet?: Maybe<Tweet>;
  Tweets?: Maybe<Array<Maybe<Tweet>>>;
  TweetsMeta?: Maybe<Meta>;
  boards: BoardResponse;
  team?: Maybe<Team>;
  teams?: Maybe<PaginatedTeam>;
  user: User;
};


export type QueryTweetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTweetsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort_field?: InputMaybe<Scalars['String']['input']>;
  sort_order?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBoardsArgs = {
  filter: BoardsFilterInput;
};


export type QueryTeamArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type RenameBoardInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  teamId: Scalars['ID']['input'];
};

export type RenameBoardResponse = {
  __typename?: 'RenameBoardResponse';
  board: Board;
};

export type Stat = {
  __typename?: 'Stat';
  likes?: Maybe<Scalars['Int']['output']>;
  responses?: Maybe<Scalars['Int']['output']>;
  retweets?: Maybe<Scalars['Int']['output']>;
  views?: Maybe<Scalars['Int']['output']>;
};

export type Team = {
  __typename?: 'Team';
  extra?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Tweet = {
  __typename?: 'Tweet';
  Author?: Maybe<User>;
  Stats?: Maybe<Stat>;
  body?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
};

export type UpdateBoardIsFavoriteInput = {
  id: Scalars['ID']['input'];
  isFavorite: Scalars['Boolean']['input'];
  teamId: Scalars['ID']['input'];
};

export type UpdateBoardIsFavoriteResponse = {
  __typename?: 'UpdateBoardIsFavoriteResponse';
  isFavorite: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  teams: Array<Team>;
};

export type CreateBoardMutationVariables = Exact<{
  input: CreateBoardInput;
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard: { __typename?: 'CreateBoardResponse', board: { __typename?: 'Board', id: string, title: string } } };

export type RenameBoardMutationVariables = Exact<{
  input: RenameBoardInput;
}>;


export type RenameBoardMutation = { __typename?: 'Mutation', renameBoard: { __typename?: 'RenameBoardResponse', board: { __typename?: 'Board', id: string, title: string, updatedAt: string } } };

export type DeleteBoardMutationVariables = Exact<{
  input: DeleteBoardInput;
}>;


export type DeleteBoardMutation = { __typename?: 'Mutation', deleteBoard: boolean };

export type BoardsQueryVariables = Exact<{
  filter: BoardsFilterInput;
}>;


export type BoardsQuery = { __typename?: 'Query', boards: { __typename?: 'BoardResponse', nodes: Array<{ __typename?: 'Board', id: string, updatedAt: string, imageUrl: string, title: string, isFavorite: boolean, author: { __typename?: 'User', id: string, name: string } }> } };

export type UpdateBoardIsFavoriteMutationVariables = Exact<{
  input: UpdateBoardIsFavoriteInput;
}>;


export type UpdateBoardIsFavoriteMutation = { __typename?: 'Mutation', updateBoardIsFavorite: { __typename?: 'UpdateBoardIsFavoriteResponse', isFavorite: boolean } };

export type CreateTeamMutationVariables = Exact<{
  input: CreateTeamInput;
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam?: { __typename?: 'CreateTeamResponse', team: { __typename?: 'Team', id: string, name: string } } | null };

export type UserDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type UserDashboardQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, email: string, teams: Array<{ __typename?: 'Team', id: string, name: string }> } };


export const CreateBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBoardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<CreateBoardMutation, CreateBoardMutationVariables>;
export const RenameBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"renameBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RenameBoardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"renameBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<RenameBoardMutation, RenameBoardMutationVariables>;
export const DeleteBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteBoardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeleteBoardMutation, DeleteBoardMutationVariables>;
export const BoardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"boards"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BoardsFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}}]}}]}}]} as unknown as DocumentNode<BoardsQuery, BoardsQueryVariables>;
export const UpdateBoardIsFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateBoardIsFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBoardIsFavoriteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBoardIsFavorite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}}]}}]} as unknown as DocumentNode<UpdateBoardIsFavoriteMutation, UpdateBoardIsFavoriteMutationVariables>;
export const CreateTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTeamInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateTeamMutation, CreateTeamMutationVariables>;
export const UserDashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userDashboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"StringValue","value":"1","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UserDashboardQuery, UserDashboardQueryVariables>;