export function VideoDemo() {
	return (
		<section className="scroll-mt-20 py-20 sm:py-24" id="demo">
			<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<p className="font-semibold text-emerald-600 text-sm uppercase tracking-wider">
						Xem sản phẩm hoạt động
					</p>
					<h2 className="mt-2 text-balance font-bold font-heading text-3xl tracking-tight sm:text-4xl">
						Xem nhanh tổng quan Inventory Pro
					</h2>
					<p className="mt-4 text-pretty text-muted-foreground">
						Chỉ cần hai phút để thấy đội ngũ của bạn lấy lại quyền kiểm soát kho
						hàng như thế nào.
					</p>
				</div>

				<div className="group relative mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-primary/5">
					<div className="relative aspect-video w-full">
						<iframe
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
							className="absolute inset-0 size-full"
							src="https://www.youtube.com/embed/dQw4w9WgXcQ"
							title="Video demo Inventory Pro"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
