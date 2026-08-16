import { ImageResponse } from "next/og";

export const alt = "Inventory Pro — quản lý kho hàng đơn giản";
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

export default function OpengraphImage() {
	return new ImageResponse(
		<div
			style={{
				background: "linear-gradient(135deg, #e11d48 0%, #881337 100%)",
				color: "#fff1f2",
				display: "flex",
				flexDirection: "column",
				height: "100%",
				justifyContent: "center",
				padding: "80px",
				width: "100%",
			}}
		>
			<div
				style={{
					alignItems: "center",
					display: "flex",
					gap: "24px",
					marginBottom: "32px",
				}}
			>
				<svg
					height="72"
					style={{ display: "flex" }}
					viewBox="0 0 40 40"
					width="72"
				>
					<title>Logo Inventory Pro</title>
					<rect fill="#fff1f2" height="40" rx="10" width="40" />
					<path
						d="M20 8 31 14v12L20 32 9 26V14L20 8Z"
						fill="none"
						stroke="#e11d48"
						strokeLinejoin="round"
						strokeWidth="2.5"
					/>
					<path
						d="M9 14l11 6 11-6"
						fill="none"
						stroke="#e11d48"
						strokeLinejoin="round"
						strokeWidth="2.5"
					/>
				</svg>
				<div
					style={{
						fontSize: "40px",
						fontWeight: 700,
						letterSpacing: "-0.02em",
					}}
				>
					Inventory Pro
				</div>
			</div>
			<div style={{ fontSize: "72px", fontWeight: 800, lineHeight: 1.1 }}>
				Quản lý kho hàng đơn giản
			</div>
			<div
				style={{
					color: "#fecdd3",
					fontSize: "32px",
					marginTop: "24px",
				}}
			>
				Quản lý kho hàng hiệu quả, nhẹ nhàng
			</div>
		</div>,
		size,
	);
}
