// lib/helpers/placeholder-type.ts

import { PlaceholderType } from "@/types/placeholders.types";

export const PLACEHOLDER_TYPE_META: Record<
    PlaceholderType,
    {
        label: string;
        color: string;
        badgeClass: string;
        borderClass: string;
        backgroundClass: string;
    }
> = {
    text: {
        label: "Text",
        color: "cyan",
        badgeClass: "bg-cyan-500 text-white",
        borderClass: "border-cyan-500",
        backgroundClass: "bg-cyan-500/10",
    },

    date: {
        label: "Date",
        color: "green",
        badgeClass: "bg-green-500 text-white",
        borderClass: "border-green-500",
        backgroundClass: "bg-green-500/10",
    },

    image: {
        label: "Image",
        color: "yellow",
        badgeClass: "bg-yellow-500 text-black",
        borderClass: "border-yellow-500",
        backgroundClass: "bg-yellow-500/10",
    },

    qr: {
        label: "QR Code",
        color: "purple",
        badgeClass: "bg-purple-500 text-white",
        borderClass: "border-purple-500",
        backgroundClass: "bg-purple-500/10",
    },

    signature: {
        label: "Signature",
        color: "red",
        badgeClass: "bg-red-500 text-white",
        borderClass: "border-red-500",
        backgroundClass: "bg-red-500/10",
    },

    number: {
        label: "Number",
        color: "orange",
        badgeClass: "bg-orange-500 text-white",
        borderClass: "border-orange-500",
        backgroundClass: "bg-orange-500/10",
    },

    barcode: {
        label: "Barcode",
        color: "pink",
        badgeClass: "bg-pink-500 text-white",
        borderClass: "border-pink-500",
        backgroundClass: "bg-pink-500/10",
    },

    url: {
        label: "URL",
        color: "blue",
        badgeClass: "bg-blue-500 text-white",
        borderClass: "border-blue-500",
        backgroundClass: "bg-blue-500/10",
    },

    email: {
        label: "Email",
        color: "indigo",
        badgeClass: "bg-indigo-500 text-white",
        borderClass: "border-indigo-500",
        backgroundClass: "bg-indigo-500/10",
    },
};


export function getPlaceholderTypeMeta(type: PlaceholderType) {
    return PLACEHOLDER_TYPE_META[type];
}