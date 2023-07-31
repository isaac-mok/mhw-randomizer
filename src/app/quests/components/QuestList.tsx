'use client'

import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { QuestData, QuestFilterData } from "../types";
import store from 'store'
import { STORAGE_FILTERS_QUESTS, STORAGE_QUESTS } from "@/lib/storage";
import questsData from '@/lib/quests.json';
import Quest from "./Quest";
import QuestFilters from "./QuestFilters";

export default function QuestList (): ReactElement {
  const [quests, _setQuests] = useState<QuestData[]>([])
  const [filters, _setFilters] = useState<QuestFilterData>({ stars: [], ranks: [], types: [] })
  const [isFiltersModalVisible, setIsFiltersModalVisible] = useState(false)
  
  const visibleQuests = useMemo(() => {
    return quests.filter(quest => {
      if (filters.stars.length > 0) {
        if (filters.stars.find(filteredStar => filteredStar === quest.tags.star) === undefined) return false
      }
      if (filters.ranks.length > 0) {
        if (filters.ranks.find(filteredRank => filteredRank === quest.tags.rank) === undefined) return false
      }
      if (filters.types.length > 0) {
        if (filters.types.find(filteredType => filteredType === quest.tags.type) === undefined) return false
      }

      return true
    })
  }, [quests, filters])

  const setQuests = useCallback((quests: QuestData[]) => {
    _setQuests(quests)

    const checkedQuests = quests.filter(quest => quest.checked)
      .map(quest => quest.name)
    store.set(STORAGE_QUESTS, checkedQuests)
  }, [_setQuests])

  const checkAll = () => {
    const newQuests = quests.map(quest => {
      return {
        ...quest,
        checked: visibleQuests.find(visibleQuest => visibleQuest.name === quest.name) !== undefined ? true : quest.checked
      }
    })
    setQuests([...newQuests])
  }

  const uncheckAll = () => {
    const newQuests = quests.map(quest => {
      return {
        ...quest,
        checked: visibleQuests.find(visibleQuest => visibleQuest.name === quest.name) !== undefined ? false : quest.checked
      }
    })
    setQuests([...newQuests])
  }

  const setQuestChecked = (name: string, checked: boolean) => {
    const newQuests = quests.map(quest => {
      return {
        ...quest,
        checked: quest.name === name ? checked : quest.checked
      }
    })
    setQuests([...newQuests])
  }

  const setFilters = useCallback((data: QuestFilterData) => {
    store.set(STORAGE_FILTERS_QUESTS, data)
    _setFilters(data)
  }, [_setFilters])

  useEffect(() => {
    let checkedQuests: string[] = store.get(STORAGE_QUESTS, questsData.map(questData => questData.name))
    const quests = (questsData as QuestData[]).map(questData => {
      return {
        ...questData,
        checked: checkedQuests.find(checkedQuest => checkedQuest === questData.name) !== undefined
      }
    })
    setQuests(quests)

    let filters: QuestFilterData = store.get(
      STORAGE_FILTERS_QUESTS,
      {
        stars: [],
        ranks: [],
        types: []
      }
    )
    setFilters(filters)
  }, [setQuests, setFilters])

  if (quests.length === 0) return <p>Loading...</p>

  return (
    <>
      <div className="mb-4">
        <button onClick={checkAll} className="bg-gray-200 shadow px-4 py-2 rounded font-bold transition mr-2 hover:bg-gray-100 active:bg-gray-300">Check all</button>
        <button onClick={uncheckAll} className="bg-gray-200 shadow px-4 py-2 rounded font-bold transition hover:bg-gray-100 active:bg-gray-300 mr-12">Uncheck all</button>
        <button onClick={() => setIsFiltersModalVisible(!isFiltersModalVisible)} className="bg-blue-600 text-white mt-2 sm:mt-0 shadow px-4 py-2 rounded font-bold transition hover:bg-blue-500 active:bg-blue-700">Filters</button>
      </div>
      <table className="mb-36">
        <thead>
          <tr>
            <th className="px-2 py-1 border">Name</th>
            <th className="px-2 py-1 border">Star</th>
            <th className="px-2 py-1 border">Objective</th>
          </tr>
        </thead>
        <tbody>
          {visibleQuests.map(quest => (
            <Quest key={quest.name} data={quest} setChecked={(checked: boolean) => { setQuestChecked(quest.name, checked) }} />
          ))}
        </tbody>
      </table>
      <QuestFilters
        isShown={isFiltersModalVisible}
        setIsShown={(value: boolean) => { setIsFiltersModalVisible(value) }}
        filters={filters}
        setFilters={(filters) => { setFilters(filters) }}
      />
    </>
  )
}
