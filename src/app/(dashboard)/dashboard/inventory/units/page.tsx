import type { Metadata } from "next";

import {
	createUnit,
	deleteUnit,
	getOrganizationUnits,
} from "@/actions/catalog/units";
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

export const metadata: Metadata = { title: "Đơn vị tính" };

export default async function UnitsPage() {
	const session = await auth();
	const organizationId = session?.user?.organizationId;

	if (!organizationId) return null;

	const units = await getOrganizationUnits(organizationId);

	return (
		<div className="space-y-6">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 className="font-bold font-heading text-2xl tracking-tight sm:text-3xl">
						Đơn vị tính
					</h1>
					<p className="mt-1 text-muted-foreground">
						Quản lý các đơn vị tính như kg, cm, dozen.
					</p>
				</div>
				<CatalogFormModal
					action={createUnit}
					description="Thêm đơn vị tính mới cho danh mục mặt hàng."
					organizationId={organizationId}
					schemaKey="unit"
					successMessage="Đã thêm đơn vị tính"
					title="Thêm đơn vị tính"
					triggerLabel="Thêm đơn vị"
				>
					<div className="space-y-2">
						<Label htmlFor="unit-name">Tên</Label>
						<Input id="unit-name" name="name" placeholder="Kilogram" required />
						<FieldError name="name" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="unit-symbol">Ký hiệu</Label>
						<Input id="unit-symbol" name="symbol" placeholder="kg" />
						<FieldError name="symbol" />
					</div>
				</CatalogFormModal>
			</div>

			<div className="overflow-x-auto rounded-xl border border-border bg-card">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Tên</TableHead>
							<TableHead>Ký hiệu</TableHead>
							<TableHead>Thao tác</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{units.length === 0 ? (
							<TableRow>
								<TableCell
									className="h-24 py-6 text-center text-muted-foreground"
									colSpan={3}
								>
									Chưa có đơn vị tính nào.
								</TableCell>
							</TableRow>
						) : (
							units.map((unit) => (
								<TableRow key={unit.id}>
									<TableCell className="font-medium">{unit.name}</TableCell>
									<TableCell>{unit.symbol ?? "—"}</TableCell>
									<TableCell>
										<DeleteButton
											id={unit.id}
											label={unit.name}
											onDelete={deleteUnit}
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
