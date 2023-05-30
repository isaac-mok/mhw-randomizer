import React, { useEffect, useState } from "react";
import Quest from "./components/Quest";
import questJson from './quests.json';
import { Quest as QuestType, QuestList, Rank, Star, Type } from "./types/quest";
import { cloneDeep } from 'lodash'
import Th from './components/Th'
import Button from "./components/Button";
import Select from "./components/Select";
import Td from "./components/Td";

const availableRankFilters: Rank[] = [
  'Low',
  'High',
  'Master'
]

const availableStarFilters: Star[] = [
  '1','2','3','4','5','6','7','8','9',
  'M1','M2','M3','M4','M5','M6'
]

const availableTypeFilters: Type[] = [
  'Optional',
  'Event',
]

export default function Quests ({ setChecked }: {
  setChecked: (quests: QuestType[]) => void
}) {
  const [questList, setQuestList] = useState<QuestList>({})
  const [filteredQuestNames, setFilteredQuestNames] = useState<string[]>([])
  const [rankFilter, setRankFilter] = useState<Rank[]>([])
  const [starFilter, setStarFilter] = useState<Star[]>([])
  const [typeFilter, setTypeFilter] = useState<Type[]>([])

  useEffect(() => {
    const questList = questJson.reduce((prev, quest) => {
      prev[quest.name] = {
        ...quest as QuestType,
        checked: false
      }
      return prev
    }, {} as QuestList)
    setQuestList(questList)

    setFilteredQuestNames(Object.keys(questList))
  }, [setQuestList])

  useEffect(filter, [rankFilter, starFilter, typeFilter, questList])

  function setQuestsChecked (questNames: string[], checked: boolean) {
    const result = cloneDeep(questList)
    questNames.forEach(questName => {
      result[questName].checked = checked
    })
    setQuestList(result)
    
    const checkedQuests = Object.keys(result)
      .filter(key => result[key].checked)
      .map(key => {
        const { name, star, objective, tags } = result[key]
        return {
          name,
          star,
          objective,
          tags
        }
      })
    
    setChecked(checkedQuests)
  }

  function setAllFilteredChecked (checked: boolean) {
    setQuestsChecked(filteredQuestNames, checked)
  }

  function filter() {
    const questNames = Object.keys(questList)
      .filter(key => {
        const quest = questList[key]
        return (rankFilter.length === 0 || rankFilter.includes(quest.tags.rank))
          && (starFilter.length === 0 || starFilter.includes(quest.tags.star))
          && (typeFilter.length === 0 || typeFilter.includes(quest.tags.type))
      })
    setFilteredQuestNames(questNames)
  }

  return (
    <>
      <div>
        <h6 className="font-bold">Filters</h6>
        <div className="flex mt-1 mb-2">
          <div className="pr-2 border-r border-gray-300">
            <label htmlFor="rank-filter" className="mr-2 block">Rank</label>
            <Select id="rank-filter" multiple onChange={(e) => {
              const ranks = Array.from(e.currentTarget.selectedOptions).map(option => option.value)
              setRankFilter(ranks as Rank[])
            }}>
              {availableRankFilters.map(rank => <option key={rank} value={rank}>{rank}</option>)}
            </Select>
          </div>
          <div className="px-2 border-r border-gray-300">
            <label htmlFor="star-filter" className="mr-2 block">Star</label>
            <Select id="star-filter" multiple onChange={(e) => {
              const stars = Array.from(e.currentTarget.selectedOptions).map(option => option.value)
              setStarFilter(stars as Star[])
            }}>
              <option value={undefined}>None</option>
              {availableStarFilters.map(star => <option key={star} value={star}>{star}*</option>)}
            </Select>
          </div>
          <div className="pl-2">
            <label htmlFor="type-filter" className="mr-2 block">Type</label>
            <Select id="type-filter" multiple onChange={(e) => {
              const types = Array.from(e.currentTarget.selectedOptions).map(option => option.value)
              setTypeFilter(types as Type[])
            }}>
              {availableTypeFilters.map(type => <option key={type} value={type}>{type}</option>)}
            </Select>
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full table-fixed">
          <thead>
            <tr>
              <Th>Quest name</Th>
              <Th>Star</Th>
              <Th>Objective</Th>
              <Th>
                <Button className="w-28 block mb-1 mx-auto" onClick={() => { setAllFilteredChecked(true) }}>Check all</Button>
                <Button className="w-28 block mx-auto" onClick={() => { setAllFilteredChecked(false) }}>Uncheck all</Button>
              </Th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestNames.length > 0
              ? filteredQuestNames.map(key => (
                  <Quest key={key} quest={questList[key]} setChecked={(checked) => setQuestsChecked([key], checked)} />
                ))
              : <tr><Td colSpan={4}>No quests found</Td></tr>}
          </tbody>
        </table>
      </div>
    </>
  )
}
