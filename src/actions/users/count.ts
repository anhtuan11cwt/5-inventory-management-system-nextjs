"use server";

import { db } from "@/lib/db";

export async function getCurrentUsersCount(): Promise<number> {
	return db.user.count();
}
