import type * as mdast from 'mdast';
import { SourceNode } from 'source-map';
import type { StateContext } from './types';
interface TOML extends mdast.Literal {
    type: 'toml';
}
declare module 'mdast' {
    interface FrontmatterContentMap {
        toml: TOML;
    }
    interface RootContentMap {
        toml: TOML;
    }
}
export declare const CTX_VAR = "_ctx$";
export declare function compileNode(ctx: StateContext, node: mdast.Nodes): SourceNode;
export {};
