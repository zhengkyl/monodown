/// <reference path="../../src/global-types.d.ts" />
import type { JSX } from 'solid-js';
import type { MDXProps } from '../compiler/interfaces';
export declare function MDXProvider(props: MDXProps & {
    children: JSX.Element;
}): JSX.Element;
export declare function useMDX(): MDXProps;
