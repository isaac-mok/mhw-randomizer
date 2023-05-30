import { ThHTMLAttributes } from "react";
import cn from 'classnames'

export default function Td ({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={cn('border border-gray-500 px-2 py-1 sticky top-0', className)} {...props} />
  )
}
