import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CTA() {
	return (
		<section className="py-20 sm:py-24">
			<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
				<div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center sm:px-12 sm:py-16">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0"
					>
						<div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
						<div className="absolute right-1/4 -bottom-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
					</div>
					<div className="relative">
						<h2 className="mx-auto max-w-2xl text-balance font-bold font-heading text-3xl text-primary-foreground tracking-tight sm:text-4xl">
							Sẵn sàng kiểm soát kho hàng của bạn?
						</h2>
						<p className="mx-auto mt-4 max-w-xl text-pretty text-primary-foreground/80">
							Tham gia cùng hàng trăm doanh nghiệp đã thôi phán đoán và bắt đầu
							tăng trưởng. Dùng thử miễn phí 14 ngày ngay hôm nay.
						</p>
						<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
							<Button
								className="w-full bg-white text-primary hover:bg-white/90 sm:w-auto"
								nativeButton={false}
								render={<Link href="/register" />}
								size="lg"
							>
								Dùng thử miễn phí
								<ArrowRight />
							</Button>
							<Button
								className="w-full border-white/30 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground sm:w-auto"
								nativeButton={false}
								render={<Link href="/login" />}
								size="lg"
								variant="outline"
							>
								Đăng nhập
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
