import { TdHTMLAttributes } from "react";
import cn from 'classnames'

export default function Td ({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn('border border-gray-500 px-2 py-1', className)} {...props} />
  )
}
