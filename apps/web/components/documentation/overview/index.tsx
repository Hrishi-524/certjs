"use client";

import GettingStarted from "./getting-started";
import CertJsApi from "./certjs-api";
import CertJsSdk from "./certjs-sdk";

import { Separator } from "@/components/ui/separator";

export default function Overview() {
    return (
        <section
            id="overview"
            className="space-y-12"
        >
            <GettingStarted />

            <Separator />

            <CertJsApi />

            <Separator />

            <CertJsSdk />
        </section>
    );
}