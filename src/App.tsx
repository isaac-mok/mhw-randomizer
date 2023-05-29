import React, { useState } from 'react';
import Quests from "./Quests";
import { Quest } from "./types/quest";
function App() {
  const [quests, setQuests] = useState<Quest[]>([]);

  function handleRandomizeButtonClick() {
    if (quests.length <= 0) return alert('Choose at least one quest.')

    const randomQuestIndex = getRandomIndex(quests.length)

    console.log(quests[randomQuestIndex])
  }

  function getRandomIndex (exclusiveMax: number) {
    return Math.floor(Math.random() * exclusiveMax)
  }

  return (
    <div>
      <Quests setChecked={(quests: Quest[]) => setQuests(quests)} />
      <button onClick={handleRandomizeButtonClick}>Randomize</button>
    </div>
  );
}

export default App;
