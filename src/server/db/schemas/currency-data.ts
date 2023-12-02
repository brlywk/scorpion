import {
    bigint,
    json,
    mysqlEnum,
    mysqlTableCreator,
    timestamp,
} from "drizzle-orm/mysql-core";
import { allowedCurrencies } from "../baseInfo";

// NOTE: Webpack has issues importing this from another file, so put this
// into every schema file!
const mysqlTable = mysqlTableCreator((name) => `scorpion_${name}`);

export const currencyData = mysqlTable("currency_data", {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    baseCurrency: mysqlEnum("base_currency", allowedCurrencies).default("eur"),
    rates: json("rates").$type<Record<string, number>>(),
    lastUpdates: timestamp("last_updated").onUpdateNow(),
});
