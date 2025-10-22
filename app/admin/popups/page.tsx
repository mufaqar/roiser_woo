// Admin Popups Dashboard Page
// Following CLUADE.md §7

import { listPopups } from "@/lib/popups/storage";
import PopupDashboard from "@/components/admin/PopupDashboard";

export default async function AdminPopupsPage() {
  const popups = await listPopups();

  return <PopupDashboard initialPopups={popups} />;
}
