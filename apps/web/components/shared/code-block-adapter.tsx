"use client";

import type { BundledLanguage } from "@/components/ui/code-block";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
} from "@/components/ui/code-block";

export type CodeSnippet = {
    language: BundledLanguage;
    filename: string;
    code: string;
};

export type CodeBlockAdapterProps = {
    data: CodeSnippet[];
    defaultValue?: string;
};

export default function CodeBlockAdapter({
    data,
    defaultValue,
}: CodeBlockAdapterProps) {
    return (
        <CodeBlock data={data} defaultValue={ defaultValue ?? data[0].language }>
            <CodeBlockHeader className="justify-between">
                <CodeBlockFiles>
                    {(item) => (
                        <CodeBlockFilename key={item.language} value={item.language}>
                        {item.filename}
                        </CodeBlockFilename>
                    )}
                </CodeBlockFiles>
                <CodeBlockCopyButton />
            </CodeBlockHeader>
            <CodeBlockBody>
                {(item) => (
                    <CodeBlockItem key={item.language} value={item.language}>
                        <CodeBlockContent language={item.language as BundledLanguage}>
                            {item.code}
                        </CodeBlockContent>
                    </CodeBlockItem>
                )}
            </CodeBlockBody>
        </CodeBlock>
    )
};
