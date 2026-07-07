import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Clock3,
  ExternalLink,
  Map,
  Radio,
  Route,
  Shield,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import {
  blitzkriegDefinition,
  commandComparison,
  commandFrame,
  levels,
  operationalArtBrief,
  operationalFrame,
  operationStart,
  outcomeFrame,
  outcomeTimeline,
  outcomes,
  readingRecommendation,
  thesis,
  timeline,
  type EventKind,
} from './data/presentation';

type PageNavItem = {
  id: string;
  page: number;
  label: string;
};

const kindStyles: Record<EventKind, { label?: string; className: string }> = {
  success: { className: 'border-field/70 bg-field/15 text-paper' },
  mistake: { label: '프랑스군 실책', className: 'border-signal/70 bg-signal/15 text-paper' },
  friction: { label: '기동의 병목', className: 'border-steel/70 bg-steel/15 text-paper' },
  command: { label: '국지 작전', className: 'border-paper/60 bg-paper/10 text-paper' },
};

function FadeIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-steel">
      <Icon size={16} />
      <span>{children}</span>
    </div>
  );
}

function SnapSection({
  id,
  children,
  className = '',
  pageNumber,
  totalPages,
  pageTone = 'dark',
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  pageNumber?: number;
  totalPages?: number;
  pageTone?: 'dark' | 'light';
}) {
  return (
    <section id={id} className={`snap-section relative ${className}`}>
      {pageNumber && totalPages ? (
        <div
          className={`pointer-events-none absolute right-5 top-20 z-20 border px-2.5 py-1 font-mono text-[0.68rem] font-bold tracking-[0.16em] sm:right-8 lg:right-12 ${
            pageTone === 'light'
              ? 'border-coal/25 bg-white/45 text-coal/70'
              : 'border-paper/15 bg-coal/55 text-paper/62 backdrop-blur'
          }`}
          aria-hidden="true"
        >
          {String(pageNumber).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
        </div>
      ) : null}
      {children}
    </section>
  );
}

function PageNav({ items, totalPages }: { items: PageNavItem[]; totalPages: number }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const bestEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (bestEntry?.target.id) {
          setActiveId(bestEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0.1, 0.35, 0.6],
      },
    );

    items.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const button = document.getElementById(`page-nav-${activeId}`);
    button?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [activeId]);

  const jumpToSection = (item: PageNavItem) => {
    setActiveId(item.id);
    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!activeItem) {
    return null;
  }

  return (
    <nav
      aria-label="페이지 이동"
      className="fixed left-1/2 top-3 z-50 w-[min(calc(100vw-1rem),72rem)] -translate-x-1/2 border border-paper/14 bg-coal/82 px-2.5 py-2 shadow-2xl shadow-black/35 backdrop-blur-md sm:top-4 sm:px-3"
    >
      <div className="grid gap-2 md:grid-cols-[minmax(12rem,18rem)_1fr] md:items-center">
        <div className="min-w-0 border-b border-paper/10 pb-2 md:border-b-0 md:border-r md:pb-0 md:pr-3">
          <div className="font-mono text-[0.65rem] font-black uppercase tracking-[0.22em] text-steel">
            Page {String(activeItem.page).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
          </div>
          <div className="mt-1 truncate text-sm font-black text-paper">{activeItem.label}</div>
        </div>

        <div className="page-nav-scroll flex gap-1.5 overflow-x-auto pb-0.5" role="list">
          {items.map((item) => {
            const isActive = item.id === activeItem.id;
            return (
              <button
                id={`page-nav-${item.id}`}
                key={item.id}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                title={item.label}
                onClick={() => jumpToSection(item)}
                className={`h-8 min-w-8 shrink-0 border px-2 font-mono text-xs font-black transition focus:outline-none focus:ring-2 focus:ring-field/70 ${
                  isActive
                    ? 'border-field/80 bg-field/28 text-white'
                    : 'border-paper/14 bg-paper/[0.045] text-paper/58 hover:border-paper/35 hover:bg-paper/10 hover:text-paper'
                }`}
              >
                {String(item.page).padStart(2, '0')}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function CommandPrinciplesSection({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) {
  return (
    <SnapSection id="command-principles" pageNumber={pageNumber} totalPages={totalPages} className="flex items-center px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[96rem]">
        <FadeIn>
          <SectionLabel icon={Workflow}>승리 원인 분석</SectionLabel>
          <h2 className="max-w-5xl text-3xl font-black text-white sm:text-5xl">
            임무형 지휘 vs 명령형 전술
          </h2>
          <p className="mt-6 text-lg leading-8 text-paper/75 lg:whitespace-nowrap">
            {commandFrame.body}
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {commandComparison.map((side, sideIndex) => (
            <FadeIn
              key={side.force}
              className={`border p-5 sm:p-6 ${
                sideIndex === 0 ? 'border-sky-700/55 bg-sky-950/25' : 'border-signal/50 bg-signal/10'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-paper/12 pb-5">
                <div>
                  <div className={`font-mono text-xs uppercase tracking-[0.22em] ${sideIndex === 0 ? 'text-sky-300/75' : 'text-signal'}`}>
                    {side.mode}
                  </div>
                  <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">{side.force}</h3>
                </div>
                <div
                  className={`border px-2 py-1 text-xs font-bold uppercase tracking-[0.18em] ${
                    sideIndex === 0 ? 'border-sky-500/35 text-sky-200/80' : 'border-signal/45 text-signal'
                  }`}
                >
                  지휘 원칙
                </div>
              </div>
              <p className="mt-5 text-xl font-black leading-8 text-white">{side.title}</p>
              <p className="mt-3 leading-7 text-paper/70">{side.summary}</p>

              <div className="mt-6 grid gap-3">
                {side.principles.map((principle) => (
                  <div key={principle.label} className="grid gap-2 border-t border-paper/10 pt-3 sm:grid-cols-[8.5rem_1fr]">
                    <div
                      className={`font-mono text-xs font-bold uppercase tracking-[0.16em] ${
                        sideIndex === 0 ? 'text-sky-300/75' : 'text-signal'
                      }`}
                    >
                      {principle.label}
                    </div>
                    <p className="leading-7 text-paper/76">{principle.body}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-8 grid gap-4 border border-paper/12 bg-paper/[0.045] p-5 md:grid-cols-[auto_1fr] md:items-start">
          <Workflow className="mt-1 text-field" size={24} />
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.22em] text-field">Interpretation</div>
            <p className="mt-3 text-lg font-semibold leading-8 text-paper/82">{commandFrame.note}</p>
          </div>
        </FadeIn>
      </div>
    </SnapSection>
  );
}

function ReadingRecommendationSection({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) {
  return (
    <SnapSection
      id="reading"
      pageNumber={pageNumber}
      totalPages={totalPages}
      className="flex items-center border-t border-paper/10 bg-[#111313] px-5 py-12 sm:px-8 lg:px-12"
    >
      <div className="mx-auto grid w-full max-w-[96rem] gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
        <FadeIn className="flex justify-center lg:justify-start">
          <div className="grid w-full max-w-[28rem] gap-4">
            <div className="border border-paper/12 bg-black/28 p-4">
              <img
                src={readingRecommendation.book.image}
                alt={`${readingRecommendation.book.title} 표지`}
                className="mx-auto max-h-[58svh] w-auto max-w-full border border-white/18 object-contain"
              />
            </div>
            <a
              href={readingRecommendation.book.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-field/55 bg-field/12 px-4 py-3 text-sm font-black text-paper transition hover:bg-field/20"
            >
              알라딘에서 보기
              <ExternalLink size={16} />
            </a>
          </div>
        </FadeIn>

        <FadeIn>
          <SectionLabel icon={BookOpen}>{readingRecommendation.kicker}</SectionLabel>
          <div className="font-mono text-sm font-black uppercase tracking-[0.22em] text-steel">
            Further reading
          </div>
          <h2 className="mt-4 max-w-5xl text-3xl font-black leading-tight text-white sm:text-5xl">
            {readingRecommendation.title}
          </h2>

          <div className="mt-7 border border-paper/12 bg-paper/[0.045] p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-paper/10 pb-5">
              <h3 className="text-3xl font-black text-white sm:text-4xl">{readingRecommendation.book.title}</h3>
              <div className="text-lg font-semibold text-paper/68">{readingRecommendation.book.author}</div>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-steel">
              <span>{readingRecommendation.book.translator}</span>
              <span>{readingRecommendation.book.publisher}</span>
              <span>{readingRecommendation.book.published}</span>
            </div>
            <p className="mt-5 text-xl font-semibold leading-8 text-paper/82">{readingRecommendation.reason}</p>
          </div>

          <div className="mt-5 grid gap-3">
            {readingRecommendation.points.map((point) => (
              <div key={point.label} className="grid gap-3 border border-paper/12 bg-black/18 p-4 sm:grid-cols-[8rem_1fr] sm:p-5">
                <div className="font-mono text-xs font-black uppercase tracking-[0.18em] text-field">{point.label}</div>
                <p className="font-semibold leading-7 text-paper/74">{point.body}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </SnapSection>
  );
}

export function App() {
  const fixedOpeningPages = 5;
  const totalPages = fixedOpeningPages + timeline.length + 3;
  const pageNavItems = useMemo<PageNavItem[]>(
    () => [
      { id: 'intro', page: 1, label: '제목' },
      { id: 'definition', page: 2, label: '전격전의 정의' },
      { id: 'framework', page: 3, label: '전략·작전술·전술' },
      { id: 'cannae-sichelschnitt', page: 4, label: '칸나이와 지헬슈니트' },
      { id: 'operation-start', page: 5, label: '제1기갑사단 기동 시작' },
      ...timeline.map((event, index) => ({
        id: `event-${event.id}`,
        page: fixedOpeningPages + index + 1,
        label: event.title,
      })),
      {
        id: 'command-principles',
        page: fixedOpeningPages + timeline.length + 1,
        label: '임무형 지휘와 명령형 전술',
      },
      {
        id: 'outcome',
        page: fixedOpeningPages + timeline.length + 2,
        label: '돌파 이후의 결과',
      },
      { id: 'reading', page: totalPages, label: '추천 독서' },
    ],
    [fixedOpeningPages, totalPages],
  );

  return (
    <main className="bg-coal text-paper">
      <PageNav items={pageNavItems} totalPages={totalPages} />

      <SnapSection id="intro" pageNumber={1} totalPages={totalPages} className="flex items-center overflow-hidden px-5 py-10 sm:px-8 lg:px-12">
        <div className="absolute inset-0">
          <img src="/content/Sichelschnitt.jpg" alt="" className="h-full w-full object-cover opacity-35 grayscale" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(214,200,170,0.18),transparent_32%),linear-gradient(90deg,rgba(16,17,17,0.96),rgba(16,17,17,0.72),rgba(16,17,17,0.9))]" />
          <div className="absolute inset-0 tactical-grid opacity-35" />
        </div>

        <div className="relative z-10 w-full max-w-[96rem] -translate-y-8 sm:-translate-y-12 lg:-translate-y-16">
          <FadeIn>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-steel">{thesis.kicker}</p>
            <h1 className="max-w-full whitespace-nowrap text-[clamp(2.6rem,8vw,7rem)] font-black leading-[1.02] text-paper">
              {thesis.title}
            </h1>
          </FadeIn>
        </div>
      </SnapSection>

      <SnapSection id="definition" pageNumber={2} totalPages={totalPages} className="flex items-center border-b border-paper/10 bg-paper/[0.035] px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-[96rem] gap-6">
          <FadeIn>
            <SectionLabel icon={Radio}>배경과 용어</SectionLabel>
            <div className="grid gap-5 border border-paper/12 bg-black/25 p-5 sm:p-6 lg:grid-cols-[0.45fr_1fr] lg:items-center">
              <div>
                <div className="font-mono text-sm uppercase tracking-[0.22em] text-steel">{blitzkriegDefinition.english}</div>
                <div className="mt-3 flex flex-wrap items-end gap-x-3 gap-y-1">
                  <div className="text-4xl font-black text-white sm:text-5xl">{blitzkriegDefinition.term}</div>
                  <div className="pb-1 text-xl font-bold text-paper/70">({blitzkriegDefinition.korean})</div>
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold leading-8 text-paper/88">{blitzkriegDefinition.description}</p>
                <p className="mt-3 leading-8 text-paper/68">{blitzkriegDefinition.scope}</p>
              </div>
            </div>
          </FadeIn>

        </div>
      </SnapSection>

      <SnapSection id="framework" pageNumber={3} totalPages={totalPages} className="flex items-center px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-[96rem] gap-8">
          <FadeIn className="overflow-hidden border border-paper/12 bg-black/25">
            <div className="border-b border-paper/10 px-5 py-4 sm:px-6">
              <div className="font-mono text-xs uppercase tracking-[0.22em] text-steel">Terms for reading</div>
              <p className="mt-2 text-xl font-black text-white">전략, 작전술, 전술의 구분</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1120px] table-fixed border-collapse text-left">
                <thead>
                  <tr className="border-b border-paper/10 text-sm text-paper/65">
                    <th className="w-[9%] px-5 py-4 font-bold sm:px-6">구분</th>
                    <th className="w-[15%] px-5 py-4 font-bold sm:px-6">영어 표현</th>
                    <th className="w-[26%] px-5 py-4 font-bold sm:px-6">초점</th>
                    <th className="w-[14%] px-5 py-4 font-bold sm:px-6">대표 범위</th>
                    <th className="px-5 py-4 font-bold sm:px-6">기업 비유</th>
                  </tr>
                </thead>
                <tbody>
                  {levels.map((level) => (
                    <tr key={level.label} className="border-b border-paper/10 last:border-b-0">
                      <td className="whitespace-nowrap px-5 py-5 text-xl font-black text-white sm:px-6">{level.label}</td>
                      <td className="whitespace-nowrap px-5 py-5 font-mono text-sm text-steel sm:px-6">{level.english}</td>
                      <td className="whitespace-nowrap px-5 py-5 font-semibold text-paper/88 sm:px-6">{level.focus}</td>
                      <td className="whitespace-nowrap px-5 py-5 font-semibold text-paper/65 sm:px-6">
                        {level.action}
                      </td>
                      <td className="px-5 py-5 leading-7 text-paper/72 sm:px-6">{level.analogy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          <FadeIn>
            <SectionLabel icon={Shield}>{operationalFrame.kicker}</SectionLabel>
            <h2 className="max-w-full whitespace-nowrap text-3xl font-black leading-tight text-white sm:text-5xl">
              {operationalFrame.title}
            </h2>
            <div className="mt-6 max-w-5xl space-y-2 text-lg leading-8 text-paper/75">
              {operationalFrame.bodyLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </FadeIn>

          <div className="grid gap-4 lg:grid-cols-2">
            {operationalFrame.reasons.map((reason) => (
              <FadeIn key={reason.label} className="border border-paper/12 bg-paper/[0.045] p-5">
                <div className="mb-4 inline-flex items-center gap-2 border border-signal/45 px-2 py-1 text-xs font-bold uppercase tracking-[0.18em] text-signal">
                  <AlertTriangle size={14} />
                  {reason.label}
                </div>
                <h3 className="text-xl font-black leading-7 text-white">{reason.title}</h3>
                <p className="mt-4 leading-7 text-paper/70">{reason.body}</p>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="grid gap-4 border border-field/35 bg-field/10 p-5 md:grid-cols-[auto_1fr] md:items-start">
            <ArrowRight className="mt-1 text-field" size={24} />
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.22em] text-field">Operational answer</div>
              <p className="mt-3 text-lg font-semibold leading-8 text-paper/82">{operationalFrame.conclusion}</p>
            </div>
          </FadeIn>
        </div>
      </SnapSection>

      <SnapSection id="cannae-sichelschnitt" pageNumber={4} totalPages={totalPages} className="flex items-center px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
        <div className="mx-auto grid w-full max-w-[116rem] gap-4">
          <FadeIn className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <SectionLabel icon={Map}>{operationalArtBrief.kicker}</SectionLabel>
              <h2 className="max-w-6xl text-3xl font-black leading-tight text-white sm:text-4xl xl:text-5xl">
                {operationalArtBrief.title}
              </h2>
              <p className="mt-3 max-w-5xl text-base leading-7 text-paper/75 xl:text-lg xl:leading-8">{operationalArtBrief.summary}</p>
            </div>
            <div className="grid grid-cols-3 border border-paper/12 bg-black/25">
              {operationalArtBrief.steps.map((step, index) => (
                <div key={step} className="border-r border-paper/10 px-3 py-2.5 text-center last:border-r-0">
                  <div className="font-mono text-xs font-bold text-steel">{String(index + 1).padStart(2, '0')}</div>
                  <div className="mt-1 whitespace-nowrap text-sm font-black text-paper/82">{step}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          <div className="grid gap-5 lg:grid-cols-2">
            {operationalArtBrief.frames.map((frame) => (
              <FadeIn key={frame.label} className="grid overflow-hidden border border-paper/12 bg-paper/[0.045]">
                <div className="border-b border-paper/10 p-3 xl:p-4">
                  <div className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-field">
                    <Route size={14} />
                    {frame.label}
                  </div>
                  <h3 className="text-lg font-black leading-tight text-white sm:text-xl xl:text-2xl">{frame.title}</h3>
                </div>
                <div className="flex h-[58svh] min-h-[440px] items-center justify-center p-2 sm:p-3 xl:h-[62svh] xl:min-h-[520px]">
                  <img src={frame.image} alt="" className="max-h-full max-w-full border border-white/18 object-contain" />
                </div>
                <p className="border-t border-paper/10 p-3 text-sm font-semibold leading-6 text-paper/72 xl:p-4 xl:text-base xl:leading-7">
                  {frame.body}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </SnapSection>

      <SnapSection id="operation-start" pageNumber={5} totalPages={totalPages} className="flex items-center px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
        <div className="mx-auto grid w-full max-w-[116rem] gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <FadeIn className="order-2 flex items-center justify-center lg:order-1">
            <img
              src={operationStart.image}
              alt=""
              className="max-h-[54svh] min-h-[280px] max-w-full border border-white/18 object-contain lg:max-h-[74svh]"
            />
          </FadeIn>

          <FadeIn className="order-1 lg:order-2">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center border border-paper/25 font-mono text-sm text-paper/75">
                01
              </span>
              <span className="border border-field/70 bg-field/15 px-2 py-1 text-xs font-semibold text-paper">기동 시작</span>
            </div>
            <div className="font-mono text-2xl font-black leading-none text-steel sm:text-3xl xl:text-4xl">
              {operationStart.date}
              <span className="ml-4 text-paper/78">{operationStart.time}</span>
            </div>
            <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-5xl xl:text-6xl">
              {operationStart.title}
            </h2>
            <p className="mt-6 text-xl font-semibold leading-8 text-paper/82">{operationStart.summary}</p>
            <div className="mt-7 grid gap-3">
              {operationStart.notes.map((note) => (
                <div key={note} className="border-l-2 border-field/70 bg-paper/[0.045] px-4 py-3 text-base font-semibold leading-7 text-paper/76">
                  {note}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </SnapSection>

      {timeline.map((event, index) => {
        const style = kindStyles[event.kind];
        const sequence = event.sequence;
        const isMouzaive = event.id === 'mouzaive';
        const isLargeMapEvent = ['mouzaive', 'sedan-misread', 'sedan-crossing', 'laubert'].includes(event.id);
        const isGhostTanks = event.id === 'ghost-tanks';
        const isDenseTextEvent = event.id === 'bulson';
        const hasVideo = Boolean(event.youtubeId);
        const isMapEvent = event.imageTone === 'map';
        const imageGridColumns = hasVideo
          ? 'lg:grid-cols-[minmax(0,1.08fr)_minmax(26rem,0.92fr)]'
          : isGhostTanks
            ? 'lg:grid-cols-[minmax(0,1fr)_minmax(28rem,1fr)]'
          : isLargeMapEvent
            ? 'lg:grid-cols-[minmax(0,1.35fr)_minmax(32rem,0.65fr)]'
          : isMouzaive
          ? 'lg:grid-cols-[minmax(0,1fr)_minmax(28rem,1fr)]'
          : isMapEvent
            ? 'lg:grid-cols-[minmax(0,1fr)_minmax(28rem,1fr)]'
            : sequence || event.analysisBlocks
              ? 'lg:grid-cols-[0.72fr_1.28fr]'
              : 'lg:grid-cols-[1.25fr_0.75fr]';
        const imageSizeClass = isGhostTanks
          ? 'h-[66svh] min-h-[360px] w-auto max-w-full sm:h-[74svh] lg:h-[94svh]'
          : isLargeMapEvent
            ? 'max-h-[72svh] w-auto max-w-full sm:max-h-[88svh] lg:max-h-[calc(100svh-4px)]'
            : `max-h-[56svh] min-h-[280px] max-w-full ${isMouzaive ? 'lg:max-h-[92svh]' : isMapEvent ? 'lg:max-h-[94svh]' : 'lg:max-h-[74svh]'}`;
        const layoutGap = isLargeMapEvent ? 'gap-3 xl:gap-4' : isMapEvent ? 'gap-4 xl:gap-5' : 'gap-6';
        const containerMaxWidth = hasVideo || isLargeMapEvent ? 'max-w-none' : 'max-w-[116rem]';
        const imageAlignment = 'lg:justify-center';
        const sectionPadding = hasVideo
          ? 'px-3 py-3 sm:px-4 sm:py-4 lg:px-5 xl:px-6'
          : isLargeMapEvent
            ? 'px-1 py-0 sm:px-2 lg:px-3 xl:px-4'
            : 'px-4 py-8 sm:px-6 lg:px-8 xl:px-10';
        return (
          <SnapSection
            key={event.id}
            id={`event-${event.id}`}
            pageNumber={fixedOpeningPages + index + 1}
            totalPages={totalPages}
            className={`flex items-center ${sectionPadding}`}
          >
            <div className={`mx-auto grid w-full ${containerMaxWidth} ${layoutGap} lg:items-center ${imageGridColumns}`}>
              <FadeIn className={`order-2 flex items-center justify-center lg:order-1 ${imageAlignment}`}>
                {event.youtubeId ? (
                  <div className="w-full border border-white/18 bg-black/35">
                    <iframe
                      className="aspect-video w-full"
                      src={`https://www.youtube.com/embed/${event.youtubeId}`}
                      title={`${event.title} 영상`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                ) : event.image ? (
                  <img
                    src={event.image}
                    alt=""
                    className={`border border-white/18 object-contain ${imageSizeClass}`}
                  />
                ) : (
                  <div className="flex h-[56svh] min-h-[340px] w-full items-center justify-center tactical-grid bg-black/20 lg:h-[74svh]">
                    <Clock3 className="text-steel" size={80} strokeWidth={1.2} />
                  </div>
                )}
              </FadeIn>

              <FadeIn className="order-1 lg:order-2">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center border border-paper/25 font-mono text-sm text-paper/75">
                    {String(index + 2).padStart(2, '0')}
                  </span>
                  {style.label ? (
                    <span className={`border px-2 py-1 text-xs font-semibold ${style.className}`}>{style.label}</span>
                  ) : null}
                </div>
                {event.showDate === false ? null : (
                  <div className="font-mono text-xl font-black leading-tight text-steel sm:text-2xl xl:text-3xl">
                    {event.date}
                    {event.time ? <span className="ml-4 text-paper/70">{event.time}</span> : null}
                  </div>
                )}
                <h3
                  className={`${event.showDate === false ? 'mt-0' : 'mt-5'} font-black leading-tight text-white ${
                    isDenseTextEvent ? 'text-3xl sm:text-4xl' : 'text-3xl sm:text-5xl'
                  }`}
                >
                  {event.title}
                </h3>
                <p
                  className={`mt-6 text-paper/82 ${
                    isDenseTextEvent
                      ? 'text-lg font-semibold leading-7 xl:text-xl xl:leading-8'
                      : sequence || event.analysisBlocks
                        ? 'text-2xl font-semibold leading-8'
                        : 'text-xl leading-8'
                  }`}
                >
                  {event.summary}
                </p>
                {sequence ? (
                  <div className="mt-7 border border-paper/12 bg-paper/[0.035] p-4 sm:p-5 xl:p-6">
                    <ol className={isDenseTextEvent ? 'space-y-2.5' : 'space-y-3'}>
                      {sequence.map((item, itemIndex) => {
                        const isTurningPoint = item.side === 'turning-point';
                        return (
                          <li key={`${item.time}-${item.title}`} className="relative grid grid-cols-[4.1rem_1fr] gap-4 sm:grid-cols-[4.85rem_1fr]">
                            <div
                              className={`${isDenseTextEvent ? 'pt-3 text-xs sm:text-sm' : 'pt-4 text-sm sm:text-base'} text-right font-mono font-black ${
                                isTurningPoint ? 'text-signal' : 'text-steel'
                              }`}
                            >
                              {item.time}
                            </div>
                            <div
                              className={`relative border ${isDenseTextEvent ? 'p-3 xl:p-3.5' : 'p-4'} ${
                                isTurningPoint
                                  ? 'border-signal/60 bg-signal/13'
                                  : itemIndex === sequence.length - 1
                                    ? 'border-paper/18 bg-black/20'
                                    : 'border-paper/12 bg-black/18'
                              }`}
                            >
                              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                <h5 className={`${isDenseTextEvent ? 'text-base xl:text-lg' : 'text-lg xl:text-xl'} font-black leading-7 text-white`}>{item.title}</h5>
                                {isTurningPoint ? (
                                  <span className="border border-signal/55 px-2 py-0.5 text-xs font-bold text-signal">
                                    {item.badge ?? '과대평가'}
                                  </span>
                                ) : null}
                              </div>
                              <p
                                className={`mt-2 font-semibold text-paper/76 ${
                                  isDenseTextEvent ? 'text-sm leading-6 xl:text-base xl:leading-7' : 'text-base leading-7 xl:text-lg xl:leading-8'
                                }`}
                              >
                                {item.body}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                ) : null}
                {event.analysisBlocks ? (
                  <div className={`mt-7 grid gap-4 ${!isMouzaive && event.analysisBlocks.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                    {event.analysisBlocks.map((block, blockIndex) => (
                      <div key={block.label} className="grid gap-4 border border-paper/12 bg-paper/[0.045] p-5 xl:p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-signal/55 bg-signal/15 font-mono text-xl font-black text-signal">
                            {blockIndex + 1}
                          </div>
                          <div>
                            <div className="font-mono text-sm font-black text-steel">{block.label}</div>
                            <h4 className="mt-1 text-xl font-black leading-7 text-white xl:text-2xl">{block.title}</h4>
                          </div>
                        </div>
                        <ul className="space-y-2.5">
                          {block.points.map((point) => (
                            <li key={point} className="flex gap-3 text-base font-semibold leading-7 text-paper/76 xl:text-lg xl:leading-8">
                              <span className="mt-3 h-1.5 w-1.5 shrink-0 bg-field" aria-hidden="true" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}
                {event.detail ? <p className="mt-5 leading-7 text-paper/62">{event.detail}</p> : null}
              </FadeIn>
            </div>
          </SnapSection>
        );
      })}

      <CommandPrinciplesSection pageNumber={fixedOpeningPages + timeline.length + 1} totalPages={totalPages} />

      <SnapSection
        id="outcome"
        pageNumber={fixedOpeningPages + timeline.length + 2}
        totalPages={totalPages}
        className="flex items-center border-t border-paper/10 bg-coal px-5 py-12 sm:px-8 lg:px-12"
      >
        <div className="mx-auto grid w-full max-w-[96rem] gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <FadeIn className="min-w-0">
            <SectionLabel icon={Radio}>{outcomeFrame.kicker}</SectionLabel>
            <h2 className="max-w-4xl text-3xl font-black text-white sm:text-5xl">{outcomeFrame.title}</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-paper/74">
              {outcomeFrame.body}
            </p>

            <div className="mt-8 border border-paper/12 bg-paper/[0.035] p-4 sm:p-5">
              <ol className="list-none space-y-3 pl-0">
                {outcomeTimeline.map((item, index) => (
                  <li key={item.date} className="grid list-none grid-cols-[7.5rem_1fr] gap-4 sm:grid-cols-[9rem_1fr]">
                    <div className="pt-4 text-right font-mono text-sm font-black text-steel sm:text-base">
                      {item.date}
                    </div>
                    <div className="relative border border-paper/12 bg-black/18 p-4">
                      {index < outcomeTimeline.length - 1 ? (
                        <div className="absolute -left-[0.78rem] top-9 h-[calc(100%+0.75rem)] w-px bg-paper/14" aria-hidden="true" />
                      ) : null}
                      <h3 className="text-lg font-black leading-7 text-white">{item.title}</h3>
                      <p className="mt-2 text-sm font-semibold leading-6 text-paper/72 sm:text-base sm:leading-7">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <FadeIn className="sm:col-span-3 lg:col-span-1">
              <div className="font-mono text-xs font-black uppercase tracking-[0.22em] text-field">{outcomeFrame.note}</div>
            </FadeIn>
            {outcomes.map((item, index) => (
              <FadeIn key={item.label} className="border border-paper/12 bg-paper/[0.045] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4 border-b border-paper/10 pb-4">
                  <div className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-field">
                    Result {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="h-1.5 w-10 bg-field/75" aria-hidden="true" />
                </div>
                <div className="mt-6 text-4xl font-black text-white sm:text-5xl">{item.value}</div>
                <div className="mt-3 text-base font-semibold leading-7 text-paper/66">{item.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </SnapSection>

      <ReadingRecommendationSection pageNumber={totalPages} totalPages={totalPages} />

      <footer className="snap-end border-t border-paper/10 px-5 py-8 text-sm text-paper/50 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[96rem] items-center gap-2">
          <AlertTriangle size={15} />
          <span>역사적 사건을 분석하기 위한 발표 자료이며, 전쟁이나 특정 이념을 미화하지 않습니다.</span>
        </div>
      </footer>
    </main>
  );
}
