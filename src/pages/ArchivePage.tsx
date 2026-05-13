import { Link } from 'react-router-dom'
import styles from './ArchivePage.module.css'

const MOCK_ITEMS = [
  { id: 'archive-1', title: '보고서1' },
  { id: 'archive-2', title: '보고서2' },
  { id: 'archive-3', title: '보고서3' },
  { id: 'archive-4', title: '보고서4' },
  { id: 'archive-5', title: '보고서5' },
  { id: 'archive-6', title: '보고서6' },
]

const PCT = 100 / MOCK_ITEMS.length

export function ArchivePage() {
  return (
    <div className={styles.shell}>
      <div className={styles.paperBg} aria-hidden />
      <header className={styles.header}>
        <Link to="/" className={styles.back}>‹</Link>
        <h1 className={styles.title}>보관함</h1>
      </header>

      <div className={styles.folderTab} />

      <ul className={styles.list}>
        {MOCK_ITEMS.map((item, i) => (
          <li
            key={item.id}
            style={{
              top: `${i * PCT}%`,
              zIndex: i + 1,
              height: `${PCT}%`,
            }}
          >
            <Link to={`/report/${item.id}`} className={styles.docCard}>
              <span className={styles.docTitle}>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.folderFooter}>
        <svg viewBox="0 0 24 24" fill="none" className={styles.chevron}>
          <path d="M6 9L12 15L18 9" stroke="var(--lab-white)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
