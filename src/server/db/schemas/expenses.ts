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
import { allowedBillingCycles, allowedCurrencies } from "../baseInfo";

// NOTE: Webpack has issues importing this from another file, so put this
// into every schema file!
const mysqlTable = mysqlTableCreator((name) => `scorpion_${name}`);

export const expenses = mysqlTable("expense", {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    image: varchar("image", { length: 255 }),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    currency: mysqlEnum("currency", allowedCurrencies).default("eur"),
    billingCycle: mysqlEnum("billing_cycle", allowedBillingCycles).default(
        "monthly",
    ),
    categoryId: bigint("category_id", { mode: "number" }).default(1),
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
// NOTE: numberRegex is needed to accomodate for both dot (.) and comma (,) as decimal separator
// WARN: If people get smart and enter 'one thousand' as 1,000 or 1.000 they will lead a pretty
// cheap life in this here application 😁
const numberRegex = /^(?:\d+(?:[.,]\d+)?)|(?:\d+(?::\d+)?)$/;
export const expensesInsertSchema = createInsertSchema(expenses, {
    // NOTE: We need to do some additional validation to make sure the data we insert
    // is what we expect it to be...
    userId: (schema) => schema.userId.optional(),
    price: (schema) =>
        schema.price
            .regex(numberRegex)
            .transform((val) => val.replaceAll(",", "."))
            .superRefine((val, ctx) => {
                const asNumber = parseInt(val);
                if (isNaN(asNumber)) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "Not a number",
                    });
                }

                if (asNumber < 0) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.too_small,
                        minimum: 0,
                        inclusive: true,
                        type: "number",
                        message: "Must be 0 or more",
                    });
                }
            }),
    // 'notNull' rejecting null but allowing "" is conceptiually correct but useless in practice...
    name: (schema) => schema.name.trim().min(1),
});
export const expensesSelectSchema = createSelectSchema(expenses);

// typescript type for easier... stuff...
export type InsertExpense = z.infer<typeof expensesInsertSchema>;
export type SelectExpense = z.infer<typeof expensesSelectSchema>;

// other usefull stuff
export type BillingCycle = NonNullable<
    z.infer<typeof expensesSelectSchema.shape.billingCycle>
>;
export type Currency = NonNullable<
    z.infer<typeof expensesSelectSchema.shape.currency>
>;
