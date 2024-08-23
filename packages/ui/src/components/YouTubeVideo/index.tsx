import classnames from 'classnames/bind';
import { forwardRef } from 'react';
import type { ForwardedRef, HTMLAttributes, PropsWithChildren } from 'react';
import { YouTubeVideoProgressiveEnhancement } from './YouTubeVideoProgressiveEnhancement';
import styles from './index.module.scss';

const css = classnames.bind(styles);

/**
 * See: https://developers.google.com/youtube/player_parameters#Parameters
 */
export interface YouTubeVideoProps extends HTMLAttributes<HTMLIFrameElement> {
  src: string;
  height?: string;
  width?: string;
  autoplay?: string;
  cc_lang_pref?: string;
  cc_load_policy?: string;
  color?: string;
  controls?: string;
  disablekb?: string;
  enablejsapi?: string;
  end?: string;
  fs?: string;
  hl?: string;
  iv_load_policy?: string;
  list?: string;
  listType?: string;
  loop?: string;
  origin?: string;
  playlist?: string;
  playsinline?: string;
  rel?: string;
  start?: string;
  widget_referrer?: string;
}

export const stringSort = (a: string, b: string) => (a === b ? 0 : a > b ? 1 : -1);

export const isYouTubeURL = (src: string) => {
  let srcURL;
  try {
    srcURL = new URL(src);
  } catch (e) {
    //
  }
  return !!srcURL && /(^|\.)youtube(-nocookie)?.com$/i.test(srcURL.hostname);
};

export const YouTubeVideo = forwardRef(
  (
    {
      children,
      autoplay,
      cc_lang_pref,
      cc_load_policy,
      color,
      controls,
      disablekb = '1',
      enablejsapi,
      end,
      fs,
      hl,
      iv_load_policy,
      list,
      listType,
      loop,
      origin,
      playlist,
      playsinline,
      rel,
      start,
      widget_referrer,
      src,
      title,
      width,
      height,
      ...restProps
    }: PropsWithChildren<YouTubeVideoProps>,
    ref: ForwardedRef<HTMLIFrameElement>,
  ) => {
    if (!isYouTubeURL(src)) {
      return null;
    }

    const props: { [index: string]: string | undefined } = {
      autoplay,
      cc_lang_pref,
      cc_load_policy,
      color,
      controls,
      disablekb,
      enablejsapi,
      end,
      fs,
      hl,
      iv_load_policy,
      list,
      listType,
      loop,
      origin,
      playlist,
      playsinline,
      rel,
      start,
      widget_referrer,
    };

    const srcURL = new URL(src);
    // Sort parameters for predictable results, in unit tests for example
    Object.entries(props)
      .filter(([, value]) => typeof value === 'string' && !!value)
      .sort(([a], [b]) => stringSort(a, b))
      .forEach(([key, value]) => {
        srcURL.searchParams.set(key, value || '');
      });
    let style;
    if (width && height) {
      style = { aspectRatio: parseFloat(width) / parseFloat(height) };
    }

    return (
      <>
        <iframe
          className={css('utrecht-youtube-video', 'utrecht-youtube-video--html-iframe')}
          src={srcURL.toString()}
          aria-label={title}
          width={width}
          height={height}
          style={style}
          {...restProps}
          ref={ref}
        />
        <YouTubeVideoProgressiveEnhancement />
      </>
    );
  },
);

YouTubeVideo.displayName = 'YouTubeVideo';
