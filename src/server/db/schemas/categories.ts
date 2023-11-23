import { bigint, mysqlTableCreator, varchar } from "drizzle-orm/mysql-core";

// NOTE: Webpack has issues importing this from another file, so put this
// into every schema file!
const mysqlTable = mysqlTableCreator((name) => `scorpion_${name}`);

export const categories = mysqlTable("categories", {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    userId: varchar("userId", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    image: varchar("image", { length: 255 }),
});
