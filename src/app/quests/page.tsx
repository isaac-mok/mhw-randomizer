import { ReactElement, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import QuestList from "./components/QuestList";

export default function Quests (): ReactElement {
  return (
    <>
      <PageTitle>Quests</PageTitle>
      <QuestList />
    </>
  )
}
