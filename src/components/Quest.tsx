import { QuestWithChecked } from "../types/quest";

export default function Quest ({ quest, setChecked }: {
  quest: QuestWithChecked,
  setChecked: (checked: boolean) => void
}) {
  return (
    <tr>
      <td>{quest.name}</td>
      <td>{quest.star}</td>
      <td>{quest.objective}</td>
      <td>
        <input type="checkbox" checked={quest.checked} onChange={(e) => setChecked(e.currentTarget.checked)} />
      </td>
    </tr>
  )
}
