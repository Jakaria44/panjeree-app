import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const GoogleIcon = (props: SvgProps) => (
  <Svg role="img" viewBox="0 0 24 24" {...props}>
    <Path
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.62-4.55 1.62-3.87 0-7-3.13-7-7s3.13-7 7-7c2.18 0 3.54.88 4.38 1.62l2.82-2.82C18.04 2.12 15.48 1 12.48 1 5.88 1 1 5.88 1 12.48s4.88 11.48 11.48 11.48c3.18 0 5.64-1.08 7.52-2.98 1.94-1.94 2.58-4.68 2.58-7.98 0-.62-.05-1.22-.16-1.82h-9.48z"
      fill={props.fill || props.color || "currentColor"}
    />
  </Svg>
);

export const FacebookIcon = (props: SvgProps) => (
  <Svg role="img" viewBox="0 0 24 24" {...props}>
    <Path
      d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.381H7.078v-3.47h3.046V9.356c0-3.008 1.792-4.668 4.532-4.668 1.312 0 2.688.235 2.688.235v2.953H15.83c-1.49 0-1.955.925-1.955 1.874v2.25h3.328l-.532 3.47h-2.796v8.381C19.61 22.952 23.998 17.988 23.998 12z"
      fill={props.fill || props.color || "currentColor"}
    />
  </Svg>
); 