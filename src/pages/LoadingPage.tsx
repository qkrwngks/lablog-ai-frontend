import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { LabLogLogo } from '../components/LabLogLogo'
import styles from './LoadingPage.module.css'

type LocationState = { phase?: 'upload' | 'analyze' }

export function LoadingPage() {
  const location = useLocation()
  const phase = (location.state as LocationState | null)?.phase ?? 'analyze'
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setProgress((p) => (p >= 92 ? 92 : p + Math.random() * 12))
    }, 400)
    return () => window.clearInterval(id)
  }, [])

  const title =
    phase === 'upload' ? '영상을 업로드하는 중입니다' : 'AI가 실험 영상을 분석 중입니다'

  const sub =
    phase === 'upload'
      ? '완료되면 키프레임 추출과 분석이 이어집니다.'
      : '키프레임 추출 → 영상 분석 → 보고서 초안 생성'

  return (
    <AppShell variant="page">
      <div className={styles.page}>
        <div className={styles.top}>
          <LabLogLogo className={styles.logoTight} />
        </div>

        <div className={styles.body}>
          <div className={styles.spinner} aria-hidden />
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.sub}>{sub}</p>
          <div
            className={styles.barOuter}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className={styles.barInner} style={{ width: `${Math.min(100, progress)}%` }} />
          </div>
          <p className={styles.eta}>예상 소요: 약 5~10분 (실서비스 기준)</p>
          <Link to="/" className={styles.cancel}>
            취소하고 메인으로
          </Link>
        </div>
      </div>
    </AppShell>
  )
}
