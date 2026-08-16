import { ImageResponse } from "next/og";

export const alt = "Inventory Pro — quản lý kho hàng đơn giản";
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

export default function TwitterImage() {
	return new ImageResponse(
		<div
			style={{
				alignItems: "center",
				background: "linear-gradient(135deg, #4c0519 0%, #881337 100%)",
				color: "#fff1f2",
				display: "flex",
				flexDirection: "column",
				height: "100%",
				justifyContent: "center",
				padding: "80px",
				textAlign: "center",
				width: "100%",
			}}
		>
			<div
				style={{ fontSize: "44px", fontWeight: 700, letterSpacing: "-0.02em" }}
			>
				Inventory Pro
			</div>
			<div style={{ fontSize: "72px", fontWeight: 800, marginTop: "24px" }}>
				Quản lý kho hàng đơn giản
			</div>
			<div style={{ color: "#fda4af", fontSize: "30px", marginTop: "20px" }}>
				Quản lý kho hàng hiệu quả, nhẹ nhàng
			</div>
		</div>,
		size,
	);
}
