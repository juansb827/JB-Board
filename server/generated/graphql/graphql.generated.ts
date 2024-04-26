/* eslint-disable */
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
  Date: { input: any; output: any; }
  Url: { input: any; output: any; }
};

export type Board = {
  __typename?: 'Board';
  author: User;
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  team: Team;
  title: Scalars['String']['output'];
};

export type CreateBoardInput = {
  teamId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
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

export type Meta = {
  __typename?: 'Meta';
  count?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard?: Maybe<CreateBoardResponse>;
  createTeam?: Maybe<CreateTeamResponse>;
  createTweet?: Maybe<Tweet>;
  createUser: User;
  deleteTweet?: Maybe<Tweet>;
  markTweetRead?: Maybe<Scalars['Boolean']['output']>;
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


export type MutationDeleteTweetArgs = {
  id: Scalars['ID']['input'];
};


export type MutationMarkTweetReadArgs = {
  id: Scalars['ID']['input'];
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


export type QueryTeamArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
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

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  teams: Array<Team>;
};



export type ResolverTypeWrapper<T> = T | Promise<T> | Partial<T> | Promise<Partial<T>>;


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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateBoardInput: CreateBoardInput;
  CreateBoardResponse: ResolverTypeWrapper<CreateBoardResponse>;
  CreateTeamInput: CreateTeamInput;
  CreateTeamResponse: ResolverTypeWrapper<CreateTeamResponse>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Meta: ResolverTypeWrapper<Meta>;
  Mutation: ResolverTypeWrapper<{}>;
  Notification: ResolverTypeWrapper<Notification>;
  PaginatedTeam: ResolverTypeWrapper<PaginatedTeam>;
  Query: ResolverTypeWrapper<{}>;
  Stat: ResolverTypeWrapper<Stat>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Team: ResolverTypeWrapper<Team>;
  Tweet: ResolverTypeWrapper<Tweet>;
  Url: ResolverTypeWrapper<Scalars['Url']['output']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Board: Board;
  Boolean: Scalars['Boolean']['output'];
  CreateBoardInput: CreateBoardInput;
  CreateBoardResponse: CreateBoardResponse;
  CreateTeamInput: CreateTeamInput;
  CreateTeamResponse: CreateTeamResponse;
  Date: Scalars['Date']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Meta: Meta;
  Mutation: {};
  Notification: Notification;
  PaginatedTeam: PaginatedTeam;
  Query: {};
  Stat: Stat;
  String: Scalars['String']['output'];
  Team: Team;
  Tweet: Tweet;
  Url: Scalars['Url']['output'];
  User: User;
};

export type BoardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Board'] = ResolversParentTypes['Board']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  team?: Resolver<ResolversTypes['Team'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  createBoard?: Resolver<Maybe<ResolversTypes['CreateBoardResponse']>, ParentType, ContextType, RequireFields<MutationCreateBoardArgs, 'input'>>;
  createTeam?: Resolver<Maybe<ResolversTypes['CreateTeamResponse']>, ParentType, ContextType, RequireFields<MutationCreateTeamArgs, 'input'>>;
  createTweet?: Resolver<Maybe<ResolversTypes['Tweet']>, ParentType, ContextType, Partial<MutationCreateTweetArgs>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationCreateUserArgs>>;
  deleteTweet?: Resolver<Maybe<ResolversTypes['Tweet']>, ParentType, ContextType, RequireFields<MutationDeleteTweetArgs, 'id'>>;
  markTweetRead?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationMarkTweetReadArgs, 'id'>>;
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
  team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType, RequireFields<QueryTeamArgs, 'id'>>;
  teams?: Resolver<Maybe<ResolversTypes['PaginatedTeam']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type StatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Stat'] = ResolversParentTypes['Stat']> = {
  likes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  responses?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  retweets?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  views?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  CreateBoardResponse?: CreateBoardResponseResolvers<ContextType>;
  CreateTeamResponse?: CreateTeamResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Meta?: MetaResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Notification?: NotificationResolvers<ContextType>;
  PaginatedTeam?: PaginatedTeamResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Stat?: StatResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  Tweet?: TweetResolvers<ContextType>;
  Url?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};


export type Date = Scalars["Date"];
export type Url = Scalars["Url"];