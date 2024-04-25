import { getDb } from "@/core/database";
import { ID } from "@/shared/types";

export class UserRepository {
  static async findOne(id: ID) {
    return (await getDb())
      .selectFrom("User")
      .selectAll()
      .where("id", "=", +id)
      .executeTakeFirstOrThrow();
  }
}