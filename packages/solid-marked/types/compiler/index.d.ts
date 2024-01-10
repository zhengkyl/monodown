import type { RawSourceMap } from "source-map";
import type { Options } from "./types";
export type { Options } from "./types";
export * from "./interfaces";
export interface Result {
    code: string;
    map: RawSourceMap;
}
export declare function compile(fileName: string, markdownCode: string, options?: Options): Result;
