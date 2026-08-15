import { db } from "@/lib/db";

export function slugify(input: string): string {
	return input
		.toLowerCase()
		.trim()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

export async function generateUniqueSlug(name: string): Promise<string> {
	const base = slugify(name) || "organization";
	let slug = base;
	let counter = 1;

	while (await db.organization.findUnique({ where: { slug } })) {
		counter += 1;
		slug = `${base}-${counter}`;
	}

	return slug;
}
