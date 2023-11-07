
import { PageProps, useSSM } from "rakkasjs"
import React from "react";
import { useState } from "react";
export default function BlogsPage({}:PageProps) {
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
const mutatuion = useSSM((ctx) => {
  return {
    head: {
      title: "Scribbla",
      keywords:
        "rich text editor, markdown, cherry, markdown based rich text editor,AI editor",
      description: "cherry markdown based rich text editor ",
    },
  };
});
return (
  <div className="w-full h-full min-h-screen flex items-center justify-center">
    
  </div>
);}
