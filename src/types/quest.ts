export type Rank = 'Low' | 'High' | 'Master'

export type Star = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'M1' | 'M2' | 'M3' | 'M4' | 'M5' | 'M6'

export type Type = 'Optional' | 'Event'

export interface Quest {
  name: string
  star: string
  objective: string
  tags: {
    star: Star
    rank: Rank
    type: Type
  }
}

export interface QuestWithChecked extends Quest {
  checked: boolean
}

export type QuestList = Record<string, QuestWithChecked>
