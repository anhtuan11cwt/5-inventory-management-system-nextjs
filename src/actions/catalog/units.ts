"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { type FieldErrors, unitSchema } from "@/lib/validation";

export type UnitState = {
	error?: string;
	success?: boolean;
	fieldErrors?: FieldErrors;
};

export async function getOrganizationUnits(organizationId: string) {
	return db.unit.findMany({
		orderBy: { createdAt: "desc" },
		where: { organizationId },
	});
}

export async function createUnit(
	_prevState: UnitState,
	formData: FormData,
): Promise<UnitState> {
	const organizationId = formData.get("organizationId");

	const parsed = unitSchema.safeParse({
		name: formData.get("name"),
		symbol: formData.get("symbol") ?? "",
	});

	if (typeof organizationId !== "string") {
		return { error: "Thiếu thông tin tổ chức" };
	}

	if (!parsed.success) {
		return {
			fieldErrors: parsed.error.flatten()
				.fieldErrors as UnitState["fieldErrors"],
		};
	}

	const { name, symbol } = parsed.data;

	const exists = await db.unit.findFirst({
		where: { name, organizationId },
	});
	if (exists) {
		return { error: "Đơn vị này đã tồn tại" };
	}

	await db.unit.create({
		data: {
			name,
			organizationId,
			symbol: symbol || undefined,
		},
	});

	revalidatePath("/dashboard/inventory/units");
	return { success: true };
}

export async function deleteUnit(unitId: string): Promise<{ error?: string }> {
	try {
		await db.unit.delete({ where: { id: unitId } });
	} catch {
		return { error: "Không thể xóa đơn vị này" };
	}

	revalidatePath("/dashboard/inventory/units");
	return {};
}
