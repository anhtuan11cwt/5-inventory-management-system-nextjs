"use client";

import {
	endOfDay,
	endOfMonth,
	format,
	isAfter,
	isBefore,
	startOfDay,
	startOfMonth,
	startOfWeek,
	startOfYear,
	subMonths,
} from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon, Search } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export interface DataTableColumn<T> {
	header: string;
	render: (row: T) => ReactNode;
}

interface DateRangeValue {
	from?: Date;
	to?: Date;
}

const presets = (): { label: string; range: DateRangeValue }[] => {
	const now = new Date();
	return [
		{ label: "Hôm nay", range: { from: startOfDay(now), to: now } },
		{
			label: "Tuần này",
			range: { from: startOfWeek(now, { weekStartsOn: 1 }), to: now },
		},
		{ label: "Tháng này", range: { from: startOfMonth(now), to: now } },
		{
			label: "Tháng trước",
			range: {
				from: startOfMonth(subMonths(now, 1)),
				to: endOfMonth(subMonths(now, 1)),
			},
		},
		{ label: "Năm nay", range: { from: startOfYear(now), to: now } },
	];
};

const formatShort = (date: Date) => format(date, "dd/MM/yyyy");

export function DataTable<T extends { id: string; createdAt: Date }>({
	data,
	columns,
	searchKeys = [],
	placeholder = "Chưa có dữ liệu",
}: {
	data: T[];
	columns: DataTableColumn<T>[];
	searchKeys?: (keyof T & string)[];
	placeholder?: string;
}) {
	const [query, setQuery] = useState("");
	const [range, setRange] = useState<DateRangeValue | undefined>();

	const filtered = useMemo(() => {
		return data.filter((row) => {
			const q = query.trim().toLowerCase();
			if (q) {
				const match = searchKeys.some((key) =>
					String(row[key] ?? "")
						.toLowerCase()
						.includes(q),
				);
				if (!match) return false;
			}

			if (range?.from || range?.to) {
				const date = new Date(row.createdAt);
				if (range.from && isBefore(date, startOfDay(range.from))) return false;
				if (range.to && isAfter(date, endOfDay(range.to))) return false;
			}

			return true;
		});
	}, [data, query, range, searchKeys]);

	const activeLabel = range?.from
		? `${formatShort(range.from)} — ${range.to ? formatShort(range.to) : "nay"}`
		: "Chọn ngày";

	return (
		<div className="space-y-4">
			<div className="flex flex-wrap items-center gap-2">
				<div className="relative min-w-48 flex-1">
					<Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						className="pl-8"
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Tìm kiếm..."
						value={query}
					/>
				</div>
				<Popover>
					<PopoverTrigger
						render={
							<Button variant="outline">
								<CalendarIcon />
								{activeLabel}
							</Button>
						}
					/>
					<PopoverContent align="start" className="w-auto p-0">
						<Calendar
							locale={vi}
							mode="range"
							numberOfMonths={2}
							onSelect={(value) =>
								setRange(value as DateRangeValue | undefined)
							}
							selected={range as never}
						/>
						<div className="flex flex-wrap gap-1 border-border border-t p-2">
							{presets().map((preset) => (
								<Button
									key={preset.label}
									onClick={() => setRange(preset.range)}
									size="sm"
									variant="ghost"
								>
									{preset.label}
								</Button>
							))}
							<Button
								onClick={() => setRange(undefined)}
								size="sm"
								variant="ghost"
							>
								Xóa lọc
							</Button>
						</div>
					</PopoverContent>
				</Popover>
			</div>

			<div className="overflow-x-auto rounded-xl border border-border bg-card">
				<Table>
					<TableHeader>
						<TableRow>
							{columns.map((column) => (
								<TableHead key={column.header}>{column.header}</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{filtered.length === 0 ? (
							<TableRow>
								<TableCell
									className="h-24 py-6 text-center text-muted-foreground"
									colSpan={columns.length}
								>
									{placeholder}
								</TableCell>
							</TableRow>
						) : (
							filtered.map((row) => (
								<TableRow key={row.id}>
									{columns.map((column) => (
										<TableCell key={column.header}>
											{column.render(row)}
										</TableCell>
									))}
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
