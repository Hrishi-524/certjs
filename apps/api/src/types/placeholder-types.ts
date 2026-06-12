import { InferSelectModel } from "drizzle-orm";
import { placeholders } from "@certjs/db/schema/placeholders";

export type Placeholder =
    InferSelectModel<typeof placeholders>;