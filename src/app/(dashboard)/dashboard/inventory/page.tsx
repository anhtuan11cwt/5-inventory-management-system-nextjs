import { redirect } from "next/navigation";

export default function InventoryHubPage() {
	redirect("/dashboard/inventory/items");
}
