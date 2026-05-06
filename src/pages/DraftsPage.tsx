import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { PageHeader } from '../components/PageHeader'
import styles from './DraftsPage.module.css'

export function DraftsPage() {
  return (
    <AppShell variant="page">
      <PageHeader title="임시 보관함" />

      <p className={styles.lead}>분석 전·편집 중인 항목입니다. 메인 화면 배지와 동일하게 1건 예시를 둡니다.</p>

      <ul className={styles.list}>
        <li className={styles.card}>
          <span className={styles.badge}>진행 중</span>
          <span className={styles.cardTitle}>유기 합성 실험 — 촬영본 업로드됨</span>
          <span className={styles.cardMeta}>마지막 저장 · 방금 전</span>
          <div className={styles.actions}>
            <Link to="/loading" className={styles.primary}>
              이어서 분석
            </Link>
          </div>
        </li>
      </ul>
    </AppShell>
  )
}
