import { relations } from "drizzle-orm";
import {
    bigint,
    decimal,
    mysqlEnum,
    mysqlTableCreator,
    timestamp,
    varchar,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { categories } from "./categories";
import { users } from "./nextauth";
import { z } from "zod";

// NOTE: Webpack has issues importing this from another file, so put this
// into every schema file!
const mysqlTable = mysqlTableCreator((name) => `scorpion_${name}`);

export const expenses = mysqlTable("expense", {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    image: varchar("image", { length: 255 }),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    currency: mysqlEnum("currency", ["eur", "usd"]).default("eur"),
    billingCycle: mysqlEnum("billing_cycle", ["monthly", "yearly"]).default(
        "monthly",
    ),
    categoryId: varchar("category_id", { length: 255 }).default("1"),
    created: timestamp("created").onUpdateNow(),
});

// relations
export const expenseRelations = relations(expenses, ({ one }) => ({
    users: one(users, { fields: [expenses.userId], references: [users.id] }),
    categories: one(categories, {
        fields: [expenses.categoryId],
        references: [categories.id],
    }),
}));

// infer types
const numberRegex = /^(?:\d+(?:[.,]\d+)?)|(?:\d+(?::\d+)?)$/;
export const expensesInsertSchema = createInsertSchema(expenses, {
    // NOTE: for inserts, we need to make some values optional, as we will
    // either get them from our context or are automatically set by the DB
    userId: (schema) => schema.userId.optional(),
    price: (schema) => schema.price.regex(numberRegex),
});
export const expensesSelectSchema = createSelectSchema(expenses);

// typescript type for easier... stuff...
export type InsertExpense = z.infer<typeof expensesInsertSchema>;
export type SelectExpense = z.infer<typeof expensesSelectSchema>;
