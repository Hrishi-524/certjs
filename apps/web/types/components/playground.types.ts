export type ValidationResult = {
    isValid: boolean;
    rowCount: number;
    foundColumns: string[];
    missingColumns: string[];
    extraColumns: string[];
    validRows: UploadedRow[];
    invalidRows: InvalidRow[];
};

// export type UploadedRow = Record<string, unknown>;
export type UploadedRow = Record<string, string | number>;

export type RecipientData = Record<string, string | number>;

export type InvalidRow = {
    row: number;
    data: UploadedRow;  
    errors: string[];
    warnings: string[]
};