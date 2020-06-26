import { Part } from "./part.interface";
import { Prefix } from "./prefix.interface";

export interface Config {
    /**
     * Boolean if a timestamp shall be displayed before every message
     */
    showTimestamp?: boolean;

    /**
     * Array of Preifx Parts of global prefix displayed before every message
     */
    globalPrefix?: Part[];

    /**
     * Array of custom prefixes added to default ones
     */
    prefixes?: Prefix[];
}
