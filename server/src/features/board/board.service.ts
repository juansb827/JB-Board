import {
  Board,
  BoardsFilterInput,
  CreateBoardInput,
} from "@generated/graphql/graphql.generated";
import { BoardRepository } from "./board.repository";
import { UserRepository } from "../user/user.repository";

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

  static async loadAuthor(parent: Board) {
    return (await UserRepository.findByIdBatch([1 + (+parent.id % 2)]))[0];
  }
}
