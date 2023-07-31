import classNames from "classnames";
import { ReactElement, useMemo } from "react";
import { FilterTypes, QuestData, QuestFilterData, Rank, Star, Type } from "../types";
import questsData from '@/lib/quests.json'
import QuestFilterOption from "./QuestFilterOption";

interface Props {
  isShown: boolean
  setIsShown: (value: boolean) => void
  filters: QuestFilterData
  setFilters: (filters: QuestFilterData) => void
}

export default function QuestFilters ({ isShown, setIsShown, filters, setFilters }: Props): ReactElement {
  const possibleFilters = useMemo(() => {
    const filters = {
      stars: {} as Record<Star, boolean>,
      ranks: {} as Record<Rank, boolean>,
      types: {} as Record<Type, boolean>
    };
    (questsData as QuestData[]).forEach(({ tags }) => {
      filters.stars[tags.star] = true
      filters.ranks[tags.rank] = true
      filters.types[tags.type] = true
    })
    return {
      stars: Object.keys(filters.stars) as Star[],
      ranks: Object.keys(filters.ranks) as Rank[],
      types: Object.keys(filters.types) as Type[]
    }
  }, [])

  const setFilterChecked = (filter: FilterTypes, key: string, checked: boolean) => {
    let filterArr = filters[filter] as string[]
    const exists = filterArr.find(value => value === key) !== undefined
    if (checked && !exists) {
      filterArr.push(key)
    } else if (exists) {
      filterArr = filterArr.filter(filterKey => filterKey !== key)
    }
    setFilters({
      ...filters,
      [filter]: filterArr
    })
  }

  const getClassName = () => {
    return classNames(
      'transition fixed top-0 left-0 w-screen h-screen z-20 flex justify-center items-center',
      isShown
        ? 'block'
        : 'hidden'
    )
  }

  return (
    <div className={getClassName()}>
      <div onClick={() => { setIsShown(false) }} className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="bg-white w-4/5 max-h-4/5 rounded shadow relative z-10 px-4 py-2">
        <h3 className="text-lg font-bold underline">Filters</h3>
        <div className="py-2 border-b">
          <h4 className="font-bold">Stars</h4>
          <ul className="grid grid-cols-3 sm:grid-cols-10 md:grid-cols-12 gap-1">
            {possibleFilters.stars.map(name => (
              <QuestFilterOption key={name} name={name} checked={filters.stars.find(star => star === name) !== undefined} setChecked={(checked) => setFilterChecked('stars', name, checked)} />
            ))}
          </ul>
        </div>
        <div className="py-2 border-b">
          <h4 className="font-bold">Ranks</h4>
          <ul className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 xxl:grid-cols-12 gap-1">
            {possibleFilters.ranks.map(name => (
              <QuestFilterOption key={name} name={name} checked={filters.ranks.find(rank => rank === name) !== undefined} setChecked={(checked) => setFilterChecked('ranks', name, checked)} />
            ))}
          </ul>
        </div>
        <div className="py-2">
          <h4 className="font-bold">Types</h4>
          <ul className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 xxl:grid-cols-12 gap-1">
            {possibleFilters.types.map(name => (
              <QuestFilterOption key={name} name={name} checked={filters.types.find(type => type === name) !== undefined} setChecked={(checked) => setFilterChecked('types', name, checked)} />
            ))}
          </ul>
        </div>
        <button onClick={() => { setIsShown(false) }} className="bg-blue-600 text-white mt-2 shadow px-4 py-2 rounded font-bold transition hover:bg-blue-500 active:bg-blue-700">Apply</button>
      </div>
    </div>
  )
}
