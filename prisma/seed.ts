import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function cleanDatabase() {
	await prisma.user.deleteMany();
	await prisma.organization.deleteMany();
}

async function main() {
	await cleanDatabase();

	const organization = await prisma.organization.create({
		data: {
			country: "Vietnam",
			currency: "VND",
			industry: "Retail",
			name: "Tổ chức mặc định",
			slug: "default-organization",
			timeZone: "Asia/Ho_Chi_Minh",
		},
	});

	const passwordHash = await bcrypt.hash("password123", 10);

	await prisma.user.create({
		data: {
			email: "admin@admin.com",
			isVerified: true,
			name: "Quản trị viên",
			organizationId: organization.id,
			organizationName: organization.name,
			password: passwordHash,
			role: "ADMIN",
		},
	});

	await prisma.user.create({
		data: {
			email: "user@user.com",
			isVerified: true,
			name: "Người dùng thường",
			organizationId: organization.id,
			organizationName: organization.name,
			password: passwordHash,
			role: "USER",
		},
	});

	console.log("Đã seed tổ chức và người dùng:");
	console.log("  - Tổ chức mặc định (default-organization)");
	console.log("  - Quản trị viên: admin@admin.com / password123");
	console.log("  - Người dùng thường: user@user.com / password123");
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
