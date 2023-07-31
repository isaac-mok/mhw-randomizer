'use client'

import { ReactElement, useCallback, useEffect, useState } from "react";
import { WeaponData } from "../types";
import Weapon from "./Weapon";
import store from 'store'
import { STORAGE_WEAPONS } from "@/lib/storage";
import weaponsData from '@/lib/weapons.json';

export default function WeaponList (): ReactElement {
  const [weapons, _setWeapons] = useState<WeaponData[]>([])

  const setWeapons = useCallback((weapons: WeaponData[]) => {
    _setWeapons(weapons)

    const checkedWeapons = weapons.filter(weapon => weapon.checked)
      .map(weapon => weapon.name)
    store.set(STORAGE_WEAPONS, checkedWeapons);
  }, [_setWeapons])

  const checkAll = () => {
    const newWeapons = weapons.map(weapon => {
      return {
        ...weapon,
        checked: true
      }
    })
    setWeapons([...newWeapons])
  }

  const uncheckAll = () => {
    const newWeapons = weapons.map(weapon => {
      return {
        ...weapon,
        checked: false
      }
    })
    setWeapons([...newWeapons])
  }

  const setWeaponChecked = (name: string, checked: boolean) => {
    const newWeapons = weapons.map(weapon => {
      return {
        ...weapon,
        checked: weapon.name === name ? checked : weapon.checked
      }
    })
    setWeapons([...newWeapons])
  }

  useEffect(() => {
    let checkedWeapons: string[] = store.get(STORAGE_WEAPONS, weaponsData.map(weaponData => weaponData.name))
    const weapons = (weaponsData as WeaponData[]).map(weaponData => {
      return {
        ...weaponData,
        checked: checkedWeapons.find(checkedWeapon => checkedWeapon === weaponData.name) !== undefined
      }
    })
    setWeapons(weapons)
  }, [setWeapons])

  if (weapons.length === 0) return <p>Loading...</p>

  return (
    <>
      <div className="mb-4">
        <button onClick={checkAll} className="bg-gray-200 shadow px-4 py-2 rounded font-bold transition mr-2 hover:bg-gray-100 active:bg-gray-300">Check all</button>
        <button onClick={uncheckAll} className="bg-gray-200 shadow px-4 py-2 rounded font-bold transition hover:bg-gray-100 active:bg-gray-300">Uncheck all</button>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 pb-20">
        {weapons.map(({ name, checked }) => (
          <Weapon key={name} name={name} checked={checked} setChecked={(checked: boolean) => { setWeaponChecked(name, checked) }} />
        ))}
      </ul>
    </>
  )
}
