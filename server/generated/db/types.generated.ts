import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Board = {
    id: Generated<string | number>;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    deletedAt: Timestamp | null;
    title: string;
    authorId: string | number;
    teamId: string | number;
    imageUrl: string;
};
export type Comment = {
    id: Generated<string | number>;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    title: string;
    content: string | null;
    postId: string | number;
};
export type Post = {
    id: Generated<string | number>;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    title: string;
    content: string | null;
    published: Generated<boolean>;
    authorId: string | number;
};
export type Profile = {
    id: Generated<string | number>;
    bio: string | null;
    userId: string | number;
};
export type Team = {
    id: Generated<string | number>;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    deletedAt: Timestamp | null;
    name: string;
};
export type TeamUser = {
    userId: string | number;
    teamId: string | number;
    createdAt: Generated<Timestamp>;
};
export type User = {
    id: Generated<string | number>;
    email: string;
    name: string | null;
};
export type DB = {
    Board: Board;
    Comment: Comment;
    Post: Post;
    Profile: Profile;
    Team: Team;
    TeamUser: TeamUser;
    User: User;
};
