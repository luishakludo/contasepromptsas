"use client"

import { useEffect, type ReactNode } from "react"
import { X } from "lucide-react"

export function NeoModal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full sm:max-w-md bg-[#141414] text-white border-[2px] border-[#262626] rounded-t-2xl sm:rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.7)] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b-[2px] border-[#262626] px-5 py-4 sticky top-0 bg-[#141414] rounded-t-2xl">
          <h2 className="text-[20px] font-extrabold">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="w-9 h-9 flex items-center justify-center border-[2px] border-[#262626] rounded-lg hover:bg-[#FF6B7A] hover:border-[#FF6B7A] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" strokeWidth={3} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

export function NeoField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[14px] font-bold text-white">{label}</span>
      {children}
    </label>
  )
}

export const neoInputClass =
  "w-full bg-[#0e0e0e] text-white border-[2px] border-[#2a2a2a] rounded-xl px-4 py-2.5 text-[15px] font-medium outline-none focus:border-[#4a4a4a] transition-colors placeholder:text-[#666666]"
