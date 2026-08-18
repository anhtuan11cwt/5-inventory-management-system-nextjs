import type { Metadata } from "next";

import { createItem, getOrganizationBriefItems } from "@/actions/catalog/items";
import {
	CatalogFormModal,
	FieldError,
} from "@/components/dashboard/catalog/catalog-form-modal";
import { ItemsTable } from "@/components/dashboard/catalog/items-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/config/auth";

export const metadata: Metadata = { title: "Mặt hàng" };

export default async function ItemsPage() {
	const session = await auth();
	const organizationId = session?.user?.organizationId;

	if (!organizationId) return null;

	const items = await getOrganizationBriefItems(organizationId);

	return (
		<div className="space-y-6">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 className="font-bold font-heading text-2xl tracking-tight sm:text-3xl">
						Mặt hàng
					</h1>
					<p className="mt-1 text-muted-foreground">
						Danh mục mặt hàng (Master Item) của tổ chức.
					</p>
				</div>
				<CatalogFormModal
					action={createItem}
					description="Slug tự động tạo từ tên. Mã SKU phải duy nhất."
					organizationId={organizationId}
					schemaKey="item"
					successMessage="Đã thêm mặt hàng"
					title="Thêm mặt hàng"
					triggerLabel="Thêm mặt hàng"
				>
					<div className="space-y-2">
						<Label htmlFor="item-name">Tên mặt hàng</Label>
						<Input
							id="item-name"
							name="name"
							placeholder="Laptop Pro 14"
							required
						/>
						<FieldError name="name" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="item-sku">Mã SKU</Label>
						<Input
							autoComplete="off"
							id="item-sku"
							name="sku"
							placeholder="LTP-PRO-14"
							required
						/>
						<FieldError name="sku" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="item-thumbnail">Hình ảnh (URL)</Label>
						<Input
							id="item-thumbnail"
							name="thumbnail"
							placeholder="https://..."
							type="url"
						/>
						<FieldError name="thumbnail" />
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="item-cost">Giá vốn</Label>
							<Input
								id="item-cost"
								inputMode="decimal"
								min={15000}
								name="costPrice"
								placeholder="0"
								required
								step="0.01"
								type="number"
							/>
							<FieldError name="costPrice" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="item-price">Giá bán</Label>
							<Input
								id="item-price"
								inputMode="decimal"
								min={15000}
								name="sellingPrice"
								placeholder="0"
								required
								step="0.01"
								type="number"
							/>
							<FieldError name="sellingPrice" />
						</div>
					</div>
				</CatalogFormModal>
			</div>

			<ItemsTable items={items} />
		</div>
	);
}
