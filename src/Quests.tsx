import React, { useEffect, useState } from "react";
import Quest from "./components/Quest";
import questJson from './quests.json';
import { Quest as QuestType, QuestList, Rank, Star, Type } from "./types/quest";
import { cloneDeep } from 'lodash'

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
  const [rankFilter, setRankFilter] = useState<Rank | null>(null)
  const [starFilter, setStarFilter] = useState<Star | null>(null)
  const [typeFilter, setTypeFilter] = useState<Type | null>(null)

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
        return (rankFilter === null || quest.tags.rank === rankFilter)
          && (starFilter === null || quest.tags.star === starFilter)
          && (typeFilter === null || quest.tags.type === typeFilter)
      })
    setFilteredQuestNames(questNames)
  }

  return (
    <>
      <div>
        <h6>Filters</h6>
        <div>
          <label htmlFor="rank-filter">Rank</label>
          <select id="rank-filter" onChange={(e) => {
            const rank = e.currentTarget.value !== 'None' ? e.currentTarget.value as Rank : null
            setRankFilter(rank)
          }}>
            <option value={undefined}>None</option>
            {availableRankFilters.map(rank => <option key={rank} value={rank}>{rank}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="star-filter">Star</label>
          <select id="star-filter" onChange={(e) => {
            const star = e.currentTarget.value !== 'None' ? e.currentTarget.value as Star : null
            setStarFilter(star)
          }}>
            <option value={undefined}>None</option>
            {availableStarFilters.map(star => <option key={star} value={star}>{star}*</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="type-filter">Type</label>
          <select id="type-filter" onChange={(e) => {
            const type = e.currentTarget.value !== 'None' ? e.currentTarget.value as Type : null
            setTypeFilter(type)
          }}>
            <option value={undefined}>None</option>
            {availableTypeFilters.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Quest name</th>
            <th>Star</th>
            <th>Objective</th>
            <th>
              <button onClick={() => { setAllFilteredChecked(true) }}>Check all</button>
              /
              <button onClick={() => { setAllFilteredChecked(false) }}>Uncheck all</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestNames.map(key => (
            <Quest key={key} quest={questList[key]} setChecked={(checked) => setQuestsChecked([key], checked)} />
          ))}
        </tbody>
      </table>
    </>
  )
}
