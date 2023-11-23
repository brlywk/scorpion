import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
    schema: "./src/server/db/schemas/*",
    driver: "mysql2",
    dbCredentials: {
        connectionString: env.DATABASE_URL,
    },
    tablesFilter: ["scorpion_*"],
} satisfies Config;
