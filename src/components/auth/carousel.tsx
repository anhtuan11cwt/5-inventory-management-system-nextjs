"use client";

import { ArrowLeft, ArrowRight, Boxes, LineChart, MapPin } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const slides = [
	{
		description:
			"Số lượng luôn chính xác, tự động cập nhật sau mỗi giao dịch bán, mua hay điều chỉnh.",
		from: "#e11d48",
		icon: Boxes,
		title: "Theo dõi tồn kho theo thời gian thực",
		to: "#9f1239",
	},
	{
		description:
			"Nhiều kho, nhiều cửa hàng — tất cả trong một bảng điều khiển với chuyển kho một chạm.",
		from: "#be123c",
		icon: MapPin,
		title: "Quản lý đa địa điểm",
		to: "#881337",
	},
	{
		description:
			"Giá trị tồn kho, biến động, bán & mua hàng — báo cáo sẵn sàng trong vài giây.",
		from: "#9f1239",
		icon: LineChart,
		title: "Báo cáo giúp tăng trưởng",
		to: "#4c0519",
	},
];

const AUTOPLAY_MS = 5000;

export function Carousel() {
	const [index, setIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const timer = useRef<ReturnType<typeof setInterval> | null>(null);

	const next = useCallback(() => {
		setIndex((current) => (current + 1) % slides.length);
	}, []);

	const prev = useCallback(() => {
		setIndex((current) => (current - 1 + slides.length) % slides.length);
	}, []);

	useEffect(() => {
		if (paused) return;
		timer.current = setInterval(next, AUTOPLAY_MS);
		return () => {
			if (timer.current) clearInterval(timer.current);
		};
	}, [paused, next]);

	const slide = slides[index];

	return (
		<section
			aria-label="Điểm nổi bật"
			aria-roledescription="carousel"
			className="relative hidden h-full min-h-[28rem] overflow-hidden rounded-2xl lg:block"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
		>
			<div
				aria-hidden="true"
				className="absolute inset-0 transition-colors duration-700"
				style={{
					background: `linear-gradient(135deg, ${slide.from}, ${slide.to})`,
				}}
			>
				<div className="absolute -top-24 -right-24 size-72 rounded-full bg-white/10 blur-3xl" />
				<div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-black/20 blur-3xl" />
			</div>

			<div className="relative flex h-full flex-col justify-between p-10">
				<div className="flex size-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
					<slide.icon className="size-7" />
				</div>

				<div
					className="fade-in slide-in-from-bottom-4 animate-in duration-500"
					key={index}
				>
					<p className="font-bold font-heading text-3xl text-white leading-tight">
						{slide.title}
					</p>
					<p className="mt-3 max-w-md text-pretty text-white/80">
						{slide.description}
					</p>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						{slides.map((s, i) => (
							<button
								aria-current={i === index}
								aria-label={`Chuyển tới slide ${i + 1}`}
								className={cn(
									"size-2 rounded-full transition-all",
									i === index
										? "w-6 bg-white"
										: "bg-white/40 hover:bg-white/70",
								)}
								key={s.title}
								onClick={() => setIndex(i)}
								type="button"
							/>
						))}
					</div>
					<div className="flex items-center gap-2">
						<button
							aria-label="Slide trước"
							className="flex size-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
							onClick={prev}
							type="button"
						>
							<ArrowLeft className="size-4" />
						</button>
						<button
							aria-label="Slide sau"
							className="flex size-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
							onClick={next}
							type="button"
						>
							<ArrowRight className="size-4" />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
