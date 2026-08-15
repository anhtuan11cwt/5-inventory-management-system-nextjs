import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

interface VerifyEmailProps {
	organizationName: string;
	otp: string;
	userName: string;
}

export function VerifyEmail({
	userName,
	organizationName,
	otp,
}: VerifyEmailProps) {
	return (
		<Html lang="vi">
			<Head />
			<Preview>Mã xác thực 6 chữ số của bạn cho {organizationName}</Preview>
			<Tailwind>
				<Body className="bg-slate-50 font-sans">
					<Container className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-sm">
						<Heading className="font-bold text-2xl text-slate-900">
							Chào mừng đến với {organizationName}
						</Heading>
						<Text className="text-slate-600">Xin chào {userName},</Text>
						<Text className="text-slate-600">
							Chúng tôi đã gửi cho bạn mã xác thực gồm 6 chữ số để xác nhận địa
							chỉ email và kích hoạt tài khoản Inventory Pro của bạn.
						</Text>
						<Section className="my-6 text-center">
							<Text className="font-bold text-3xl text-slate-900 tracking-widest">
								{otp}
							</Text>
						</Section>
						<Text className="text-slate-500 text-sm">
							Nhập mã này trên trang xác thực để hoàn tất việc tạo tài khoản của
							bạn. Mã có hiệu lực trong 10 phút.
						</Text>
						<Hr className="my-6 border-slate-200" />
						<Text className="text-slate-400 text-xs">
							Nếu bạn không yêu cầu email này, bạn có thể yên tâm bỏ qua.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
