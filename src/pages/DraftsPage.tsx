import { Link } from 'react-router-dom'
import { DRAFT_ITEMS, isDraftSeen } from '../data/drafts'
import styles from './DraftsPage.module.css'

function Paperclip({ seen }: { seen: boolean }) {
  return (
    <svg
      className={`${styles.clip} ${seen ? styles.clipSeen : styles.clipUnseen}`}
      viewBox="0 0 30 72"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M22 10 C22 5 8 5 8 10 L8 52 C8 62 22 62 22 52 L22 14 C22 9 12 9 12 14 L12 48"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DraftsPage() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link to="/" className={styles.back}>‹</Link>
        <h1 className={styles.title}>임시 보관함</h1>
      </header>

      <main className={styles.content}>
        <ul className={styles.list}>
          {DRAFT_ITEMS.map((item) => (
            <li key={item.id} className={styles.cardWrap}>
              {item.hasClip && <Paperclip seen={isDraftSeen(item.id)} />}
              <Link to={`/draft/${item.id}`} className={styles.card}>
                <span className={styles.cardTitle}>{item.title}</span>
                <span className={styles.cardStatus}>({item.status})</span>
              </Link>
              <div className={styles.fold} />
            </li>
          ))}
        </ul>

        <div className={styles.chevronRow}>
          <svg viewBox="0 0 24 24" fill="none" className={styles.chevron} aria-hidden="true">
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </main>
    </div>
  )
}
