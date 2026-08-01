type GreetingPeriod = "morning" | "afternoon" | "evening" | "night";
export type Greeting = {
    title: string;
    subtitle: string;
};
const greetings: Record<GreetingPeriod, Greeting[]> = {
    morning: [
        {
            title: "Good morning",
            subtitle: "Let's start the day by building something great.",
        },
        {
            title: "Ready to build today?",
            subtitle: "Your templates, jobs, and certificates are waiting.",
        },
        {
            title: "A fresh day for a fresh batch.",
            subtitle: "Create, generate, and ship certificates with confidence.",
        },
        {
            title: "Let's make today productive.",
            subtitle: "Everything you need is one click away.",
        },
    ],

    afternoon: [
        {
            title: "What's on the agenda today?",
            subtitle: "Manage templates, generate certificates, and keep things moving.",
        },
        {
            title: "Welcome back",
            subtitle: "Continue where you left off and keep shipping.",
        },
        {
            title: "Ready for your next batch?",
            subtitle: "Generate documents in minutes, not hours.",
        },
        {
            title: "Keep the momentum going.",
            subtitle: "Your CertJS workspace is ready.",
        },
    ],

    evening: [
        {
            title: "Good evening",
            subtitle: "Wrap up today's work with one final batch.",
        },
        {
            title: "Almost done for the day?",
            subtitle: "Review recent jobs or create one more template.",
        },
        {
            title: "Let's finish strong.",
            subtitle: "Everything is ready whenever you are.",
        },
        {
            title: "Back for another session?",
            subtitle: "Your latest templates are waiting.",
        },
    ],

    night: [
        {
            title: "Working late?",
            subtitle: "Some of the best projects are built after hours.",
        },
        {
            title: "Burning the midnight oil?",
            subtitle: "Let's get one more batch out the door.",
        },
        {
            title: "Still shipping?",
            subtitle: "Productivity doesn't always stop at sunset.",
        },
        {
            title: "Late-night productivity?",
            subtitle: "Your workspace is always open.",
        },
    ],
};

export function getGreeting(): Greeting {
    const hour = new Date().getHours();

    const period: GreetingPeriod =
        hour < 12
            ? "morning"
            : hour < 17
              ? "afternoon"
              : hour < 21
                ? "evening"
                : "night";

    const options = greetings[period];

    return options[Math.floor(Math.random() * options.length)];
}