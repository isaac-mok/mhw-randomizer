import React, { ButtonHTMLAttributes, ReactElement } from "react";
import cn from 'classnames'

export default function Button ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>): ReactElement {
  return (
    <button {...props} className={cn('px-2 py-1 border border-gray-300 hover:border-gray-400 bg-gray-200 hover:bg-gray-300 rounded transition-colors', className)} />
  )
}
