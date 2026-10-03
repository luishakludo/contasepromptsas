"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AtSign, Copy, LogOut } from "lucide-react"
import { clearAccessSession } from "@/components/auth-gate"
import { cn } from "@/lib/utils"

export function AppNav() {
  const pathname = usePathname()
  function handleLogout() {
    clearAccessSession()
    window.location.href = "/login"
  }
  return <div className="mx-auto w-full max-w-6xl px-4 pt-5 sm:px-8"><nav className="flex items-center justify-center border-b border-[#252525] px-1 pb-3"><div className="flex items-center gap-1"><NavLink href="/" active={pathname === "/"} icon={<AtSign className="h-4 w-4" />} label="Contas" /><NavLink href="/prompts" active={pathname.startsWith("/prompts")} icon={<Copy className="h-4 w-4" />} label="Prompts" /><button type="button" onClick={handleLogout} aria-label="Sair" className="ml-2 rounded-xl p-2 text-[#777] transition hover:bg-[#202020] hover:text-white"><LogOut className="h-4 w-4" /></button></div></nav></div>
}
function NavLink({ href, active, icon, label }: { href: string; active: boolean; icon: React.ReactNode; label: string }) { return <Link href={href} className={cn("flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition", active ? "bg-white text-black" : "text-[#777] hover:bg-[#202020] hover:text-white")}>{icon}{label}</Link> }
