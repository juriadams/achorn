import { Part } from "./part.interface";

export interface Prefix {
    key?: string;
    keys?: string[];
    logType?: "default" | "warn" | "error";
    parts: Part[];
}
