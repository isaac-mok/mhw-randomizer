export type Rank = 'Low' | 'High' | 'Master'

export type Star = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'M1' | 'M2' | 'M3' | 'M4' | 'M5' | 'M6'

export type Type = 'Optional' | 'Event'

export interface QuestData {
  name: string
  star: string
  objective: string
  checked: boolean
  tags: {
    star: Star
    rank: Rank
    type: Type
  }
}

export type FilterTypes = 'stars' | 'ranks' | 'types'

export interface QuestFilterData {
  stars: Star[]
  ranks: Rank[]
  types: Type[]
}
