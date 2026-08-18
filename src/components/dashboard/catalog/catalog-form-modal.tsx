"use client";

import { Loader2, type LucideIcon, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import {
	createContext,
	startTransition,
	useActionState,
	useContext,
	useEffect,
	useState,
} from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { FieldErrors } from "@/lib/validation";
import {
	brandSchema,
	categorySchema,
	itemSchema,
	taxRateSchema,
	unitSchema,
} from "@/lib/validation";

const catalogSchemas = {
	brand: brandSchema,
	category: categorySchema,
	item: itemSchema,
	taxRate: taxRateSchema,
	unit: unitSchema,
} as const;

export type CatalogSchemaKey = keyof typeof catalogSchemas;

const SUBMIT_DELAY_MS = 2000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type CatalogActionState = {
	error?: string;
	success?: boolean;
	fieldErrors?: FieldErrors;
};

const FieldErrorsContext = createContext<FieldErrors>({});

export function FieldError({ name }: { name: string }) {
	const errors = useContext(FieldErrorsContext);
	const message = errors[name]?.[0];
	if (!message) return null;
	return <p className="text-destructive text-xs">{message}</p>;
}

interface CatalogFormModalProps {
	action: (
		prev: CatalogActionState,
		formData: FormData,
	) => Promise<CatalogActionState>;
	children: ReactNode;
	description?: string;
	onSuccess?: () => void;
	organizationId: string;
	schemaKey: CatalogSchemaKey;
	submitLabel?: string;
	successMessage: string;
	title: string;
	triggerIcon?: LucideIcon;
	triggerLabel: string;
}

export function CatalogFormModal({
	triggerLabel,
	triggerIcon: Icon = Plus,
	title,
	description,
	onSuccess,
	organizationId,
	action,
	schemaKey,
	submitLabel = "Lưu",
	successMessage,
	children,
}: CatalogFormModalProps) {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [state, formAction, isPending] = useActionState<
		CatalogActionState,
		FormData
	>(action, {});
	const [clientErrors, setClientErrors] = useState<FieldErrors>();
	const [delaying, setDelaying] = useState(false);

	const loading = delaying || isPending;

	useEffect(() => {
		if (state.success) {
			toast.success(successMessage);
			setTimeout(() => setOpen(false), 0);
			router.refresh();
			onSuccess?.();
		}
	}, [state.success, router, successMessage, onSuccess]);

	useEffect(() => {
		if (state.error) {
			toast.error(state.error);
		}
	}, [state.error]);

	async function handleSubmit(formData: FormData) {
		formData.set("organizationId", organizationId);

		const parsed = catalogSchemas[schemaKey].safeParse(
			Object.fromEntries(formData),
		);

		if (!parsed.success) {
			setClientErrors(parsed.error.flatten().fieldErrors as FieldErrors);
			return;
		}

		setClientErrors(undefined);
		setDelaying(true);
		startTransition(() => {
			formAction(formData);
		});
		await delay(SUBMIT_DELAY_MS);
		setDelaying(false);
	}

	const fieldErrors: FieldErrors =
		clientErrors ?? (state.fieldErrors as FieldErrors | undefined) ?? {};

	return (
		<Dialog disablePointerDismissal onOpenChange={setOpen} open={open}>
			<DialogTrigger
				render={
					<Button className="ml-auto">
						{Icon ? <Icon /> : null}
						{triggerLabel}
					</Button>
				}
			/>
			<DialogContent
				className="sm:max-w-md"
				data-form-loading={loading ? "true" : "false"}
			>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description ? (
						<DialogDescription>{description}</DialogDescription>
					) : null}
				</DialogHeader>
				<form action={handleSubmit} className="space-y-4" noValidate>
					<FieldErrorsContext.Provider value={fieldErrors}>
						{children}
					</FieldErrorsContext.Provider>
					<DialogFooter>
						<Button disabled={loading} type="submit">
							{loading ? (
								<>
									<Loader2 className="animate-spin" />
									Đang lưu...
								</>
							) : (
								submitLabel
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
