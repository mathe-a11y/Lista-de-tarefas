import QuestItem from "./QuestItem";
import { render, screen, fireEvent } from "@testing-library/react";
import { test, describe, expect } from "@jest/globals";

const createdQuest = {
    id: 1,
    title: "Falar com o ferreiro",
    status: "aberto",
    created_at: new Date(Date.now()).toUTCString(),

};

const concluedQuest = {
    id: 2,
    title: "Falar com o mago",
    status: "concluído",
    created_at: new Date(Date.now()).toUTCString(),
};

describe("testando item", () => {
    test("testando se está visível", () => {
    render(<QuestItem quest={createdQuest} />);

    expect(screen.getByTestId("questItem")).toBeVisible();
    expect(screen.getByTestId("title").textContent).toBe(
            "Falar com o ferreiro"
    );

    });

    test("testando se a edição está accesível", () => {
        render(<QuestItem quest={QuestItem} />);

        expect(screen.getByTestId("buttons")).toBeVisible();

        fireEvent.click(screen.getByTestId("editButton"));

        expect(screen.getByTestId("input")).toBeVisible();

        expect(screen.getByTestId("input")).toHaveValue("Falar com o ferreiro");
    });

    test("testando se edição é bloqueada quando concluída", () => {
        render(<QuestItem quest={concluedQuest} />);
        expect(screen.getByTestId("buttons")).toBeNull();
    })
});