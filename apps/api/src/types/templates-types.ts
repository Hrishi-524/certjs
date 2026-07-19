import { InferSelectModel } from "drizzle-orm";
import { templates } from "@certjs/db/schema/templates";

export type Template = InferSelectModel<typeof templates>;