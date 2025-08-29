import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTodos = query({
  handler: async (ctx) => {
    return await ctx.db.query("todos").collect();
  },
});
export const createTodos = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("todos", { text: args.text, isComplete: false });
  },
});
export const toggleTodos = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new ConvexError("Todo not found");
    await ctx.db.patch(args.id, { isComplete: !todo.isComplete });
  },
});
export const deleteTodos = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
export const updateTodos = mutation({
  args: { id: v.id("todos"), text: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { text: args.text });
  },
});

export const clearApp = mutation({
    args: {},
    handler: async (ctx)=>{
        const todos = await ctx.db.query("todos").collect();
        for(const todo of todos){
            await ctx.db.delete(todo._id);
        }
        return {deleteCount: todos.length};
    }
})