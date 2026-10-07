import { useState } from "react";
import AddQuest from "./AddQuest";
import QuestList from "./QuestList";

function App() {
  const localQuests = JSON.parse(window.localStorage.getItem("quests")) || [];
  const [quests, setQuests] = useState([]);
  const concluededQuests = quests.filter((quest) => quest.status === "concluído");
  const notConcluededQuests = quests.filter((quest) => quest.status === "aberto");


  function saveEditQuest(quest,title) {
    let auxQuests = quests;
    const editedQuest = {
      id: quest.id,
      title: title || quest.title,
      status: quest.status,
      created_at: quest.created_at,
    }

    const findQuestPosition = auxQuests.findIndex(
    (quest) => quest.id === editedQuest.id
  );
  
  auxQuests.splice(findQuestPosition, 1, editedQuest);

  localStorage.setItem("quests", JSON.stringify(auxQuests));

  setQuests(auxQuests);

  }

  function saveConcluededQuest(quest, title) {
    let auxQuests = [...quests];
    const editedQuest = {
      id: quest.id,
      title: title,
      status: "concluído",
      created_at: quest.created_at,
    }

    const findQuestPosition = auxQuests.findIndex(
    (item) => item.id === editedQuest.id
  );

  if (findQuestPosition !== -1) {
  
    auxQuests.splice(findQuestPosition, 1, editedQuest);

    localStorage.setItem("quests", JSON.stringify(auxQuests));

    setQuests(auxQuests);
  };
}

  function saveAddQuest(title) {
    let auxQuests = quests;
    let id = 0;  
    if (auxQuests.length) {
      id = auxQuests[auxQuests.length - 1].id;
    }
    id++;

      const createQuest = {
      id: id, 
      title: title,
      status: "aberto", 
      created_at: new Date(Date.now()).toUTCString(),
    };  

    auxQuests.push(createQuest);
    localStorage.setItem("quests", JSON.stringify(auxQuests));
    getQuests();

    function getQuests() {
    setQuests(JSON.parse(window.localStorage.getItem("quests")));
  }
    }
    function saveDeleteQuest(quest){
      let auxQuests = quests;

      const filterAuxQuest = auxQuests.filter(
      (auxQuests) => auxQuests.id !== quest.id
      )
    
    localStorage.setItem("quests", JSON.stringify(filterAuxQuest));

    setQuests(auxQuests);
    }
  

  //interface gráfica
  return (
    //centraliza todo conteúdo no meio da tela
    <div className="flex h-screen justify-center items-center vertical-align: middle">
      
      {/*centraliza a caixa de digitação e proporciona uma largura expansiva conforme o tamanho da tela*/}
      <div className="card w-[80%] lg:w-[50%] h-[70%] shadow-md rounded-sm transform ease-out duration-300 items-center p-10 gap-5">
       
       {/*Título principal*/}
        <h1 className="text-5xl font-work font-bold w-fit text-center">
          Quests To Do
        </h1>

        {/*estabelece a comunicação entre os componentes, passa a função*/}
        <AddQuest saveAddQuest={saveAddQuest} />
        <div className="flex flx-col gap-4 w-full items-center">
          <h2>Abertas</h2>
           
            <QuestList 
              quests={notConcluededQuests}
              saveEditQuest={saveEditQuest}
              saveConcluededQuest={saveConcluededQuest}
              saveDeleteQuest={saveDeleteQuest}
            />
        
        </div>
        
        <div className="flex flx-col gap-4 w-full items-center">
        <h2>Concluídas</h2>
          
          <QuestList 
            quests={concluededQuests}
            saveEditQuest={saveEditQuest}
            saveConcluededQuest={saveConcluededQuest}
          />
        </div>
      </div>
    </div>
  );
}

export default App;