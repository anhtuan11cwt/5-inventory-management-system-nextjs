import {
	Body,
	Button,
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

interface UserInviteProps {
	linkUrl: string;
	organizationName: string;
	roleName: string;
}

export function UserInvite({
	organizationName,
	roleName,
	linkUrl,
}: UserInviteProps) {
	return (
		<Html lang="vi">
			<Head />
			<Preview>
				Bạn được mời tham gia {organizationName} trên Inventory Pro
			</Preview>
			<Tailwind>
				<Body className="bg-slate-50 font-sans">
					<Container className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-sm">
						<Heading className="font-bold text-2xl text-slate-900">
							Bạn được mời tham gia {organizationName}
						</Heading>
						<Text className="text-slate-600">Xin chào,</Text>
						<Text className="text-slate-600">
							{organizationName} đã mời bạn tham gia với vai trò{" "}
							<Text className="inline font-semibold text-rose-600">
								{roleName}
							</Text>{" "}
							trên Inventory Pro. Hãy thiết lập tài khoản của bạn để bắt đầu
							quản lý kho hàng.
						</Text>
						<Section className="my-8 text-center">
							<Button
								className="rounded-lg bg-rose-600 px-6 py-3 font-semibold text-white"
								href={linkUrl}
							>
								Thiết lập tài khoản
							</Button>
						</Section>
						<Text className="text-slate-500 text-sm">
							Hoặc dán liên kết này vào trình duyệt:{" "}
							<Text className="break-all text-slate-600">{linkUrl}</Text>
						</Text>
						<Hr className="my-6 border-slate-200" />
						<Text className="text-slate-400 text-xs">
							Liên kết này dùng một lần. Nếu bạn không mong đợi lời mời này, bạn
							có thể bỏ qua email.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
