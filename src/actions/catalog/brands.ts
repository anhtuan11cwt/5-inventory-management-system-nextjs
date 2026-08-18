"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { brandSchema, type FieldErrors } from "@/lib/validation";

export type BrandState = {
	error?: string;
	success?: boolean;
	fieldErrors?: FieldErrors;
};

export async function getOrganizationBrands(organizationId: string) {
	return db.brand.findMany({
		orderBy: { createdAt: "desc" },
		where: { organizationId },
	});
}

export async function createBrand(
	_prevState: BrandState,
	formData: FormData,
): Promise<BrandState> {
	const organizationId = formData.get("organizationId");

	const parsed = brandSchema.safeParse({
		name: formData.get("name"),
	});

	if (typeof organizationId !== "string") {
		return { error: "Thiếu thông tin tổ chức" };
	}

	if (!parsed.success) {
		return {
			fieldErrors: parsed.error.flatten()
				.fieldErrors as BrandState["fieldErrors"],
		};
	}

	const { name } = parsed.data;
	const slug = slugify(name);

	const exists = await db.brand.findFirst({
		where: { organizationId, slug },
	});
	if (exists) {
		return { error: "Thương hiệu này đã tồn tại" };
	}

	await db.brand.create({
		data: { name, organizationId, slug },
	});

	revalidatePath("/dashboard/inventory/brands");
	return { success: true };
}

export async function deleteBrand(
	brandId: string,
): Promise<{ error?: string }> {
	try {
		await db.brand.delete({ where: { id: brandId } });
	} catch {
		return { error: "Không thể xóa thương hiệu này" };
	}

	revalidatePath("/dashboard/inventory/brands");
	return {};
}
