import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Plan {
	description: string;
	features: string[];
	name: string;
	period: string;
	popular?: boolean;
	price: string;
}

const plans: Plan[] = [
	{
		description: "Dành cho người bán cá nhân mới bắt đầu.",
		features: [
			"1 địa điểm",
			"Tối đa 500 sản phẩm",
			"Theo dõi tồn kho theo thời gian thực",
			"Đơn bán & hóa đơn",
			"Hỗ trợ qua email",
		],
		name: "Cá nhân",
		period: "/tháng",
		price: "199.000",
	},
	{
		description: "Dành cho đội nhóm đang phát triển, cần kiểm soát nhiều hơn.",
		features: [
			"Tối đa 4 địa điểm",
			"Tối đa 5.000 sản phẩm",
			"Đơn mua hàng & trả hàng",
			"Báo cáo & phân tích",
			"Điều chỉnh tồn kho",
			"Hỗ trợ ưu tiên",
		],
		name: "Doanh nghiệp nhỏ",
		period: "/tháng",
		popular: true,
		price: "399.000",
	},
	{
		description: "Dành cho doanh nghiệp lớn hơn với nhu cầu nâng cao.",
		features: [
			"Không giới hạn địa điểm",
			"Không giới hạn sản phẩm",
			"Phân quyền chi tiết",
			"Báo cáo nâng cao",
			"Truy cập API",
			"Hỗ trợ chuyên biệt",
		],
		name: "Doanh nghiệp vừa",
		period: "/tháng",
		price: "799.000",
	},
];

export function Pricing() {
	return (
		<section className="scroll-mt-20 bg-muted/50 py-20 sm:py-24" id="pricing">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<p className="font-semibold text-emerald-600 text-sm uppercase tracking-wider">
						Bảng giá
					</p>
					<h2 className="mt-2 text-balance font-bold font-heading text-3xl tracking-tight sm:text-4xl">
						Giá đơn giản, phù hợp khi bạn phát triển
					</h2>
					<p className="mt-4 text-pretty text-muted-foreground">
						Dùng thử miễn phí 14 ngày. Không cần thẻ tín dụng. Hủy bất cứ lúc
						nào.
					</p>
				</div>

				<div className="mt-12 grid gap-6 md:grid-cols-3">
					{plans.map((plan) => (
						<div
							className={cn(
								"relative flex flex-col rounded-2xl border bg-card p-6 sm:p-8",
								plan.popular
									? "border-primary shadow-primary/10 shadow-xl ring-1 ring-primary"
									: "border-border",
							)}
							key={plan.name}
						>
							{plan.popular && (
								<Badge className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full">
									Phổ biến nhất
								</Badge>
							)}
							<h3 className="font-heading font-semibold text-lg">
								{plan.name}
							</h3>
							<p className="mt-1 text-muted-foreground text-sm">
								{plan.description}
							</p>
							<p className="mt-5 flex items-baseline gap-1">
								<span className="font-bold text-4xl tracking-tight">
									{plan.price}
								</span>
								<span className="font-semibold text-foreground text-lg">đ</span>
								<span className="text-muted-foreground text-sm">
									{plan.period}
								</span>
							</p>
							<ul className="mt-6 flex-1 space-y-2.5">
								{plan.features.map((feature) => (
									<li className="flex items-start gap-2 text-sm" key={feature}>
										<Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
										{feature}
									</li>
								))}
							</ul>
							<Button
								className="mt-8 w-full"
								nativeButton={false}
								render={<Link href="/register" />}
								variant={plan.popular ? "default" : "outline"}
							>
								Bắt đầu ngay
								<ArrowRight />
							</Button>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
