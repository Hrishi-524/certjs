"use client";
import CodeBlockAdapter from "./code-block-adapter";
import type { BundledLanguage } from "@/components/ui/code-block";

export type AppCodeBlockProps = {
    language: BundledLanguage;
    label: string;
    code: string;
};

export default function AppCodeBlock({
    language, label, code
}: AppCodeBlockProps) {
    return (
        <CodeBlockAdapter 
            data={[
                { 
                    language, 
                    filename: label, 
                    code 
                }
            ]} 
            defaultValue={language} 
        />
    )
};
