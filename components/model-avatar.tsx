import { cn } from "@/lib/utils"

const COLORS = ["#FF6B7A", "#2F81F7", "#FDB927", "#3FB68B", "#A06BFF", "#FF914D"]

export function colorFor(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  return COLORS[Math.abs(h) % COLORS.length]
}

export function ModelAvatar({
  name,
  photo,
  className,
}: {
  name: string
  photo?: string
  className?: string
}) {
  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo || "/placeholder.svg"}
        alt={name}
        className={cn("object-cover", className)}
      />
    )
  }
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("")
  return (
    <div
      className={cn("flex items-center justify-center font-extrabold text-white", className)}
      style={{ backgroundColor: colorFor(name) }}
    >
      <span className="text-[1.4em]">{initials}</span>
    </div>
  )
}
