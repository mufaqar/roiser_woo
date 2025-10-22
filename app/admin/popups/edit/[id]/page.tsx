// Edit Popup Page
// Following CLUADE.md §7

import { notFound } from "next/navigation";
import { getPopup } from "@/lib/popups/storage";
import PopupBuilder from "@/components/admin/PopupBuilder";

interface EditPopupPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPopupPage({ params }: EditPopupPageProps) {
  const { id } = await params;
  const popup = await getPopup(id);

  if (!popup) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Popup</h1>
        <p className="mt-2 text-sm text-gray-600">
          Update your popup configuration
        </p>
      </div>
      <PopupBuilder popup={popup} isEdit />
    </div>
  );
}
