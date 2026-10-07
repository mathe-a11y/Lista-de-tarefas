import QuestItem from "./QuestItem";

export default function QuestList(props) {
    return (
        <div className="flex flex-col over-flow-y-auto gap-6 w-[80%]">
            {props.quests.map((quest) => {
                return (
                <QuestItem
                key={quest.id}
                quest={quest}
                saveEditQuest={props.saveConcluededQuest}
                saveConcluededQuest={props.saveConcluededQuest}
                saveDeleteQuest={props.saveDeleteQuest}
                />
                );
            })}
        </div>
    )
}