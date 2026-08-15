import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ModulePlaceholder({
	title,
	description,
	icon: Icon,
	cta = "Tạo mới",
}: {
	title: string;
	description: string;
	icon: LucideIcon;
	cta?: string;
}) {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="font-bold font-heading text-2xl tracking-tight sm:text-3xl">
					{title}
				</h1>
				<p className="mt-1 text-muted-foreground">{description}</p>
			</div>

			<Card className="border-dashed">
				<CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
					<div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
						<Icon className="size-6" />
					</div>
					<div>
						<p className="font-medium">Phân hệ {title}</p>
						<p className="mx-auto mt-1 max-w-sm text-muted-foreground text-sm">
							Phân hệ này đã được khởi tạo và sẵn sàng. Các luồng CRUD đầy đủ sẽ
							được triển khai trong giai đoạn tiếp theo.
						</p>
					</div>
					<Button className="mt-2" disabled>
						{cta}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
