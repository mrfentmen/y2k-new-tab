import { readFile, writeFile, mkdir, access } from "node:fs/promises"
import { join } from "node:path"
import { tmpdir } from "node:os"

const DATA_DIR = join(tmpdir(), "y2k-data")
const GUESTBOOK_FILE = join(DATA_DIR, "guestbook.json")

const Y2K_FACTS = [
  "In 2000, AOL Instant Messenger had over 100 million users.",
  "MySpace was the most visited website in the world in 2006.",
  "The original iPod had only 5GB of storage and cost $399.",
  "Napster shut down in 2001 after legal battles.",
  "AIM away messages were a form of self-expression in the early 2000s.",
  "Low-rise jeans and cargo pants were the height of fashion in 2000-2005.",
  "Paris Hilton was the first celebrity to become famous for being famous.",
  "TRL (Total Request Live) was the definitive music video countdown show.",
  "Tamagotchis were everywhere in the late 90s and early 2000s.",
  "The original Motorola Razr was the most popular phone in 2005.",
  "Crimping irons were a huge hairstyle trend in the early 2000s.",
  "Juicy Couture velour tracksuits were a must-have fashion item.",
  "MySpace profiles were covered in glitter graphics and auto-playing music.",
  "The 'whale tail' thong above low-rise jeans was a controversial trend.",
  "Butterfly clips and chunky highlights defined early 2000s hair."
]

export interface GuestbookEntry {
  timestamp: string
  name: string
  message: string
}

export interface Y2KFacts {
  facts: string[]
}

export async function ensureDataDir(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true })
}

export async function getRandomFact(): Promise<string> {
  return Y2K_FACTS[Math.floor(Math.random() * Y2K_FACTS.length)]
}

export async function listFacts(): Promise<Y2KFacts> {
  return { facts: Y2K_FACTS }
}

export async function saveGuestbookMessage(name: string, message: string): Promise<GuestbookEntry> {
  await ensureDataDir()
  let entries: GuestbookEntry[] = []
  try {
    const data = await readFile(GUESTBOOK_FILE, "utf-8")
    entries = JSON.parse(data)
  } catch {}
  const entry = { timestamp: new Date().toISOString(), name, message }
  entries.push(entry)
  await writeFile(GUESTBOOK_FILE, JSON.stringify(entries, null, 2))
  return entry
}

export async function listGuestbook(): Promise<GuestbookEntry[]> {
  await ensureDataDir()
  try {
    const data = await readFile(GUESTBOOK_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function clearGuestbook(): Promise<boolean> {
  try {
    await access(GUESTBOOK_FILE)
    await writeFile(GUESTBOOK_FILE, "[]")
    return true
  } catch {
    return false
  }
}
