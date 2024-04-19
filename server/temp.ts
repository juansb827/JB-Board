import { serverConfig } from "@/core/config";
import { db } from "@/core/database";
import { DB } from "@generated/db/types";
import { ExpressionBuilder, sql } from "kysely";
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";

console.log(serverConfig);
async function main() {
  //https://kysely.dev/docs/recipes/relations
  const withPosts = (eb: ExpressionBuilder<DB, "User">) => {
    const withComments = (eb: ExpressionBuilder<DB, "Post">) => {
      return jsonArrayFrom(
        eb
          .selectFrom("Comment")
          .select(["id", "createdAt", "content"])
          .whereRef("Comment.postId", "=", "Post.id")
      ).as("comments");
    };

    return jsonArrayFrom(
      eb
        .selectFrom("Post")
        .selectAll("Post")
        .select((eb) => withComments(eb))
        .whereRef("Post.authorId", "=", "User.id")
    ).as("posts");
  };

  const a = await db
    .selectFrom("User")
    .where("id", "=", 1)
    .selectAll("User")
    .$if(true, (qb) => qb.select(withPosts))
    .execute();

  const user = a[0];
  if (user.posts) {
    user.posts[0].comments[0]?.content;
  }

  return a;
}

main().then((res) => console.log(3242, JSON.stringify(res, null, 4)));
