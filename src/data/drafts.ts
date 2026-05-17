export type DraftStatus = '초안 검수' | '초안 제작 중...' | '최종본 제작 중...' | '최종본 검수'

export interface DraftItem {
  id: string
  title: string
  status: DraftStatus
  hasClip: boolean
}

export const DRAFT_ITEMS: DraftItem[] = [
  { id: '1', title: '보고서A', status: '초안 검수', hasClip: true },
  { id: '2', title: '보고서B', status: '초안 제작 중...', hasClip: false },
  { id: '3', title: '보고서C', status: '최종본 제작 중...', hasClip: false },
  { id: '4', title: '보고서D', status: '최종본 검수', hasClip: true },
  { id: '5', title: '보고서E', status: '최종본 검수', hasClip: true },
]

const SEEN_KEY = 'lablog_seen_drafts'

function getSeenIds(): Set<string> {
  try {
    const raw = localStorage.getItem(SEEN_KEY)
    return raw ? new Set<string>(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

export function isDraftSeen(id: string): boolean {
  return getSeenIds().has(id)
}

export function markDraftSeen(id: string): void {
  const item = DRAFT_ITEMS.find((d) => d.id === id)
  if (!item?.hasClip) return
  const seen = getSeenIds()
  if (seen.has(id)) return
  seen.add(id)
  localStorage.setItem(SEEN_KEY, JSON.stringify([...seen]))
}

export function getUnseenClipCount(): number {
  const seen = getSeenIds()
  return DRAFT_ITEMS.filter((item) => item.hasClip && !seen.has(item.id)).length
}
