import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import { ensureDefaultRoles } from "../src/lib/roles";

const prisma = new PrismaClient();

async function cleanDatabase() {
	await prisma.user.deleteMany();
	await prisma.invite.deleteMany();
	await prisma.role.deleteMany();
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

	const { adminRole, userRole } = await ensureDefaultRoles(organization.id);

	const adminPasswordHash = await bcrypt.hash("Admin@123", 10);
	const userPasswordHash = await bcrypt.hash("User@123", 10);

	await prisma.user.create({
		data: {
			email: "admin@admin.com",
			isVerified: true,
			name: "Quản trị viên",
			organizationId: organization.id,
			organizationName: organization.name,
			password: adminPasswordHash,
			roleId: adminRole.id,
		},
	});

	await prisma.user.create({
		data: {
			email: "user@user.com",
			isVerified: true,
			name: "Người dùng thường",
			organizationId: organization.id,
			organizationName: organization.name,
			password: userPasswordHash,
			roleId: userRole.id,
		},
	});

	console.log("Đã seed tổ chức, roles và người dùng:");
	console.log("  - Tổ chức mặc định (default-organization)");
	console.log(`  - Role Admin (${adminRole.permissions.length} quyền)`);
	console.log(`  - Role User (${userRole.permissions.length} quyền)`);
	console.log("  - Quản trị viên: admin@admin.com / Admin@123");
	console.log("  - Người dùng thường: user@user.com / User@123");
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
