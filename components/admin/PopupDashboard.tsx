"use client";

// Popup Dashboard Component
// Following CLUADE.md §7, §19.5

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Popup } from "@/lib/popups/types";
import { useRouter } from "next/navigation";
import {
  Eye,
  MousePointer,
  TrendingUp,
  MessageSquare,
  Plus,
  Search,
  MoreHorizontal,
  Power,
  Copy,
  Edit,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PopupDashboardProps {
  initialPopups: Popup[];
}

export default function PopupDashboard({ initialPopups }: PopupDashboardProps) {
  const [popups, setPopups] = useState<Popup[]>(initialPopups);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredPopups = popups.filter((popup) =>
    popup.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateCTR = (popup: Popup): string => {
    if (popup.metrics.impressions === 0) return "0%";
    return ((popup.metrics.clicks / popup.metrics.impressions) * 100).toFixed(1) + "%";
  };

  const handleToggleEnabled = async (popup: Popup) => {
    try {
      const response = await fetch(`/api/popups/${popup.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !popup.enabled }),
      });

      if (!response.ok) {
        throw new Error("Failed to update popup");
      }

      const { popup: updatedPopup } = await response.json();
      setPopups((prev) =>
        prev.map((p) => (p.id === popup.id ? updatedPopup : p))
      );

      toast.success(
        updatedPopup.enabled ? "Popup enabled" : "Popup disabled"
      );
    } catch (error) {
      console.error("Toggle error:", error);
      toast.error("Failed to update popup");
    }
  };

  const handleDuplicate = async (popup: Popup) => {
    try {
      const response = await fetch("/api/popups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...popup,
          name: `${popup.name} (Copy)`,
          enabled: false,
          metrics: { impressions: 0, clicks: 0 },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to duplicate popup");
      }

      const { popup: newPopup } = await response.json();
      setPopups((prev) => [...prev, newPopup]);
      toast.success("Popup duplicated successfully");
    } catch (error) {
      console.error("Duplicate error:", error);
      toast.error("Failed to duplicate popup");
    }
  };

  const handleDelete = async (popup: Popup) => {
    if (!confirm(`Are you sure you want to delete "${popup.name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/popups/${popup.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete popup");
      }

      setPopups((prev) => prev.filter((p) => p.id !== popup.id));
      toast.success("Popup deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete popup");
    }
  };

  // Calculate aggregate metrics
  const totalImpressions = popups.reduce((sum, p) => sum + p.metrics.impressions, 0);
  const totalClicks = popups.reduce((sum, p) => sum + p.metrics.clicks, 0);
  const averageCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const activePopups = popups.filter((p) => p.enabled).length;

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your on-site popups and track performance
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/popups/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Popup
          </Link>
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Popups</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{popups.length}</div>
            <p className="text-xs text-muted-foreground">
              {activePopups} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impressions</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalImpressions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total views across all popups
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total interactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average CTR</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageCTR.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Click-through rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Popups Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>All Popups</CardTitle>
              <CardDescription>
                View and manage all your popup campaigns
              </CardDescription>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search popups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredPopups.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                {searchTerm ? "No popups found" : "No popups yet"}
              </h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Get started by creating your first popup"}
              </p>
              {!searchTerm && (
                <Button asChild>
                  <Link href="/admin/popups/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Popup
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Impressions</TableHead>
                    <TableHead className="text-right">Clicks</TableHead>
                    <TableHead className="text-right">CTR</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPopups.map((popup) => (
                    <TableRow key={popup.id}>
                      <TableCell className="font-medium">{popup.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant={popup.enabled ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => handleToggleEnabled(popup)}
                        >
                          <Power className="mr-1 h-3 w-3" />
                          {popup.enabled ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {popup.metrics.impressions.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {popup.metrics.clicks.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {calculateCTR(popup)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(popup.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/popups/edit/${popup.id}`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicate(popup)}>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(popup)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
