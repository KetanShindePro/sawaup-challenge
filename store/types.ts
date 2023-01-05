import { Courses, Skills } from "@prisma/client";

export type SkillsStateType = {
    allSkills: Skills[],
    selectedSkills: Skills[],
}

export type CoursesStateType = {
    allCourses: Courses[]
}

export type AppState = {
    skills: SkillsStateType,
    courses: CoursesStateType
}