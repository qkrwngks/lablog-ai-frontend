import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { PageHeader } from '../components/PageHeader'
import styles from './RecordPage.module.css'

export function RecordPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [recording, setRecording] = useState(false)

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    setStream(null)
    const v = videoRef.current
    if (v) v.srcObject = null
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: true,
        })
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop())
          return
        }
        streamRef.current = s
        setStream(s)
        setError(null)
        const v = videoRef.current
        if (v) v.srcObject = s
      } catch {
        if (!cancelled) {
          setError('카메라·마이크 권한이 필요합니다. 브라우저 설정에서 허용해 주세요.')
        }
      }
    })()
    return () => {
      cancelled = true
      streamRef.current?.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (v && stream) v.srcObject = stream
  }, [stream])

  return (
    <AppShell variant="page">
      <PageHeader title="동영상 촬영" />

      <div className={styles.previewWrap}>
        <video ref={videoRef} className={styles.video} playsInline muted autoPlay />
        {!stream && !error ? <div className={styles.placeholder}>카메라 준비 중…</div> : null}
        {error ? <div className={styles.error}>{error}</div> : null}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.recordBtn} ${recording ? styles.recordBtnOn : ''}`}
          onClick={() => setRecording((r) => !r)}
          disabled={!stream}
        >
          {recording ? '촬영 중지 (데모)' : '촬영 시작 (데모)'}
        </button>
        <p className={styles.note}>
          실제 녹화·저장은 백엔드 연동 후 연결됩니다. 지금은 권한·미리보기만 확인할 수 있습니다. 개인정보가 수집될 수 있습니다.
        </p>
        <button type="button" className={styles.secondary} onClick={stopCamera}>
          카메라 끄기
        </button>
        <Link to="/" className={styles.homeLink}>
          메인으로
        </Link>
      </div>
    </AppShell>
  )
}
