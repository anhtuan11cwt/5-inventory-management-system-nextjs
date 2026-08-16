import { Check, X } from "lucide-react";

const comparisons = [
	{
		label: "Quản lý danh mục sản phẩm",
		with: "Danh mục tập trung với mã SKU, biến thể và mã vạch",
		without: "Bảng tính trùng lặp và đầy sai sót",
	},
	{
		label: "Theo dõi mức tồn kho",
		with: "Số lượng tồn kho trực tiếp, cập nhật sau mỗi giao dịch",
		without: "Kiểm kê thủ công lỗi thời ngay khi vừa hoàn tất",
	},
	{
		label: "Giám sát đa địa điểm",
		with: "Theo dõi theo từng địa điểm với chuyển kho một chạm",
		without: "Không thấy được tình trạng giữa các kho và cửa hàng",
	},
	{
		label: "Điều chỉnh tồn kho",
		with: "Điều chỉnh ghi nhận kèm lý do và nhật ký kiểm toán đầy đủ",
		without: "Sửa đổi không chính thức, không ai kiểm tra được",
	},
	{
		label: "Báo cáo & Phân tích",
		with: "Báo cáo giá trị tồn kho và bán hàng sẵn sàng trong vài giây",
		without: "Hàng giờ làm báo cáo thủ công mỗi tháng",
	},
	{
		label: "Truy cập của nhóm",
		with: "Phân quyền đọc/ghi chi tiết cho từng thành viên",
		without: "Mọi người dùng chung một mật khẩu, không kiểm soát",
	},
];

export function Comparison() {
	return (
		<section
			className="scroll-mt-20 bg-muted/50 py-20 sm:py-24"
			id="comparison"
		>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<p className="font-semibold text-rose-600 text-sm uppercase tracking-wider">
						Sự khác biệt
					</p>
					<h2 className="mt-2 text-balance font-bold font-heading text-3xl tracking-tight sm:text-4xl">
						Trước &amp; sau khi dùng Inventory Pro
					</h2>
					<p className="mt-4 text-pretty text-muted-foreground">
						Đừng vận hành kho hàng dựa trên phán đoán. Xem cách các đội nhóm
						kiểm soát từng phần tồn kho của họ.
					</p>
				</div>

				<div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card">
					<div className="grid grid-cols-2 border-border border-b bg-muted/60 font-medium text-sm sm:text-base">
						<p className="px-4 py-3 text-foreground/60 sm:px-6">
							Không dùng Inventory Pro
						</p>
						<p className="flex items-center gap-2 px-4 py-3 text-foreground sm:px-6">
							<span className="inline-flex size-5 items-center justify-center rounded-full bg-rose-500/15">
								<Check className="size-3 text-rose-600" />
							</span>
							Dùng Inventory Pro
						</p>
					</div>

					{comparisons.map((row) => (
						<div
							className="grid grid-cols-2 border-border border-b last:border-b-0"
							key={row.label}
						>
							<div className="flex items-start gap-3 border-border border-r px-4 py-4 sm:px-6">
								<X className="mt-0.5 size-4 shrink-0 text-destructive" />
								<div>
									<p className="font-medium">{row.label}</p>
									<p className="mt-0.5 text-muted-foreground text-sm">
										{row.without}
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3 px-4 py-4 sm:px-6">
								<Check className="mt-0.5 size-4 shrink-0 text-rose-600" />
								<div>
									<p className="font-medium">{row.label}</p>
									<p className="mt-0.5 text-muted-foreground text-sm">
										{row.with}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
