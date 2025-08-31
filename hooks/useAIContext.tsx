import { assistantPrompt, generateTodoPrompt } from "@/prompts/llamaPrompts";
import Constants from "expo-constants";
import React, { createContext, useContext, useState } from "react";

const apiKey = Constants.expoConfig?.extra?.LLAMA_API_KEY;

type Todo = { text: string; selected: boolean };

interface AIContextType {
  generatedTodo: Todo[] | null;
  getResponse: (prompt: string) => Promise<void>;
  setGeneratedTodo: React.Dispatch<React.SetStateAction<Todo[] | null>>;
}

const AIContext = createContext<AIContextType | null>(null);

export const AIProvider = ({ children }: { children: React.ReactNode }) => {
  const [generatedTodo, setGeneratedTodo] = useState<Todo[] | null>(null);

  const getResponse = async (prompt: string) => {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-small-3.2-24b-instruct:free",
        messages: [
          {
            role: "system",
            content: `You are a todo list generator. 
              Always output only a valid JSON array of objects with this structure:
              [
                { "text": "..." },
                { "text": "..." }
              ]

              Rules:
              - No explanations, no markdown, no extra text. Only raw JSON.
              - Default number of tasks = 5 if the user does not specify.
              - Do not repeat tasks already suggested.`,
          },
          {
            role: "assistant",
            content: assistantPrompt(generatedTodo),
          },
          {
            role: "user",
            content: generateTodoPrompt(prompt, generatedTodo),
          },
        ],
      }),
    });
    // const res = await fetch("http://localhost:11434/api/chat", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     model: "llama3:latest",
    //     messages: [
    //       {
    //         role: "system",
    //         content: `You are a todo list generator. 
    //           Always output only a valid JSON array of objects with this structure:
    //           [
    //             { "text": "..." },
    //             { "text": "..." }
    //           ]

    //           Rules:
    //           - No explanations, no markdown, no extra text. Only raw JSON.
    //           - Default number of tasks = 5 if the user does not specify.
    //           - Do not repeat tasks already suggested.`,
    //       },
    //       {
    //         role: "assistant",
    //         content: assistantPrompt(generatedTodo),
    //       },
    //       {
    //         role: "user",
    //         content: generateTodoPrompt(prompt, generatedTodo),
    //       },
    //     ],
    //     stream: false,
    //   }),
    // });
    console.log(res);
    
    const data = await res.json();
    const tasks = data?.choices[0]?.message?.content;

    let taskArray: { text: string }[] = [];
    try {
      // taskArray = JSON.parse(tasks.split("json")[1].split("```")[0]);
      taskArray = JSON.parse(tasks);
    } catch (e) {
      console.error("JSON parse error:", e, tasks);
      return;
    }

    setGeneratedTodo(taskArray.map((t) => ({ text: t.text, selected: false })));
  };

  return (
    <AIContext value={{ generatedTodo, getResponse, setGeneratedTodo }}>
      {children}
    </AIContext>
  );
}

export const useAIContext = () => {
  const ctx = useContext(AIContext);
  if (!ctx) throw new Error("useAIContext must be used inside AIProvider");
  return ctx;
}
