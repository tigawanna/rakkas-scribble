import { PageProps } from "rakkasjs"
import { useState } from "react";
import { MainEditor } from "./components/MainEditor";
export default function NewBlogPage({}:PageProps) {
  const [input, setInput] = useState(`
Job Title: Web Developer

Responsibilities:

Develop and maintain web applications using React and Tailwind CSS frameworks.
Design and implement user interfaces that are responsive, accessible, and visually appealing.
Write clean and efficient code using modern JavaScript and TypeScript.
Collaborate with cross-functional teams to gather requirements and ensure software quality.
Test and debug code to ensure functionality and stability.
Continuously learn and update skills to stay up-to-date with the latest technologies.
Qualifications:

Strong knowledge of HTML, CSS, and JavaScript/TypeScript.
Familiarity with React and Tailwind CSS frameworks.
Proficiency in building responsive and mobile-friendly web applications.
Strong understanding of web development best practices and accessibility standards.
Excellent problem-solving and communication skills.
Ability to work independently or as part of a team.`);
  return (
    <div
      className="w-full h-full min-h-screen flex items-center justify-center ">
    <div
      className="w-full h-full min-h-screen flex items-center justify-center fixed top-[5%]">
      <MainEditor input={input} getEditorContent={setInput} />
    </div>
    </div>
  );
}
