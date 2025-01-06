import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const allLearningPaths = sqliteTable("text_learning_paths", {
  id: text(),
  lastSynced: integer(),
  data: text(),
});

export const coursesData = sqliteTable("courses_data", {
  id: text(),
  lastSynced: integer(),
  data: text(),
});
