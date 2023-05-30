import React, { ReactElement, SelectHTMLAttributes } from "react";
import cn from 'classnames'

export default function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>): ReactElement {
  return (
    <select {...props} className={cn('px-2 py-1 border border-gray-300 hover:border-gray-400 bg-gray-100 hover:bg-gray-300 rounded transition-colors', className)} />
  )
}
