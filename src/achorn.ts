import { Config } from "./interfaces/config.interface";
import { prefixes } from "./prefixes";
import { Part } from "./interfaces/part.interface";
import { TimerOptions } from "./interfaces/timer-options.interface";

/**
 * Main Achorn class hosting Achorn core functionality
 */
export default class Achorn {
    /**
     * Global Achorn config
     */
    public globalConfig: Config = {};

    /**
     * Getter returning the length of the longest prefix
     */
    private get longestPrefixLength(): number {
        return prefixes
            .map((prefix) => prefix.parts[1].string)
            .reduce((a, b) => {
                return a.length > b.length ? a : b;
            }).length;
    }

    constructor(config?: Config) {
        // Use config if one is given
        this.config(config || {});

        // Join default prefixes and custom ones
        const allPrefixes = prefixes.concat(config ? config.prefixes || [] : []);

        // Iterate over all defined prefixes and create methods of them
        allPrefixes.map((prefix) => {
            prefix.keys.map((key) => {
                // @ts-ignore
                this[key] = (...input: any[]) => {
                    this.consoleLog(key, input);
                };
            });
        });
    }

    /**
     * Set global Achorn config
     * @param config Config object to set
     */
    public config(config: Config) {
        this.globalConfig = config;
    }

    /**
     * Joins Array of paths to loggable message
     * @param parts Array of Parts to log
     */
    public joinParts(parts: Part[], whitespace?: number): string[] {
        let message = "" + " ".repeat(whitespace || 0);
        let styles: string[] = [];

        parts.map((part) => {
            message += `%c${part.string}`;
            styles.push(part.style);
        });

        return [message].concat(styles);
    }

    /**
     * Helper method to calculate additional whitespace after given parts
     * @param parts Array of Parts to determine whitespace after
     */
    public calcAdditionalWhitespace(parts: Part[]): number {
        const prefixLength = parts[1].string.length;
        const additionalWhitespace = this.longestPrefixLength - prefixLength + 1;
        return additionalWhitespace < 0 ? 0 : additionalWhitespace;
    }

    /**
     * Log given input with given prefix
     * @param prefixName Name/key of the prefix which will be used to log message
     * @param input Array of parts to log after prefix, can literally be anything
     */
    private consoleLog(prefixName: string, input: any[]): void {
        // Get desired prefix
        const prefix =
            prefixes.find((prefix) => prefix.keys.includes(prefixName)) ||
            prefixes.find((prefix) => prefix.keys.includes("info"));

        let parts: Part[] = [].concat(prefix.parts);

        // Generate whitespace after prefix
        parts.push({
            string: " ".repeat(this.calcAdditionalWhitespace(parts)),
            style: "color: unset;",
        });

        // Add timestamp if option is set
        if (this.globalConfig.showTimestamp) {
            parts.unshift({
                string: `[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] `,
                style: "color: unset;",
            });
        }

        // Add additional global prefix if option is set
        if (this.globalConfig.globalPrefix) {
            parts = this.globalConfig.globalPrefix.concat(parts);
        }

        // Log message to console
        switch (prefix.logType) {
            case "warn":
                console.warn(...this.joinParts(parts, 1), ...(input.length > 0 ? input : [input[0]]));
                return;

            case "error":
                console.error(...this.joinParts(parts, 1), ...(input.length > 0 ? input : [input[0]]));
                return;

            default:
                console.log(...this.joinParts(parts, 2), ...(input.length > 0 ? input : [input[0]]));
        }
    }

    /**
     * Creates and returns a new Timer
     * @param options Either Timer key as string or TimerOptions object
     */
    public timer(options?: string | TimerOptions): Timer {
        return new Timer(typeof options === "string" ? { key: options } : options);
    }

    /**
     * Creates and returns a new silent Timer
     * @param options Either Timer key as string or TimerOptions object
     */
    public silentTimer(options?: string | TimerOptions): Timer {
        return new Timer(typeof options === "string" ? { key: options, silent: true } : options);
    }
}

/**
 * Achorn Timer class handling everything Timer related
 */
class Timer {
    /**
     * Achorn instance to compose console output
     */
    public achorn: Achorn = new Achorn();

    /**
     * Start time unix timestamp
     */
    public startTime: number;

    /**
     * End time unix timestamp
     */
    public endTime: number;

    /**
     * Timer duration in milliseconds
     */
    public duration: number;

    /**
     * TimerOptions object
     */
    public options: TimerOptions;

    constructor(options?: TimerOptions) {
        // Save timer key
        this.options = options;

        // Start timer
        this.start();
    }

    /**
     * Start Timer
     */
    public start(): void {
        // Save start timestamp
        this.startTime = +new Date();

        // Generate parts for console output
        const parts = [
            {
                string: "‣ ",
                style: "color: #2EB6CB;",
            },
            {
                string: this.options.key ? this.options.key : "timer",
                style: "color: #2EB6CB; font-weight: bold;",
            },
        ];

        // Add additional whitespace after output
        parts.push({
            string: " ".repeat(this.achorn.calcAdditionalWhitespace(parts)),
            style: "color: unset;",
        });

        // Log start output
        if (!this.options.silent) {
            console.log(...this.achorn.joinParts(parts, 2), `Timer started`);
        }
    }

    /**
     * End Timer
     */
    public end(): void {
        // Save end Timestamp and calculate duration
        this.endTime = +new Date();
        this.duration = this.endTime - this.startTime;

        // Generate parts for console output
        const parts = [
            {
                string: "‣ ",
                style: "color: #2EB6CB;",
            },
            {
                string: this.options.key ? this.options.key : "timer",
                style: "color: #2EB6CB; font-weight: bold;",
            },
        ];

        // Add additional whitespace after output
        parts.push({
            string: " ".repeat(this.achorn.calcAdditionalWhitespace(parts)),
            style: "color: unset;",
        });

        // Log end message
        console.log(...this.achorn.joinParts(parts, 2), `Timer ended after ${this.duration}ms`);
    }

    /**
     * End Timer with success message
     */
    public success(...input: any[]): void {
        this.endTime = +new Date();
        this.duration = this.endTime - this.startTime;

        // Generate parts for console output
        const parts = [
            {
                string: "✔️ ",
                style: "color: #7EB507;",
            },
            {
                string: this.options.key ? this.options.key : "success",
                style: "color: #7EB507; font-weight: bold;",
            },
        ];

        // Add additional whitespace after output
        parts.push({
            string: " ".repeat(this.achorn.calcAdditionalWhitespace(parts)),
            style: "color: unset;",
        });

        // Log success message
        console.log(
            ...this.achorn.joinParts(parts, 2),
            ...(input && input.length > 0
                ? input.concat([`(${this.duration}ms)`])
                : [`Timer succeeded after ${this.duration}ms`]),
        );
    }

    /**
     * End Timer with error message
     */
    public error(...input: any[]): void {
        // Save end Timestamp and calculate duration
        this.endTime = +new Date();
        this.duration = this.endTime - this.startTime;

        // Generate parts for console output
        const parts = [
            {
                string: "× ",
                style: "color: #FF312D;",
            },
            {
                string: this.options.key ? this.options.key : "aborted",
                style: "color: #FF312D; font-weight: bold;",
            },
        ];

        // Add additional whitespace after output
        parts.push({
            string: " ".repeat(this.achorn.calcAdditionalWhitespace(parts)),
            style: "color: unset;",
        });

        // Log error message
        console.error(
            ...this.achorn.joinParts(parts, 1),
            ...(input && input.length > 0
                ? input.concat([`(${this.duration}ms)`])
                : [`Timer errored after ${this.duration}ms`]),
        );
    }

    /**
     * End Timer with abort message
     */
    public abort(...input: any[]): void {
        // Save end Timestamp and calculate duration
        this.endTime = +new Date();
        this.duration = this.endTime - this.startTime;

        // Generate parts for console output
        const parts = [
            {
                string: "⚠️ ",
                style: "color: #DBA02A;",
            },
            {
                string: this.options.key ? this.options.key : "error",
                style: "color: #DBA02A; font-weight: bold;",
            },
        ];

        // Add additional whitespace after output
        parts.push({
            string: " ".repeat(this.achorn.calcAdditionalWhitespace(parts)),
            style: "color: unset;",
        });

        // Log abort message
        console.warn(
            ...this.achorn.joinParts(parts, 1),
            ...(input && input.length > 0
                ? input.concat([`(${this.duration}ms)`])
                : [`Timer aborted after ${this.duration}ms`]),
        );
    }
}
