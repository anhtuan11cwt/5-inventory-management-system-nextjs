import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
	return (
		<svg
			aria-hidden="true"
			className={cn("size-9", className)}
			fill="none"
			viewBox="0 0 40 40"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect className="fill-primary" height="40" rx="10" width="40" />
			<path
				className="stroke-primary-foreground"
				d="M20 8 31 14v12L20 32 9 26V14L20 8Z"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
			<path
				className="stroke-primary-foreground"
				d="M9 14l11 6 11-6"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
			<path
				className="stroke-primary-foreground"
				d="M20 20v12"
				strokeLinecap="round"
				strokeWidth="2"
			/>
			<path
				className="stroke-rose-500"
				d="M31 14l-11 6-4-2.2"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
		</svg>
	);
}

export function Logo({
	className,
	showText = true,
}: {
	className?: string;
	showText?: boolean;
}) {
	return (
		<span className={cn("flex items-center gap-2", className)}>
			<LogoMark className="size-8" />
			{showText && (
				<span className="font-heading font-semibold text-foreground text-lg tracking-tight">
					{siteConfig.name}
				</span>
			)}
		</span>
	);
}
