import { AppShell } from '../components/AppShell'
import { PageHeader } from '../components/PageHeader'
import styles from './ArchivePage.module.css'

const MOCK_ITEMS = [
  { id: '1', title: '적정 실험 — 산 염기 중화', date: '2026-05-01' },
  { id: '2', title: '용해도 곡선', date: '2026-04-28' },
]

export function ArchivePage() {
  return (
    <AppShell variant="page">
      <PageHeader title="보관함" />

      <p className={styles.lead}>완료된 보고서와 영상이 여기에 모입니다. (임시 목록)</p>

      <ul className={styles.list}>
        {MOCK_ITEMS.map((item) => (
          <li key={item.id} className={styles.card}>
            <span className={styles.cardTitle}>{item.title}</span>
            <span className={styles.cardMeta}>{item.date}</span>
          </li>
        ))}
      </ul>
    </AppShell>
  )
}
