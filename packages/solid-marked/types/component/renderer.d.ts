import type * as mdast from 'mdast';
import type { JSX } from 'solid-js';
import type { StateContext } from './types';
export declare function compileNode(ctx: StateContext, node: mdast.Nodes): JSX.Element;
