"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PasswordInputProps = React.ComponentProps<typeof Input> & {
	show?: boolean;
	onToggle?: () => void;
};

export function PasswordInput({
	className,
	id,
	disabled,
	show,
	onToggle,
	...props
}: PasswordInputProps) {
	const [internalShow, setInternalShow] = useState(false);

	const isControlled = show !== undefined && onToggle !== undefined;
	const showPassword = isControlled ? show : internalShow;

	function handleToggle() {
		if (isControlled) {
			onToggle?.();
		} else {
			setInternalShow((current) => !current);
		}
	}

	return (
		<div className="relative">
			<Input
				className={cn("pr-10", className)}
				disabled={disabled}
				id={id}
				type={showPassword ? "text" : "password"}
				{...props}
			/>
			<button
				aria-label={showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
				aria-pressed={showPassword}
				className={cn(
					"absolute top-1/2 right-1 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
					disabled
						? "pointer-events-none cursor-default opacity-50"
						: "cursor-pointer",
				)}
				disabled={disabled}
				onClick={handleToggle}
				type="button"
			>
				{showPassword ? (
					<EyeOff className="size-4" />
				) : (
					<Eye className="size-4" />
				)}
			</button>
		</div>
	);
}
