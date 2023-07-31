'use client'

import { ReactElement, useState } from "react";
import { STORAGE_ENABLE_MONSTERS, STORAGE_ENABLE_QUESTS, STORAGE_ENABLE_WEAPONS } from "@/lib/storage";
import SidebarLink from "./SidebarLink";
import classNames from "classnames";
import { Bars3Icon } from '@heroicons/react/24/solid'

export default function Sidebar(): ReactElement {
  const [isShown, setIsShown] = useState(false)

  const getClassName = () => {
    return classNames(
      'mt-4 sm:mt-0 sm:block',
      isShown ? 'block' : 'hidden'
    )
  }

  return (
    <div className={"fixed sm:static p-4 sm:p-0 flex-col transition sm:flex w-full sm:w-60 bg-white"}>
      <button onClick={() => { setIsShown(!isShown) }} className="sm:hidden bg-white p-2 shadow">
        <Bars3Icon className="w-6 h-6" />
      </button>
      <nav className={getClassName()}>
        <SidebarLink href="/quests" storageKey={STORAGE_ENABLE_QUESTS}>
          Quests
        </SidebarLink>
        <SidebarLink href="/weapons" storageKey={STORAGE_ENABLE_WEAPONS}>
          Weapons
        </SidebarLink>
        <SidebarLink href="/monsters" storageKey={STORAGE_ENABLE_MONSTERS}>
          Monsters
        </SidebarLink>
      </nav>
    </div>
  )
}
