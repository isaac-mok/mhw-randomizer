'use client'

import classNames from "classnames";
import { ReactElement, useCallback, useEffect, useState } from "react";
import store from 'store'

interface Props {
  storageKey: string
}

export default function EnableButton ({ storageKey }: Props): ReactElement {
  const [enabled, _setEnabled] = useState<boolean|null>(null)

  const setEnabled = useCallback((enabled: boolean) => {
    store.set(storageKey, enabled)
    _setEnabled(enabled)
  }, [storageKey])

  useEffect(() => {
    let storageEnabled = store.get(storageKey, true)
    setEnabled(storageEnabled)
  }, [storageKey, setEnabled])

  const getClassName = () => {
    return classNames(
      'px-2 py-1 rounded transition shadow hover:shadow-none text-black',
      enabled
        ? 'bg-blue-200 hover:bg-blue-100'
        : 'bg-gray-200 hover:bg-gray-100'
    )
  }

  if (enabled === null) return (<></>)

  return (
    <button onClick={() => { setEnabled(!enabled) }} className={getClassName()}>
      {enabled ? 'Enabled' : 'Disabled'}
    </button>
  )
}
