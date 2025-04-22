import { HTMLAttributes, PropsWithChildren, useEffect, useState } from 'react';

export interface LiveTextProps extends HTMLAttributes<HTMLSpanElement> {
  delay?: number;
}

/**
 * `LiveText` is a React component designed to manage the delayed rendering of accessible text content.
 * It is particularly useful in scenarios such as skeleton components, where you want to provide
 * accessible status updates to screen readers after a specified delay.
 *
 * @param children - The content to be rendered inside the component.
 * @param delay - The delay in milliseconds before the `role="status"` is applied to the content. Defaults to 1000ms.
 * @param restProps - Additional props to be passed to the outer `<span>` element.
 *
 * @returns A `<span>` element containing the children. After the delay, the content is wrapped in another `<span>`
 *          with `role="status"` to notify assistive technologies of the updated content.
 *
 * @example
 * ```tsx
 * <LiveText delay={1500}>
 *   Loading complete
 * </LiveText>
 * ```
 * In the example above, the text "Loading complete" will be announced to screen readers after 1.5 seconds.
 */

export const LiveText = ({ children, delay = 1000, ...restProps }: PropsWithChildren<LiveTextProps>) => {
  const [delayComplete, setDelayComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayComplete(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return delayComplete ? (
    <span {...restProps}>
      <span role="status">{children}</span>
    </span>
  ) : (
    <span {...restProps}>{children}</span>
  );
};
