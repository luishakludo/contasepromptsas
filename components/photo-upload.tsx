"use client"

import { useRef, useState } from "react"
import { ImagePlus, Loader2, X } from "lucide-react"
import { ModelAvatar } from "@/components/model-avatar"

// Redimensiona a imagem e devolve um data URL leve (JPEG)
function fileToDataUrl(file: File, max = 320): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height))
        const w = Math.round(img.width * scale)
        const h = Math.round(img.height * scale)
        const canvas = document.createElement("canvas")
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext("2d")
        if (!ctx) return reject(new Error("sem canvas"))
        ctx.drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL("image/jpeg", 0.82))
      }
      img.onerror = reject
      img.src = reader.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function PhotoUpload({
  name,
  value,
  onChange,
}: {
  name: string
  value: string
  onChange: (v: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  const handleFile = async (file?: File) => {
    if (!file) return
    setLoading(true)
    try {
      const url = await fileToDataUrl(file)
      onChange(url)
    } catch (e) {
      console.log("[v0] erro ao processar imagem:", e)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-1.5">
      <span className="text-[14px] font-bold text-white">Foto</span>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="group relative w-24 h-24 shrink-0 overflow-hidden rounded-2xl border-[3px] border-[#FF6B7A] outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B7A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] transition-transform hover:scale-[1.03] active:scale-95"
          aria-label={value ? "Trocar foto" : "Enviar foto"}
        >
          <ModelAvatar name={name || "?"} photo={value} className="w-full h-full" />

          {/* Overlay de upload */}
          <span
            className={`absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/60 text-white transition-opacity ${
              value ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            }`}
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" strokeWidth={3} />
            ) : (
              <>
                <ImagePlus className="w-6 h-6" strokeWidth={2.5} />
                <span className="text-[11px] font-bold leading-none">{value ? "Trocar" : "Enviar"}</span>
              </>
            )}
          </span>
        </button>

        <div className="flex flex-col gap-1">
          <span className="text-[13px] font-bold text-white">Clique na foto para enviar</span>
          <span className="text-[12px] text-white/50">PNG ou JPG</span>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="mt-1 inline-flex w-fit items-center gap-1.5 text-[13px] font-bold text-[#FF6B7A] hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" strokeWidth={3} />
              Remover
            </button>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  )
}
