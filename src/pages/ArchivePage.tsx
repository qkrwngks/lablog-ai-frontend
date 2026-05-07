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

export function ArchivePage() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link to="/" className={styles.back}>‹</Link>
        <h1 className={styles.title}>보관함</h1>
      </header>

      <ul className={styles.list}>
        {MOCK_ITEMS.map((item) => (
          <li key={item.id}>
            <Link to={`/report/${item.id}`} className={styles.docCard}>
              <span className={styles.docTitle}>{item.title}</span>
              <span className={styles.arrow}>›</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
