import { Link } from 'react-router-dom'
import type { FinalReport } from '../types/report'
import styles from '../pages/ReportDetailPage.module.css'

function VerticalLabel({ text }: { text: string }) {
  return (
    <td className={styles.vLabel}>
      {text.split('').map((ch, i) => (
        <span key={i}>{ch}</span>
      ))}
    </td>
  )
}

interface Props {
  report: FinalReport | undefined
  backTo: string
}

export function ReportDetailView({ report, backTo }: Props) {
  if (!report) {
    return (
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link to={backTo} className={styles.back}>‹</Link>
          <h1 className={styles.title}>보고서</h1>
          <span className={styles.headerRight} />
        </header>
        <div className={styles.empty}>보고서를 찾을 수 없습니다.</div>
      </div>
    )
  }

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link to={backTo} className={styles.back}>‹</Link>
        <h1 className={styles.title}>{report.title}</h1>
        <button className={styles.downloadBtn} aria-label="다운로드">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
      </header>

      <main className={styles.content}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td className={styles.hLabel}>소 속</td>
                <td className={styles.hValue}>{report.소속}</td>
                <td className={styles.hLabel}>학번</td>
                <td className={styles.hValue}>{report.학번}</td>
                <td className={styles.hLabel}>이름</td>
                <td className={styles.hValue}>{report.이름}</td>
              </tr>
              <tr>
                <td className={styles.hLabel}>실험 날짜</td>
                <td colSpan={3} className={styles.hValue}>{report.실험날짜}</td>
                <td className={styles.hLabel}>현미경번호</td>
                <td className={styles.hValue}>{report.현미경번호}</td>
              </tr>
              <tr>
                <VerticalLabel text="실험제목" />
                <td colSpan={5} className={styles.sectionValue}>{report.실험제목}</td>
              </tr>
              <tr>
                <VerticalLabel text="실험목적" />
                <td colSpan={5} className={styles.sectionValue}>
                  {report.실험목적.map((p, i) => (
                    <div key={i} className={styles.bulletRow}>●{p}</div>
                  ))}
                </td>
              </tr>
              <tr>
                <VerticalLabel text="준비물" />
                <td colSpan={5} className={styles.sectionValue}>
                  {report.준비물.join(', ')}
                </td>
              </tr>
              <tr>
                <VerticalLabel text="실험방법" />
                <td colSpan={5} className={styles.sectionValue}>
                  <pre className={styles.pre}>{report.실험방법}</pre>
                </td>
              </tr>
              <tr>
                <VerticalLabel text="유의사항" />
                <td colSpan={5} className={styles.sectionValue}>
                  {report.유의사항.map((n, i) => (
                    <div key={i} className={styles.noteRow}>– {n}</div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
