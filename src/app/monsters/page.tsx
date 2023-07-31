import { ReactElement, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import MonsterList from "./components/MonsterList";

export default function Monsters (): ReactElement {
  return (
    <>
      <PageTitle>Monsters</PageTitle>
      <MonsterList />
    </>
  )
}
