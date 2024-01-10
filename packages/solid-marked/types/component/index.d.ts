import { type JSX } from 'solid-js';
import type { MDXProps } from '../compiler';
export interface MarkdownProps extends MDXProps {
    children: string;
}
export default function Markdown(props: MarkdownProps): JSX.Element;
