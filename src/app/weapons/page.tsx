import { ReactElement, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import WeaponList from "./components/WeaponList";

export default function Weapons (): ReactElement {
  return (
    <>
      <PageTitle>Weapons</PageTitle>
      <WeaponList />
    </>
  )
}
