"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { type FieldErrors, itemSchema } from "@/lib/validation";

export type ItemState = {
	error?: string;
	success?: boolean;
	fieldErrors?: FieldErrors;
};

export async function getOrganizationBriefItems(organizationId: string) {
	return db.item.findMany({
		orderBy: { createdAt: "desc" },
		select: {
			createdAt: true,
			id: true,
			name: true,
			sku: true,
			thumbnail: true,
		},
		where: { organizationId },
	});
}

export async function createItem(
	_prevState: ItemState,
	formData: FormData,
): Promise<ItemState> {
	const organizationId = formData.get("organizationId");

	const parsed = itemSchema.safeParse({
		costPrice: formData.get("costPrice"),
		name: formData.get("name"),
		sellingPrice: formData.get("sellingPrice"),
		sku: formData.get("sku"),
		thumbnail: formData.get("thumbnail") ?? "",
	});

	if (typeof organizationId !== "string") {
		return { error: "Thiếu thông tin tổ chức" };
	}

	if (!parsed.success) {
		return {
			fieldErrors: parsed.error.flatten()
				.fieldErrors as ItemState["fieldErrors"],
		};
	}

	const { name, sku, costPrice, sellingPrice, thumbnail } = parsed.data;

	const skuExists = await db.item.findFirst({
		where: { organizationId, sku },
	});
	if (skuExists) {
		return { error: "Mã SKU này đã tồn tại" };
	}

	await db.item.create({
		data: {
			costPrice: Number(costPrice),
			name,
			organizationId,
			sellingPrice: Number(sellingPrice),
			sku,
			thumbnail: thumbnail || undefined,
		},
	});

	revalidatePath("/dashboard/inventory/items");
	return { success: true };
}

export async function deleteItem(itemId: string): Promise<{ error?: string }> {
	try {
		await db.item.delete({ where: { id: itemId } });
	} catch {
		return { error: "Không thể xóa mặt hàng này" };
	}

	revalidatePath("/dashboard/inventory/items");
	return {};
}
