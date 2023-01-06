import { CourseSkillMap, Favourites, Videos } from "@prisma/client";

export type UserType = {
  id: string;
  name: string;
  favourites: Favourites[];
  createdAt: Date;
  updatedAt: Date;
}

export type CourseType = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  videos: Videos[];
  courseSkillMap: CourseSkillMap[];
};

export type SkillType = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  courseSkillMap: CourseSkillMap[];
};

export type SkillsStateType = {
  allSkills: SkillType[];
  selectedSkills: SkillType[];
};

export type CoursesStateType = {
  allCourses: CourseType[];
};

export type UserStateType = {
  data: UserType | null
}

export type AppState = {
  user: UserStateType;
  skills: SkillsStateType;
  courses: CoursesStateType;
};
