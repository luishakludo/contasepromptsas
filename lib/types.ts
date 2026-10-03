export type AccountStatus = "ativa" | "aquecimento" | "analise" | "contencao" | "pouca_atencao" | "restrita" | "banida"

export interface Account {
  id: string
  handle: string
  avatar: string
  email: string
  password: string
  status: AccountStatus
  needsReview: boolean
  notes: string
  createdAt: string
}

export interface Prompt {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  archived?: boolean
  pinned?: boolean
  color?: "default" | "red" | "yellow" | "blue"
}
