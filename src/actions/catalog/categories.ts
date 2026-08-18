"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { categorySchema, type FieldErrors } from "@/lib/validation";

export type CategoryState = {
	error?: string;
	success?: boolean;
	fieldErrors?: FieldErrors;
};

const PLACEHOLDER_IMAGE = "/placeholder.png";

export async function getOrganizationCategories(organizationId: string) {
	return db.category.findMany({
		orderBy: { createdAt: "desc" },
		where: { organizationId },
	});
}

export async function createCategory(
	_prevState: CategoryState,
	formData: FormData,
): Promise<CategoryState> {
	const organizationId = formData.get("organizationId");

	const parsed = categorySchema.safeParse({
		description: formData.get("description") ?? "",
		imageUrl: formData.get("imageUrl") ?? "",
		slug: formData.get("slug") ?? "",
		title: formData.get("title"),
	});

	if (typeof organizationId !== "string") {
		return { error: "Thiếu thông tin tổ chức" };
	}

	if (!parsed.success) {
		return {
			fieldErrors: parsed.error.flatten()
				.fieldErrors as CategoryState["fieldErrors"],
		};
	}

	const { title, description, imageUrl } = parsed.data;
	const slug = parsed.data.slug ? slugify(parsed.data.slug) : slugify(title);

	const exists = await db.category.findFirst({
		where: { organizationId, slug },
	});
	if (exists) {
		return { error: "Danh mục này đã tồn tại" };
	}

	await db.category.create({
		data: {
			description: description || undefined,
			imageUrl: imageUrl || PLACEHOLDER_IMAGE,
			organizationId,
			slug,
			title,
		},
	});

	revalidatePath("/dashboard/inventory/categories");
	return { success: true };
}

export async function deleteCategory(
	categoryId: string,
): Promise<{ error?: string }> {
	try {
		await db.category.delete({ where: { id: categoryId } });
	} catch {
		return { error: "Không thể xóa danh mục này" };
	}

	revalidatePath("/dashboard/inventory/categories");
	return {};
}
