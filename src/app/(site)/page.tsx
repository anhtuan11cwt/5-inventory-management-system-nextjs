import type { Metadata } from "next";
import { Comparison } from "@/components/landing/comparison";
import { CTA } from "@/components/landing/cta";
import { FAQ } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { Pricing } from "@/components/landing/pricing";
import { VideoDemo } from "@/components/landing/video-demo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
	description: siteConfig.description,
	title: siteConfig.name,
};

export default function SitePage() {
	return (
		<>
			<Hero />
			<Features />
			<Comparison />
			<VideoDemo />
			<Pricing />
			<FAQ />
			<CTA />
		</>
	);
}
