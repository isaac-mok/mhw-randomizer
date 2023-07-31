'use client'

import { ReactElement, useCallback, useEffect, useState } from "react";
import { MonsterData } from "../types";
import Monster from "./Monster";
import store from 'store'
import { STORAGE_MONSTERS } from "@/lib/storage";
import monstersData from '@/lib/monsters.json';

export default function MonsterList (): ReactElement {
  const [monsters, _setMonsters] = useState<MonsterData[]>([])

  const setMonsters = useCallback((monsters: MonsterData[]) => {
    _setMonsters(monsters)

    const checkedMonsters = monsters.filter(monster => monster.checked)
      .map(monster => monster.name)
    store.set(STORAGE_MONSTERS, checkedMonsters);
  }, [_setMonsters])

  const checkAll = () => {
    const newMonsters = monsters.map(monster => {
      return {
        ...monster,
        checked: true
      }
    })
    setMonsters([...newMonsters])
  }

  const uncheckAll = () => {
    const newMonsters = monsters.map(monster => {
      return {
        ...monster,
        checked: false
      }
    })
    setMonsters([...newMonsters])
  }

  const setMonsterChecked = (name: string, checked: boolean) => {
    const newMonsters = monsters.map(monster => {
      return {
        ...monster,
        checked: monster.name === name ? checked : monster.checked
      }
    })
    setMonsters([...newMonsters])
  }

  useEffect(() => {
    let checkedMonsters: string[] = store.get(STORAGE_MONSTERS, monstersData.map(monsterData => monsterData.name))
    const monsters = (monstersData as MonsterData[]).map(monsterData => {
      return {
        ...monsterData,
        checked: checkedMonsters.find(checkedMonster => checkedMonster === monsterData.name) !== undefined
      }
    })
    setMonsters(monsters)
  }, [setMonsters])

  if (monsters.length === 0) return <p>Loading...</p>

  return (
    <>
      <div className="mb-4">
        <button onClick={checkAll} className="bg-gray-200 shadow px-4 py-2 rounded font-bold transition mr-2 hover:bg-gray-100 active:bg-gray-300">Check all</button>
        <button onClick={uncheckAll} className="bg-gray-200 shadow px-4 py-2 rounded font-bold transition hover:bg-gray-100 active:bg-gray-300">Uncheck all</button>
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-20 sm:pb-0">
        {monsters.map(({ name, checked }) => (
          <Monster key={name} name={name} checked={checked} setChecked={(checked: boolean) => { setMonsterChecked(name, checked) }} />
        ))}
      </ul>
    </>
  )
}
