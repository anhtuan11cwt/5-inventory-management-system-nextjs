export async function register() {
	if (process.env.NEXT_RUNTIME === "nodejs") {
		// Kết nối database
		const { db: prisma } = await import("./lib/db");
		try {
			await prisma.$connect();
			const dbUrl = process.env.DATABASE_URL || "";
			const urlMatch = dbUrl.match(/\/\/([^@]+)@([^/]+)\/([^?]+)/);
			const host = urlMatch?.[2] || "unknown";
			const database = urlMatch?.[3] || "unknown";
			console.log("Kết nối database thành công");
			console.log(`   Host: ${host}`);
			console.log(`   Database: ${database}`);
		} catch (error) {
			console.error("Kết nối database thất bại:", error);
		}

		// Kiểm tra kết nối Gmail SMTP
		const nodemailer = await import("nodemailer");
		const transporter = nodemailer.default.createTransport({
			auth: {
				pass: process.env.GMAIL_APP_PASSWORD,
				user: process.env.GMAIL_USER,
			},
			service: "gmail",
		});
		try {
			await transporter.verify();
			console.log("Kết nối Gmail SMTP thành công");
			console.log(`   Account: ${process.env.GMAIL_USER}`);
		} catch (error) {
			console.error("Kết nối Gmail SMTP thất bại:", error);
		}
	}
}
