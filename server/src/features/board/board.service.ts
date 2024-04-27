import {
  BoardsFilterInput,
  CreateBoardInput,
} from "@generated/graphql/graphql.generated";
import { BoardRepository } from "./board.repository";

export class BoardService {
  static findAll(filter: BoardsFilterInput) {
    return BoardRepository.findAll({ userId: 1, ...filter });
  }
  static create(input: CreateBoardInput) {
    return BoardRepository.create({
      board: {
        ...input,
        updatedAt: new Date(),
        authorId: 1, // TODO: grab from token
        imageUrl: "",
      },
    });
  }
}
