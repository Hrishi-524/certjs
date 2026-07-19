import { useQuery } from "@tanstack/react-query";
import { listTemplates } from "@/lib/api/templates";

export function useTemplates() {
  return useQuery({
    queryKey: ["templates"],
    queryFn: listTemplates,
  });
}