// @ts-nocheck
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import * as Y2K from "./y2k.js"

export function createServer(): McpServer {
  const server = new McpServer({ name: "y2k-new-tab-mcp", version: "1.0.0" })

  server.tool("get_y2k_fact", "Get a random Y2K fun fact.", {}, async () => {
    try {
      const fact = await Y2K.getRandomFact()
      return { content: [{ type: "text", text: fact }] }
    } catch (err) {
      return { content: [{ type: "text", text: `Error: ${(err as Error).message}` }] }
    }
  })

  server.tool("list_y2k_facts", "Get all Y2K facts.", {}, async () => {
    try {
      const facts = await Y2K.listFacts()
      return { content: [{ type: "text", text: JSON.stringify(facts, null, 2) }] }
    } catch (err) {
      return { content: [{ type: "text", text: `Error: ${(err as Error).message}` }] }
    }
  })

  server.tool(
    "add_guestbook_entry",
    "Add a message to the Y2K guestbook.",
    {
      name: z.string().describe("Name of the guest"),
      message: z.string().describe("Message to leave"),
    },
    async (args: any) => {
      try {
        const entry = await Y2K.saveGuestbookMessage(args.name, args.message)
        return { content: [{ type: "text", text: JSON.stringify(entry, null, 2) }] }
      } catch (err) {
        return { content: [{ type: "text", text: `Error: ${(err as Error).message}` }] }
      }
    },
  )

  server.tool("list_guestbook", "List all guestbook entries.", {}, async () => {
    try {
      const entries = await Y2K.listGuestbook()
      return { content: [{ type: "text", text: JSON.stringify(entries, null, 2) }] }
    } catch (err) {
      return { content: [{ type: "text", text: `Error: ${(err as Error).message}` }] }
    }
  })

  server.tool("clear_guestbook", "Clear all guestbook entries.", {}, async () => {
    try {
      const cleared = await Y2K.clearGuestbook()
      return { content: [{ type: "text", text: `Cleared: ${cleared}` }] }
    } catch (err) {
      return { content: [{ type: "text", text: `Error: ${(err as Error).message}` }] }
    }
  })

  return server
}
