"use client";

import Installation from "./installation";
import Initialization from "./initialization";
import TemplateConfiguration from "./template-configuration";
import Generate from "./generate";
import Verification from "./verification";
import Configuration from "./configuration";
import Webhooks from "./webhooks";
import Migration from "./migration";

export default function SDK() {
    return (
        <section
            id="sdk"
            className="space-y-24"
        >
            <Installation />

            <Initialization />

            <TemplateConfiguration />

            <Generate />

            <Verification />

            <Configuration />

            <Webhooks />

            <Migration />
        </section>
    );
}