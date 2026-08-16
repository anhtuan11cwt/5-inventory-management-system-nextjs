import {
	BarChart3,
	Boxes,
	ClipboardList,
	type LucideIcon,
	Package,
	RefreshCw,
	ShieldCheck,
	ShoppingCart,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Feature {
	bullets: string[];
	description: string;
	icon: LucideIcon;
	id: string;
	title: string;
}

const features: Feature[] = [
	{
		bullets: [
			"Tạo sản phẩm với mã SKU, biến thể và mã vạch",
			"Quản lý giá bán và đơn vị tính",
			"Nhập hàng loạt từ bảng tính",
		],
		description:
			"Xây dựng danh mục đầy đủ với mã SKU, biến thể, mã vạch, giá và hình ảnh — giữ mọi sản phẩm được tổ chức gọn gàng trong một nơi.",
		icon: Package,
		id: "catalog",
		title: "Danh mục sản phẩm",
	},
	{
		bullets: [
			"Số lượng tồn kho cập nhật theo thời gian thực",
			"Cảnh báo tồn thấp và hết hàng",
			"Lịch sử biến động đầy đủ của từng sản phẩm",
		],
		description:
			"Biết chính xác còn bao nhiêu hàng tồn tại mọi thời điểm với số lượng trực tiếp được cập nhật ngay sau mỗi giao dịch bán, mua hoặc điều chỉnh.",
		icon: ClipboardList,
		id: "tracking",
		title: "Theo dõi theo thời gian thực",
	},
	{
		bullets: [
			"Theo dõi tồn kho theo từng kho hoặc cửa hàng",
			"Chuyển kho giữa các địa điểm",
			"Báo cáo tổng hợp và theo từng địa điểm",
		],
		description:
			"Quản lý nhiều kho và cửa hàng từ một bảng điều khiển, chuyển kho giữa các địa điểm chỉ với vài thao tác.",
		icon: Boxes,
		id: "multi-location",
		title: "Hỗ trợ đa địa điểm",
	},
	{
		bullets: [
			"Ghi nhận điều chỉnh kèm lý do",
			"Kiểm kê định kỳ đơn giản",
			"Nhật ký kiểm toán đầy đủ cho mọi thay đổi",
		],
		description:
			"Sửa sai lệch, xử lý hàng hư hỏng hoặc bổ sung hàng tìm thấy khi kiểm kê — mọi điều chỉnh đều được ghi nhận và kiểm tra được.",
		icon: RefreshCw,
		id: "adjustment",
		title: "Điều chỉnh tồn kho",
	},
	{
		bullets: [
			"Đơn bán và hóa đơn",
			"Đơn mua hàng và theo dõi nhà cung cấp",
			"Tự động cập nhật tồn kho và giá vốn",
		],
		description:
			"Tạo đơn bán, hóa đơn, đơn mua và trả hàng với tồn kho được cập nhật tự động và tính giá vốn chính xác.",
		icon: ShoppingCart,
		id: "sales-purchases",
		title: "Bán hàng & Mua hàng",
	},
	{
		bullets: [
			"Báo cáo giá trị tồn kho và tồn kho cũ",
			"Phân tích bán hàng và mua hàng",
			"Xuất CSV và chia sẻ",
		],
		description:
			"Hiểu rõ doanh nghiệp qua các báo cáo giá trị tồn kho, biến động, bán hàng và mua hàng mà bạn có thể lọc và xuất ra.",
		icon: BarChart3,
		id: "reports",
		title: "Báo cáo & Phân tích",
	},
	{
		bullets: [
			"Kiểm soát truy cập dựa trên vai trò",
			"Quyền đọc và ghi theo từng phân hệ",
			"Quản trị viên quản lý nhóm",
		],
		description:
			"Cho mỗi thành viên đúng mức truy cập cần thiết với quyền hạn dựa trên vai trò — chỉ đọc hoặc toàn quyền theo từng phân hệ.",
		icon: ShieldCheck,
		id: "permissions",
		title: "Phân quyền chi tiết",
	},
];

export function Features() {
	return (
		<section className="scroll-mt-20 py-20 sm:py-24" id="features">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<p className="font-semibold text-rose-600 text-sm uppercase tracking-wider">
						Tính năng
					</p>
					<h2 className="mt-2 text-balance font-bold font-heading text-3xl tracking-tight sm:text-4xl">
						Mọi thứ bạn cần để vận hành kho hàng
					</h2>
					<p className="mt-4 text-pretty text-muted-foreground">
						Từ danh mục sản phẩm đến phân quyền chi tiết, Inventory Pro bao phủ
						toàn bộ vòng đời tồn kho của bạn.
					</p>
				</div>

				<Tabs className="mt-12" defaultValue="catalog">
					<TabsList className="no-scrollbar h-auto w-full flex-wrap justify-start gap-1 overflow-x-auto bg-transparent md:justify-center">
						{features.map((feature) => (
							<TabsTrigger
								className="shrink-0"
								key={feature.id}
								value={feature.id}
							>
								<feature.icon />
								{feature.title}
							</TabsTrigger>
						))}
					</TabsList>

					{features.map((feature) => (
						<TabsContent
							className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-10"
							key={feature.id}
							value={feature.id}
						>
							<div className="grid items-center gap-8 lg:grid-cols-2">
								<div>
									<div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
										<feature.icon className="size-6" />
									</div>
									<h3 className="mt-5 font-heading font-semibold text-2xl">
										{feature.title}
									</h3>
									<p className="mt-3 text-pretty text-muted-foreground">
										{feature.description}
									</p>
								</div>
								<ul className="space-y-3">
									{feature.bullets.map((bullet) => (
										<li
											className="flex items-center gap-3 rounded-lg border border-border bg-background p-4 text-sm"
											key={bullet}
										>
											<span className="size-2 shrink-0 rounded-full bg-rose-500" />
											{bullet}
										</li>
									))}
								</ul>
							</div>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
}
