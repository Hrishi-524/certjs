type WorkflowStepsProps = {
    steps: readonly string[];
};

export default function WorkflowSteps({
    steps,
}: WorkflowStepsProps) {
    return (
        <div className="space-y-4">
            {steps.map((step, index) => (
                <div
                    key={step}
                    className="flex items-start gap-4"
                >
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                        {index + 1}
                    </div>

                    <p className="pt-1 text-sm">
                        {step}
                    </p>
                </div>
            ))}
        </div>
    );
}