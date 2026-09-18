"use client";

import { AppIcon } from "@/components/shared/app-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type {
    DeliveryChannel,
    DeliveryScope,
    IdentificationCase,
    IdentificationCollision,
    JobDeliverySemantics,
    JobSemantics,
} from "@/types/jobs.types";
import {
    Add01Icon,
    Delete02Icon,
} from "@hugeicons/core-free-icons";

type CertificateDeliverySettingsProps = {
    fields: string[];
    value: JobSemantics;
    onChange: (value: JobSemantics) => void;
    onContinue: () => void;
};

const channels: Array<{ value: DeliveryChannel; label: string }> = [
    { value: "email", label: "Email" },
    { value: "webhook", label: "Webhook (send to another system)" },
];

const scopes: Array<{ value: DeliveryScope; label: string }> = [
    { value: "recipient", label: "Each recipient" },
    { value: "batch", label: "Shared recipients" },
];

const deliveryCombinations: Array<{
    channel: DeliveryChannel;
    scope: DeliveryScope;
    label: string;
}> = [
    {
        channel: "email",
        scope: "recipient",
        label: "Email each recipient",
    },
    {
        channel: "email",
        scope: "batch",
        label: "Email the batch",
    },
    {
        channel: "webhook",
        scope: "recipient",
        label: "Webhook for each recipient",
    },
    {
        channel: "webhook",
        scope: "batch",
        label: "Webhook for the batch",
    },
];

const cases: Array<{ value: IdentificationCase; label: string }> = [
    { value: "preserve", label: "Preserve" },
    { value: "lower", label: "Lowercase" },
    { value: "upper", label: "Uppercase" },
];

const collisions: Array<{ value: IdentificationCollision; label: string }> = [
    { value: "suffix", label: "Add suffix" },
    { value: "prefix", label: "Add prefix" },
];

function createDelivery(
    fields: string[],
    channel: DeliveryChannel,
    scope: DeliveryScope
): JobDeliverySemantics {
    return {
        channel,
        scope,
        destination:
            scope === "recipient" && fields.length > 0 ? [fields[0]] : [],
        content: channel === "email" ? { body: "" } : null,
    };
}

function getDeliveryResultText(delivery: JobDeliverySemantics) {
    if (delivery.scope === "recipient") {
        return delivery.channel === "email"
            ? "Each recipient will receive their certificate."
            : "Each recipient's certificate will be sent to their webhook URL.";
    }

    return delivery.channel === "email"
        ? "These recipients will receive the generated ZIP."
        : "The generated ZIP will be sent to these webhook endpoints.";
}

function CertificateDeliverySettings({
    fields,
    value,
    onChange,
    onContinue,
}: CertificateDeliverySettingsProps) {
    const updateSettings = (nextValue: JobSemantics) => {
        onChange({
            ...nextValue,
            dashboardPersistence: true,
        });
    };

    const isCombinationUsed = (
        channel: DeliveryChannel,
        scope: DeliveryScope,
        currentIndex?: number
    ) =>
        value.deliveries.some(
            (delivery, index) =>
                index !== currentIndex &&
                delivery.channel === channel &&
                delivery.scope === scope
        );

    const availableCombinations = deliveryCombinations.filter(
        (combination) =>
            !isCombinationUsed(combination.channel, combination.scope)
    );

    const updateIdentification = (
        update: Partial<JobSemantics["identification"]>
    ) => {
        updateSettings({
            ...value,
            identification: {
                ...value.identification,
                ...update,
            },
        });
    };

    const updateDelivery = (
        index: number,
        update: Partial<JobDeliverySemantics>
    ) => {
        updateSettings({
            ...value,
            deliveries: value.deliveries.map((delivery, deliveryIndex) =>
                deliveryIndex === index
                    ? {
                          ...delivery,
                          ...update,
                      }
                    : delivery
            ),
        });
    };

    const updateDeliveryScope = (index: number, scope: DeliveryScope) => {
        const delivery = value.deliveries[index];
        if (!delivery || isCombinationUsed(delivery.channel, scope, index)) {
            return;
        }

        updateDelivery(index, {
            scope,
            destination:
                scope === "recipient"
                    ? fields.length > 0
                        ? [fields[0]]
                        : []
                    : [],
        });
    };

    const updateDeliveryChannel = (index: number, channel: DeliveryChannel) => {
        const delivery = value.deliveries[index];
        if (!delivery || isCombinationUsed(channel, delivery.scope, index)) {
            return;
        }

        updateDelivery(index, {
            channel,
            content: channel === "email" ? { body: "" } : null,
        });
    };

    const setFilenameField = (index: number, field: string) => {
        updateIdentification({
            fields: value.identification.fields.map((currentField, fieldIndex) =>
                fieldIndex === index ? field : currentField
            ),
        });
    };

    const addFilenameField = () => {
        updateIdentification({
            fields: [
                ...value.identification.fields,
                fields.find(
                    (field) => !value.identification.fields.includes(field)
                ) ?? fields[0] ?? "",
            ].filter(Boolean),
        });
    };

    const removeFilenameField = (index: number) => {
        updateIdentification({
            fields: value.identification.fields.filter(
                (_field, fieldIndex) => fieldIndex !== index
            ),
        });
    };

    const setRecipientDestination = (
        deliveryIndex: number,
        destinationIndex: number,
        destination: string
    ) => {
        const delivery = value.deliveries[deliveryIndex];
        if (!delivery) return;

        const nextDestinations =
            delivery.destination.length > 0
                ? [...delivery.destination]
                : [fields[0] ?? ""];
        nextDestinations[destinationIndex] = destination;

        updateDelivery(deliveryIndex, {
            destination: nextDestinations.filter(Boolean),
        });
    };

    const addRecipientDestination = (deliveryIndex: number) => {
        const delivery = value.deliveries[deliveryIndex];
        if (!delivery) return;

        updateDelivery(deliveryIndex, {
            destination: [
                ...delivery.destination,
                fields.find(
                    (field) => !delivery.destination.includes(field)
                ) ?? fields[0] ?? "",
            ].filter(Boolean),
        });
    };

    const removeRecipientDestination = (
        deliveryIndex: number,
        destinationIndex: number
    ) => {
        const delivery = value.deliveries[deliveryIndex];
        if (!delivery) return;

        updateDelivery(deliveryIndex, {
            destination: delivery.destination.filter(
                (_destination, index) => index !== destinationIndex
            ),
        });
    };

    const setLiteralDestination = (
        deliveryIndex: number,
        destinationIndex: number,
        destination: string
    ) => {
        const delivery = value.deliveries[deliveryIndex];
        if (!delivery) return;

        const nextDestinations =
            delivery.destination.length > 0 ? [...delivery.destination] : [""];
        nextDestinations[destinationIndex] = destination;

        updateDelivery(deliveryIndex, {
            destination: nextDestinations,
        });
    };

    const addLiteralDestination = (deliveryIndex: number) => {
        const delivery = value.deliveries[deliveryIndex];
        if (!delivery) return;

        updateDelivery(deliveryIndex, {
            destination: [...delivery.destination, ""],
        });
    };

    const removeLiteralDestination = (
        deliveryIndex: number,
        destinationIndex: number
    ) => {
        const delivery = value.deliveries[deliveryIndex];
        if (!delivery) return;

        updateDelivery(deliveryIndex, {
            destination: delivery.destination.filter(
                (_destination, index) => index !== destinationIndex
            ),
        });
    };

    const canContinue =
        fields.length > 0 &&
        value.identification.fields.length > 0 &&
        value.identification.fields.every(Boolean) &&
        value.deliveries.every(
            (delivery) =>
                delivery.destination.length > 0 &&
                delivery.destination.every((destination) =>
                    destination.trim()
                )
        );

    return (
        <section>
            <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-4 border-b pb-3">
                    <div className="flex items-center gap-3">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full border bg-muted text-xs font-semibold text-muted-foreground">
                            2
                        </span>
                        <div>
                            <h2 className="text-base font-semibold">
                                Certificate & Delivery Settings
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Choose certificate file names and where generated files should go.
                            </p>
                        </div>
                    </div>
                    <span className="shrink-0 rounded-full border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        Step 2 / 5
                    </span>
                </div>

                <div className="grid gap-4 xl:grid-cols-2">
                    <div className="space-y-4 rounded-md border bg-muted/20 p-4">
                        <div>
                            <h3 className="text-sm font-semibold">File Naming</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Build readable certificate filenames from uploaded fields.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label>Filename fields</Label>
                            {value.identification.fields.map((field, index) => (
                                <div key={`${field}-${index}`} className="flex gap-2">
                                    <Select
                                        value={field}
                                        onValueChange={(nextField) =>
                                            setFilenameField(index, nextField)
                                        }
                                    >
                                        <SelectTrigger className="w-full rounded-lg">
                                            <SelectValue placeholder="Select field" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {fields.map((option) => (
                                                <SelectItem key={option} value={option}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        className="size-8 shrink-0 rounded-lg"
                                        onClick={() => removeFilenameField(index)}
                                        disabled={value.identification.fields.length === 1}
                                        aria-label="Remove filename field"
                                    >
                                        <AppIcon icon={Delete02Icon} className="size-4" />
                                    </Button>
                                </div>
                            ))}

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addFilenameField}
                                disabled={fields.length === 0}
                            >
                                <AppIcon icon={Add01Icon} className="mr-2 size-4" />
                                Add another field
                            </Button>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="filename-separator">Separator</Label>
                                <Input
                                    id="filename-separator"
                                    value={value.identification.separator ?? " "}
                                    onChange={(event) =>
                                        updateIdentification({
                                            separator: event.target.value,
                                        })
                                    }
                                    placeholder=" "
                                    className="rounded-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Letter case</Label>
                                <Select
                                    value={value.identification.case ?? "preserve"}
                                    onValueChange={(nextCase) =>
                                        updateIdentification({
                                            case: nextCase as IdentificationCase,
                                        })
                                    }
                                >
                                    <SelectTrigger className="w-full rounded-lg">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cases.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Collision handling</Label>
                                <Select
                                    value={value.identification.collision ?? "suffix"}
                                    onValueChange={(collision) =>
                                        updateIdentification({
                                            collision:
                                                collision as IdentificationCollision,
                                        })
                                    }
                                >
                                    <SelectTrigger className="w-full rounded-lg">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {collisions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <label className="flex min-h-16 items-center gap-3 rounded-lg border bg-background px-3 py-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={value.identification.docId ?? false}
                                    onChange={(event) =>
                                        updateIdentification({
                                            docId: event.target.checked,
                                        })
                                    }
                                    className="size-4 accent-primary"
                                />
                                <span>Include document ID</span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-4 rounded-md border bg-muted/20 p-4">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-sm font-semibold">Delivery</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Add one or more ways to send generated certificates or the batch ZIP.
                                </p>
                            </div>
                        </div>

                        {availableCombinations.length > 0 ? (
                            <div className="grid gap-2 sm:grid-cols-2">
                                {availableCombinations.map((combination) => (
                                    <Button
                                        key={`${combination.channel}-${combination.scope}`}
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            updateSettings({
                                                ...value,
                                                deliveries: [
                                                    ...value.deliveries,
                                                    createDelivery(
                                                        fields,
                                                        combination.channel,
                                                        combination.scope
                                                    ),
                                                ],
                                            })
                                        }
                                    >
                                        <AppIcon
                                            icon={Add01Icon}
                                            className="mr-2 size-4"
                                        />
                                        {combination.label}
                                    </Button>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-lg border bg-background px-3 py-2 text-sm text-muted-foreground">
                                All delivery methods are configured.
                            </div>
                        )}

                        {value.deliveries.length === 0 ? (
                            <div className="rounded-lg border border-dashed bg-background p-4 text-sm text-muted-foreground">
                                No delivery methods added.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {value.deliveries.map((delivery, index) => (
                                    <div
                                        key={index}
                                        className="space-y-3 rounded-lg border bg-background p-3"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-sm font-semibold">
                                                Method {index + 1}
                                            </span>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                className="size-8 rounded-lg"
                                                onClick={() =>
                                                    updateSettings({
                                                        ...value,
                                                        deliveries: value.deliveries.filter(
                                                            (_delivery, deliveryIndex) =>
                                                                deliveryIndex !== index
                                                        ),
                                                    })
                                                }
                                                aria-label="Remove delivery method"
                                            >
                                                <AppIcon
                                                    icon={Delete02Icon}
                                                    className="size-4"
                                                />
                                            </Button>
                                        </div>

                                        <div className="grid gap-3 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label>How should we send it?</Label>
                                                <Select
                                                    value={delivery.channel}
                                                    onValueChange={(channel) =>
                                                        updateDeliveryChannel(
                                                            index,
                                                            channel as DeliveryChannel
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger className="w-full rounded-lg">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {channels.map((option) => (
                                                            <SelectItem
                                                                key={option.value}
                                                                value={option.value}
                                                                disabled={isCombinationUsed(
                                                                    option.value,
                                                                    delivery.scope,
                                                                    index
                                                                )}
                                                            >
                                                                {option.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Who should receive it?</Label>
                                                <Select
                                                    value={delivery.scope}
                                                    onValueChange={(scope) =>
                                                        updateDeliveryScope(
                                                            index,
                                                            scope as DeliveryScope
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger className="w-full rounded-lg">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {scopes.map((option) => (
                                                            <SelectItem
                                                                key={option.value}
                                                                value={option.value}
                                                                disabled={isCombinationUsed(
                                                                    delivery.channel,
                                                                    option.value,
                                                                    index
                                                                )}
                                                            >
                                                                {option.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <p className="rounded-lg border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
                                            {getDeliveryResultText(delivery)}
                                        </p>

                                        <div className="space-y-2">
                                            <Label>
                                                {delivery.scope === "recipient"
                                                    ? delivery.channel === "email"
                                                        ? "Which field contains their email address?"
                                                        : "Which field contains the webhook URL?"
                                                    : delivery.channel === "email"
                                                      ? "Who should receive the batch?"
                                                      : "Where should we send the batch?"}
                                            </Label>
                                            {delivery.scope === "recipient" ? (
                                                <div className="space-y-2">
                                                    {(delivery.destination.length > 0
                                                        ? delivery.destination
                                                        : [fields[0] ?? ""]
                                                    )
                                                        .filter(Boolean)
                                                        .map((destination, destinationIndex) => (
                                                            <div
                                                                key={`${destination}-${destinationIndex}`}
                                                                className="flex gap-2"
                                                            >
                                                                <Select
                                                                    value={destination}
                                                                    onValueChange={(nextDestination) =>
                                                                        setRecipientDestination(
                                                                            index,
                                                                            destinationIndex,
                                                                            nextDestination
                                                                        )
                                                                    }
                                                                >
                                                                    <SelectTrigger className="w-full rounded-lg">
                                                                        <SelectValue placeholder="Select uploaded field" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {fields.map((option) => (
                                                                            <SelectItem
                                                                                key={option}
                                                                                value={option}
                                                                            >
                                                                                {option}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>

                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="size-8 shrink-0 rounded-lg"
                                                                    onClick={() =>
                                                                        removeRecipientDestination(
                                                                            index,
                                                                            destinationIndex
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        delivery.destination.length <= 1
                                                                    }
                                                                    aria-label="Remove destination field"
                                                                >
                                                                    <AppIcon
                                                                        icon={Delete02Icon}
                                                                        className="size-4"
                                                                    />
                                                                </Button>
                                                            </div>
                                                        ))}

                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            addRecipientDestination(index)
                                                        }
                                                        disabled={fields.length === 0}
                                                    >
                                                        <AppIcon
                                                            icon={Add01Icon}
                                                            className="mr-2 size-4"
                                                        />
                                                        Add destination field
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    {(delivery.destination.length > 0
                                                        ? delivery.destination
                                                        : [""]
                                                    ).map(
                                                        (
                                                            destination,
                                                            destinationIndex
                                                        ) => (
                                                            <div
                                                                key={`${delivery.channel}-${delivery.scope}-${destinationIndex}`}
                                                                className="flex gap-2"
                                                            >
                                                                <Input
                                                                    value={destination}
                                                                    onChange={(event) =>
                                                                        setLiteralDestination(
                                                                            index,
                                                                            destinationIndex,
                                                                            event.target.value
                                                                        )
                                                                    }
                                                                    placeholder={
                                                                        delivery.channel ===
                                                                        "webhook"
                                                                            ? "https://example.com/webhook"
                                                                            : "team@example.com"
                                                                    }
                                                                    className="rounded-lg"
                                                                />

                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="size-8 shrink-0 rounded-lg"
                                                                    onClick={() =>
                                                                        removeLiteralDestination(
                                                                            index,
                                                                            destinationIndex
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        delivery.destination.length <=
                                                                        1
                                                                    }
                                                                    aria-label="Remove delivery recipient"
                                                                >
                                                                    <AppIcon
                                                                        icon={Delete02Icon}
                                                                        className="size-4"
                                                                    />
                                                                </Button>
                                                            </div>
                                                        )
                                                    )}

                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            addLiteralDestination(index)
                                                        }
                                                    >
                                                        <AppIcon
                                                            icon={Add01Icon}
                                                            className="mr-2 size-4"
                                                        />
                                                        {delivery.channel === "webhook"
                                                            ? "Add another webhook"
                                                            : "Add another email"}
                                                    </Button>
                                                </div>
                                            )}
                                        </div>

                                        {delivery.channel === "email" ? (
                                            <div className="space-y-2">
                                                <Label htmlFor={`delivery-body-${index}`}>
                                                    Content
                                                </Label>
                                                <textarea
                                                    id={`delivery-body-${index}`}
                                                    value={delivery.content?.body ?? ""}
                                                    onChange={(event) =>
                                                        updateDelivery(index, {
                                                            content: {
                                                                body: event.target.value,
                                                            },
                                                        })
                                                    }
                                                    rows={3}
                                                    className="w-full resize-none rounded-lg border bg-input/50 px-3 py-2 text-sm outline-none transition-[color,box-shadow] duration-200 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
                                                    placeholder="Message body"
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 border-t pt-4">
                    <p className="text-sm text-muted-foreground">
                        Validation will use these fields before preview and generation.
                    </p>
                    <Button onClick={onContinue} disabled={!canContinue}>
                        Validate Data
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default CertificateDeliverySettings;
