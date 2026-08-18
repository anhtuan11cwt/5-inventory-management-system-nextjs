"use client";

import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Package } from "lucide-react";
import Image from "next/image";

import { deleteItem } from "@/actions/catalog/items";
import { DataTable } from "@/components/dashboard/catalog/data-table";
import { DeleteButton } from "@/components/dashboard/catalog/delete-button";

export interface ItemsTableItem {
	createdAt: Date;
	id: string;
	name: string;
	sku: string;
	thumbnail: string | null;
}

export function ItemsTable({ items }: { items: ItemsTableItem[] }) {
	return (
		<DataTable
			columns={[
				{
					header: "Hình ảnh",
					render: (item) => (
						<div className="relative flex size-10 items-center justify-center overflow-hidden rounded-md border border-border bg-muted text-muted-foreground">
							{item.thumbnail ? (
								<Image
									alt=""
									className="size-full object-cover"
									fill
									sizes="40px"
									src={item.thumbnail}
									unoptimized
								/>
							) : (
								<Package className="size-4" />
							)}
						</div>
					),
				},
				{
					header: "Tên",
					render: (item) => <p className="font-medium">{item.name}</p>,
				},
				{
					header: "SKU",
					render: (item) => (
						<span className="text-muted-foreground">{item.sku}</span>
					),
				},
				{
					header: "Ngày tạo",
					render: (item) => (
						<span className="text-muted-foreground">
							{format(new Date(item.createdAt), "dd/MM/yyyy", { locale: vi })}
						</span>
					),
				},
				{
					header: "Thao tác",
					render: (item) => (
						<DeleteButton
							id={item.id}
							label={item.name}
							onDelete={deleteItem}
						/>
					),
				},
			]}
			data={items}
			placeholder="Chưa có mặt hàng nào."
			searchKeys={["name", "sku"]}
		/>
	);
}
