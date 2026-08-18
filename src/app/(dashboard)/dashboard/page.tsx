import {
	ArrowDownRight,
	ArrowUpRight,
	Boxes,
	Package,
	ShoppingCart,
	Wallet,
} from "lucide-react";
import { DefaultUserDashboard } from "@/components/dashboard/default-user-dashboard";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { auth } from "@/config/auth";
import { hasPermission } from "@/config/permissions";
import { filteredSidebarLinks } from "@/config/sidebar";

const stats = [
	{
		change: "+3,2%",
		icon: Package,
		label: "Tổng số sản phẩm",
		trend: "up",
		value: "1.248",
	},
	{
		change: "+12,4%",
		icon: Wallet,
		label: "Giá trị tồn kho",
		trend: "up",
		value: "3.250.000.000đ",
	},
	{
		change: "-2",
		icon: Boxes,
		label: "Sản phẩm tồn thấp",
		trend: "down",
		value: "14",
	},
	{
		change: "+5",
		icon: ShoppingCart,
		label: "Đơn hàng đang xử lý",
		trend: "up",
		value: "28",
	},
];

const recentOrders = [
	{
		customer: "Nova Supplies",
		items: 12,
		order: "#INV-2041",
		status: "Đang xử lý",
		total: "31.000.000đ",
	},
	{
		customer: "Bluepeak Ltd",
		items: 4,
		order: "#INV-2040",
		status: "Đã gửi hàng",
		total: "7.810.000đ",
	},
	{
		customer: "Greenfield Co",
		items: 21,
		order: "#INV-2039",
		status: "Đã giao",
		total: "79.500.000đ",
	},
	{
		customer: "Summit Retail",
		items: 8,
		order: "#INV-2038",
		status: "Đã giao",
		total: "23.600.000đ",
	},
	{
		customer: "Harbor Foods",
		items: 3,
		order: "#INV-2037",
		status: "Đang xử lý",
		total: "3.200.000đ",
	},
];

export default async function DashboardPage() {
	const session = await auth();

	const permissions = session?.user?.permissions ?? [];

	if (!hasPermission(permissions, "dashboard.read")) {
		const cards = filteredSidebarLinks(permissions)
			.flatMap((item) => item.items ?? (item.href ? [item] : []))
			.map((item) => ({
				href: item.href ?? "/dashboard",
				icon: item.icon,
				title: item.title,
			}));

		return (
			<DefaultUserDashboard
				navigationCards={cards}
				userName={session?.user?.name ?? undefined}
			/>
		);
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="font-bold font-heading text-2xl tracking-tight sm:text-3xl">
					Chào mừng trở lại, {session?.user?.name?.split(" ")[0]}
				</h1>
				<p className="mt-1 text-muted-foreground">
					Đây là tình hình tại{" "}
					<span className="font-medium text-foreground">
						{session?.user?.organizationName}
					</span>
					.
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{stats.map((stat) => (
					<Card key={stat.label}>
						<CardContent className="p-5">
							<div className="flex items-center gap-4">
								<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
									<stat.icon className="size-5" />
								</div>
								<div className="min-w-0">
									<p className="text-muted-foreground text-sm">{stat.label}</p>
									<p className="mt-1 font-semibold text-2xl tracking-tight">
										{stat.value}
									</p>
									<p
										className={
											stat.trend === "up"
												? "mt-1 inline-flex items-center gap-1 font-medium text-rose-600 text-xs"
												: "mt-1 inline-flex items-center gap-1 font-medium text-destructive text-xs"
										}
									>
										{stat.trend === "up" ? (
											<ArrowUpRight className="size-3" />
										) : (
											<ArrowDownRight className="size-3" />
										)}
										{stat.change} so với tháng trước
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
				<Card>
					<CardHeader>
						<CardTitle>Đơn hàng gần đây</CardTitle>
						<CardDescription>
							Đơn bán mới nhất trên tất cả địa điểm
						</CardDescription>
					</CardHeader>
					<CardContent className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Đơn hàng</TableHead>
									<TableHead>Khách hàng</TableHead>
									<TableHead className="text-right">Sản phẩm</TableHead>
									<TableHead className="text-right">Tổng tiền</TableHead>
									<TableHead>Trạng thái</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{recentOrders.map((order) => (
									<TableRow key={order.order}>
										<TableCell className="font-medium">{order.order}</TableCell>
										<TableCell>{order.customer}</TableCell>
										<TableCell className="text-right">{order.items}</TableCell>
										<TableCell className="text-right">{order.total}</TableCell>
										<TableCell>
											<Badge
												variant={
													order.status === "Đang xử lý"
														? "outline"
														: "secondary"
												}
											>
												{order.status}
											</Badge>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Cảnh báo tồn thấp</CardTitle>
						<CardDescription>Sản phẩm cần đặt hàng lại</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className="space-y-3">
							{[
								{ name: "Chuột không dây", sku: "ACC-102", stock: 6 },
								{ name: "Cáp USB-C 2m", sku: "ACC-114", stock: 2 },
								{ name: "Bộ chuyển HDMI", sku: "ACC-097", stock: 0 },
								{ name: "Đèn bàn", sku: "FUR-023", stock: 4 },
							].map((item) => (
								<li
									className="flex items-center justify-between gap-3 rounded-lg border border-border p-3 text-sm"
									key={item.sku}
								>
									<div className="min-w-0">
										<p className="truncate font-medium">{item.name}</p>
										<p className="text-muted-foreground text-xs">{item.sku}</p>
									</div>
									<Badge variant={item.stock === 0 ? "destructive" : "outline"}>
										còn {item.stock}
									</Badge>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
