import { Progress as ArkProgress, type ProgressRootProps } from "@ark-ui/solid";
import { Show, children, splitProps, type JSX } from "solid-js";
import { css, cx } from "styled-system/css";
import { splitCssProps } from "styled-system/jsx";
import { progress, type ProgressVariantProps } from "styled-system/recipes";
import type {
  Assign,
  JsxStyleProps,
  SystemStyleObject,
} from "styled-system/types";

export interface ProgressProps
  extends Assign<JsxStyleProps, ProgressRootProps>,
    ProgressVariantProps {
  // can't be found by panda
  // barColor?: SystemStyleObject["backgroundColor"];
}

export const LinearProgress = (props: ProgressProps) => {
  const [variantProps, progressProps] = progress.splitVariantProps(props);
  const [cssProps, elementProps] = splitCssProps(progressProps);
  const [localProps, rootProps] = splitProps(elementProps, ["class"]);
  const styles = progress(variantProps);

  return (
    <ArkProgress.Root
      class={cx(styles.root, css(cssProps), localProps.class)}
      {...rootProps}
    >
      <ArkProgress.Track class={styles.track}>
        <ArkProgress.Range
          class={cx(styles.range, css({ backgroundColor: "blue.10" }))}
        />
      </ArkProgress.Track>
    </ArkProgress.Root>
  );
};
