import { CourseSkillMap, Skills, Videos } from "@prisma/client";

export type CourseType = {
    id: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    videos: Videos[],
    courseSkillMap: CourseSkillMap[],
  }

export type SkillsStateType = {
    allSkills: Skills[],
    selectedSkills: Skills[],
}

export type CoursesStateType = {
    allCourses: CourseType[]
}

export type AppState = {
    skills: SkillsStateType,
    courses: CoursesStateType
}