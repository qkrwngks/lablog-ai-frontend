import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { FinalReport } from '../types/report'
import styles from './ReportDetailView.module.css'

interface Props {
  report: FinalReport | undefined
  backTo: string
}

export function ReportDetailView({ report, backTo }: Props) {
  const [page, setPage] = useState(1)
  const touchStartX = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (dx < -50 && page === 1) setPage(2)
    else if (dx > 50 && page === 2) setPage(1)
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setPage(p => Math.min(p + 1, 2))
      else if (e.key === 'ArrowLeft') setPage(p => Math.max(p - 1, 1))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link to={backTo} className={styles.back}>‹</Link>
        <div className={styles.headerActions}>
          <button className={styles.trashBtn} aria-label="삭제">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
          <button className={styles.downloadBtn} aria-label="다운로드">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        </div>
      </header>

      {!report ? (
        <div className={styles.empty}>보고서를 찾을 수 없습니다.</div>
      ) : (
        <>
          <main className={styles.content}>
            <div
              className={styles.pages}
              style={{ transform: `translateX(${page === 1 ? '0' : '-50%'})` }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={() => { touchStartX.current = null }}
            >
              {/* 1페이지 */}
              <div className={styles.page}>
                <div className={styles.titleCard}>
                  <span className={styles.titleBadge}>실험 제목</span>
                  <div className={styles.titleValue}>{report.실험제목}</div>
                </div>

                <Row num={1} label="실험 날짜">{report.실험날짜}</Row>

                <Row num={2} label="선행 연구">
                  <pre className={styles.pre}>{report.선행연구}</pre>
                </Row>

                <Row num={3} label="실험 목적">
                  {report.실험목적.map((p, i) => (
                    <div key={i} className={styles.bullet}>● {p}</div>
                  ))}
                </Row>

                <Row num={4} label="가설">
                  <pre className={styles.pre}>{report.가설}</pre>
                </Row>

                <Row num={5} label="준비물">{report.준비물.join(', ')}</Row>

                <Row num={6} label="실험 방법">
                  <pre className={styles.pre}>{report.실험방법}</pre>
                </Row>
              </div>

              {/* 2페이지 */}
              <div className={styles.page}>
                <Row num={7} label="실험 과정">
                  <pre className={styles.pre}>{report.실험과정}</pre>
                </Row>

                <Row num={8} label="실험 결과">
                  <pre className={styles.pre}>{report.실험결과}</pre>
                </Row>

                <Row num={9} label="결론">
                  <pre className={styles.pre}>{report.결론}</pre>
                </Row>
              </div>
            </div>
          </main>

          <button
            className={styles.pageFooter}
            onClick={() => setPage(p => p === 1 ? 2 : 1)}
            aria-label={page === 1 ? '다음 페이지' : '이전 페이지'}
          >
            {page} / 2
          </button>
        </>
      )}
    </div>
  )
}

interface RowProps {
  num: number
  label: string
  children: React.ReactNode
}

function Row({ num, label, children }: RowProps) {
  return (
    <div className={styles.row}>
      <div className={styles.labelCol}>
        <span className={styles.badge}>{num}</span>
        <span className={styles.labelText}>{label}</span>
      </div>
      <div className={styles.valueCol}>{children}</div>
    </div>
  )
}
