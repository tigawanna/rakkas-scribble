import { ScribblePostsResponse } from "@/lib/pb/db-types";

export function statusColor(status: ScribblePostsResponse["status"]) {
  switch (status) {
    case "DRAFT":
      return "text-sm text-accent";
    case "PUBLISHED":
      return "text-sm text-success";
    case "REPUBLISHED":
      return "text-sm text-info";
    case "SCHEDULED":
      return "text-sm text-warning";
    default:
      return "text-sm";
  }
}
