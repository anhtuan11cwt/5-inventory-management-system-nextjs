import { z } from "zod";

/**
 * Regex tên người Việt Nam:
 * - Chỉ chấp nhận ký tự Latin (bao gồm chữ cái có dấu tiếng Việt) + dấu kết hợp
 * - Chặn homoglyph (Cyrillic/Greek), chữ số, emoji, ký tự điều khiển (tab/newline/NBSP/zero-width)
 * - Cho phép dấu gạch nối và dấu nháy đơn (tên nước ngoài: Jean-Pierre, Mary-Anne)
 */
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
