import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export interface InviteRow {
	createdAt: Date;
	email: string;
	id: string;
	roleName: string;
	status: boolean;
}

function formatDate(date: Date) {
	return new Intl.DateTimeFormat("vi-VN", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(date);
}

export function InviteTable({ invites }: { invites: InviteRow[] }) {
	return (
		<div className="overflow-x-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Email</TableHead>
						<TableHead>Vai trò</TableHead>
						<TableHead>Trạng thái</TableHead>
						<TableHead>Ngày gửi</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{invites.length === 0 ? (
						<TableRow>
							<TableCell
								className="h-24 py-6 text-center text-muted-foreground"
								colSpan={4}
							>
								Chưa có lời mời nào.
							</TableCell>
						</TableRow>
					) : (
						invites.map((invite) => (
							<TableRow key={invite.id}>
								<TableCell className="font-medium">{invite.email}</TableCell>
								<TableCell>{invite.roleName}</TableCell>
								<TableCell>
									{invite.status ? (
										<Badge variant="secondary">Đã chấp nhận</Badge>
									) : (
										<Badge variant="outline">Đang chờ</Badge>
									)}
								</TableCell>
								<TableCell className="text-muted-foreground">
									{formatDate(invite.createdAt)}
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
