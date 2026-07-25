import Papa from "papaparse";
import * as XLSX from "xlsx";
import type { RecipientData, UploadedRow } from "@/types/components/playground.types";

export async function csvToJson(file: File): Promise<UploadedRow[]> {
    return new Promise((resolve, reject) => {
        Papa.parse<UploadedRow>(file, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: false,

            complete(results) {
                if (results.errors.length > 0) {
                    reject(
                        new Error(
                            results.errors
                                .map((e) => e.message)
                                .join(", ")
                        )
                    );
                    return;
                }

                resolve(results.data);
            },

            error(error) {
                reject(error);
            },
        });
    });
}

export async function excelToJson(
    file: File
): Promise<UploadedRow[]> {
    try {
        const buffer = await file.arrayBuffer();

        const workbook = XLSX.read(buffer, {
            type: "array",
        });

        const firstSheetName = workbook.SheetNames[0];

        if (!firstSheetName) {
            throw new Error("Workbook contains no worksheets.");
        }

        const worksheet = workbook.Sheets[firstSheetName];

        return XLSX.utils.sheet_to_json<UploadedRow>(worksheet, {
            defval: "",
        });
    } catch (err) {
        throw new Error(
            `Failed to parse Excel file: ${
                err instanceof Error ? err.message : "Unknown error"
            }`
        );
    }
}

export async function jsonToRows(
    file: File
): Promise<UploadedRow[]> {
    try {
        const text = await file.text();

        const data = JSON.parse(text);

        if (
            !Array.isArray(data) ||
            data.some(
                (row) =>
                    typeof row !== "object" ||
                    row === null ||
                    Array.isArray(row)
            )
        ) {
            throw new Error(
                "JSON must be an array of objects."
            );
        }

        return data;
    } catch (err) {
        throw new Error(
            `Failed to parse JSON: ${
                err instanceof Error ? err.message : "Unknown error"
            }`
        );
    }
}

export async function parsedUploadedData(file: File): Promise<UploadedRow[]> {
    let rows: UploadedRow[];

    if (file.name.endsWith(".csv")) {
        rows = await csvToJson(file);
    } else if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        rows = await excelToJson(file);
    } else if (file.name.endsWith(".json")) {
        rows = await jsonToRows(file);
    } else {
        throw new Error("Unsupported file type.");
    }

    return rows;
}