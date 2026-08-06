"use client";

import * as React from "react";
import { format } from "date-fns";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";


import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { AppIcon } from "./app-icon";

export type DateTimePickerProps = {
    value?: Date;
    onChange: (date?: Date) => void;

    label?: string;
    placeholder?: string;

    disabled?: boolean;
};

export default function DateTimePicker({
    value,
    onChange,
    label = "Date & Time",
    placeholder = "Select date",
    disabled = false,
}: DateTimePickerProps) {
    const [open, setOpen] = React.useState(false);

    function handleDateChange(date?: Date) {
        if (!date) {
            onChange(undefined);
            return;
        }

        const next = value ? new Date(value) : new Date();

        next.setFullYear(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );

        onChange(next);
        setOpen(false);
    }

    function handleTimeChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const time = e.target.value;

        if (!time) {
            return;
        }

        const [hours, minutes] = time
            .split(":")
            .map(Number);

        const next = value ? new Date(value) : new Date();

        next.setHours(hours, minutes, 0, 0);

        onChange(next);
    }

    return (
        <Field>
            <FieldLabel>{label}</FieldLabel>

            <FieldGroup className="flex-row">
                <Popover
                    open={open}
                    onOpenChange={setOpen}
                >
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            disabled={disabled}
                            className="min-w-48 justify-between font-normal"
                        >
                            {value
                                ? format(value, "PPP")
                                : placeholder}

                            <AppIcon
                                icon={ArrowDown01Icon}
                                className="size-4 opacity-60"
                            />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                    >
                        <Calendar
                            mode="single"
                            selected={value}
                            defaultMonth={value}
                            captionLayout="dropdown"
                            onSelect={handleDateChange}
                        />
                    </PopoverContent>
                </Popover>

                <Input
                    type="time"
                    step="1"
                    disabled={disabled}
                    value={
                        value
                            ? format(value, "HH:mm:ss")
                            : ""
                    }
                    onChange={handleTimeChange}
                    className="w-36 appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </FieldGroup>
        </Field>
    );
}