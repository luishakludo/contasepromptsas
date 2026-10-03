import { AppNav } from "@/components/app-nav"
import { LibraryApp } from "@/components/library/library-app"

export default function Home() {
  return <main className="min-h-screen"><AppNav /><LibraryApp tab="contas" /></main>
}
