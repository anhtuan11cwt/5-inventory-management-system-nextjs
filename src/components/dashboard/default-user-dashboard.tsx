import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

export interface NavigationCard {
	description?: string;
	href: string;
	icon: LucideIcon;
	title: string;
}

function getGreeting() {
	const hour = new Date().getHours();
	if (hour < 12) return "Chào buổi sáng";
	if (hour < 18) return "Chào buổi chiều";
	return "Chào buổi tối";
}

export function DefaultUserDashboard({
	userName,
	navigationCards,
}: {
	userName?: string;
	navigationCards: NavigationCard[];
}) {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="font-bold font-heading text-2xl tracking-tight sm:text-3xl">
					{getGreeting()}, {userName?.split(" ")[0] ?? "bạn"}
				</h1>
				<p className="mt-1 text-muted-foreground">
					Chọn một mục bên dưới để bắt đầu quản lý kho hàng.
				</p>
			</div>

			{navigationCards.length > 0 ? (
				<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
					{navigationCards.map((card) => (
						<Link
							className="group rounded-2xl transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
							href={card.href}
							key={card.href}
						>
							<Card className="h-full">
								<CardContent className="flex flex-col gap-3 p-5">
									<div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
										<card.icon className="size-5" />
									</div>
									<div>
										<p className="font-medium">{card.title}</p>
										{card.description && (
											<p className="mt-0.5 text-muted-foreground text-sm">
												{card.description}
											</p>
										)}
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			) : (
				<Card>
					<CardContent className="flex flex-col items-center gap-2 py-14 text-center">
						<p className="font-medium">Chưa có quyền truy cập phân hệ nào</p>
						<p className="max-w-sm text-muted-foreground text-sm">
							Liên hệ quản trị viên tổ chức để được cấp quyền sử dụng các tính
							năng.
						</p>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
