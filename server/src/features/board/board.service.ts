import {
  Board,
  BoardsFilterInput,
  CreateBoardInput,
  DeleteBoardInput,
  RenameBoardInput,
  UpdateBoardIsFavoriteInput,
  User,
} from "@generated/graphql/graphql.generated";
import { BoardRepository } from "./board.repository";
import { UserRepository } from "../user/user.repository";
import DataLoader from "dataloader";
import { GqlContext, ID, Resolved } from "@/shared/types";
import { UserBoard } from "@generated/db/types.generated";
import { Selectable } from "kysely";
import _ from "lodash";
import { Maybe } from "graphql/jsutils/Maybe";

const boardImagePlaceholders = [
  "/board-placeholders/image1.jpeg",
  "/board-placeholders/image2.jpeg",
  "/board-placeholders/image3.jpeg",
  "/board-placeholders/image4.jpeg",
  "/board-placeholders/image5.jpeg",
  "/board-placeholders/image6.jpeg",
  "/board-placeholders/image7.jpeg",
  "/board-placeholders/image8.jpeg",
  "/board-placeholders/image9.jpeg",
  "/board-placeholders/image10.jpeg",
  "/board-placeholders/image11.jpeg",
];

export class BoardService {
  static findAll(filter: BoardsFilterInput) {
    return BoardRepository.findAll({ userId: 1, ...filter });
  }
  static create(input: CreateBoardInput) {
    const randomImageIdx = Math.floor(
      boardImagePlaceholders.length * Math.random()
    );
    return BoardRepository.create({
      board: {
        ...input,
        title: input.title || "",
        updatedAt: new Date(),
        authorId: 1, // TODO: grab from token
        imageUrl: boardImagePlaceholders[randomImageIdx],
      },
    });
  }

  static async delete(input: DeleteBoardInput) {
    const userId = 1;
    const result = await BoardRepository.delete({ ...input, userId });
    if (result.numDeletedRows.toString() === "0") {
      throw new Error("COULD NOT DELETE BOARD");
    }
  }

  static async rename(input: RenameBoardInput) {
    return BoardRepository.rename({ ...input, userId: 1 });
  }

  static updateIsFavorite({
    id: boardId,
    teamId,
    ...rest
  }: UpdateBoardIsFavoriteInput) {
    return BoardRepository.upsertUserBoardAssociation({
      teamId: teamId,
      userBoard: {
        userId: 1,
        boardId,
        ...rest,
      },
    });
  }
  static async loadAuthor(ctx: GqlContext, parent: Board) {
    const loader = ctx.getOrCreateLoader("User:byId", () => {
      const userLoader = new DataLoader<ID, Resolved<User>>(async (ids) => {
        const users: Array<Resolved<User>> = await UserRepository.findByIdBatch(
          ids
        );
        const idToUser = _.keyBy(users, (u) => u.id);
        return ids.map((id) => idToUser[id]);
      });
      return userLoader;
    });
    return loader.load(1 + (+parent.id % 2));
  }

  static async loadIsFavorite(ctx: GqlContext, parent: Board) {
    const userId = 1;
    const loader = ctx.getOrCreateLoader(`UserBoard:byBoardId`, () => {
      const userLoader = new DataLoader<ID, Maybe<Selectable<UserBoard>>>(
        async (boardIds) => {
          const userBoardAssociations: Array<Selectable<UserBoard>> =
            await BoardRepository.findUserBoardBatch({ userId, boardIds });
          const idToUserBoardAssociation = _.keyBy(
            userBoardAssociations,
            (it) => it.boardId
          );
          return boardIds.map((id) => idToUserBoardAssociation[id]);
        }
      );
      return userLoader;
    });

    const userBoardAssociation = await loader.load(parent.id);
    return userBoardAssociation?.isFavorite || false;
  }
}
