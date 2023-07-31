'use client'

import { STORAGE_ENABLE_MONSTERS, STORAGE_ENABLE_QUESTS, STORAGE_ENABLE_WEAPONS, STORAGE_MONSTERS, STORAGE_QUESTS, STORAGE_WEAPONS } from "@/lib/storage";
import { ReactElement, useState } from "react";
import store from 'store'
import { MonsterData } from "../monsters/types";
import { WeaponData } from "../weapons/types";
import questsData from '@/lib/quests.json'
import weaponsData from '@/lib/weapons.json'
import monstersData from '@/lib/monsters.json'
import { QuestData } from "../quests/types";
import classNames from "classnames";

export default function RandomizeWidget (): ReactElement {
  const [randomQuest, setRandomQuest] = useState<QuestData | null>(null)
  const [randomWeapon, setRandomWeapon] = useState<WeaponData | null>(null)
  const [randomMonster, setRandomMonster] = useState<MonsterData | null>(null)

  const getRandomIndex = (exclusiveMax: number) => {
    return Math.floor(Math.random() * exclusiveMax)
  }

  const getRandomQuest = () => {
    const quests = (store.get(STORAGE_QUESTS) as string[])

    if (quests.length <= 0) return alert('Choose at least one quest.')

    const randomQuestIndex = getRandomIndex(quests.length)

    const questData = (questsData as QuestData[]).find(questData => questData.name === quests[randomQuestIndex])

    if (questData) setRandomQuest(questData)
  }

  const getRandomWeapon = () => {
    const weapons = (store.get(STORAGE_WEAPONS) as string[])

    if (weapons.length <= 0) return alert('Choose at least one weapon.')

    const randomWeaponIndex = getRandomIndex(weapons.length)

    const weaponData = (weaponsData as WeaponData[]).find(weaponData => weaponData.name === weapons[randomWeaponIndex])

    if (weaponData) setRandomWeapon(weaponData)
  }

  const getRandomMonster = () => {
    const monsters = (store.get(STORAGE_MONSTERS) as string[])

    if (monsters.length <= 0) return alert('Choose at least one monster.')

    const randomMonsterIndex = getRandomIndex(monsters.length)

    const monsterData = (monstersData as MonsterData[]).find(monsterData => monsterData.name === monsters[randomMonsterIndex])

    if (monsterData) setRandomMonster(monsterData)
  }

  const handleRandomizeButtonClick = () => {
    if (store.get(STORAGE_ENABLE_QUESTS, true)) {
      getRandomQuest()
    }

    if (store.get(STORAGE_ENABLE_WEAPONS, true)) {
      getRandomWeapon()
    }

    if (store.get(STORAGE_ENABLE_MONSTERS, true)) {
      getRandomMonster()
    }
  }

  const getClassName = () => {
    return classNames(
      'bg-blue-500 text-white font-bold px-4 py-2 rounded shadow transition hover:bg-blue-400 hover:shadow-none',
      randomQuest !== null || randomWeapon !== null || randomMonster !== null
        ? 'mt-2'
        : ''
    )
  }

  return (
    <div className="fixed bottom-2 left-2 text-start z-10 bg-slate-200 shadow p-4 rounded">
      {randomQuest !== null
        ? <p>Quest: {randomQuest.name}</p>
        : <></>}
      {randomWeapon !== null
        ? <p>Weapon: {randomWeapon.name}</p>
        : <></>}
      {randomMonster !== null
        ? <p>Monster: {randomMonster.name}</p>
        : <></>}
      <button onClick={handleRandomizeButtonClick} className={getClassName()}>
        Randomize
      </button>
    </div>
  )
}
