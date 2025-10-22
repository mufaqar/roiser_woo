// Popup File Storage Utilities (following CLUADE.md §5, §6)

import { promises as fs } from "fs";
import path from "path";
import pLimit from "p-limit";
import { nanoid } from "nanoid";
import type { Popup, PopupId } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const POPUPS_FILE = path.join(DATA_DIR, "popups.json");

// Mutex to prevent race conditions (single concurrent write)
const limit = pLimit(1);

/**
 * Ensure data directory and popups.json exist
 */
async function ensureDataFile(): Promise<void> {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }

  try {
    await fs.access(POPUPS_FILE);
  } catch {
    await fs.writeFile(POPUPS_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

/**
 * Read all popups from file
 */
async function readPopups(): Promise<Popup[]> {
  await ensureDataFile();
  const data = await fs.readFile(POPUPS_FILE, "utf-8");
  return JSON.parse(data) as Popup[];
}

/**
 * Write all popups to file
 */
async function writePopups(popups: Popup[]): Promise<void> {
  await ensureDataFile();
  await fs.writeFile(POPUPS_FILE, JSON.stringify(popups, null, 2), "utf-8");
}

/**
 * Get all popups
 */
export async function listPopups(): Promise<Popup[]> {
  return limit(() => readPopups());
}

/**
 * Get popups filtered by enabled status
 */
export async function listEnabledPopups(): Promise<Popup[]> {
  const popups = await listPopups();
  return popups.filter((p) => p.enabled);
}

/**
 * Get a single popup by ID
 */
export async function getPopup(id: PopupId): Promise<Popup | null> {
  const popups = await readPopups();
  return popups.find((p) => p.id === id) || null;
}

/**
 * Create a new popup
 */
export async function createPopup(
  popupData: Omit<Popup, "id" | "createdAt" | "updatedAt">
): Promise<Popup> {
  return limit(async () => {
    const popups = await readPopups();

    const now = new Date().toISOString();
    const newPopup: Popup = {
      ...popupData,
      id: nanoid(10),
      createdAt: now,
      updatedAt: now,
    };

    popups.push(newPopup);
    await writePopups(popups);

    return newPopup;
  });
}

/**
 * Update an existing popup
 */
export async function updatePopup(
  id: PopupId,
  updates: Partial<Omit<Popup, "id" | "createdAt">>
): Promise<Popup | null> {
  return limit(async () => {
    const popups = await readPopups();
    const index = popups.findIndex((p) => p.id === id);

    if (index === -1) {
      return null;
    }

    const updatedPopup: Popup = {
      ...popups[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    popups[index] = updatedPopup;
    await writePopups(popups);

    return updatedPopup;
  });
}

/**
 * Delete a popup
 */
export async function deletePopup(id: PopupId): Promise<boolean> {
  return limit(async () => {
    const popups = await readPopups();
    const initialLength = popups.length;
    const filtered = popups.filter((p) => p.id !== id);

    if (filtered.length === initialLength) {
      return false; // Popup not found
    }

    await writePopups(filtered);
    return true;
  });
}

/**
 * Increment metrics for a popup
 */
export async function incrementMetrics(
  id: PopupId,
  type: "impressions" | "clicks"
): Promise<Popup | null> {
  return limit(async () => {
    const popups = await readPopups();
    const index = popups.findIndex((p) => p.id === id);

    if (index === -1) {
      return null;
    }

    const now = new Date().toISOString();
    const popup = popups[index];

    popup.metrics[type] += 1;

    if (type === "impressions") {
      popup.metrics.lastShownAt = now;
    } else if (type === "clicks") {
      popup.metrics.lastClickedAt = now;
    }

    popup.updatedAt = now;
    popups[index] = popup;

    await writePopups(popups);
    return popup;
  });
}

/**
 * Duplicate a popup (creates a copy with new ID)
 */
export async function duplicatePopup(id: PopupId): Promise<Popup | null> {
  return limit(async () => {
    const original = await getPopup(id);
    if (!original) {
      return null;
    }

    const now = new Date().toISOString();
    const popups = await readPopups();

    const duplicate: Popup = {
      ...original,
      id: nanoid(10),
      name: `${original.name} (Copy)`,
      enabled: false, // Duplicates start disabled
      createdAt: now,
      updatedAt: now,
      metrics: {
        impressions: 0,
        clicks: 0,
      },
    };

    popups.push(duplicate);
    await writePopups(popups);

    return duplicate;
  });
}
