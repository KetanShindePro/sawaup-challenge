# Decisions about the application

With given requirementns in mind, I started thinking about how the whole application would work. I dentified workflows and visualised what all stuff I would need.

Above step was crucial for me to decide/visualise on how my Database would look like. what different tables I would need to make this challenge work.

## Database decisions -

- Refered DB excelsheet shared in challange for mock data.
- Decided to normalise the data to different tables for scalabitlity.

### DB Tables -

1. Courses - Holds all courses data.

   - name - Course name
   - relations with other tables
     - videos - A course may have multiple videos, so I thought it would be good to have a separate table for it and the build the relation with courses table to be able to access relevant videos using course ID.
     - favourites - For many to many relation builtup between courses and users.
     - courseSkillMap - With simillar thought as videos, I added this table to keep track of the relevant skills.

2. Skills - Holds all skills data.

   - name - Skill name
   - relations with other tables
     - courseSkillMap - To keep track of what skills are connected to what courses.

3. Videos - Holds all videos info.

   - url - Url of the video.
   - courseId - course id of the course it belongs to.

4. CourseSkillMap - Holds mapping of couses to skills.

   - courseId - Course Id.
   - skillId - Skill Id

5. Users - This one I needed to be able to persist the favorite courses data.

   - name - User name.
   - relations with other tables
     - favourites - For many to many relation builtup between courses and users.

6. Favourites - Hold favorite courses for users.
   - userId - User Id the of the user
   - courseId - Favorite course Id of above user.

## UI

### UI Library -

I have used MIUI as a CSS library as I was familier with it and time was of essence.

## Redux

### Redux Toolkit -

- Used slice way to separate/modularise the data, relevant actions and selectors.
- Used builder notation for reducers as that is the suggested way. (Best works with Typescript and helps simplify reducers compared to the traditional way.)
