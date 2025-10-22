// Create Popup Page
// Following CLUADE.md §7

import PopupBuilder from "@/components/admin/PopupBuilder";

export default function CreatePopupPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Popup</h1>
        <p className="mt-2 text-sm text-gray-600">
          Design and configure your popup campaign
        </p>
      </div>
      <PopupBuilder />
    </div>
  );
}
