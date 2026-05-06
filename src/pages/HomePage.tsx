import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { LabLogLogo } from '../components/LabLogLogo'
import logoStyles from '../components/LabLogLogo.module.css'
import styles from './HomePage.module.css'

function UploadIcon() {
  return (
    <svg
      className={styles.heroIcon}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 26v11.5q0 8 7 8h10q7 0 7-8V26" />
      <path d="M32 41V17.5M24 25.5L32 17.5 40 25.5" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg
      className={`${styles.heroIcon} ${styles.heroIconCamera}`}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.35}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* 본체 — 상단은 뷰파인더와 맞닿음 */}
      <path d="M11.5 33.5h41a3 3 0 0 1 3 3v19.5a3 3 0 0 1-3 3h-41a3 3 0 0 1-3-3V36.5a3 3 0 0 1 3-3z" />
      {/* 장식 띠(렌즈 뒤로 깔림) */}
      <line x1="13" y1="40.5" x2="51" y2="40.5" />
      <line x1="13" y1="49.5" x2="51" y2="49.5" />
      {/* 렌즈 3중 원 + 하이라이트 */}
      <circle cx="32" cy="46.5" r="9.75" />
      <circle cx="32" cy="46.5" r="6.85" />
      <circle cx="32" cy="46.5" r="4.15" />
      <path d="M29.2 43.6q1.1-1.35 2.9-1.05" />
      {/* 상단 뷰파인더/플래시 하우징 */}
      <path d="M14.2 33.5 18.8 19.2H45.2l4.6 14.3z" />
      <rect x="27.25" y="21.35" width="9.5" height="4.2" rx="0.85" />
      {/* 셔터 돌출 */}
      <path d="M50.5 26.2h3.6a2.45 2.45 0 1 1 0 4.9h-3.6" />
    </svg>
  )
}

export function HomePage() {
  return (
    <AppShell variant="home">
      <LabLogLogo className={logoStyles.hero} />

      <div className={styles.actions}>
        <Link to="/upload" className={`${styles.btn} ${styles.btnNavy} ${styles.btnTall}`}>
          <UploadIcon />
          <span>동영상 업로드</span>
        </Link>

        <Link to="/record" className={`${styles.btn} ${styles.btnLavender} ${styles.btnTall}`}>
          <CameraIcon />
          <span>동영상 촬영</span>
        </Link>

        <Link to="/archive" className={`${styles.btn} ${styles.btnNavy} ${styles.btnShort}`}>
          보관함
        </Link>

        <Link to="/drafts" className={`${styles.btn} ${styles.btnNavy} ${styles.btnShort}`}>
          <span className={styles.badge} aria-label="새 항목 3건">
            3
          </span>
          임시 보관함
        </Link>
      </div>
    </AppShell>
  )
}
