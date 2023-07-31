import classNames from "classnames";
import { ReactElement } from "react";
import { QuestData } from "../types";

interface Props {
  data: QuestData
  setChecked: (checked: boolean) => void
}

export default function Quest ({ data, setChecked }: Props): ReactElement {
  const { name, star, objective, checked } = data

  const getClassName = () => {
    return classNames(
      'transition active:bg-blue-300 cursor-pointer',
      checked
        ? 'bg-blue-200 shadow hover:bg-blue-100'
        : 'bg-transparent hover:bg-gray-100'
    )
  }

  return (
    <tr onClick={() => { setChecked(!checked) }} className={getClassName()}>
      <td className="px-2 py-1 border">{ name }</td>
      <td className="px-2 py-1 border">{ star }</td>
      <td className="px-2 py-1 border">{ objective }</td>
    </tr>
  )
}
