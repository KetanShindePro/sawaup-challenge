import { Skills } from "@prisma/client";

type SkillsPaneProps = {
  skills: Skills[];
};

function SkillsPane(props: SkillsPaneProps) {
  const { skills } = props;

  return (
    <>
      {skills.map((skill: Skills) => {
        return <div key={skill.id}>{skill.name}</div>;
      })}
    </>
  );
}

export default SkillsPane;
