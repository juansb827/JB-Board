import { ID } from "@/shared/types";
import { TeamRepository } from "../team/team.repository";
import { UserRepository } from "./user.repository";

export class UserService {
  static findOne(id: ID) {
    return UserRepository.findOne(id);
  }
  static loadUserTeams(userId: ID) {
    // TODO data loader
    return TeamRepository.loadAll({ userId });
  }
}
