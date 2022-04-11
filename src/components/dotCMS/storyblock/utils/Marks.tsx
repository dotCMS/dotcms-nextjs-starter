import React from 'react'

export const Bold = ({ children }) => <strong>{children}</strong>
export const Italic = ({ children }) => <em>{children}</em>
export const Link = ({ href, target, children }) => (
  <a href={href} target={target}>
    {children}
  </a>
)
export const Strike = ({ children }) => <s>{children}</s>
export const Underline = ({ children }) => <u>{children}</u>
