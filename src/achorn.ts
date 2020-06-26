import { Config } from "./interfaces/config.interface";
import { prefixes } from "./prefixes";
import { Part } from "./interfaces/part.interface";

export default class {
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

    constructor(config: Config) {
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
    private joinParts(parts: Part[], whitespace?: number): string[] {
        let message = "" + " ".repeat(whitespace || 0);
        let styles: string[] = [];

        parts.map((part) => {
            message += `%c${part.string}`;
            styles.push(part.style);
        });

        return [message].concat(styles);
    }

    /**
     * Log given input with given prefix
     * @param prefixName Name/key of the prefix which will be used to log message
     * @param input Array of parts to log after prefix, can literally be anything
     */
    private consoleLog(prefixName: string, input: any[]): void {
        // Get desired prefix and calculate its length
        const prefix = prefixes.find((prefix) => prefix.keys.includes(prefixName));
        const prefixLength = prefix.parts[1].string.length;

        let parts: Part[] = [].concat(prefix.parts);

        // Generate whitespace after prefix
        if (prefixLength < this.longestPrefixLength + 1) {
            parts.push({
                string: " ".repeat(this.longestPrefixLength - prefixLength + 1),
                style: "color: unset;",
            });
        }

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
        if (input.length === 1) {
            switch (prefix.logType) {
                case "warn":
                    console.warn(...this.joinParts(parts), input[0]);
                    return;

                case "error":
                    console.error(...this.joinParts(parts), input[0]);
                    return;

                default:
                    console.log(...this.joinParts(parts, 2), input[0]);
            }
        } else {
            switch (prefix.logType) {
                case "warn":
                    console.warn(...this.joinParts(parts), ...input);
                    return;

                case "error":
                    console.error(...this.joinParts(parts), ...input);
                    return;

                default:
                    console.log(...this.joinParts(parts, 2), ...input);
            }
        }
    }
}
