export type Placeholder = {
    id: string;
    templateId: string;
    name: string;
    key: string;
    type: PlaceholderType;
    x: number;
    y: number;
    width: number;
    height: number;
    strategy: "shrink" | "ellipsis" | "wrap";
    minFontSize: number | null;
    align: "left" | "center" | "right";
    fontSize: number;
    fontColor: string;
    fontFamily: string;
};

export type PlaceholderType =
    | "text"
    | "image"
    | "date"
    | "number"
    | "qr"
    | "signature"
    | "barcode"
    | "url"
    | "email";


export type SinglePlaceholderInput = {
    name: string;
    key: string;
    type?: PlaceholderType;
    x: number;
    y: number;
    width: number;
    height: number;
    fontSize: number;
    fontColor: string;
    fontFamily: string;
    strategy?: "shrink" | "ellipsis" | "wrap";
    minFontSize?: number;
    align?: "left" | "center" | "right";
};

export type CreatePlaceholdersInput = Array<SinglePlaceholderInput>

export type CreatePlaceholdersResponse = Array<Placeholder>

export type ListPlaceholdersResponse = Array<Placeholder>

export type UpdatePlaceholderInput = Partial<SinglePlaceholderInput>

export type UpdatePlaceholderResponse = Placeholder