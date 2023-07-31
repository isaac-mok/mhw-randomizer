'use client'

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, ReactElement } from "react";
import EnableButton from "./EnableButton";

interface Props extends PropsWithChildren {
  href: string
  storageKey: string
}

export default function SidebarLink ({ href, children, storageKey }: Props): ReactElement {
  const pathname = usePathname()

  const getClassName = (): string => {
    const isActive = pathname === (new URL(href, 'http://localhost')).pathname
  
    return classNames(
      'flex justify-between items-center mb-2 shadow pr-4 transition rounded',
      isActive
        ? 'bg-gray-700 hover:bg-gray-600 text-white'
        : 'bg-gray-300 hover:bg-gray-400'
    )
  }

  return (
    <div className={getClassName()}>
      <Link href={href} className="block flex-1 py-2 pl-2 font-bold">{ children }</Link>
      <EnableButton storageKey={storageKey} />
    </div>
  )
}
