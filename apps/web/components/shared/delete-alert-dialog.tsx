"use client";

// components/shared/delete-alert-dialog.tsx

import { Delete01Icon } from '@hugeicons/core-free-icons'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AppIcon } from './app-icon';

type DeleteAlertDialogProps = {
    open: boolean;
    title: string;
    description: string;

    deleting?: boolean;

    onOpenChange: (open: boolean) => void;
    onDelete: () => void;
};

export default function DeleteAlertDialog({
    open,
    title,
    description,
    deleting = false,
    onOpenChange,
    onDelete,
}: DeleteAlertDialogProps) {
    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20">
                        <AppIcon icon={Delete01Icon} size={16} />
                    </AlertDialogMedia>

                    <AlertDialogTitle>
                        {title}
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        variant="outline"
                        disabled={deleting}
                    >
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        variant="destructive"
                        disabled={deleting}
                        onClick={onDelete}
                    >
                        {deleting
                            ? "Deleting..."
                            : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}