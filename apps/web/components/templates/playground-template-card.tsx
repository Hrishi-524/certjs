"use client"

import { Image01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Template } from "@/types/templates.types"

type TemplateCardProps = {
    template: Template
}

function formatRelativeUpdatedTime(updatedAt: string) {
  const updatedTime = new Date(updatedAt).getTime()

  if (Number.isNaN(updatedTime)) {
    return "Updated recently"
  }

  const diffInSeconds = Math.max(
    0,
    Math.floor((Date.now() - updatedTime) / 1000)
  )

  const units = [
    { label: "year", seconds: 60 * 60 * 24 * 365 },
    { label: "month", seconds: 60 * 60 * 24 * 30 },
    { label: "week", seconds: 60 * 60 * 24 * 7 },
    { label: "day", seconds: 60 * 60 * 24 },
    { label: "hour", seconds: 60 * 60 },
    { label: "minute", seconds: 60 },
  ] as const

  for (const unit of units) {
    const value = Math.floor(diffInSeconds / unit.seconds)

    if (value >= 1) {
      return `Updated ${value} ${unit.label}${value === 1 ? "" : "s"} ago`
    }
  }

  return "Updated just now"
}

function PlaygroundTemplateCard({ template }: TemplateCardProps) {
  return (
    <Card className="w-full rounded-xl border border-border/70 pt-0 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
      {template.presignedUrl ? (
        <img
          src={template.presignedUrl}
          alt={`${template.name} template preview`}
          className="aspect-video w-full object-cover"
        />
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-muted/60 text-muted-foreground">
          <HugeiconsIcon
            icon={Image01Icon}
            strokeWidth={1.75}
            className="size-10"
          />
        </div>
      )}
      <CardHeader className="gap-2">
        <CardTitle className="line-clamp-2 text-lg">{template.name}</CardTitle>
        {/* {template.description ? (
          <CardDescription>{template.description}</CardDescription>
        ) : null} */}
        <CardDescription>
          {formatRelativeUpdatedTime(template.updatedAt)}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Button asChild className="w-full">
          <Link href={`/dashboard/playground/${template.templateId}`}>
            Open Playground
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PlaygroundTemplateCard
