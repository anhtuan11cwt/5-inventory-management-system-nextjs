"use client";

import { Lock } from "lucide-react";
import { useState } from "react";

import { FieldError } from "@/components/dashboard/catalog/catalog-form-modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/slug";

export function CategoryFields() {
	const [title, setTitle] = useState("");
	const slug = slugify(title);

	return (
		<>
			<div className="space-y-2">
				<Label htmlFor="category-title">Tiêu đề</Label>
				<Input
					id="category-title"
					name="title"
					onChange={(event) => setTitle(event.target.value)}
					placeholder="Điện tử"
					required
					value={title}
				/>
				<FieldError name="title" />
			</div>
			<div className="space-y-2">
				<Label htmlFor="category-slug">Slug</Label>
				<div className="relative">
					<Input
						aria-label="Slug (tự động)"
						id="category-slug"
						name="slug"
						placeholder="dien-tu"
						readOnly
						value={slug}
					/>
					<Lock className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
				</div>
				<FieldError name="slug" />
			</div>
			<div className="space-y-2">
				<Label htmlFor="category-image">Hình ảnh (URL)</Label>
				<Input
					id="category-image"
					name="imageUrl"
					placeholder="https://..."
					type="url"
				/>
				<FieldError name="imageUrl" />
			</div>
			<div className="space-y-2">
				<Label htmlFor="category-description">Mô tả</Label>
				<Textarea
					id="category-description"
					name="description"
					placeholder="Mô tả ngắn (không bắt buộc)"
					rows={3}
				/>
				<FieldError name="description" />
			</div>
		</>
	);
}
