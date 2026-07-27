"use client"

import { Search01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Input } from "@/components/ui/input"

type SearchTemplatesProps = {
    value: string;
    onChange: (value: string) => void;
}

function SearchTemplates({ value, onChange }: SearchTemplatesProps) {
  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="relative">
        <HugeiconsIcon
          icon={Search01Icon}
          strokeWidth={1.75}
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="text"
          placeholder="Search templates..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 rounded-xl bg-background pl-10 pr-4 shadow-sm"
        />
      </div>
    </div>
  )
}

export default SearchTemplates
