import { QuestWithChecked } from "../types/quest";
import Td from './Td'

export default function Quest ({ quest, setChecked }: {
  quest: QuestWithChecked,
  setChecked: (checked: boolean) => void
}) {
  return (
    <tr className="odd:bg-gray-200">
      <Td className="">{quest.name}</Td>
      <Td className="text-center">{quest.star}</Td>
      <Td>{quest.objective.split('\n').map((line, index) => <p key={index}>{line}</p>)}</Td>
      <Td className="">
        <label htmlFor={`checkbox-${quest.name}`} className="w-full flex justify-center">
          <input id={`checkbox-${quest.name}`} type="checkbox" checked={quest.checked} onChange={(e) => setChecked(e.currentTarget.checked)} />
        </label>
      </Td>
    </tr>
  )
}
