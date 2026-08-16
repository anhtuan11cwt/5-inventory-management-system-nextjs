"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { deleteUser } from "@/actions/users/list";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export interface UserRow {
	email: string;
	id: string;
	name: string;
	roleName: string;
}

export function UserTable({ users }: { users: UserRow[] }) {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState<string | null>(null);

	async function handleDelete(id: string) {
		setDeletingId(id);
		const result = await deleteUser(id);
		setDeletingId(null);

		if (result.error) {
			toast.error(result.error);
			return;
		}

		toast.success("Đã xóa người dùng");
		router.refresh();
	}

	return (
		<div className="overflow-x-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Họ và tên</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Vai trò</TableHead>
						<TableHead>Thao tác</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.length === 0 ? (
						<TableRow>
							<TableCell
								className="h-24 py-6 text-center text-muted-foreground"
								colSpan={4}
							>
								Chưa có người dùng nào trong tổ chức.
							</TableCell>
						</TableRow>
					) : (
						users.map((user) => (
							<TableRow key={user.id}>
								<TableCell className="font-medium">{user.name}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.roleName}</TableCell>
								<TableCell>
									<AlertDialog>
										<AlertDialogTrigger
											render={
												<Button
													aria-label={`Xóa ${user.name}`}
													className="text-destructive hover:text-destructive"
													disabled={deletingId === user.id}
													size="icon-sm"
													variant="ghost"
												>
													{deletingId === user.id ? (
														<Loader2 className="animate-spin" />
													) : (
														<Trash2 />
													)}
												</Button>
											}
										/>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>Xóa người dùng?</AlertDialogTitle>
												<AlertDialogDescription>
													Người dùng{" "}
													<span className="font-medium text-foreground">
														{user.name}
													</span>{" "}
													sẽ bị xóa và không thể đăng nhập lại. Lời mời tương
													ứng (nếu có) cũng bị xóa.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Hủy</AlertDialogCancel>
												<AlertDialogAction
													className="bg-destructive hover:bg-destructive/90"
													onClick={() => handleDelete(user.id)}
												>
													Xóa
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
