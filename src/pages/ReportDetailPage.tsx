import { Link, useParams } from 'react-router-dom'
import styles from './ReportDetailPage.module.css'

const MOCK_REPORTS: Record<string, { title: string; status?: string; entries: { date: string; label: string; content: string }[] }> = {
  '1': {
    title: '보고서A',
    status: '초안 검수',
    entries: [
      { date: '2026-04-28', label: '실험 목적', content: '산화-환원 반응에서 온도 변화에 따른 반응 속도 차이를 측정한다.' },
      { date: '2026-04-28', label: '실험 재료', content: '과산화수소수(30%), KI 수용액, 증류수, 온도계, 비커, 스톱워치' },
      { date: '2026-04-29', label: '실험 과정', content: '① 과산화수소수 20ml를 비커에 담는다.\n② KI 수용액 5ml를 첨가 후 스톱워치를 작동한다.\n③ 기포 발생이 멈출 때까지 시간을 기록한다.' },
      { date: '2026-04-30', label: '결과 및 고찰', content: '온도가 10°C 상승할 때 반응 속도가 약 2배 빨라지는 것을 확인하였다. 이는 아레니우스 방정식으로 설명 가능하다.' },
    ],
  },
  '2': {
    title: '보고서B',
    status: '초안 제작 중...',
    entries: [
      { date: '2026-05-01', label: '실험 목적', content: '식물 잎의 기공 밀도와 광합성 효율의 상관관계를 관찰한다.' },
      { date: '2026-05-01', label: '실험 재료', content: '강낭콩, 시금치, 현미경, 표본 제작 도구, 광도계' },
      { date: '2026-05-02', label: '중간 관찰', content: '강낭콩 잎의 기공 밀도: 평균 180개/mm². 시금치: 평균 310개/mm². 데이터 추가 수집 중.' },
    ],
  },
  '3': {
    title: '보고서C',
    status: '최종본 제작 중...',
    entries: [
      { date: '2026-05-03', label: '실험 목적', content: '토양 pH에 따른 무 성장 속도 차이를 비교한다.' },
      { date: '2026-05-03', label: '실험 설계', content: 'pH 5, 6, 7, 8 네 가지 환경에서 동일 품종의 무를 4주간 재배한다.' },
      { date: '2026-05-06', label: '2주차 경과', content: 'pH 6~7 구간에서 가장 빠른 성장을 보임. pH 5 환경에서는 잎이 황변하는 현상 관찰됨.' },
    ],
  },
  '4': {
    title: '보고서D',
    status: '최종본 검수',
    entries: [
      { date: '2026-04-20', label: '실험 목적', content: '물의 전기분해 시 전압에 따른 수소 발생량 변화를 측정한다.' },
      { date: '2026-04-20', label: '실험 과정', content: '전해질 수용액에 전극을 삽입하고 3V, 6V, 9V 전압을 각각 인가하여 1분간 수소 포집량을 측정한다.' },
      { date: '2026-04-21', label: '결과', content: '전압 3V: 12ml, 6V: 25ml, 9V: 51ml. 전압과 발생량은 거의 선형 비례함을 확인.' },
      { date: '2026-04-22', label: '결론', content: '패러데이 법칙에 따라 전류량이 증가할수록 전기분해량도 비례하여 증가한다. 오차율 약 3.2%.' },
    ],
  },
  '5': {
    title: '보고서E',
    status: '최종본 검수',
    entries: [
      { date: '2026-04-25', label: '실험 목적', content: '다양한 금속의 이온화 경향을 실험으로 확인한다.' },
      { date: '2026-04-25', label: '실험 방법', content: 'Cu, Zn, Fe, Mg 금속 조각을 각각 황산구리 수용액에 담가 반응 여부를 관찰한다.' },
      { date: '2026-04-26', label: '결과 및 결론', content: 'Mg > Fe > Zn > Cu 순서의 이온화 경향을 실험으로 확인. 이론값과 일치함.' },
    ],
  },
  // ArchivePage entries
  'archive-1': {
    title: '보고서1',
    entries: [
      { date: '2026-03-10', label: '실험 목적', content: '비커 내 용액의 농도 변화에 따른 삼투압 현상을 관찰한다.' },
      { date: '2026-03-10', label: '결과', content: '고농도 용액에서 반투막을 통한 물의 이동이 명확히 관찰되었다.' },
      { date: '2026-03-11', label: '결론', content: '삼투압은 용질의 몰 농도에 비례하며 반트호프 법칙이 성립함을 확인.' },
    ],
  },
  'archive-2': {
    title: '보고서2',
    entries: [
      { date: '2026-03-18', label: '실험 목적', content: '산-염기 지시약의 색 변화 범위를 비교한다.' },
      { date: '2026-03-18', label: '결과', content: '리트머스, 페놀프탈레인, BTB 각각의 변색 pH 범위를 실험으로 확인하였다.' },
      { date: '2026-03-19', label: '결론', content: '지시약마다 변색 범위가 다르므로 적정 실험의 목적에 맞게 선택해야 한다.' },
    ],
  },
  'archive-3': {
    title: '보고서3',
    entries: [
      { date: '2026-03-25', label: '주제', content: '빛의 파장에 따른 광합성 속도 비교' },
      { date: '2026-03-25', label: '결과', content: '청색광(450nm)과 적색광(680nm)에서 산소 발생량이 최대였으며 녹색광(550nm)에서는 최소였다.' },
    ],
  },
  'archive-4': {
    title: '보고서4',
    entries: [
      { date: '2026-04-02', label: '주제', content: '효모의 발효 속도와 온도의 관계' },
      { date: '2026-04-03', label: '결과', content: '35~40°C 구간에서 CO₂ 발생량이 최대. 60°C 이상에서는 효소 변성으로 발효 중단.' },
    ],
  },
  'archive-5': {
    title: '보고서5',
    entries: [
      { date: '2026-04-10', label: '주제', content: '자유 낙하 운동에서 중력 가속도 측정' },
      { date: '2026-04-10', label: '결과', content: '측정값: 9.79 m/s². 이론값 9.81 m/s²와 오차율 0.2%.' },
    ],
  },
  'archive-6': {
    title: '보고서6',
    entries: [
      { date: '2026-04-18', label: '주제', content: '단진자의 주기와 실의 길이 관계' },
      { date: '2026-04-18', label: '결과', content: 'T = 2π√(L/g) 공식 검증. 실의 길이를 4배 늘리면 주기는 2배가 됨을 실험으로 확인.' },
    ],
  },
}

export function ReportDetailPage() {
  const { id = '' } = useParams()
  const report = MOCK_REPORTS[id]

  if (!report) {
    return (
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link to=".." className={styles.back}>‹</Link>
          <h1 className={styles.title}>보고서</h1>
        </header>
        <div className={styles.empty}>보고서를 찾을 수 없습니다.</div>
      </div>
    )
  }

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link to=".." className={styles.back}>‹</Link>
        <h1 className={styles.title}>{report.title}</h1>
        {report.status && <span className={styles.badge}>{report.status}</span>}
      </header>

      <main className={styles.content}>
        {report.entries.map((entry, i) => (
          <div key={i} className={styles.entry}>
            <div className={styles.entryMeta}>
              <span className={styles.entryLabel}>{entry.label}</span>
              <span className={styles.entryDate}>{entry.date}</span>
            </div>
            <p className={styles.entryContent}>{entry.content}</p>
          </div>
        ))}
      </main>
    </div>
  )
}
