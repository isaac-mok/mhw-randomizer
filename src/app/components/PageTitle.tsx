import { PropsWithChildren, ReactElement } from "react";

export default function PageTitle ({ children }: PropsWithChildren): ReactElement {
  return (
    <h1 className="text-2xl font-bold mb-4 underline">
      {children}
    </h1>
  )
}
