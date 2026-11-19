/**
 * The Pragathi mark: a gold arch (the site's signature shape) holding a
 * letter P, on a navy roundel. Drawn inline so it needs no image request and
 * scales to any size.
 *
 * `variant` is kept so call sites read the same as before; every variant
 * renders the same mark. The roundel's navy fill means it also reads on the
 * navy footer thanks to its gold ring.
 *
 * TODO(client): replace the SVG body with the school's real logo when
 * supplied, keeping this component's props.
 *
 * Decorative by default: every call site labels itself, so alt is '' unless
 * a caller passes one.
 */
export default function Logo({ alt = '', className = '', ...rest }) {
  const decorative = alt === ''
  // `loading` is an <img> concern; drop it rather than leak it onto the SVG.
  const { variant: _variant, loading: _loading, ...svgProps } = rest

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : alt}
      aria-hidden={decorative ? 'true' : undefined}
      focusable="false"
      {...svgProps}
    >
      <circle cx="32" cy="32" r="30" fill="#12284a" stroke="#c8a24a" strokeWidth="2" />
      <path
        d="M19 48 V30 A13 13 0 0 1 45 30 V48"
        fill="none"
        stroke="#c8a24a"
        strokeWidth="1.5"
      />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="26"
        fontWeight="500"
        fill="#fffdf8"
      >
        P
      </text>
    </svg>
  )
}
