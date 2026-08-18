import type { Metadata } from "next";
import Image from "next/image";

import {
	createCategory,
	deleteCategory,
	getOrganizationCategories,
} from "@/actions/catalog/categories";
import { CatalogFormModal } from "@/components/dashboard/catalog/catalog-form-modal";
import { CategoryFields } from "@/components/dashboard/catalog/category-fields";
import { DeleteButton } from "@/components/dashboard/catalog/delete-button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { auth } from "@/config/auth";

export const metadata: Metadata = { title: "Danh mục" };

function formatDate(date: Date) {
	return new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(date);
}

export default async function CategoriesPage() {
	const session = await auth();
	const organizationId = session?.user?.organizationId;

	if (!organizationId) return null;

	const categories = await getOrganizationCategories(organizationId);

	return (
		<div className="space-y-6">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 className="font-bold font-heading text-2xl tracking-tight sm:text-3xl">
						Danh mục
					</h1>
					<p className="mt-1 text-muted-foreground">
						Phân loại mặt hàng theo nhóm.
					</p>
				</div>
				<CatalogFormModal
					action={createCategory}
					description="Slug được tự động tạo từ tiêu đề."
					organizationId={organizationId}
					schemaKey="category"
					successMessage="Đã thêm danh mục"
					title="Thêm danh mục"
					triggerLabel="Thêm danh mục"
				>
					<CategoryFields />
				</CatalogFormModal>
			</div>

			<div className="overflow-x-auto rounded-xl border border-border bg-card">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Hình ảnh</TableHead>
							<TableHead>Tiêu đề</TableHead>
							<TableHead>Ngày tạo</TableHead>
							<TableHead>Thao tác</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{categories.length === 0 ? (
							<TableRow>
								<TableCell
									className="h-24 py-6 text-center text-muted-foreground"
									colSpan={4}
								>
									Chưa có danh mục nào.
								</TableCell>
							</TableRow>
						) : (
							categories.map((category) => (
								<TableRow key={category.id}>
									<TableCell>
										<div className="relative flex size-10 items-center justify-center overflow-hidden rounded-md border border-border bg-muted text-muted-foreground text-xs">
											{category.imageUrl ? (
												<Image
													alt={category.title}
													className="size-full object-cover"
													fill
													sizes="40px"
													src={category.imageUrl}
													unoptimized
												/>
											) : (
												category.title.charAt(0).toUpperCase()
											)}
										</div>
									</TableCell>
									<TableCell className="font-medium">
										{category.title}
									</TableCell>
									<TableCell className="text-muted-foreground">
										{formatDate(category.createdAt)}
									</TableCell>
									<TableCell>
										<DeleteButton
											id={category.id}
											label={category.title}
											onDelete={deleteCategory}
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
