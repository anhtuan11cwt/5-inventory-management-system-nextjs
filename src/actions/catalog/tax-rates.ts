"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { type FieldErrors, taxRateSchema } from "@/lib/validation";

export type TaxRateState = {
	error?: string;
	success?: boolean;
	fieldErrors?: FieldErrors;
};

export async function getOrganizationTaxRates(organizationId: string) {
	return db.taxRate.findMany({
		orderBy: { createdAt: "desc" },
		where: { organizationId },
	});
}

export async function createTaxRate(
	_prevState: TaxRateState,
	formData: FormData,
): Promise<TaxRateState> {
	const organizationId = formData.get("organizationId");

	const parsed = taxRateSchema.safeParse({
		name: formData.get("name"),
		rate: formData.get("rate"),
	});

	if (typeof organizationId !== "string") {
		return { error: "Thiếu thông tin tổ chức" };
	}

	if (!parsed.success) {
		return {
			fieldErrors: parsed.error.flatten()
				.fieldErrors as TaxRateState["fieldErrors"],
		};
	}

	const { name, rate } = parsed.data;

	const exists = await db.taxRate.findFirst({
		where: { name, organizationId },
	});
	if (exists) {
		return { error: "Thuế suất này đã tồn tại" };
	}

	await db.taxRate.create({
		data: { name, organizationId, rate },
	});

	revalidatePath("/dashboard/settings/tax-rates");
	return { success: true };
}

export async function deleteTaxRate(
	taxRateId: string,
): Promise<{ error?: string }> {
	try {
		await db.taxRate.delete({ where: { id: taxRateId } });
	} catch {
		return { error: "Không thể xóa thuế suất này" };
	}

	revalidatePath("/dashboard/settings/tax-rates");
	return {};
}
