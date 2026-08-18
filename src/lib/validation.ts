import { z } from "zod";

export type FieldErrors = Record<string, string[] | undefined>;

const VIETNAMESE_NAME_REGEX =
	// biome-ignore lint/suspicious/noMisleadingCharacterClass: cho phép tên NFD chứa dấu kết hợp tiếng Việt
	/^[\p{Script=Latin}][\p{Script=Latin}\u0300-\u036f'\- ]*$/u;

const ORG_NAME_REGEX =
	// biome-ignore lint/suspicious/noMisleadingCharacterClass: cho phép tên NFD chứa dấu kết hợp tiếng Việt
	/^[\p{Script=Latin}\p{N}\u0300-\u036f&.,'()\- ]+$/u;

const PASSWORD_CHARSET_REGEX = /^[\x21-\x7E]+$/;
const PASSWORD_HAS_UPPERCASE = /[A-Z]/;
const PASSWORD_HAS_LOWERCASE = /[a-z]/;
const PASSWORD_HAS_NUMBER = /[0-9]/;
const PASSWORD_HAS_SPECIAL = /[^A-Za-z0-9]/;

export const fullnameSchema = z
	.string("Vui lòng nhập họ và tên")
	.trim()
	.min(2, "Họ và tên phải có ít nhất 2 ký tự")
	.max(100, "Họ và tên không được vượt quá 100 ký tự")
	.regex(
		VIETNAMESE_NAME_REGEX,
		"Họ và tên chỉ được chứa chữ cái, dấu cách, dấu gạch nối và dấu nháy đơn",
	)
	.transform((name) => name.normalize("NFC").replace(/\s+/g, " "));

export const organizationNameSchema = z
	.string("Vui lòng nhập tên công ty")
	.trim()
	.min(2, "Tên công ty phải có ít nhất 2 ký tự")
	.max(100, "Tên công ty không được vượt quá 100 ký tự")
	.regex(ORG_NAME_REGEX, "Tên công ty chứa ký tự không hợp lệ")
	.transform((name) => name.normalize("NFC").replace(/\s+/g, " "));

export const emailSchema = z
	.string("Vui lòng nhập email")
	.trim()
	.min(1, "Vui lòng nhập email")
	.email("Vui lòng nhập email hợp lệ")
	.max(254, "Email quá dài")
	.toLowerCase();

export const passwordSchema = z
	.string("Vui lòng nhập mật khẩu")
	.min(8, "Mật khẩu phải có ít nhất 8 ký tự")
	.max(128, "Mật khẩu không được vượt quá 128 ký tự")
	.regex(
		PASSWORD_CHARSET_REGEX,
		"Mật khẩu chỉ được chứa ký tự in được (không khoảng trắng, không ký tự đặc biệt Unicode)",
	)
	.regex(PASSWORD_HAS_UPPERCASE, "Mật khẩu phải chứa ít nhất 1 chữ hoa")
	.regex(PASSWORD_HAS_LOWERCASE, "Mật khẩu phải chứa ít nhất 1 chữ thường")
	.regex(PASSWORD_HAS_NUMBER, "Mật khẩu phải chứa ít nhất 1 chữ số")
	.regex(PASSWORD_HAS_SPECIAL, "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt");

export const confirmPasswordSchema = z
	.string("Vui lòng xác nhận mật khẩu")
	.min(1, "Vui lòng xác nhận mật khẩu");

export const registerSchema = z
	.object({
		confirmPassword: confirmPasswordSchema,
		email: emailSchema,
		name: fullnameSchema,
		organizationName: organizationNameSchema,
		password: passwordSchema,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Mật khẩu xác nhận không khớp",
		path: ["confirmPassword"],
	});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
	email: emailSchema,
	password: z.string("Vui lòng nhập mật khẩu").min(1, "Vui lòng nhập mật khẩu"),
});

export const invitedUserSchema = z
	.object({
		confirmPassword: confirmPasswordSchema,
		email: emailSchema,
		name: fullnameSchema,
		password: passwordSchema,
		phone: z
			.string("Vui lòng nhập số điện thoại")
			.trim()
			.min(1, "Vui lòng nhập số điện thoại")
			.regex(/^0\d{9,10}$/, "Số điện thoại không hợp lệ (vd: 0912345678)"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Mật khẩu xác nhận không khớp",
		path: ["confirmPassword"],
	});

export type InvitedUserInput = z.infer<typeof invitedUserSchema>;

export const inviteSchema = z.object({
	email: emailSchema,
	roleId: z.string().min(1, "Vui lòng chọn vai trò"),
});

export const unitSchema = z.object({
	name: z
		.string("Vui lòng nhập tên đơn vị")
		.trim()
		.min(1, "Vui lòng nhập tên đơn vị")
		.max(50),
	symbol: z
		.string()
		.trim()
		.max(10, "Ký hiệu quá dài")
		.optional()
		.or(z.literal("")),
});

export const brandSchema = z.object({
	name: z
		.string("Vui lòng nhập tên thương hiệu")
		.trim()
		.min(1, "Vui lòng nhập tên thương hiệu")
		.max(100),
});

export const categorySchema = z.object({
	description: z.string().trim().max(500).optional().or(z.literal("")),
	imageUrl: z
		.string()
		.trim()
		.url("Vui lòng nhập URL hình ảnh hợp lệ")
		.optional()
		.or(z.literal("")),
	slug: z.string().trim().max(120).optional().or(z.literal("")),
	title: z
		.string("Vui lòng nhập tên danh mục")
		.trim()
		.min(1, "Vui lòng nhập tên danh mục")
		.max(100),
});

export const taxRateSchema = z.object({
	name: z
		.string("Vui lòng nhập tên thuế suất")
		.trim()
		.min(1, "Vui lòng nhập tên thuế suất")
		.max(50),
	rate: z.coerce
		.number()
		.min(0, "Giá trị phải từ 0")
		.max(100, "Giá trị tối đa 100"),
});

export const itemSchema = z.object({
	costPrice: z.coerce.number().min(15000, "Giá vốn tối thiểu là 15.000đ"),
	name: z
		.string("Vui lòng nhập tên mặt hàng")
		.trim()
		.min(1, "Vui lòng nhập tên mặt hàng")
		.max(200),
	sellingPrice: z.coerce.number().min(15000, "Giá bán tối thiểu là 15.000đ"),
	sku: z
		.string("Vui lòng nhập mã SKU")
		.trim()
		.min(1, "Vui lòng nhập mã SKU")
		.max(50),
	thumbnail: z
		.string()
		.trim()
		.url("Vui lòng nhập URL hình ảnh hợp lệ")
		.optional()
		.or(z.literal("")),
});
