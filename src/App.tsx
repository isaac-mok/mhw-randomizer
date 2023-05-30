import React, { useState } from 'react';
import Button from "./components/Button";
import Quests from "./Quests";
import { Quest } from "./types/quest";
function App() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [randomQuest, setRandomQuest] = useState<Quest | null>(null);

  function handleRandomizeButtonClick() {
    if (quests.length <= 0) return alert('Choose at least one quest.')

    const randomQuestIndex = getRandomIndex(quests.length)

    setRandomQuest(quests[randomQuestIndex])
  }

  function getRandomIndex (exclusiveMax: number) {
    return Math.floor(Math.random() * exclusiveMax)
  }

  return (
    <div className="container mx-auto px-3 py-2">
      <h1 className="text-xl font-bold mb-2">Monster Hunter World Randomizer</h1>
      <div className="h-[72vh] overflow-auto">
        <Quests setChecked={(quests: Quest[]) => setQuests(quests)} />
      </div>
      <div className="h-[20vh] pt-4">
        <Button onClick={handleRandomizeButtonClick}>Randomize</Button>
          <div>
          <p className="font-bold">Random quest:</p>
          <p className="flex"><span className="block w-[4.5rem]">Name</span>: {randomQuest?.name}</p>
          <p className="flex"><span className="block w-[4.5rem]">Star</span>: {randomQuest?.star}</p>
          <p className="flex"><span className="block w-[4.5rem]">Objective</span>: {randomQuest?.objective}</p>
          <p className="flex"><span className="block w-[4.5rem]">Type</span>: {randomQuest?.tags.type}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
