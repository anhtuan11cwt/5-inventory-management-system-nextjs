"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
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

export function DeleteButton({
	id,
	label,
	onDelete,
	onDeleted,
}: {
	id: string;
	label: string;
	onDelete: (id: string) => Promise<{ error?: string }>;
	onDeleted?: () => void;
}) {
	const router = useRouter();
	const [busy, setBusy] = useState(false);

	async function handleDelete() {
		setBusy(true);
		const result = await onDelete(id);
		setBusy(false);

		if (result.error) {
			toast.error(result.error);
			return;
		}

		toast.success("Đã xóa thành công");
		router.refresh();
		onDeleted?.();
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger
				render={
					<Button
						aria-label={`Xóa ${label}`}
						className="text-destructive hover:text-destructive"
						disabled={busy}
						size="icon-sm"
						variant="ghost"
					>
						{busy ? <Loader2 className="animate-spin" /> : <Trash2 />}
					</Button>
				}
			/>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Xóa {label}?</AlertDialogTitle>
					<AlertDialogDescription>
						Hành động này không thể hoàn tác. Dữ liệu sẽ bị xóa vĩnh viễn.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Hủy</AlertDialogCancel>
					<AlertDialogAction
						className="bg-destructive hover:bg-destructive/90"
						onClick={handleDelete}
					>
						Xóa
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
