/* eslint-disable */
          import { DeepPartial, JSDate } from "@/shared/types";
            
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string | JSDate; }
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

export type RoomEvent = {
  __typename?: 'RoomEvent';
  data: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type RoomEventsInput = {
  boardId: Scalars['ID']['input'];
};

export type Stat = {
  __typename?: 'Stat';
  likes?: Maybe<Scalars['Int']['output']>;
  responses?: Maybe<Scalars['Int']['output']>;
  retweets?: Maybe<Scalars['Int']['output']>;
  views?: Maybe<Scalars['Int']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  roomEvents?: Maybe<RoomEvent>;
};


export type SubscriptionRoomEventsArgs = {
  input: RoomEventsInput;
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



export type ResolverTypeWrapper<T> = DeepPartial<T>;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Board: ResolverTypeWrapper<Board>;
  BoardResponse: ResolverTypeWrapper<BoardResponse>;
  BoardsFilterInput: BoardsFilterInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateBoardInput: CreateBoardInput;
  CreateBoardResponse: ResolverTypeWrapper<CreateBoardResponse>;
  CreateTeamInput: CreateTeamInput;
  CreateTeamResponse: ResolverTypeWrapper<CreateTeamResponse>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DeleteBoardInput: DeleteBoardInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Meta: ResolverTypeWrapper<Meta>;
  Mutation: ResolverTypeWrapper<{}>;
  Notification: ResolverTypeWrapper<Notification>;
  PaginatedTeam: ResolverTypeWrapper<PaginatedTeam>;
  Query: ResolverTypeWrapper<{}>;
  RenameBoardInput: RenameBoardInput;
  RenameBoardResponse: ResolverTypeWrapper<RenameBoardResponse>;
  RoomEvent: ResolverTypeWrapper<RoomEvent>;
  RoomEventsInput: RoomEventsInput;
  Stat: ResolverTypeWrapper<Stat>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Team: ResolverTypeWrapper<Team>;
  Tweet: ResolverTypeWrapper<Tweet>;
  UpdateBoardIsFavoriteInput: UpdateBoardIsFavoriteInput;
  UpdateBoardIsFavoriteResponse: ResolverTypeWrapper<UpdateBoardIsFavoriteResponse>;
  Url: ResolverTypeWrapper<Scalars['Url']['output']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Board: Board;
  BoardResponse: BoardResponse;
  BoardsFilterInput: BoardsFilterInput;
  Boolean: Scalars['Boolean']['output'];
  CreateBoardInput: CreateBoardInput;
  CreateBoardResponse: CreateBoardResponse;
  CreateTeamInput: CreateTeamInput;
  CreateTeamResponse: CreateTeamResponse;
  Date: Scalars['Date']['output'];
  DeleteBoardInput: DeleteBoardInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Meta: Meta;
  Mutation: {};
  Notification: Notification;
  PaginatedTeam: PaginatedTeam;
  Query: {};
  RenameBoardInput: RenameBoardInput;
  RenameBoardResponse: RenameBoardResponse;
  RoomEvent: RoomEvent;
  RoomEventsInput: RoomEventsInput;
  Stat: Stat;
  String: Scalars['String']['output'];
  Subscription: {};
  Team: Team;
  Tweet: Tweet;
  UpdateBoardIsFavoriteInput: UpdateBoardIsFavoriteInput;
  UpdateBoardIsFavoriteResponse: UpdateBoardIsFavoriteResponse;
  Url: Scalars['Url']['output'];
  User: User;
};

export type BoardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Board'] = ResolversParentTypes['Board']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isFavorite?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  team?: Resolver<ResolversTypes['Team'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoardResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BoardResponse'] = ResolversParentTypes['BoardResponse']> = {
  nodes?: Resolver<Array<ResolversTypes['Board']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateBoardResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateBoardResponse'] = ResolversParentTypes['CreateBoardResponse']> = {
  board?: Resolver<ResolversTypes['Board'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateTeamResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateTeamResponse'] = ResolversParentTypes['CreateTeamResponse']> = {
  team?: Resolver<ResolversTypes['Team'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MetaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Meta'] = ResolversParentTypes['Meta']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createBoard?: Resolver<ResolversTypes['CreateBoardResponse'], ParentType, ContextType, RequireFields<MutationCreateBoardArgs, 'input'>>;
  createTeam?: Resolver<Maybe<ResolversTypes['CreateTeamResponse']>, ParentType, ContextType, RequireFields<MutationCreateTeamArgs, 'input'>>;
  createTweet?: Resolver<Maybe<ResolversTypes['Tweet']>, ParentType, ContextType, Partial<MutationCreateTweetArgs>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationCreateUserArgs>>;
  deleteBoard?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteBoardArgs, 'input'>>;
  deleteTweet?: Resolver<Maybe<ResolversTypes['Tweet']>, ParentType, ContextType, RequireFields<MutationDeleteTweetArgs, 'id'>>;
  markTweetRead?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationMarkTweetReadArgs, 'id'>>;
  renameBoard?: Resolver<ResolversTypes['RenameBoardResponse'], ParentType, ContextType, RequireFields<MutationRenameBoardArgs, 'input'>>;
  updateBoardIsFavorite?: Resolver<ResolversTypes['UpdateBoardIsFavoriteResponse'], ParentType, ContextType, RequireFields<MutationUpdateBoardIsFavoriteArgs, 'input'>>;
};

export type NotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = {
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedTeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedTeam'] = ResolversParentTypes['PaginatedTeam']> = {
  nodes?: Resolver<Array<ResolversTypes['Team']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  Tweet?: Resolver<Maybe<ResolversTypes['Tweet']>, ParentType, ContextType, RequireFields<QueryTweetArgs, 'id'>>;
  Tweets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tweet']>>>, ParentType, ContextType, Partial<QueryTweetsArgs>>;
  TweetsMeta?: Resolver<Maybe<ResolversTypes['Meta']>, ParentType, ContextType>;
  boards?: Resolver<ResolversTypes['BoardResponse'], ParentType, ContextType, RequireFields<QueryBoardsArgs, 'filter'>>;
  team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType, RequireFields<QueryTeamArgs, 'id'>>;
  teams?: Resolver<Maybe<ResolversTypes['PaginatedTeam']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type RenameBoardResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RenameBoardResponse'] = ResolversParentTypes['RenameBoardResponse']> = {
  board?: Resolver<ResolversTypes['Board'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['RoomEvent'] = ResolversParentTypes['RoomEvent']> = {
  data?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Stat'] = ResolversParentTypes['Stat']> = {
  likes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  responses?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  retweets?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  views?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  roomEvents?: SubscriptionResolver<Maybe<ResolversTypes['RoomEvent']>, "roomEvents", ParentType, ContextType, RequireFields<SubscriptionRoomEventsArgs, 'input'>>;
};

export type TeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  extra?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TweetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tweet'] = ResolversParentTypes['Tweet']> = {
  Author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  Stats?: Resolver<Maybe<ResolversTypes['Stat']>, ParentType, ContextType>;
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateBoardIsFavoriteResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateBoardIsFavoriteResponse'] = ResolversParentTypes['UpdateBoardIsFavoriteResponse']> = {
  isFavorite?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Url'], any> {
  name: 'Url';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teams?: Resolver<Array<ResolversTypes['Team']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Board?: BoardResolvers<ContextType>;
  BoardResponse?: BoardResponseResolvers<ContextType>;
  CreateBoardResponse?: CreateBoardResponseResolvers<ContextType>;
  CreateTeamResponse?: CreateTeamResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Meta?: MetaResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Notification?: NotificationResolvers<ContextType>;
  PaginatedTeam?: PaginatedTeamResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RenameBoardResponse?: RenameBoardResponseResolvers<ContextType>;
  RoomEvent?: RoomEventResolvers<ContextType>;
  Stat?: StatResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  Tweet?: TweetResolvers<ContextType>;
  UpdateBoardIsFavoriteResponse?: UpdateBoardIsFavoriteResponseResolvers<ContextType>;
  Url?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};


export type Date = Scalars["Date"];
export type Url = Scalars["Url"];