"use client";

// Popup Builder Component
// Comprehensive form with live preview
// Following CLUADE.md §7, §19.5

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Popup } from "@/lib/popups/types";
import { CreatePopupSchema, UpdatePopupSchema, PopupInput, PopupUpdate } from "@/lib/popups/schema";
import PopupPreview from "./PopupPreview";
import ColorPicker from "./ColorPicker";
import ImageUploader from "./ImageUploader";
import UrlListInput from "./UrlListInput";

interface PopupBuilderProps {
  popup?: Popup;
  isEdit?: boolean;
}

export default function PopupBuilder({ popup, isEdit = false }: PopupBuilderProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = popup || {
    name: "",
    enabled: false,
    template: "side_by_side" as const,
    content: {
      imageUrl: "",
      imageAlt: "",
      title: "",
      subtitle: "",
      ctaLabel: "",
      ctaHref: "",
      closeLabel: "No thanks",
      textColor: "#111827",
      titleColor: "#111827",
      subtitleColor: "#4B5563",
      ctaTextColor: "#FFFFFF",
      ctaBgColor: "#111827",
      panelBgColor: "#FFFFFF",
    },
    behaviour: {
      triggers: {
        onLoadDelayMs: 2000,
      },
      frequency: {
        oncePerSession: true,
      },
      targeting: {
        mode: "all" as const,
        paths: [],
      },
    },
    animation: {
      enter: "slide-right" as const,
      exit: "fade" as const,
      durationMs: 250,
      overlay: true,
    },
  };

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<any>({
    resolver: zodResolver(isEdit ? UpdatePopupSchema : CreatePopupSchema) as any,
    defaultValues,
  });

  const formData = watch();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const url = isEdit ? `/api/popups/${popup?.id}` : "/api/popups";
      const method = isEdit ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save popup");
      }

      toast.success(isEdit ? "Popup updated successfully" : "Popup created successfully");
      router.push("/admin/popups");
      router.refresh();
    } catch (error: any) {
      console.error("Save error:", error);
      toast.error(error.message || "Failed to save popup");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Form Column */}
        <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-12rem)] pr-4">
          {/* Basic Info */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Popup Name *
                </label>
                <input
                  {...register("name")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12213b]"
                  placeholder="Welcome Offer"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  {...register("enabled")}
                  type="checkbox"
                  className="h-4 w-4 text-[#12213b] focus:ring-[#12213b] border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Enable this popup
                </label>
              </div>
            </div>
          </section>

          {/* Image Settings */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Image Settings</h3>
            <div className="space-y-4">
              <ImageUploader
                label="Image URL *"
                value={formData.content?.imageUrl}
                onChange={(value) => setValue("content.imageUrl", value)}
              />
              {(errors as any).content?.imageUrl && (
                <p className="text-red-500 text-sm">{(errors as any).content.imageUrl.message as string}</p>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image Alt Text
                </label>
                <input
                  {...register("content.imageAlt")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12213b]"
                  placeholder="Descriptive alt text"
                />
              </div>
            </div>
          </section>

          {/* Content Settings */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Content Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  {...register("content.title")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12213b]"
                  placeholder="Psst... fancy £1,000 to spend?"
                />
                {(errors as any).content?.title && (
                  <p className="text-red-500 text-sm mt-1">{(errors as any).content.title.message as string}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle
                </label>
                <textarea
                  {...register("content.subtitle")}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12213b]"
                  placeholder="Join our list for exclusive perks"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CTA Button Text *
                </label>
                <input
                  {...register("content.ctaLabel")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12213b]"
                  placeholder="YES"
                />
                {(errors as any).content?.ctaLabel && (
                  <p className="text-red-500 text-sm mt-1">{(errors as any).content.ctaLabel.message as string}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CTA Button URL
                </label>
                <input
                  {...register("content.ctaHref")}
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12213b]"
                  placeholder="https://example.com/offer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Close Link Text
                </label>
                <input
                  {...register("content.closeLabel")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12213b]"
                  placeholder="NO THANKS"
                />
              </div>
            </div>
          </section>

          {/* Styling */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Styling</h3>
            <div className="space-y-4">
              <ColorPicker
                label="Panel Background Color"
                value={formData.content?.panelBgColor}
                onChange={(value) => setValue("content.panelBgColor", value)}
                defaultColor="#FFFFFF"
              />
              <ColorPicker
                label="Title Color"
                value={formData.content?.titleColor}
                onChange={(value) => setValue("content.titleColor", value)}
                defaultColor="#111827"
              />
              <ColorPicker
                label="Subtitle Color"
                value={formData.content?.subtitleColor}
                onChange={(value) => setValue("content.subtitleColor", value)}
                defaultColor="#4B5563"
              />
              <ColorPicker
                label="CTA Background Color"
                value={formData.content?.ctaBgColor}
                onChange={(value) => setValue("content.ctaBgColor", value)}
                defaultColor="#111827"
              />
              <ColorPicker
                label="CTA Text Color"
                value={formData.content?.ctaTextColor}
                onChange={(value) => setValue("content.ctaTextColor", value)}
                defaultColor="#FFFFFF"
              />
            </div>
          </section>

          {/* Triggers */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Display Triggers</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delay After Page Load (ms)
                </label>
                <input
                  {...register("behaviour.triggers.onLoadDelayMs", { valueAsNumber: true })}
                  type="number"
                  min="0"
                  step="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12213b]"
                  placeholder="2000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Show After Scroll % (0-100)
                </label>
                <input
                  {...register("behaviour.triggers.onScrollPercent", { valueAsNumber: true })}
                  type="number"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12213b]"
                  placeholder="50"
                />
              </div>

              <div className="flex items-center">
                <input
                  {...register("behaviour.triggers.exitIntent")}
                  type="checkbox"
                  className="h-4 w-4 text-[#12213b] focus:ring-[#12213b] border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Show on exit intent
                </label>
              </div>
            </div>
          </section>

          {/* Frequency */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Display Frequency</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  {...register("behaviour.frequency.oncePerSession")}
                  type="checkbox"
                  className="h-4 w-4 text-[#12213b] focus:ring-[#12213b] border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Show only once per session
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cooldown Period (days)
                </label>
                <input
                  {...register("behaviour.frequency.coolDownDays", { valueAsNumber: true })}
                  type="number"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12213b]"
                  placeholder="7"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Don't show again for X days after first view
                </p>
              </div>
            </div>
          </section>

          {/* Page Targeting */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Page Targeting</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Targeting Mode
                </label>
                <select
                  {...register("behaviour.targeting.mode")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12213b]"
                >
                  <option value="all">All Pages</option>
                  <option value="include">Specific Pages Only</option>
                  <option value="exclude">Exclude Specific Pages</option>
                </select>
              </div>

              {formData.behaviour?.targeting?.mode !== "all" && (
                <UrlListInput
                  label={
                    formData.behaviour?.targeting?.mode === "include"
                      ? "Include these pages"
                      : "Exclude these pages"
                  }
                  value={formData.behaviour?.targeting?.paths || []}
                  onChange={(value) => setValue("behaviour.targeting.paths", value)}
                  placeholder="/path/to/page"
                />
              )}
            </div>
          </section>

          {/* Animation */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Animation</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Entry Animation
                </label>
                <select
                  {...register("animation.enter")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12213b]"
                >
                  <option value="fade">Fade In</option>
                  <option value="slide-right">Slide from Right</option>
                  <option value="zoom">Zoom In</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exit Animation
                </label>
                <select
                  {...register("animation.exit")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12213b]"
                >
                  <option value="fade">Fade Out</option>
                  <option value="slide-right">Slide to Right</option>
                  <option value="zoom">Zoom Out</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Animation Duration (ms)
                </label>
                <input
                  {...register("animation.durationMs", { valueAsNumber: true })}
                  type="number"
                  min="100"
                  max="1000"
                  step="50"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12213b]"
                  placeholder="250"
                />
              </div>

              <div className="flex items-center">
                <input
                  {...register("animation.overlay")}
                  type="checkbox"
                  className="h-4 w-4 text-[#12213b] focus:ring-[#12213b] border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Show background overlay
                </label>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex space-x-4 pb-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#12213b] text-white py-3 px-6 rounded-md hover:bg-[#12213b]/90 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {isSubmitting ? "Saving..." : isEdit ? "Update Popup" : "Create Popup"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Preview Column */}
        <div className="bg-white rounded-lg shadow-sm sticky top-6 h-[calc(100vh-12rem)]">
          <div className="border-b p-4">
            <h3 className="text-lg font-semibold">Live Preview</h3>
          </div>
          <div className="h-[calc(100%-4rem)]">
            <PopupPreview popup={formData} />
          </div>
        </div>
      </div>
    </form>
  );
}
