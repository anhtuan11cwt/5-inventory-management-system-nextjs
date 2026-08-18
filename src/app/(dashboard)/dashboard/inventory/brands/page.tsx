import type { Metadata } from "next";

import {
	createBrand,
	deleteBrand,
	getOrganizationBrands,
} from "@/actions/catalog/brands";
import {
	CatalogFormModal,
	FieldError,
} from "@/components/dashboard/catalog/catalog-form-modal";
import { DeleteButton } from "@/components/dashboard/catalog/delete-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { auth } from "@/config/auth";

export const metadata: Metadata = { title: "Thương hiệu" };

export default async function BrandsPage() {
	const session = await auth();
	const organizationId = session?.user?.organizationId;

	if (!organizationId) return null;

	const brands = await getOrganizationBrands(organizationId);

	return (
		<div className="space-y-6">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 className="font-bold font-heading text-2xl tracking-tight sm:text-3xl">
						Thương hiệu
					</h1>
					<p className="mt-1 text-muted-foreground">
						Quản lý danh sách thương hiệu của tổ chức.
					</p>
				</div>
				<CatalogFormModal
					action={createBrand}
					description="Slug được tự động tạo từ tên thương hiệu."
					organizationId={organizationId}
					schemaKey="brand"
					successMessage="Đã thêm thương hiệu"
					title="Thêm thương hiệu"
					triggerLabel="Thêm thương hiệu"
				>
					<div className="space-y-2">
						<Label htmlFor="brand-name">Tên</Label>
						<Input id="brand-name" name="name" placeholder="Apple" required />
						<FieldError name="name" />
					</div>
				</CatalogFormModal>
			</div>

			<div className="overflow-x-auto rounded-xl border border-border bg-card">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Tên</TableHead>
							<TableHead>Slug</TableHead>
							<TableHead>Thao tác</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{brands.length === 0 ? (
							<TableRow>
								<TableCell
									className="h-24 py-6 text-center text-muted-foreground"
									colSpan={3}
								>
									Chưa có thương hiệu nào.
								</TableCell>
							</TableRow>
						) : (
							brands.map((brand) => (
								<TableRow key={brand.id}>
									<TableCell className="font-medium">{brand.name}</TableCell>
									<TableCell className="text-muted-foreground">
										{brand.slug}
									</TableCell>
									<TableCell>
										<DeleteButton
											id={brand.id}
											label={brand.name}
											onDelete={deleteBrand}
										/>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
