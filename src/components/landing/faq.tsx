import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
	{
		answer:
			"Inventory Pro theo dõi tồn kho theo thời gian thực và cho phép bạn đặt mức đặt hàng lại cho từng sản phẩm. Khi sản phẩm xuống dưới ngưỡng, bạn nhận cảnh báo ngay lập tức để đặt hàng trước khi hết. Báo cáo tồn thấp hiển thị mọi thứ cần lưu ý trong một cái nhìn.",
		question: "Inventory Pro giúp tránh hết hàng như thế nào?",
	},
	{
		answer:
			"Có. Mỗi sản phẩm được theo dõi độc lập giữa nhiều kho và cửa hàng. Bạn có thể chuyển kho giữa các địa điểm chỉ với vài thao tác và xem cả báo cáo tổng hợp lẫn theo từng địa điểm.",
		question: "Tôi có thể quản lý tồn kho ở nhiều địa điểm không?",
	},
	{
		answer:
			"Tạo đơn mua hàng với nhà cung cấp, ghi nhận hàng nhận được, và tồn kho cùng giá vốn sẽ tự động cập nhật. Bạn theo dõi được đơn còn tồn, hàng sắp về và toàn bộ lịch sử mua hàng.",
		question: "Hệ thống đơn mua hàng hoạt động như thế nào?",
	},
	{
		answer:
			"Số lượng tồn kho và giá vốn được cập nhật tự động ngay khi ghi nhận một đơn bán. Bạn luôn thấy số liệu và định giá chính xác mà không cần nhập tay.",
		question: "Điều gì xảy ra khi tôi bán hàng?",
	},
	{
		answer:
			"Có — mọi gói đều bắt đầu với bản dùng thử miễn phí 14 ngày, không cần thẻ tín dụng. Bạn có thể hủy bất cứ lúc nào từ phần cài đặt.",
		question: "Bạn có bản dùng thử miễn phí không?",
	},
	{
		answer:
			"Chắc chắn rồi. Inventory Pro có sẵn phân quyền chi tiết theo vai trò, cho phép bạn cho thành viên quyền chỉ đọc hoặc toàn quyền theo từng phân hệ — từ sản phẩm, tồn kho đến báo cáo và cài đặt.",
		question: "Tôi có thể kiểm soát quyền truy cập của nhóm không?",
	},
];

export function FAQ() {
	return (
		<section className="scroll-mt-20 py-20 sm:py-24" id="faq">
			<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<p className="font-semibold text-emerald-600 text-sm uppercase tracking-wider">
						Câu hỏi thường gặp
					</p>
					<h2 className="mt-2 text-balance font-bold font-heading text-3xl tracking-tight sm:text-4xl">
						Các câu hỏi thường gặp
					</h2>
					<p className="mt-4 text-pretty text-muted-foreground">
						Mọi điều bạn cần biết về Inventory Pro. Không tìm thấy câu trả lời?
						Hãy liên hệ đội ngũ hỗ trợ của chúng tôi.
					</p>
				</div>

				<Accordion className="mt-10">
					{faqs.map((faq) => (
						<AccordionItem key={faq.question} value={faq.question}>
							<AccordionTrigger className="text-base">
								{faq.question}
							</AccordionTrigger>
							<AccordionContent>
								<p className="text-muted-foreground">{faq.answer}</p>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
