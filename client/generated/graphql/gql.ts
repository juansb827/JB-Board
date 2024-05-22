/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation createBoard($input: CreateBoardInput!) {\n    createBoard(input: $input) {\n      board {\n        id\n        title\n      }\n    }\n  }\n": types.CreateBoardDocument,
    "\n  mutation renameBoard($input: RenameBoardInput!) {\n    renameBoard(input: $input) {\n      board {\n        # TODO fragment\n        id\n        title\n        updatedAt\n        team {\n          id\n        }\n      }\n    }\n  }\n": types.RenameBoardDocument,
    "\n  mutation deleteBoard($input: DeleteBoardInput!) {\n    deleteBoard(input: $input)\n  }\n": types.DeleteBoardDocument,
    "\n  query board($boardId: ID!) {\n    board(id: $boardId) {\n      id\n      updatedAt\n      imageUrl\n      title\n      author {\n        id\n        name\n      }\n      isFavorite\n    }\n  }\n": types.BoardDocument,
    "\n  query boards($filter: BoardsFilterInput!) {\n    boards(filter: $filter) {\n      nodes {\n        id\n        updatedAt\n        imageUrl\n        title\n        author {\n          id\n          name\n        }\n        isFavorite\n      }\n    }\n  }\n": types.BoardsDocument,
    "\n  mutation updateBoardIsFavorite($input: UpdateBoardIsFavoriteInput!) {\n    updateBoardIsFavorite(input: $input) {\n      isFavorite\n    }\n  }\n": types.UpdateBoardIsFavoriteDocument,
    "\n  subscription roomEvents($input: RoomEventsInput!) {\n    roomEvents(input: $input) {\n      __typename\n    }\n  }\n": types.RoomEventsDocument,
    "\n  mutation createTeam($input: CreateTeamInput!) {\n    createTeam(input: $input) {\n      team {\n        id\n        name\n      }\n    }\n  }\n": types.CreateTeamDocument,
    "\n  query userDashboard {\n    user(id: \"1\") {\n      id\n      name\n      email\n      teams {\n        id\n        name\n      }\n    }\n  }\n": types.UserDashboardDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoard($input: CreateBoardInput!) {\n    createBoard(input: $input) {\n      board {\n        id\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createBoard($input: CreateBoardInput!) {\n    createBoard(input: $input) {\n      board {\n        id\n        title\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation renameBoard($input: RenameBoardInput!) {\n    renameBoard(input: $input) {\n      board {\n        # TODO fragment\n        id\n        title\n        updatedAt\n        team {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation renameBoard($input: RenameBoardInput!) {\n    renameBoard(input: $input) {\n      board {\n        # TODO fragment\n        id\n        title\n        updatedAt\n        team {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoard($input: DeleteBoardInput!) {\n    deleteBoard(input: $input)\n  }\n"): (typeof documents)["\n  mutation deleteBoard($input: DeleteBoardInput!) {\n    deleteBoard(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query board($boardId: ID!) {\n    board(id: $boardId) {\n      id\n      updatedAt\n      imageUrl\n      title\n      author {\n        id\n        name\n      }\n      isFavorite\n    }\n  }\n"): (typeof documents)["\n  query board($boardId: ID!) {\n    board(id: $boardId) {\n      id\n      updatedAt\n      imageUrl\n      title\n      author {\n        id\n        name\n      }\n      isFavorite\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query boards($filter: BoardsFilterInput!) {\n    boards(filter: $filter) {\n      nodes {\n        id\n        updatedAt\n        imageUrl\n        title\n        author {\n          id\n          name\n        }\n        isFavorite\n      }\n    }\n  }\n"): (typeof documents)["\n  query boards($filter: BoardsFilterInput!) {\n    boards(filter: $filter) {\n      nodes {\n        id\n        updatedAt\n        imageUrl\n        title\n        author {\n          id\n          name\n        }\n        isFavorite\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoardIsFavorite($input: UpdateBoardIsFavoriteInput!) {\n    updateBoardIsFavorite(input: $input) {\n      isFavorite\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoardIsFavorite($input: UpdateBoardIsFavoriteInput!) {\n    updateBoardIsFavorite(input: $input) {\n      isFavorite\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription roomEvents($input: RoomEventsInput!) {\n    roomEvents(input: $input) {\n      __typename\n    }\n  }\n"): (typeof documents)["\n  subscription roomEvents($input: RoomEventsInput!) {\n    roomEvents(input: $input) {\n      __typename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTeam($input: CreateTeamInput!) {\n    createTeam(input: $input) {\n      team {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createTeam($input: CreateTeamInput!) {\n    createTeam(input: $input) {\n      team {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query userDashboard {\n    user(id: \"1\") {\n      id\n      name\n      email\n      teams {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query userDashboard {\n    user(id: \"1\") {\n      id\n      name\n      email\n      teams {\n        id\n        name\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;