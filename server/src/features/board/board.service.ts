import {
  Board,
  BoardsFilterInput,
  CreateBoardInput,
  DeleteBoardInput,
  User,
} from "@generated/graphql/graphql.generated";
import { BoardRepository } from "./board.repository";
import { UserRepository } from "../user/user.repository";
import DataLoader from "dataloader";
import { GqlContext, ID, Resolved } from "@/shared/types";

const boardImagePlaceholders = [
  "/board-placeholders/image1.png",
  "/board-placeholders/image2.png",
  "/board-placeholders/image3.jpg",
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
    const result = await BoardRepository.delete({ ...input, userId: 1 });
    if (result.numDeletedRows.toString() === "0") {
      throw new Error("COULD NOT DELETE BOARD");
    }
  }

  static async loadAuthor(ctx: GqlContext, parent: Board) {
    const loader = ctx.getOrCreateLoader("users:byId", () => {
      const userLoader = new DataLoader<ID, Resolved<User>>(async (ids) => {
        const users: Array<Resolved<User>> = await UserRepository.findByIdBatch(
          ids
        );
        return users;
      });
      return userLoader;
    });
    return loader.load(1 + (+parent.id % 2));
  }
}
