import { Link, useParams } from 'react-router-dom'
import styles from './ReportDetailPage.module.css'

interface FinalReport {
  title: string
  소속: string
  학번: string
  이름: string
  실험날짜: string
  현미경번호: string
  실험제목: string
  실험목적: string[]
  준비물: string[]
  실험방법: string
  유의사항: string[]
}

const MOCK_REPORTS: Record<string, FinalReport> = {
  'archive-1': {
    title: '보고서1',
    소속: '',
    학번: '',
    이름: '',
    실험날짜: '2026-03-10',
    현미경번호: '',
    실험제목: '삼투압 현상 관찰',
    실험목적: ['비커 내 용액의 농도 변화에 따른 삼투압 현상을 관찰한다.'],
    준비물: ['반투막', '설탕 용액', '증류수', '비커', '눈금자'],
    실험방법: `1)반투막에 고농도 설탕 용액을 넣어 봉한다.

2)증류수가 담긴 비커에 반투막을 넣는다.

3)30분 간격으로 수위 변화를 관찰·기록한다.`,
    유의사항: ['반투막에 구멍이 나지 않도록 주의한다.'],
  },
  'archive-2': {
    title: '보고서2',
    소속: '',
    학번: '',
    이름: '',
    실험날짜: '2026-03-18',
    현미경번호: '',
    실험제목: '산-염기 지시약의 색 변화 범위 비교',
    실험목적: ['산-염기 지시약의 색 변화 범위를 비교한다.'],
    준비물: ['리트머스', '페놀프탈레인', 'BTB', '다양한 pH 표준액', '시험관'],
    실험방법: `1)각 지시약을 시험관에 분취한다.

2)다양한 pH의 표준액을 한 방울씩 첨가한다.

3)색 변화 구간을 기록한다.`,
    유의사항: ['지시약 첨가 시 정확한 양을 사용한다.'],
  },
  'archive-3': {
    title: '보고서3',
    소속: '',
    학번: '',
    이름: '',
    실험날짜: '2026-03-25',
    현미경번호: '',
    실험제목: '빛의 파장에 따른 광합성 속도 비교',
    실험목적: ['빛의 파장(색)에 따른 광합성 속도 차이를 측정한다.'],
    준비물: ['수초(엘로데아)', '색 필터(청·녹·적)', '광량계', '산소 측정 장치'],
    실험방법: `1)수초를 물에 넣고 색 필터를 교체하며 빛을 조사한다.

2)각 파장별 산소 발생량을 측정한다.

3)파장과 광합성 속도의 관계를 분석한다.`,
    유의사항: ['광원과 수초의 거리를 동일하게 유지한다.'],
  },
  'archive-4': {
    title: '보고서4',
    소속: '',
    학번: '',
    이름: '',
    실험날짜: '2026-04-02',
    현미경번호: '',
    실험제목: '효모의 발효 속도와 온도의 관계',
    실험목적: ['온도 변화에 따른 효모의 발효 속도를 측정한다.'],
    준비물: ['효모', '설탕 용액', '온도계', 'CO₂ 포집 장치', '수조'],
    실험방법: `1)설탕 용액에 효모를 첨가한다.

2)각 온도(20·35·45·60°C) 수조에 각각 보관한다.

3)10분 단위로 CO₂ 발생량을 측정한다.`,
    유의사항: ['온도 유지를 위해 뚜껑을 열지 않는다.'],
  },
  'archive-5': {
    title: '보고서5',
    소속: '',
    학번: '',
    이름: '',
    실험날짜: '2026-04-10',
    현미경번호: '',
    실험제목: '자유 낙하 운동에서 중력 가속도 측정',
    실험목적: ['자유 낙하 실험을 통해 중력 가속도를 측정한다.'],
    준비물: ['쇠구슬', '낙하 측정 장치', '타이머', '자'],
    실험방법: `1)일정 높이에서 쇠구슬을 낙하시킨다.

2)낙하 시간을 측정한다.

3)h = ½gt² 식으로 g를 계산한다.

4)이론값(9.81 m/s²)과 비교한다.`,
    유의사항: ['바람이 없는 실내에서 실험한다.'],
  },
  'archive-6': {
    title: '보고서6',
    소속: '',
    학번: '',
    이름: '',
    실험날짜: '2026-04-18',
    현미경번호: '',
    실험제목: '단진자의 주기와 실의 길이 관계',
    실험목적: ['단진자의 주기와 실의 길이 관계를 실험으로 확인한다.'],
    준비물: ['추', '실', '각도기', '스톱워치', '스탠드'],
    실험방법: `1)실의 길이를 25, 50, 100, 200cm로 설정한다.

2)각 길이에서 10회 왕복 시간을 측정한다.

3)주기를 계산하고 T = 2π√(L/g)와 비교한다.`,
    유의사항: ['진폭을 10° 이하로 유지한다.'],
  },
}

function VerticalLabel({ text }: { text: string }) {
  return (
    <td className={styles.vLabel}>
      {text.split('').map((ch, i) => (
        <span key={i}>{ch}</span>
      ))}
    </td>
  )
}

export function ReportDetailPage() {
  const { id = '' } = useParams()
  const report = MOCK_REPORTS[id]

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link to="/archive" className={styles.back}>‹</Link>
        <h1 className={styles.title}>{report?.title ?? '보고서'}</h1>
        {report ? (
          <button className={styles.downloadBtn} aria-label="다운로드">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        ) : (
          <span className={styles.headerRight} />
        )}
      </header>

      {!report ? (
        <div className={styles.empty}>보고서를 찾을 수 없습니다.</div>
      ) : (
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
      )}
    </div>
  )
}
