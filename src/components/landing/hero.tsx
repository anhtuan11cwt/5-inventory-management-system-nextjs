import { ArrowRight, PlayCircle, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const metrics = [
	{ label: "Giá trị tồn kho", value: "1.250.000.000đ" },
	{ label: "Cảnh báo tồn thấp", value: "3" },
	{ label: "Địa điểm", value: "4" },
	{ label: "Đơn hàng hôm nay", value: "28" },
];

export function Hero() {
	return (
		<section className="relative overflow-hidden">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 -z-10"
			>
				<div className="absolute -top-40 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-rose-500/10 blur-3xl" />
				<div className="absolute top-40 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
			</div>

			<div className="mx-auto max-w-7xl px-4 pt-16 pb-16 sm:px-6 sm:pt-24 lg:px-8">
				<div className="mx-auto max-w-3xl text-center">
					<Badge
						className="mb-6 gap-1.5 rounded-full px-3 py-1"
						variant="outline"
					>
						<span className="relative flex size-2">
							<span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-500 opacity-75" />
							<span className="relative inline-flex size-2 rounded-full bg-rose-500" />
						</span>
						Theo dõi tồn kho theo thời gian thực
					</Badge>
					<h1 className="text-balance font-bold font-heading text-4xl tracking-tight sm:text-5xl lg:text-6xl">
						Đơn giản hóa việc quản lý kho hàng với{" "}
						<span className="text-primary">Inventory Pro</span>
					</h1>
					<p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
						Theo dõi tồn kho theo thời gian thực, quản lý nhiều địa điểm, điều
						chỉnh tồn kho linh hoạt và tạo báo cáo giúp doanh nghiệp tăng trưởng
						— tất cả trên một nền tảng dành cho doanh nghiệp vừa và nhỏ.
					</p>
					<div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
						<Button
							className="w-full sm:w-auto"
							nativeButton={false}
							render={<Link href="/register" />}
							size="lg"
						>
							Dùng thử miễn phí
							<ArrowRight />
						</Button>
						<Button
							className="w-full sm:w-auto"
							nativeButton={false}
							render={<Link href="#demo" />}
							size="lg"
							variant="outline"
						>
							<PlayCircle />
							Xem demo
						</Button>
					</div>
				</div>

				<div className="relative mx-auto mt-16 max-w-5xl">
					<div className="rounded-2xl border border-border bg-card p-2 shadow-2xl shadow-primary/10">
						<div className="rounded-xl border border-border bg-muted/40 p-4 sm:p-6">
							<div className="flex flex-wrap items-center justify-between gap-3">
								<div>
									<p className="font-semibold text-sm">
										Tổng quan bảng điều khiển
									</p>
									<p className="text-muted-foreground text-xs">
										Acme Retail · Vừa được cập nhật
									</p>
								</div>
								<div className="flex items-center gap-1.5 rounded-full bg-rose-500/10 px-2.5 py-1 font-medium text-rose-600 text-xs">
									<TrendingUp className="size-3.5" />
									+12,4% so với tuần trước
								</div>
							</div>
							<div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
								{metrics.map((metric) => (
									<div
										className="rounded-lg border border-border bg-background p-4"
										key={metric.label}
									>
										<p className="text-muted-foreground text-xs">
											{metric.label}
										</p>
										<p className="mt-1 font-semibold text-xl sm:text-2xl">
											{metric.value}
										</p>
									</div>
								))}
							</div>
							<div className="mt-4 hidden gap-3 sm:grid sm:grid-cols-[2fr_1fr]">
								<div className="rounded-lg border border-border bg-background p-4">
									<p className="mb-3 font-medium text-muted-foreground text-xs">
										Mức tồn kho
									</p>
									<div className="flex h-32 items-end gap-2">
										{[
											"42%",
											"68%",
											"35%",
											"90%",
											"55%",
											"72%",
											"48%",
											"80%",
											"61%",
											"38%",
										].map((height) => (
											<div
												className="flex-1 rounded-t bg-primary/70"
												key={height}
												style={{ height }}
											/>
										))}
									</div>
								</div>
								<div className="rounded-lg border border-border bg-background p-4">
									<p className="mb-3 font-medium text-muted-foreground text-xs">
										Sản phẩm tồn thấp
									</p>
									<ul className="space-y-2 text-xs">
										<li className="flex items-center justify-between">
											<span>Chuột không dây</span>
											<Badge className="bg-amber-500/15 text-amber-600">
												còn 6
											</Badge>
										</li>
										<li className="flex items-center justify-between">
											<span>Cáp USB-C</span>
											<Badge className="bg-amber-500/15 text-amber-600">
												còn 2
											</Badge>
										</li>
										<li className="flex items-center justify-between">
											<span>Bộ chuyển HDMI</span>
											<Badge variant="destructive">hết hàng</Badge>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
