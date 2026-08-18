import { Info } from "lucide-react";
import type { Metadata } from "next";

import {
	createTaxRate,
	deleteTaxRate,
	getOrganizationTaxRates,
} from "@/actions/catalog/tax-rates";
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
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { auth } from "@/config/auth";

export const metadata: Metadata = { title: "Thuế suất" };

export default async function TaxRatesPage() {
	const session = await auth();
	const organizationId = session?.user?.organizationId;

	if (!organizationId) return null;

	const taxRates = await getOrganizationTaxRates(organizationId);

	return (
		<div className="space-y-6">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 className="font-bold font-heading text-2xl tracking-tight sm:text-3xl">
						Thuế suất
					</h1>
					<p className="mt-1 text-muted-foreground">
						Quản lý các mức thuế suất áp dụng cho mặt hàng.
					</p>
				</div>
				<CatalogFormModal
					action={createTaxRate}
					description="Nhập giá trị thuế dưới dạng phần trăm."
					organizationId={organizationId}
					schemaKey="taxRate"
					successMessage="Đã thêm thuế suất"
					title="Thêm thuế suất"
					triggerLabel="Thêm thuế suất"
				>
					<div className="space-y-2">
						<Label htmlFor="tax-name">Tên</Label>
						<Input id="tax-name" name="name" placeholder="Thuế GTGT" required />
						<FieldError name="name" />
					</div>
					<div className="space-y-2">
						<div className="flex items-center gap-1.5">
							<Label htmlFor="tax-rate">Thuế suất (%)</Label>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger
										render={
											<button
												aria-label="Hướng dẫn"
												className="text-muted-foreground hover:text-foreground"
												type="button"
											>
												<Info className="size-3.5" />
											</button>
										}
									/>
									<TooltipContent>
										Giá trị này phải ở dạng phần trăm
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
						<div className="relative">
							<Input
								id="tax-rate"
								inputMode="decimal"
								max={100}
								min={0}
								name="rate"
								placeholder="10"
								required
								step="0.01"
								type="number"
							/>
							<span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground text-sm">
								%
							</span>
						</div>
						<FieldError name="rate" />
					</div>
				</CatalogFormModal>
			</div>

			<div className="overflow-x-auto rounded-xl border border-border bg-card">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Tên</TableHead>
							<TableHead>Thuế suất</TableHead>
							<TableHead>Thao tác</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{taxRates.length === 0 ? (
							<TableRow>
								<TableCell
									className="h-24 py-6 text-center text-muted-foreground"
									colSpan={3}
								>
									Chưa có thuế suất nào.
								</TableCell>
							</TableRow>
						) : (
							taxRates.map((taxRate) => (
								<TableRow key={taxRate.id}>
									<TableCell className="font-medium">{taxRate.name}</TableCell>
									<TableCell>{taxRate.rate}%</TableCell>
									<TableCell>
										<DeleteButton
											id={taxRate.id}
											label={taxRate.name}
											onDelete={deleteTaxRate}
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
