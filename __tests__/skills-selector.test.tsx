import SkillsSelector from "../components/skills/skills-selector/skills-selector.component";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Redux_Store_Mock } from "../mock-data/select-all-skills";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

describe("SkillsSelector", () => {
  const mockStore = configureStore();
  let store;

  test("renders a SkillsSelector", () => {
    store = mockStore(Redux_Store_Mock);
    render(
      <Provider store={store}>
        <SkillsSelector />
      </Provider>
    );

    for (let i = 0; i < Redux_Store_Mock.skills.allSkills.length; i++) {
      const skill = Redux_Store_Mock.skills.allSkills[i];
      expect(screen.getByTestId(skill.id)).toBeInTheDocument();
    }
  });
});
