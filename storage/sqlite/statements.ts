import { localDB } from "@/app/_layout";

export const userProgressQueries = localDB.prepareAsync(
  `INSERT INTO user_progress (userId, totalPoints, currentStreak, lastActivityAt, rank, weeklyPoints, monthlyPoints) VALUES (?, ?, ?, ?, ?, ?, ?)`
);

export const DB_queryAllPaths = localDB.prepareAsync(
  `SELECT * FROM text_learning_paths`
);

export const DB_insertAllPaths = localDB.prepareAsync(
  `INSERT INTO text_learning_paths (id, lastSynced, data) VALUES ($id, $lastSynced, $data)`
);
