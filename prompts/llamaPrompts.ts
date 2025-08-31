export const generateTodoPrompt = (
  userPrompt: string,
  previousTodos: { text: string; selected: boolean }[] | null
) => {
  let todoHistory;
  if (previousTodos !== null) {
    todoHistory = previousTodos.map((t) => t.text);
  } else {
    todoHistory = "No previous todos.";
  }
  return `Generate a list of todo tasks based on the following user prompt: ${userPrompt}. For reference, this was the previous todos you generated: ${todoHistory}. Do not include the previous todos you already suggested. You are to strictly follow the output format Below:
    Output Format:
    Provide the output in JSON format strictly following the task structure without any additional text or explanation:
    [{
            text: string,
    }, ...]
    where ... means more of these as asked by the user prompt:
    {
            text: string,
    }
    Ensure that the JSON is properly formatted and can be parsed without errors. If the user prompt does not include the number of tasks to generate, take default as 5 tasks. I repeat NO TEXT OR EXPLANATION, ONLY THE RAW JSON.`;
};

type Todo = { text: string; selected: boolean };

export const assistantPrompt = (previousTodos: Todo[] | null) => {
  if (!previousTodos || previousTodos.length === 0) {
    return "[]";
  }

  return `Here are the tasks I previously suggested (in JSON format):

${JSON.stringify(
  previousTodos.map((t) => ({ text: t.text })),
  null,
  2
)}

Do not repeat these tasks in future responses.`;
};
