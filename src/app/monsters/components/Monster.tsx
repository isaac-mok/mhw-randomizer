import classNames from "classnames";
import Image from 'next/image'
import { ReactElement } from "react";

interface Props {
  name: string
  checked: boolean
  setChecked: (checked: boolean) => void
}

export default function Monster({ name, checked, setChecked }: Props): ReactElement {
  const getClassName = () => {
    return classNames(
      'block w-full p-2 rounded transition hover:shadow-none active:bg-blue-300',
      checked ? 'bg-blue-200 shadow hover:bg-blue-100' : 'bg-transparent hover:bg-gray-100'
    )
  }

  return (
    <li>
      <button onClick={() => { setChecked(!checked) }} className={getClassName()}>
        <p>{name}</p>
      </button>
    </li>
  )
}
