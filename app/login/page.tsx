"use client"

import { FormEvent, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, LockKeyhole } from "lucide-react"
import { saveAccessSession, verifyAccessPassword } from "@/components/auth-gate"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setLoading(true)
    try {
      if (await verifyAccessPassword(password)) {
        saveAccessSession()
        router.replace(searchParams.get("next") || "/")
      } else {
        setError("Senha incorreta. Tente novamente.")
      }
    } catch {
      setError("Não foi possível validar o acesso agora.")
    } finally {
      setLoading(false)
    }
  }

  return <main className="flex min-h-screen items-center justify-center bg-black px-6"><section className="w-full max-w-sm"><div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black"><LockKeyhole className="h-5 w-5" /></div><p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#777]">Área privada</p><h1 className="text-balance text-3xl font-bold tracking-tight text-white">Digite sua senha para entrar</h1><p className="mt-3 leading-6 text-[#777]">Este espaço é protegido. A sessão permanece ativa por 10 horas.</p><form onSubmit={handleSubmit} className="mt-8 space-y-3"><label htmlFor="password" className="sr-only">Senha</label><input id="password" type="password" autoFocus value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Senha de acesso" className="h-12 w-full rounded-xl border border-[#292929] bg-[#111] px-4 text-white outline-none transition placeholder:text-[#666] focus:border-white" required /><button type="submit" disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white font-bold text-black transition hover:bg-[#d8d8d8] disabled:cursor-wait disabled:opacity-60">{loading ? "Validando..." : "Entrar"}{!loading && <ArrowRight className="h-4 w-4" />}</button>{error && <p role="alert" className="text-sm text-[#f07474]">{error}</p>}</form></section></main>
}
