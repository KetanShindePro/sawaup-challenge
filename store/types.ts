import { Skills } from "@prisma/client";

export type SkillsStateType = {
    allSkills: Skills[],
    selectedSkills: Skills[],
}

export type AppState = {
    skills: SkillsStateType;
}