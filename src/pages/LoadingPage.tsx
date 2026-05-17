import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { PageHeader } from '../components/PageHeader'
import lablogMark from '../assets/lablog-mark.png'
import styles from './LoadingPage.module.css'

type LocationState = { phase?: 'upload' | 'analyze' }

const R = 90
const CIRC = 2 * Math.PI * R

const PHASE_COPY = {
  upload:  { headerTitle: '영상 업로드', centerTitle: '영상 업로드', centerSub: '업로드 중...' },
  analyze: { headerTitle: '최종안 작성', centerTitle: '보고서 최종안', centerSub: '제작 중...' },
} as const

export function LoadingPage() {
  const location = useLocation()
  const phase = (location.state as LocationState | null)?.phase ?? 'analyze'
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 92) {
          window.clearInterval(intervalRef.current)
          return p
        }
        return Math.min(p + Math.random() * 12, 92)
      })
    }, 400)
    return () => window.clearInterval(intervalRef.current)
  }, [])

  const offset = CIRC - (progress / 100) * CIRC

  const { headerTitle, centerTitle, centerSub } = PHASE_COPY[phase]

  return (
    <AppShell variant="page">
      <PageHeader title={headerTitle} />
      <div className={styles.body}>
        <div
          className={styles.ringWrap}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <svg className={styles.ring} viewBox="0 0 220 220" aria-hidden>
            <circle cx="110" cy="110" r={R} fill="none" stroke="var(--lab-ring-track)" strokeWidth="20" />
            <circle
              cx="110" cy="110" r={R}
              fill="none"
              stroke="var(--lab-ring)"
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray={`${CIRC} ${CIRC}`}
              strokeDashoffset={offset}
              className={styles.ringArc}
            />
          </svg>

          <div className={styles.ringCenter}>
            <img
              className={styles.centerIcon}
              src={lablogMark}
              alt=""
              width={840}
              height={814}
            />
            <p className={styles.centerTitle}>{centerTitle}</p>
            <p className={styles.centerSub}>{centerSub}</p>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
