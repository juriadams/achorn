import { Prefix } from "./interfaces/prefix.interface";

export const prefixes: Prefix[] = [
    {
        keys: ["success"],
        parts: [
            {
                string: "✔️ ",
                style: "color: #7EB507;",
            },
            {
                string: "success",
                style: "color: #7EB507; font-weight: bold;",
            },
        ],
    },
    {
        keys: ["error"],
        logType: "error",
        parts: [
            {
                string: "× ",
                style: "color: #FF312D;",
            },
            {
                string: "error",
                style: "color: #FF312D; font-weight: bold;",
            },
        ],
    },
    {
        keys: ["warn", "warning"],
        logType: "warn",
        parts: [
            {
                string: "⚠️ ",
                style: "color: #DBA02A;",
            },
            {
                string: "warning",
                style: "color: #DBA02A; text-decoration: underline;",
            },
        ],
    },
    {
        keys: ["await", "awaiting"],
        parts: [
            {
                string: "… ",
                style: "color: #2EB6CB;",
            },
            {
                string: "awaiting",
                style: "color: #2EB6CB; font-weight: bold;",
            },
        ],
    },
    {
        keys: ["start"],
        parts: [
            {
                string: "► ",
                style: "color: #7EB507;",
            },
            {
                string: "start",
                style: "color: #7EB507; font-weight: bold;",
            },
        ],
    },
    {
        keys: ["pause"],
        parts: [
            {
                string: "‖ ",
                style: "color: #DBA02A;",
            },
            {
                string: "pause",
                style: "color: #DBA02A; font-weight: bold;",
            },
        ],
    },
    {
        keys: ["debug"],
        parts: [
            {
                string: "● ",
                style: "color: #2EB6CB;",
            },
            {
                string: "debug",
                style: "color: #2EB6CB; font-weight: bold;",
            },
        ],
    },
    {
        keys: ["info"],
        parts: [
            {
                string: "i ",
                style: "color: #2EB6CB;",
            },
            {
                string: "info",
                style: "color: #2EB6CB; font-weight: bold;",
            },
        ],
    },
    {
        keys: ["fatal"],
        logType: "error",
        parts: [
            {
                string: "◆ ",
                style: "color: #FF312D;",
            },
            {
                string: "fatal",
                style: "color: #FF312D; font-weight: bold;",
            },
        ],
    },
];
