import { 
    JAVA_SNIPPET, 
    JAVASCRIPT_SNIPPET, 
    PYTHON_SNIPPET, 
    R_SNIPPET, 
    C_SHARP_SNIPPET, 
    CPP_SNIPPET, 
    TERMINAL_SNIPPET
} from "@/components/data/documentation/api-refrence/create-job/snippets";
import type { BundledLanguage } from "@/components/ui/code-block";

export const ApiKeysSnippets = {
    javascript: {
        label: "JavaScript",
        language: "typescript" as BundledLanguage,

        env: `const apiKey = process.env.CERTJS_API_KEY;`,

        snippet: JAVASCRIPT_SNIPPET,
    },

    python: {
        label: "Python",
        language: "python" as BundledLanguage,

        env: `api_key = os.environ["CERTJS_API_KEY"]`,

        snippet: PYTHON_SNIPPET,
    },

    java: {
        label: "Java",
        language: "java" as BundledLanguage,
        
        env: `String apiKey = System.getenv("CERTJS_API_KEY");`,
        snippet: JAVA_SNIPPET,
    },

    r: {
        label: "R",
        language: "r" as BundledLanguage,

        env: `api_key <- Sys.getenv("CERTJS_API_KEY")`,
        snippet: R_SNIPPET,
    },

    c_sharp: {
        label: "C#",
        language: "csharp" as BundledLanguage,
        
        env: `string apiKey = Environment.GetEnvironmentVariable("CERTJS_API_KEY");`,
        snippet: C_SHARP_SNIPPET,
    },

    cpp: {
        label: "C++",
        language: "cpp" as BundledLanguage,
        env: `std::string apiKey = std::getenv("CERTJS_API_KEY");`,
        snippet: CPP_SNIPPET,
    },

    terminal: {
        label: "Terminal",
        language: "bash" as BundledLanguage,

        env: `export CERTJS_API_KEY="YOUR_API_KEY"`,
        snippet: TERMINAL_SNIPPET,
    },
};