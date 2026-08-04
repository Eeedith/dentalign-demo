"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

type Role = "patient" | "clinician";
type PageId =
  | "PT-01"
  | "PT-02"
  | "PT-03"
  | "PT-04"
  | "PT-05"
  | "PT-06"
  | "DR-01"
  | "DR-02"
  | "DR-03"
  | "DR-04"
  | "DR-05"
  | "DR-06";
type Tone = "info" | "success" | "warning" | "danger" | "purple" | "neutral";

const pageIds: PageId[] = [
  "PT-01",
  "PT-02",
  "PT-03",
  "PT-04",
  "PT-05",
  "PT-06",
  "DR-01",
  "DR-02",
  "DR-03",
  "DR-04",
  "DR-05",
  "DR-06",
];

const pageMeta: Record<
  PageId,
  { title: string; subtitle: string; phase: string; status?: string; tone?: Tone }
> = {
  "PT-01": {
    title: "Patient Home",
    subtitle: "All phases · Current: Preparation",
    phase: "Overview",
    status: "Preparation",
    tone: "info",
  },
  "PT-02": {
    title: "Condition & Treatment Explanation",
    subtitle: "Tooth #30 · Dentist-reviewed version",
    phase: "Preparation",
    status: "Reviewed by Dr. Chen",
    tone: "success",
  },
  "PT-03": {
    title: "Understanding & Plan Confirmation",
    subtitle: "Your preferences · Plan version 2",
    phase: "Preparation",
    status: "2 items to confirm",
    tone: "warning",
  },
  "PT-04": {
    title: "Chairside Mode",
    subtitle: "Live appointment · Treatment in progress",
    phase: "Treatment",
    status: "Live",
    tone: "danger",
  },
  "PT-05": {
    title: "Recovery Plan",
    subtitle: "Composite restoration · Day 1",
    phase: "Recovery",
    status: "Today",
    tone: "success",
  },
  "PT-06": {
    title: "Report a Recovery Concern",
    subtitle: "Context attached from your recovery plan",
    phase: "Recovery",
    status: "Secure thread",
    tone: "info",
  },
  "DR-01": {
    title: "Patient Overview",
    subtitle: "Preparation · Priority review before appointment",
    phase: "Overview",
    status: "1 high priority",
    tone: "danger",
  },
  "DR-02": {
    title: "Condition & Plan Editor",
    subtitle: "Emily Carter · Tooth #30 · Preparation",
    phase: "Preparation",
    status: "Draft · Not published",
    tone: "warning",
  },
  "DR-03": {
    title: "Explanation & Alignment Workspace",
    subtitle: "Patient feedback · Plan version 2",
    phase: "Preparation",
    status: "2 open items",
    tone: "danger",
  },
  "DR-04": {
    title: "Chairside Console",
    subtitle: "Emily Carter · Live treatment session",
    phase: "Treatment",
    status: "Live",
    tone: "danger",
  },
  "DR-05": {
    title: "Recovery Monitoring",
    subtitle: "Composite restoration · Published plan",
    phase: "Recovery",
    status: "1 check due",
    tone: "warning",
  },
  "DR-06": {
    title: "Follow-up Inbox & Case Review",
    subtitle: "Recovery reports · Team queue",
    phase: "Recovery",
    status: "1 new report",
    tone: "danger",
  },
};

const patientNav: Array<[string, string, PageId]> = [
  ["home", "Home", "PT-01"],
  ["info", "Explanation", "PT-02"],
  ["fact_check", "Plan", "PT-03"],
  ["chair", "Chairside", "PT-04"],
  ["healing", "Recovery", "PT-05"],
  ["clinical_notes", "Reports", "PT-06"],
];

const clinicianNav: Array<[string, string, PageId]> = [
  ["person", "Patients", "DR-01"],
  ["assignment", "Tasks", "DR-01"],
  ["menu_book", "Explanations", "DR-02"],
  ["straighten", "Alignment", "DR-03"],
  ["dentistry", "Chairside", "DR-04"],
  ["healing", "Recovery", "DR-05"],
  ["event_repeat", "Follow-up", "DR-06"],
];

const rolePair: Record<PageId, PageId> = {
  "PT-01": "DR-01",
  "PT-02": "DR-02",
  "PT-03": "DR-03",
  "PT-04": "DR-04",
  "PT-05": "DR-05",
  "PT-06": "DR-06",
  "DR-01": "PT-01",
  "DR-02": "PT-02",
  "DR-03": "PT-03",
  "DR-04": "PT-04",
  "DR-05": "PT-05",
  "DR-06": "PT-06",
};

const demoStorageKey = "dentalign-demo-state-v1";

const guideSteps: Array<{
  icon: string;
  title: string;
  description: string;
  patient: PageId;
  clinician: PageId;
}> = [
  { icon: "home", title: "Overview", description: "See priorities, visits and the shared care timeline.", patient: "PT-01", clinician: "DR-01" },
  { icon: "menu_book", title: "Explain", description: "Review the condition and publish a clear treatment explanation.", patient: "PT-02", clinician: "DR-02" },
  { icon: "fact_check", title: "Align", description: "Capture questions, preferences and plan confirmation.", patient: "PT-03", clinician: "DR-03" },
  { icon: "dentistry", title: "Treat", description: "Use live chairside signals without breaking the clinical flow.", patient: "PT-04", clinician: "DR-04" },
  { icon: "healing", title: "Recover", description: "Publish care instructions and monitor check-ins.", patient: "PT-05", clinician: "DR-05" },
  { icon: "event_repeat", title: "Follow up", description: "Report a concern, reply and arrange the next visit.", patient: "PT-06", clinician: "DR-06" },
];

function Icon({ children, className = "" }: { children: string; className?: string }) {
  return <span className={`material-symbols-rounded ${className}`}>{children}</span>;
}

function Pill({
  children,
  tone = "info",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return <span className={`pill pill-${tone} ${className}`}>{children}</span>;
}

function Card({
  children,
  className = "",
  as = "section",
}: {
  children: ReactNode;
  className?: string;
  as?: "section" | "article";
}) {
  const Tag = as;
  return <Tag className={`card ${className}`}>{children}</Tag>;
}

function CardHead({
  title,
  eyebrow,
  action,
}: {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
}) {
  return (
    <div className="card-head">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}

function Button({
  children,
  icon,
  variant = "secondary",
  onClick,
  disabled = false,
  className = "",
}: {
  children: ReactNode;
  icon?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      className={`button button-${variant} ${className}`}
      data-demo-fallback={onClick ? undefined : "true"}
      onClick={
        onClick ??
        (() =>
          window.dispatchEvent(
            new CustomEvent("dentalign:preview-action", {
              detail: { message: "This action is ready for backend integration." },
            }),
          ))
      }
      disabled={disabled}
      type="button"
    >
      {icon && <Icon>{icon}</Icon>}
      <span>{children}</span>
    </button>
  );
}

function Sidebar({
  role,
  page,
  onNavigate,
  onSwitch,
}: {
  role: Role;
  page: PageId;
  onNavigate: (id: PageId) => void;
  onSwitch: () => void;
}) {
  const items = role === "patient" ? patientNav : clinicianNav;
  const locked = page === "PT-04" || page === "DR-04";
  return (
    <aside className="sidebar">
      <button className="brand-mark" onClick={() => onNavigate(role === "patient" ? "PT-01" : "DR-01")}>
        <img src="/assets/dentalign-logo.png" alt="DentAlign" />
      </button>
      <nav aria-label={`${role} navigation`}>
        {items.map(([icon, label, target], index) => {
          const active =
            target === page || (role === "clinician" && index === 1 && page === "DR-01");
          const allowedDuringLive =
            !locked ||
            target === page ||
            (page === "PT-04" && target === "PT-01") ||
            (page === "DR-04" && target === "DR-05");
          return (
            <button
              className={`nav-item ${active ? "active" : ""} ${allowedDuringLive ? "" : "locked"}`}
              key={`${label}-${index}`}
              onClick={() => onNavigate(target)}
              aria-current={active ? "page" : undefined}
              aria-disabled={!allowedDuringLive}
              title={!allowedDuringLive ? "Finish or exit the live treatment step first" : label}
            >
              <Icon>{icon}</Icon>
              <span>{label}</span>
              {label === "Follow-up" && <i className="nav-dot" />}
            </button>
          );
        })}
      </nav>
      <button className="role-label" onClick={onSwitch}>
        <Icon>swap_horiz</Icon>
        <span>{role === "patient" ? "PATIENT APP" : "CLINICIAN APP"}</span>
      </button>
    </aside>
  );
}

function Header({
  role,
  page,
  onSwitch,
  status,
  statusTone,
}: {
  role: Role;
  page: PageId;
  onSwitch: () => void;
  status?: string;
  statusTone?: Tone;
}) {
  const meta = pageMeta[page];
  const patient = role === "patient";
  return (
    <header className="app-header">
      <div className="title-block">
        <div className="page-kicker">
          <span>{page}</span>
          <i />
          <span>{meta.phase}</span>
        </div>
        <h1>{meta.title}</h1>
        <p>{meta.subtitle}</p>
      </div>
      <div className="header-actions">
        {(status ?? meta.status) && <Pill tone={statusTone ?? meta.tone}>{status ?? meta.status}</Pill>}
        <button className="role-switch" onClick={onSwitch} aria-label="Switch paired role view">
          <Icon>swap_horiz</Icon>
          <span>{patient ? "Clinician view" : "Patient view"}</span>
        </button>
        <div className="profile-copy">
          <strong>{patient ? "Emily Carter" : "Dr. Michael Chen"}</strong>
          <span>{patient ? "Tooth #30 · Dr. Chen" : "Restorative Dentist"}</span>
        </div>
        <div className="avatar-wrap">
          <img
            className="avatar"
            src={patient ? "/assets/patient-avatar-v2.png" : "/assets/doctor-avatar-v2.png"}
            alt=""
          />
          <strong>{patient ? "EC" : "MC"}</strong>
        </div>
      </div>
    </header>
  );
}

function Journey({
  role,
  page,
  onNavigate,
}: {
  role: Role;
  page: PageId;
  onNavigate: (id: PageId) => void;
}) {
  const active = Number(page.slice(3));
  const items: Array<[string, PageId]> =
    role === "patient"
      ? [
          ["Prepare", "PT-02" as PageId],
          ["Align", "PT-03" as PageId],
          ["Treat", "PT-04" as PageId],
          ["Recover", "PT-05" as PageId],
        ]
      : [
          ["Explain", "DR-02" as PageId],
          ["Align", "DR-03" as PageId],
          ["Treat", "DR-04" as PageId],
          ["Recover", "DR-05" as PageId],
        ];
  return (
    <div className="journey" aria-label="Care journey">
      {items.map(([label, target], index) => {
        const step = index + 2;
        const current = active === step || (active === 1 && index === 0);
        const complete = step < active;
        return (
          <button
            key={target}
            className={`${current ? "current" : ""} ${complete ? "complete" : ""}`}
            onClick={() => onNavigate(target)}
          >
            <span>{complete ? <Icon>check</Icon> : index + 1}</span>
            <strong>{label}</strong>
          </button>
        );
      })}
    </div>
  );
}

function Stat({
  label,
  value,
  note,
  icon,
  tone = "info",
}: {
  label: string;
  value: string;
  note?: string;
  icon?: string;
  tone?: Tone;
}) {
  return (
    <div className={`stat stat-${tone}`}>
      {icon && <Icon>{icon}</Icon>}
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        {note && <small>{note}</small>}
      </div>
    </div>
  );
}

function Timeline({ current = 2 }: { current?: number }) {
  const items = ["Diagnosis", "Explanation", "Treatment", "Recovery"];
  return (
    <div className="timeline">
      <div className="timeline-track">
        <i style={{ width: `${Math.max(0, (current - 1) * 33.333)}%` }} />
        {items.map((label, index) => (
          <span className={index + 1 <= current ? "active" : ""} key={label} />
        ))}
      </div>
      <div className="timeline-labels">
        {items.map((label, index) => (
          <div key={label}>
            <strong>{label}</strong>
            <small>{["Jul 27", "Today", "Aug 12", "Day 1–7"][index]}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function ToothVisual({ label = "TOOTH #30", step }: { label?: string; step?: string }) {
  return (
    <div className="tooth-visual">
      <Pill tone="info">{label}</Pill>
      <Icon>dentistry</Icon>
      {step && <strong>{step}</strong>}
    </div>
  );
}

function PatientHome({
  onNavigate,
  reviewed,
  followupCreated,
  recoveryPublished,
}: {
  onNavigate: (id: PageId) => void;
  reviewed: boolean;
  followupCreated: boolean;
  recoveryPublished: boolean;
}) {
  return (
    <div className="screen-grid patient-home">
      <Card className="stage-card span-7">
        <CardHead
          eyebrow="CURRENT STAGE"
          title="Preparation"
          action={<Pill tone={reviewed ? "success" : "info"}>{reviewed ? "Explanation reviewed" : "In progress"}</Pill>}
        />
        <Timeline current={reviewed ? 2 : 1} />
      </Card>
      <Card className="appointment-card span-5">
        <span className="eyebrow">UPCOMING APPOINTMENT</span>
        <div className="appointment-time">
          <Icon>calendar_month</Icon>
          <div>
            <h2>Aug 12 · 9:30 AM</h2>
            <p>Composite restoration · Tooth #30</p>
            <small>Dr. Michael Chen · Room 4</small>
          </div>
        </div>
      </Card>

      <Card className="span-7">
        <CardHead
          title="Priority Tasks"
          action={<Pill tone={reviewed ? "success" : "warning"}>{reviewed ? "1 next step" : "1 needs attention"}</Pill>}
        />
        <button className="task-feature" onClick={() => onNavigate("PT-02")}>
          <Icon>{reviewed ? "task_alt" : "visibility"}</Icon>
          <div>
            <strong>{reviewed ? "Explanation reviewed" : "Review treatment explanation"}</strong>
            <span>{reviewed ? "Continue with your plan preferences." : "Check your scan, risks, costs and treatment options."}</span>
          </div>
          <Pill tone={reviewed ? "success" : "info"}>{reviewed ? "Complete" : "Due today"}</Pill>
          <Icon>arrow_forward</Icon>
        </button>
        <div className="task-list">
          {[
            ["fact_check", "Confirm preferred treatment plan", "PT-03" as PageId, reviewed ? "Ready" : "Pending"],
            ["chair", "Start chairside communication mode", "PT-04" as PageId, "Aug 12"],
            ["healing", "Review recovery plan", "PT-05" as PageId, recoveryPublished ? "Available" : "Upcoming"],
            ["clinical_notes", "Submit a follow-up report", "PT-06" as PageId, "Available"],
          ].map(([icon, title, target, status]) => (
            <button key={title} onClick={() => onNavigate(target as PageId)}>
              <Icon>{icon}</Icon>
              <strong>{title}</strong>
              <span>{status}</span>
              <Icon>chevron_right</Icon>
            </button>
          ))}
        </div>
      </Card>
      <Card className="span-5 update-stack">
        <CardHead title="Doctor Updates & Reminders" />
        <div className="notice notice-info">
          <Icon>event_available</Icon>
          <div>
            <strong>Dr. Chen · 35 min ago</strong>
            <p>Your scan was reviewed. The treatment explanation is ready.</p>
          </div>
        </div>
        <div className={`notice ${recoveryPublished ? "notice-success" : ""}`}>
          <Icon>healing</Icon>
          <div>
            <strong>{recoveryPublished ? "Recovery plan published" : "Recovery reminder"}</strong>
            <p>{recoveryPublished ? "Your day-one care plan is now available." : "Post-op checks will unlock after treatment."}</p>
          </div>
        </div>
        {followupCreated && (
          <div className="notice notice-warning">
            <Icon>event_repeat</Icon>
            <div>
              <strong>Follow-up requested</strong>
              <p>The clinic is preparing a new appointment option.</p>
            </div>
          </div>
        )}
      </Card>

      <Card className="span-7 visits">
        <CardHead title="Current & Previous Visits" action={<Pill tone="info">Current</Pill>} />
        {[
          ["Today · Preparation", "Scan review and treatment explanation", "In progress"],
          ["Jul 27 · Diagnostic Visit", "Bitewing X-ray and intraoral examination", "Completed"],
          ["Jan 18 · Routine Check-up", "Cleaning and preventive assessment", "Completed"],
        ].map(([date, note, status], index) => (
          <div className="visit-row" key={date}>
            <Icon>{index === 0 ? "sync" : "history"}</Icon>
            <strong>{date}</strong>
            <span>{note}</span>
            <Pill tone={index === 0 ? "info" : "success"}>{status}</Pill>
          </div>
        ))}
      </Card>
      <Card className="span-5 quick-actions">
        <CardHead title="Quick Actions" />
        <Button variant="primary" icon="visibility" onClick={() => onNavigate("PT-02")}>
          Review explanation
        </Button>
        <Button icon="folder_open">View all visit records</Button>
        <Button icon="clinical_notes" onClick={() => onNavigate("PT-06")}>
          Report a problem
        </Button>
      </Card>
    </div>
  );
}

function ClinicianOverview({
  onNavigate,
  questionSubmitted,
  recoveryCheckSubmitted,
  followupCreated,
}: {
  onNavigate: (id: PageId) => void;
  questionSubmitted: boolean;
  recoveryCheckSubmitted: boolean;
  followupCreated: boolean;
}) {
  return (
    <div className="screen-grid clinician-overview">
      <Card className="patient-banner span-12">
        <div className="patient-identity">
          <img src="/assets/patient-photo-v2.png" alt="" />
          <div>
            <h2>Emily Carter</h2>
            <p>34 years · Female · ID #DA-88291</p>
            <strong>Aug 12 · 9:30 AM · Room 4</strong>
          </div>
        </div>
        <Stat label="Tooth" value="#30" />
        <Stat label="Condition" value="Deep caries" />
        <Stat label="Allergies" value="None reported" />
        <Stat label="Anxiety" value="Moderate" tone="warning" />
      </Card>

      <Card className="clinical-summary span-8">
        <CardHead title="Clinical & Communication Summary" action={<Pill tone="success">Good / stable</Pill>} />
        <div className="summary-layout">
          <ToothVisual />
          <div className="summary-copy">
            <span className="eyebrow">DIAGNOSIS</span>
            <h3>Deep Occlusal Caries</h3>
            <p>Cold and sweet sensitivity. Pulp chamber not involved.</p>
            <hr />
            <span className="eyebrow">PATIENT&apos;S MAIN CONCERNS</span>
            <div className="tag-row">
              <Pill tone="danger">Pain</Pill>
              <Pill tone="warning">Cost</Pill>
              <Pill tone="purple">Treatment time</Pill>
            </div>
            <p><strong>Communication:</strong> Plain language · Show visuals · Confirm each major step.</p>
          </div>
        </div>
      </Card>
      <Card className="span-4 priority-panel">
        <CardHead
          title="Priority Tasks"
          action={<Pill tone={questionSubmitted ? "danger" : "warning"}>{questionSubmitted ? "3 due" : "2 due"}</Pill>}
        />
        {[
          ["rate_review", "Review and publish explanation", "High", "DR-02" as PageId],
          ["forum", questionSubmitted ? "Reply to new patient question" : "Reply to cost concern", "High", "DR-03" as PageId],
          ["fact_check", "Confirm treatment preference", "Next", "DR-03" as PageId],
          ["healing", recoveryCheckSubmitted ? "Review recovery check" : "Prepare chairside signals", "Next", recoveryCheckSubmitted ? "DR-05" as PageId : "DR-04" as PageId],
        ].map(([icon, title, status, target], index) => (
          <button key={title} onClick={() => onNavigate(target as PageId)}>
            <Icon>{icon}</Icon>
            <div>
              <strong>{title}</strong>
              <small>{index < 2 ? "Needs clinician attention" : "Before next stage"}</small>
            </div>
            <Pill tone={index < 2 ? "danger" : "neutral"}>{status}</Pill>
          </button>
        ))}
      </Card>

      <Card className="span-8">
        <CardHead title="Encounter Timeline" action={<Pill tone="info">Current: preparation</Pill>} />
        <Timeline current={2} />
      </Card>
      <Card className="span-4 care-team">
        <CardHead title="Care Team & Handoff" />
        {[
          ["/assets/team-avatar-mc-v2.png", "Dr. Michael Chen", "Treatment owner"],
          ["/assets/team-avatar-sm.png", "Sarah Miller", "Dental assistant"],
          ["/assets/doctor-avatar-v2.png", "Lena Kim", followupCreated ? "Follow-up scheduled" : "Follow-up coordinator"],
        ].map(([src, name, role]) => (
          <div key={name}>
            <img src={src} alt="" />
            <p><strong>{name}</strong><span>{role}</span></p>
          </div>
        ))}
      </Card>
    </div>
  );
}

function PatientExplanation({
  onNavigate,
  questionSubmitted,
  setQuestionSubmitted,
  selectedOption,
  setSelectedOption,
  showToast,
}: {
  onNavigate: (id: PageId) => void;
  questionSubmitted: boolean;
  setQuestionSubmitted: (value: boolean) => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  showToast: (message: string) => void;
}) {
  const [tab, setTab] = useState("Condition");
  const [step, setStep] = useState(2);
  const [playing, setPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(26);
  const [captions, setCaptions] = useState(true);
  const [muted, setMuted] = useState(false);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [question, setQuestion] = useState("");
  const tabs = ["Condition", "Progression", "Treatment options"];
  const steps = ["Comfort", "Remove decay", "Restore", "Polish"];
  const duration = 94;
  const chapterStarts = [0, 24, 48, 72];

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setVideoTime((current) => {
        const next = current >= duration ? 0 : current + 1;
        setStep(Math.min(4, Math.floor(next / 24) + 1));
        return next;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [playing]);

  const seekToChapter = (chapter: number) => {
    setStep(chapter + 1);
    setVideoTime(chapterStarts[chapter]);
  };

  const formatTime = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  return (
    <div className="screen-grid explanation-screen">
      <Card className="condition-overview span-12">
        <div className="condition-main">
          <Icon>dentistry</Icon>
          <div>
            <h2>Deep Occlusal Caries</h2>
            <p>Lower-right first molar · Tooth #30</p>
          </div>
        </div>
        <div className="tag-row">
          <Pill tone="warning">Moderate</Pill>
          <Pill tone="success">Good / stable</Pill>
        </div>
        <div>
          <strong>Treat within 3 weeks</strong>
          <p>Prevents pulp involvement and root canal treatment.</p>
        </div>
        <div className="tabs compact-tabs">
          {tabs.map((item) => (
            <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item}>
              {item}
            </button>
          ))}
        </div>
      </Card>

      <Card className="span-7 treatment-story">
        <CardHead
          title="Procedure Explainer Video"
          action={<Pill tone="success">Reviewed by Dr. Chen</Pill>}
        />
        <div className={`procedure-video ${playing ? "is-playing" : ""}`}>
          <div className="video-stage">
            <div className="video-status"><Pill tone="info">Step {step} of 4</Pill><span>1 min 34 sec</span></div>
            <div className="video-tooth"><Icon>dentistry</Icon><i /><i /><i /></div>
            <button className="video-play" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause procedure video" : "Play procedure video"}>
              <Icon>{playing ? "pause" : "play_arrow"}</Icon>
            </button>
            {captions && (
              <p className="video-caption">
                {[
                  "First, the tooth is made comfortable before treatment begins.",
                  "The dentist removes only the damaged enamel and dentin.",
                  "A tooth-coloured material seals and restores the cavity.",
                  "The final restoration is shaped, polished and checked against your bite.",
                ][step - 1]}
              </p>
            )}
          </div>
          <div className="video-controls">
            <button onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause" : "Play"}><Icon>{playing ? "pause" : "play_arrow"}</Icon></button>
            <span>{formatTime(videoTime)}</span>
            <input
              aria-label="Video progress"
              type="range"
              min="0"
              max={duration}
              value={videoTime}
              onChange={(event) => {
                const next = Number(event.target.value);
                setVideoTime(next);
                setStep(Math.min(4, Math.floor(next / 24) + 1));
              }}
            />
            <span>{formatTime(duration)}</span>
            <button className={captions ? "active" : ""} onClick={() => setCaptions(!captions)} aria-label="Toggle captions"><Icon>closed_caption</Icon></button>
            <button onClick={() => setMuted(!muted)} aria-label={muted ? "Unmute" : "Mute"}><Icon>{muted ? "volume_off" : "volume_up"}</Icon></button>
            <button onClick={() => showToast("The explainer is ready for full-screen presentation.")} aria-label="Full screen"><Icon>fullscreen</Icon></button>
          </div>
        </div>
        <div className="step-tabs">
          {steps.map((item, index) => (
            <button className={step === index + 1 ? "active" : ""} onClick={() => seekToChapter(index)} key={item}>
              <span>{index + 1}</span>
              {item}
            </button>
          ))}
        </div>
        <div className="video-note"><Icon>verified_user</Icon><span>This video explains the planned sequence. Your dentist will confirm the final clinical steps before treatment.</span></div>
      </Card>

      <Card className="span-5 option-card">
        <CardHead title="Compare Treatment Options" />
        <p className="helper">Select the option you want to discuss. Your choice is not final.</p>
        {[
          ["Composite Restoration", "Recommended", "45–60 min", "$97 est.", "Low risk", "Tooth-coloured repair · preserves healthy structure"],
          ["Ceramic Onlay", "Alternative", "75–90 min", "$420 est.", "Medium risk", "Higher durability · requires more tooth reduction"],
        ].map(([title, tag, time, cost, risk, note]) => (
          <button
            className={`option-row ${selectedOption === title ? "selected" : ""}`}
            onClick={() => setSelectedOption(title)}
            key={title}
          >
            <div>
              <Pill tone={tag === "Recommended" ? "info" : "purple"}>{tag}</Pill>
              <h3>{title}</h3>
              <div className="metric-row"><strong>{time}</strong><strong>{cost}</strong><strong>{risk}</strong></div>
              <p>{note}</p>
            </div>
            <Icon>{selectedOption === title ? "check_circle" : "radio_button_unchecked"}</Icon>
          </button>
        ))}
        <small>Costs are estimates; Dr. Chen makes the final clinical recommendation with you.</small>
      </Card>

      <Card className="span-7 delay-card">
        <CardHead title="If Treatment Is Delayed" action={<Pill tone="warning">Possible progression</Pill>} />
        <div className="risk-timeline">
          {[
            ["Now", "Cold sensitivity", "Manageable", "info"],
            ["3 weeks", "Deeper dentin", "Higher risk", "warning"],
            ["1–3 months", "Pulp irritation", "Root canal risk", "danger"],
            ["Later", "Pain or infection", "Urgent care", "danger"],
          ].map(([time, change, result, tone]) => (
            <div className={`risk-point risk-${tone}`} key={time}>
              <span />
              <strong>{time}</strong>
              <p>{change}</p>
              <small>{result}</small>
            </div>
          ))}
        </div>
      </Card>
      <Card className="span-5 question-card">
        <CardHead
          title="Questions & Understanding"
          action={questionSubmitted ? <Pill tone="success">Sent</Pill> : undefined}
        />
        <p className="helper">Mark what you need before confirming your preference.</p>
        <div className="feedback-buttons">
          {["I'm worried", "I don't understand"].map((item) => (
            <button
              className={feedback.includes(item) ? "active" : ""}
              key={item}
              onClick={() =>
                setFeedback(feedback.includes(item) ? feedback.filter((x) => x !== item) : [...feedback, item])
              }
            >
              <Icon>{item.includes("worried") ? "sentiment_worried" : "help"}</Icon>
              {item}
            </button>
          ))}
        </div>
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask about pain, cost, alternatives or recovery…"
          aria-label="Question for the care team"
        />
        <div className="inline-actions">
          <small>Your message goes to the clinician alignment workspace.</small>
          <Button
            variant="primary"
            icon="send"
            onClick={() => {
              setQuestionSubmitted(true);
              setQuestion("");
              showToast("Question sent to Dr. Chen's alignment workspace.");
            }}
          >
            Send question
          </Button>
        </div>
        {questionSubmitted && (
          <button className="next-link" onClick={() => onNavigate("PT-03")}>
            Continue to understanding check <Icon>arrow_forward</Icon>
          </button>
        )}
      </Card>
    </div>
  );
}

function ClinicianEditor({
  onNavigate,
  published,
  setPublished,
  selectedOption,
  setSelectedOption,
  showToast,
}: {
  onNavigate: (id: PageId) => void;
  published: boolean;
  setPublished: (value: boolean) => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  showToast: (message: string) => void;
}) {
  const [approved, setApproved] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [options, setOptions] = useState(["Composite Restoration", "Ceramic Onlay"]);
  return (
    <div className="screen-grid editor-screen">
      <Card className="span-8 source-card">
        <CardHead
          title="Clinical Sources & Missing Information"
          action={<Pill tone="info">4 of 5 complete</Pill>}
        />
        <div className="source-grid">
          {[
            ["check_circle", "Exam", "Clinical exam · Jul 27", "success"],
            ["check_circle", "X-ray", "Bitewing X-ray · Jul 27", "success"],
            ["check_circle", "Photo", "Intraoral photo · Jul 27", "success"],
            ["check_circle", "History", "Medical history verified", "success"],
            ["warning", "Missing", "Pulp vitality test not recorded", "warning"],
          ].map(([icon, label, note, tone]) => (
            <div key={label}>
              <Icon className={`text-${tone}`}>{icon}</Icon>
              <strong>{label}</strong>
              <span>{note}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card className="span-4 severity-card">
        <CardHead title="Severity & Prognosis" />
        <div className="tag-row">
          <Pill tone="warning">Moderate</Pill>
          <Pill tone="success">Good</Pill>
          <Pill tone="danger">Symptomatic</Pill>
        </div>
        <p>Deep dentin involvement; pulp chamber intact. Treat within 3 weeks.</p>
        <Pill tone="info">Best-fit plan required</Pill>
      </Card>

      <Card className="span-8 option-editor">
        <CardHead
          title="Treatment Options Editor"
          action={
            <Button
              icon="add"
              onClick={() => {
                setOptions([...options, "New treatment option"]);
                showToast("A new draft option was added.");
              }}
            >
              Add option
            </Button>
          }
        />
        {options.map((title, index) => (
          <button
            className={`editor-option ${selectedOption === title ? "selected" : ""}`}
            onClick={() => setSelectedOption(title)}
            key={`${title}-${index}`}
          >
            <Pill tone={index === 0 ? "info" : index === 1 ? "purple" : "neutral"}>
              {selectedOption === title ? "Best fit" : index === 1 ? "Alternative" : "Draft"}
            </Pill>
            <div>
              <h3>{title}</h3>
              <strong>
                {index === 0
                  ? "45–60 min · $485 total / $97 patient · Low risk"
                  : index === 1
                    ? "75–90 min · $820 total / $420 patient · Medium risk"
                    : "Add time, cost, risk and expected outcome"}
              </strong>
              <p>
                {index === 0
                  ? "Outcome: tooth-coloured repair; preserves healthy structure."
                  : index === 1
                    ? "Outcome: higher durability; requires more tooth reduction."
                    : "This option is not included in the patient version yet."}
              </p>
            </div>
            <Icon>{selectedOption === title ? "check_circle" : "radio_button_unchecked"}</Icon>
          </button>
        ))}
        <div className="notice notice-warning compact-notice">
          <Icon>warning</Icon>
          <div><strong>Delay / no treatment consequence</strong><p>Possible pulp irritation, pain or infection; root canal risk increases over time.</p></div>
        </div>
      </Card>
      <Card className="span-4 animation-review">
        <CardHead
          title="Procedure Video Review"
          action={<Pill tone={approved ? "success" : "warning"}>{approved ? "Approved" : "Review required"}</Pill>}
        />
        <div className={`clinical-video-preview ${playing ? "is-playing" : ""}`}>
          <ToothVisual label="PATIENT EXPLAINER" />
          <button onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause video preview" : "Play video preview"}><Icon>{playing ? "pause" : "play_arrow"}</Icon></button>
        </div>
        <div className="mini-steps">
          {["Numb", "Remove", "Fill", "Polish"].map((item, index) => (
            <span className={index < 2 ? "active" : ""} key={item}><i />{item}</span>
          ))}
        </div>
        <div className="inline-actions">
          <Button icon="closed_caption">Captions</Button>
          <Button variant="primary" icon="task_alt" onClick={() => setApproved(true)}>Approve</Button>
        </div>
        <small>Confirm that the video, captions and patient-friendly wording match the clinical sequence before publishing.</small>
      </Card>

      <Card className="span-12 publish-card">
        <CardHead
          title="Patient Version Preview & Publishing"
          action={<Pill tone={published ? "success" : approved ? "info" : "warning"}>{published ? "Published" : approved ? "Ready to publish" : "Ready after review"}</Pill>}
        />
        <div className="publish-grid">
          <div className="patient-preview">
            <span className="eyebrow">PATIENT-FRIENDLY SUMMARY</span>
            <h3>Your tooth has a deep cavity, but the nerve is not currently involved.</h3>
            <p>We recommend a tooth-coloured filling. Compare cost, time, risks and recovery before choosing your preference.</p>
            <div className="tag-row"><Pill tone="success">Plain language</Pill><Pill tone="success">Costs</Pill><Pill tone="success">Risks</Pill><Pill tone="success">Video</Pill></div>
          </div>
          <div className="publish-checks">
            <span className="eyebrow">PUBLISH CHECKLIST</span>
            {["Clinical severity confirmed", "Best-fit plan selected", "Costs, time, risks and outcomes included", "Procedure video approved"].map((item, index) => (
              <div key={item}><Icon className={index === 3 && !approved ? "text-warning" : "text-success"}>{index === 3 && !approved ? "radio_button_unchecked" : "check_circle"}</Icon><span>{item}</span></div>
            ))}
            <div className="inline-actions">
              <Button icon="visibility" onClick={() => onNavigate("PT-02")}>Preview</Button>
              <Button icon="save" onClick={() => showToast("Draft saved.")}>Save draft</Button>
              <Button
                variant="primary"
                icon="publish"
                disabled={!approved}
                onClick={() => {
                  setPublished(true);
                  showToast("Patient version published. PT-02 is now updated.");
                }}
              >
                Publish
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function PatientAlignment({
  onNavigate,
  doctorReplied,
  planConfirmed,
  setPlanConfirmed,
  selectedOption,
  showToast,
}: {
  onNavigate: (id: PageId) => void;
  doctorReplied: boolean;
  planConfirmed: boolean;
  setPlanConfirmed: (value: boolean) => void;
  selectedOption: string;
  showToast: (message: string) => void;
}) {
  const [priority, setPriority] = useState("Comfort");
  const [answer, setAnswer] = useState("");
  const ready = answer === "review" && doctorReplied;
  return (
    <div className="screen-grid alignment-screen">
      <Card className="span-12 alignment-hero">
        <div>
          <span className="eyebrow">PLAN VERSION 2</span>
          <h2>Let’s make sure this plan fits you</h2>
          <p>Share what matters most, check your understanding and confirm only when you feel ready.</p>
        </div>
        <div className="completion-ring"><strong>{ready ? "100" : "67"}%</strong><span>ready</span></div>
      </Card>
      <Card className="span-5 preference-card">
        <CardHead title="What matters most?" eyebrow="YOUR PREFERENCES" />
        <p className="helper">Choose the factor you want the care team to prioritise.</p>
        <div className="choice-grid">
          {[
            ["Comfort", "sentiment_satisfied"],
            ["Cost", "payments"],
            ["Time", "schedule"],
            ["Durability", "shield"],
          ].map(([item, icon]) => (
            <button className={priority === item ? "selected" : ""} onClick={() => setPriority(item)} key={item}>
              <Icon>{icon}</Icon><strong>{item}</strong><span>{priority === item ? "Top priority" : "Select"}</span>
            </button>
          ))}
        </div>
        <div className="preference-summary"><Icon>auto_awesome</Icon><p>We’ll emphasise <strong>{priority.toLowerCase()}</strong> when comparing treatment options.</p></div>
      </Card>
      <Card className="span-7 understanding-card">
        <CardHead title="Understanding check" action={<Pill tone={answer ? "info" : "warning"}>{answer ? "Answered" : "1 question"}</Pill>} />
        <div className="question-number">01</div>
        <h3>If the cavity becomes deeper, what may change?</h3>
        <div className="answer-list">
          {[
            ["nothing", "Nothing — it will stay the same"],
            ["review", "The nerve may become involved and treatment could become more complex"],
            ["faster", "The tooth will repair itself faster"],
          ].map(([value, label]) => (
            <button className={answer === value ? "selected" : ""} onClick={() => setAnswer(value)} key={value}>
              <span>{answer === value ? <Icon>check</Icon> : ""}</span>{label}
            </button>
          ))}
        </div>
        {answer && answer !== "review" && (
          <div className="notice notice-warning"><Icon>lightbulb</Icon><div><strong>Let’s review this part</strong><p>The cavity can progress toward the nerve. Revisit “If treatment is delayed” before confirming.</p><button onClick={() => onNavigate("PT-02")}>Review explanation</button></div></div>
        )}
        {answer === "review" && (
          <div className="notice notice-success"><Icon>task_alt</Icon><div><strong>That’s right</strong><p>You understand why treatment is recommended within three weeks.</p></div></div>
        )}
      </Card>
      <Card className="span-7 conversation-card">
        <CardHead title="Open question" action={<Pill tone={doctorReplied ? "success" : "warning"}>{doctorReplied ? "Doctor replied" : "Awaiting reply"}</Pill>} />
        <div className="message patient-message"><strong>You</strong><p>How much discomfort should I expect after the filling?</p><small>Today · 10:14 AM</small></div>
        {doctorReplied ? (
          <div className="message doctor-message"><strong>Dr. Chen</strong><p>Mild sensitivity for a day or two is common. The tooth should not have persistent or worsening pain.</p><small>Today · 10:32 AM</small></div>
        ) : (
          <div className="waiting-state"><Icon>hourglass_top</Icon><p>Dr. Chen will reply here. You can leave this page and come back later.</p></div>
        )}
      </Card>
      <Card className="span-5 final-plan">
        <CardHead title="Your plan summary" />
        <div className="plan-title"><Icon>dentistry</Icon><div><strong>{selectedOption}</strong><span>Tooth #30 · Plan version 2</span></div></div>
        <dl><div><dt>Time</dt><dd>45–60 min</dd></div><div><dt>Estimated cost</dt><dd>$97 patient</dd></div><div><dt>Expected recovery</dt><dd>1–2 days</dd></div></dl>
        <label className="confirm-check">
          <input type="checkbox" checked={planConfirmed} onChange={(event) => setPlanConfirmed(event.target.checked)} />
          <span>I have reviewed this version and my questions are resolved.</span>
        </label>
        <Button
          variant="primary"
          icon="verified"
          disabled={!ready || !planConfirmed}
          onClick={() => {
            showToast("Plan confirmed. Your home tasks are updated.");
            onNavigate("PT-01");
          }}
        >
          Confirm this plan
        </Button>
      </Card>
    </div>
  );
}

function ClinicianAlignment({
  onNavigate,
  questionSubmitted,
  doctorReplied,
  setDoctorReplied,
  setQuestionSubmitted,
  showToast,
}: {
  onNavigate: (id: PageId) => void;
  questionSubmitted: boolean;
  doctorReplied: boolean;
  setDoctorReplied: (value: boolean) => void;
  setQuestionSubmitted: (value: boolean) => void;
  showToast: (message: string) => void;
}) {
  const [reply, setReply] = useState("Mild sensitivity for a day or two is common. Persistent or worsening pain is not expected.");
  const [selectedThread, setSelectedThread] = useState(0);
  return (
    <div className="screen-grid clinician-alignment">
      <Card className="span-4 signal-card">
        <CardHead title="Patient signals" action={<Pill tone="danger">{questionSubmitted ? "2 open" : "1 open"}</Pill>} />
        <div className="patient-mini"><img src="/assets/patient-photo-v2.png" alt="" /><div><strong>Emily Carter</strong><span>Plan version 2 · Tooth #30</span></div></div>
        <div className="signal-list">
          <Stat label="Top priority" value="Comfort" icon="sentiment_satisfied" />
          <Stat label="Understanding" value="67%" icon="psychology" tone="warning" />
          <Stat label="Concern" value="Post-op pain" icon="forum" tone="danger" />
        </div>
        <Button icon="visibility" onClick={() => onNavigate("PT-03")}>Preview patient view</Button>
      </Card>
      <Card className="span-8 alignment-inbox">
        <CardHead title="Questions & clarification queue" action={<Button icon="filter_list">Filter</Button>} />
        <div className="thread-layout">
          <div className="thread-list">
            {[
              ["Post-treatment discomfort", questionSubmitted ? "New" : "Open", "Pain · Recovery"],
              ["Cost difference between options", doctorReplied ? "Resolved" : "Open", "Cost · Options"],
            ].map(([title, status, tag], index) => (
              <button className={selectedThread === index ? "selected" : ""} onClick={() => setSelectedThread(index)} key={title}>
                <span className={`thread-status ${status.toLowerCase()}`} />
                <div><strong>{title}</strong><small>{tag}</small></div>
                <Pill tone={status === "Resolved" ? "success" : status === "New" ? "danger" : "warning"}>{status}</Pill>
              </button>
            ))}
          </div>
          <div className="thread-detail">
            <span className="eyebrow">PATIENT QUESTION</span>
            <h3>{selectedThread === 0 ? "How much discomfort should I expect after the filling?" : "Why is the onlay more expensive?"}</h3>
            <div className="context-link"><Icon>link</Icon><p>Linked to: {selectedThread === 0 ? "Recovery expectations" : "Ceramic Onlay · cost"}</p><button onClick={() => onNavigate("DR-02")}>Open source</button></div>
            <label>Reply to Emily</label>
            <textarea value={reply} onChange={(event) => setReply(event.target.value)} />
            <div className="inline-actions">
              <Button icon="add_link">Attach explanation</Button>
              <Button
                variant="primary"
                icon="send"
                onClick={() => {
                  setDoctorReplied(true);
                  setQuestionSubmitted(false);
                  showToast("Reply sent. PT-03 has been updated.");
                }}
              >
                Send reply
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <Card className="span-8 alignment-preview">
        <CardHead title="Shared plan alignment" action={<Pill tone={doctorReplied ? "success" : "warning"}>{doctorReplied ? "Ready to confirm" : "Waiting on clinician"}</Pill>} />
        <div className="alignment-columns">
          <div><span className="eyebrow">PATIENT</span><h3>Comfort first</h3><p>Understands progression risk. One recovery question submitted.</p></div>
          <Icon>sync_alt</Icon>
          <div><span className="eyebrow">CLINICAL PLAN</span><h3>Composite restoration</h3><p>Best fit · low risk · 45–60 minutes · version 2.</p></div>
        </div>
      </Card>
      <Card className="span-4 checklist-card">
        <CardHead title="Clinician confirmation" />
        {["Condition explained", "Options compared", "Patient priority recorded", "Open question resolved"].map((item, index) => (
          <div key={item}><Icon className={index === 3 && !doctorReplied ? "text-warning" : "text-success"}>{index === 3 && !doctorReplied ? "radio_button_unchecked" : "check_circle"}</Icon><span>{item}</span></div>
        ))}
        <Button variant="primary" icon="verified" disabled={!doctorReplied} onClick={() => { showToast("Clinician confirmation complete."); onNavigate("DR-01"); }}>
          Complete alignment
        </Button>
      </Card>
    </div>
  );
}

function PatientChairside({
  chairsideRequest,
  setChairsideRequest,
  chairsideResolved,
  showToast,
}: {
  chairsideRequest: boolean;
  setChairsideRequest: (value: boolean) => void;
  chairsideResolved: boolean;
  showToast: (message: string) => void;
}) {
  const [reason, setReason] = useState("I need a short break");
  const [audio, setAudio] = useState("Ocean sounds");
  return (
    <div className="chairside patient-chairside">
      <div className="live-banner"><span /><strong>Treatment is in progress</strong><small>Navigation is locked to prevent accidental taps.</small></div>
      <div className="chairside-main">
        <Card className="comfort-player">
          <span className="eyebrow">YOUR COMFORT AUDIO</span>
          <div className="album"><Icon>{audio === "Breathing guide" ? "air" : "waves"}</Icon></div>
          <h2>{audio}</h2>
          <p>{audio === "Breathing guide" ? "Slow breathing · 4 minutes" : "Calm continuous sound · playing"}</p>
          <div className="audio-controls"><button><Icon>skip_previous</Icon></button><button className="play"><Icon>pause</Icon></button><button><Icon>skip_next</Icon></button></div>
          <div className="audio-options">
            {["Ocean sounds", "Breathing guide", "White noise"].map((item) => <button className={audio === item ? "active" : ""} onClick={() => setAudio(item)} key={item}>{item}</button>)}
          </div>
        </Card>
        <Card className="treatment-progress-card">
          <span className="eyebrow">CURRENT STAGE</span>
          <div className="stage-orbit"><Icon>dentistry</Icon><span><strong>2</strong>of 4</span></div>
          <h2>Removing the damaged area</h2>
          <p>Dr. Chen is carefully removing decay while preserving healthy tooth structure.</p>
          <div className="coarse-progress"><i /><i className="active" /><i /><i /></div>
          <div className="progress-labels"><span>Numb</span><span>Prepare</span><span>Restore</span><span>Finish</span></div>
          <div className="doctor-cue"><img src="/assets/doctor-avatar-v2.png" alt="" /><div><strong>Dr. Chen</strong><p>{chairsideResolved ? "You’re doing well. We can continue when you’re ready." : "We’re about halfway through this step."}</p></div></div>
        </Card>
        <Card className={`request-card ${chairsideRequest && !chairsideResolved ? "request-sent" : ""}`}>
          <span className="eyebrow">NEED SOMETHING?</span>
          <h2>{chairsideRequest && !chairsideResolved ? "Dr. Chen has seen your request" : chairsideResolved ? "Your request was handled" : "Tap once to get the team’s attention"}</h2>
          <p>{chairsideRequest && !chairsideResolved ? "The team will pause at the next safe moment." : "Choose a reason so the team can respond quickly."}</p>
          <div className="reason-grid">
            {["I feel pain", "I feel anxious", "I need suction", "I need a short break", "Tell me the progress"].map((item) => (
              <button className={reason === item ? "selected" : ""} onClick={() => setReason(item)} key={item}>
                <Icon>{["warning", "sentiment_worried", "water_drop", "front_hand", "info"][["I feel pain", "I feel anxious", "I need suction", "I need a short break", "Tell me the progress"].indexOf(item)]}</Icon>{item}
              </button>
            ))}
          </div>
          <Button
            variant={chairsideRequest && !chairsideResolved ? "secondary" : "danger"}
            icon={chairsideRequest && !chairsideResolved ? "task_alt" : "front_hand"}
            disabled={chairsideRequest && !chairsideResolved}
            onClick={() => {
              setChairsideRequest(true);
              showToast(`${reason} — sent to the chairside console.`);
            }}
          >
            {chairsideRequest && !chairsideResolved ? "Request received" : "Ask team to pause"}
          </Button>
        </Card>
      </div>
    </div>
  );
}

function ClinicianChairside({
  chairsideRequest,
  setChairsideRequest,
  chairsideResolved,
  setChairsideResolved,
  onNavigate,
  showToast,
}: {
  chairsideRequest: boolean;
  setChairsideRequest: (value: boolean) => void;
  chairsideResolved: boolean;
  setChairsideResolved: (value: boolean) => void;
  onNavigate: (id: PageId) => void;
  showToast: (message: string) => void;
}) {
  const [progress, setProgress] = useState(44);
  const [cue, setCue] = useState("We’re halfway through this step.");
  return (
    <div className="screen-grid chairside-console">
      <Card className="span-12 safety-strip">
        <Stat label="Patient" value="Emily Carter" note="Tooth #30" icon="person" />
        <Stat label="Allergies" value="None reported" icon="verified_user" tone="success" />
        <Stat label="Anxiety" value="Moderate" icon="sentiment_worried" tone="warning" />
        <Stat label="Agreed signal" value="Raise left hand" icon="front_hand" />
        <Button icon="side_navigation" onClick={() => showToast("Patient summary opened without leaving chairside mode.")}>Open summary</Button>
      </Card>
      {chairsideRequest && !chairsideResolved && (
        <div className="span-12 urgent-request">
          <Icon>notifications_active</Icon>
          <div><strong>Patient requested attention</strong><p>“I need a short break” · received just now</p></div>
          <Button variant="danger" icon="visibility" onClick={() => showToast("Request acknowledged on the patient screen.")}>Mark as seen</Button>
          <Button variant="primary" icon="pause_circle" onClick={() => { setChairsideResolved(true); setChairsideRequest(false); showToast("Request resolved. Patient may confirm readiness."); }}>Pause & resolve</Button>
        </div>
      )}
      <Card className="span-8 procedure-console">
        <CardHead title="Procedure progress" action={<Pill tone="danger">Live · 28:14</Pill>} />
        <div className="procedure-stage">
          <div className="stage-orbit"><Icon>dentistry</Icon><span><strong>2</strong>of 4</span></div>
          <div><span className="eyebrow">CURRENT STEP</span><h2>Remove decay & prepare cavity</h2><p>Isolation complete · anaesthetic confirmed · pulp chamber intact</p></div>
        </div>
        <input className="progress-slider" type="range" min="10" max="90" value={progress} onChange={(event) => setProgress(Number(event.target.value))} aria-label="Treatment progress" />
        <div className="console-steps">
          {["Numb", "Prepare", "Restore", "Finish"].map((item, index) => <button className={index === 1 ? "active" : index < 1 ? "complete" : ""} key={item}><span>{index < 1 ? <Icon>check</Icon> : index + 1}</span><strong>{item}</strong></button>)}
        </div>
        <div className="console-actions">
          <Button icon="undo">Previous step</Button>
          <Button variant="primary" icon="arrow_forward" onClick={() => setProgress(Math.min(90, progress + 15))}>Advance stage</Button>
          <Button icon="flag" onClick={() => showToast("Clinical note marker added at the current timestamp.")}>Add marker</Button>
        </div>
      </Card>
      <Card className="span-4 cue-console">
        <CardHead title="Patient communication" action={<Pill tone="success">Connected</Pill>} />
        <div className="patient-screen-preview"><Icon>waves</Icon><div><strong>Patient audio active</strong><span>Ocean sounds · 42% volume</span></div></div>
        <label>Quick cue</label>
        <div className="cue-list">
          {["You’re doing well.", "We’re halfway through this step.", "You may feel some pressure.", "We’re almost finished."].map((item) => <button className={cue === item ? "selected" : ""} onClick={() => setCue(item)} key={item}>{item}</button>)}
        </div>
        <Button variant="primary" icon="send" onClick={() => showToast(`Patient cue sent: “${cue}”`)}>Send to patient</Button>
      </Card>
      <Card className="span-8 event-log">
        <CardHead title="Live event log" />
        {[
          ["10:18", "Procedure stage advanced", "Prepare cavity"],
          ["10:16", "Cue sent to patient", "You’re doing well"],
          ["10:09", "Anaesthetic confirmed", "Patient comfortable"],
        ].map(([time, event, detail]) => <div key={time}><strong>{time}</strong><Icon>fiber_manual_record</Icon><p><b>{event}</b><span>{detail}</span></p></div>)}
      </Card>
      <Card className="span-4 end-session">
        <CardHead title="Complete treatment" />
        <p>End the live session and continue to recovery planning.</p>
        <Button variant="primary" icon="check_circle" onClick={() => { showToast("Treatment completed. Recovery planning is ready."); onNavigate("DR-05"); }}>Finish & create recovery plan</Button>
      </Card>
    </div>
  );
}

function PatientRecovery({
  onNavigate,
  recoveryPublished,
  recoveryCheckSubmitted,
  setRecoveryCheckSubmitted,
  showToast,
}: {
  onNavigate: (id: PageId) => void;
  recoveryPublished: boolean;
  recoveryCheckSubmitted: boolean;
  setRecoveryCheckSubmitted: (value: boolean) => void;
  showToast: (message: string) => void;
}) {
  const [day, setDay] = useState("Today");
  const [pain, setPain] = useState(2);
  const instructions: Record<string, Array<[string, string, string]>> = {
    Today: [["medication", "Pain relief", "Take ibuprofen only if needed and safe for you."], ["restaurant", "Eating", "Wait until numbness has fully worn off. Start with soft foods."], ["dentistry", "Cleaning", "Brush gently tonight. Avoid biting hard on tooth #30."]],
    "Days 1–3": [["sensitivity", "Sensitivity", "Brief cold sensitivity can be normal."], ["restaurant", "Eating", "Return to your normal diet as comfort allows."], ["dentistry", "Cleaning", "Brush and floss normally around the restoration."]],
    "Day 7": [["task_alt", "Expected result", "The tooth should feel comfortable in daily use."], ["event", "Next check", "Contact the clinic if your bite still feels high."]],
  };
  return (
    <div className="screen-grid recovery-screen">
      <Card className="span-12 recovery-hero">
        <div><span className="eyebrow">YOUR RECOVERY</span><h2>Day 1 after treatment</h2><p>{recoveryPublished ? "Dr. Chen published this plan for your composite restoration." : "A preview plan is available; final instructions are pending."}</p></div>
        <div className="recovery-score"><Icon>health_and_safety</Icon><div><strong>On track</strong><span>Next check · 7:00 PM</span></div></div>
      </Card>
      <Card className="span-8 care-plan">
        <CardHead title="Care plan" action={<Pill tone="success">Published by Dr. Chen</Pill>} />
        <div className="tabs">
          {["Today", "Days 1–3", "Day 7"].map((item) => <button className={day === item ? "active" : ""} onClick={() => setDay(item)} key={item}>{item}</button>)}
        </div>
        <div className="instruction-list">
          {instructions[day].map(([icon, title, note]) => <article key={title}><span><Icon>{icon}</Icon></span><div><h3>{title}</h3><p>{note}</p></div><button onClick={() => onNavigate("PT-06")}><Icon>help</Icon></button></article>)}
        </div>
        <div className="notice notice-warning"><Icon>warning</Icon><div><strong>Contact the clinic</strong><p>Call if pain is worsening, swelling develops, or the filling feels too high when you bite.</p><button onClick={() => onNavigate("PT-06")}>Report a concern</button></div></div>
      </Card>
      <Card className="span-4 recovery-check">
        <CardHead title="Evening check-in" action={<Pill tone={recoveryCheckSubmitted ? "success" : "warning"}>{recoveryCheckSubmitted ? "Complete" : "Due today"}</Pill>} />
        <label>Pain right now <strong>{pain}/10</strong></label>
        <input type="range" min="0" max="10" value={pain} onChange={(event) => setPain(Number(event.target.value))} />
        <div className="range-labels"><span>No pain</span><span>Severe</span></div>
        <label>Any swelling?</label>
        <div className="binary-choice"><button className="selected">No</button><button>Yes</button></div>
        <label>Did you need pain relief?</label>
        <div className="binary-choice"><button>No</button><button className="selected">Once</button></div>
        <Button variant="primary" icon="check_circle" onClick={() => { setRecoveryCheckSubmitted(true); showToast("Recovery check submitted to the care team."); }}>Submit check-in</Button>
      </Card>
      <Card className="span-8 trend-card">
        <CardHead title="Your recovery trend" action={<Pill tone="success">Improving</Pill>} />
        <div className="trend-chart">
          {[72, 54, 40, 28, 20, 16, 12].map((height, index) => <div key={index}><i style={{ height: `${height}%` }} /><span>Day {index + 1}</span></div>)}
        </div>
      </Card>
      <Card className="span-4 help-card">
        <CardHead title="Need help?" />
        <p>Your treatment and recovery context will be attached automatically.</p>
        <Button icon="clinical_notes" onClick={() => onNavigate("PT-06")}>Start a report</Button>
        <Button icon="call">Call the clinic</Button>
      </Card>
    </div>
  );
}

function ClinicianRecovery({
  recoveryPublished,
  setRecoveryPublished,
  recoveryCheckSubmitted,
  onNavigate,
  showToast,
}: {
  recoveryPublished: boolean;
  setRecoveryPublished: (value: boolean) => void;
  recoveryCheckSubmitted: boolean;
  onNavigate: (id: PageId) => void;
  showToast: (message: string) => void;
}) {
  const [template, setTemplate] = useState("Composite restoration");
  return (
    <div className="screen-grid clinician-recovery">
      <Card className="span-8 recovery-builder">
        <CardHead title="Recovery plan builder" action={<Pill tone={recoveryPublished ? "success" : "warning"}>{recoveryPublished ? "Published" : "Draft"}</Pill>} />
        <label>Starting template</label>
        <select value={template} onChange={(event) => setTemplate(event.target.value)}><option>Composite restoration</option><option>Ceramic onlay</option><option>Custom recovery plan</option></select>
        <div className="plan-sections">
          {[
            ["medication", "Medication", "Ibuprofen as needed · safety checked", "Configured"],
            ["restaurant", "Diet", "Soft foods until numbness resolves", "Configured"],
            ["dentistry", "Cleaning", "Gentle brushing tonight", "Configured"],
            ["warning", "Warning signs", "Worsening pain · swelling · high bite", "Review"],
          ].map(([icon, title, note, status]) => <button key={title}><Icon>{icon}</Icon><div><strong>{title}</strong><span>{note}</span></div><Pill tone={status === "Review" ? "warning" : "success"}>{status}</Pill><Icon>edit</Icon></button>)}
        </div>
        <div className="inline-actions"><Button icon="add">Add instruction</Button><Button variant="primary" icon="publish" onClick={() => { setRecoveryPublished(true); showToast("Recovery plan published to PT-05."); }}>Publish patient plan</Button></div>
      </Card>
      <Card className="span-4 check-schedule">
        <CardHead title="Check-in schedule" />
        {[
          ["Today · 7:00 PM", "Pain · swelling · medication"],
          ["Day 3 · 9:00 AM", "Sensitivity · bite comfort"],
          ["Day 7 · 9:00 AM", "Final recovery check"],
        ].map(([time, fields], index) => <div key={time}><span>{index + 1}</span><p><strong>{time}</strong><small>{fields}</small></p><button><Icon>edit</Icon></button></div>)}
        <Button icon="add">Add check-in</Button>
      </Card>
      <Card className="span-8 clinician-trend">
        <CardHead title="Patient recovery trend" action={<Pill tone={recoveryCheckSubmitted ? "success" : "neutral"}>{recoveryCheckSubmitted ? "Updated just now" : "Awaiting first check"}</Pill>} />
        <div className="chart-layout">
          <div className="chart-y"><span>10</span><span>5</span><span>0</span></div>
          <div className="line-chart"><i /><span style={{ left: "5%", bottom: "70%" }} /><span style={{ left: "34%", bottom: "52%" }} /><span style={{ left: "66%", bottom: "31%" }} /><span style={{ left: "94%", bottom: "20%" }} /></div>
        </div>
        <div className="chart-legend"><span><i className="legend-pain" />Pain</span><span><i className="legend-swelling" />Swelling</span><strong>{recoveryCheckSubmitted ? "Pain 2/10 · no swelling" : "No patient data yet"}</strong></div>
      </Card>
      <Card className="span-4 review-queue">
        <CardHead title="Review queue" action={<Pill tone={recoveryCheckSubmitted ? "warning" : "success"}>{recoveryCheckSubmitted ? "1 item" : "Clear"}</Pill>} />
        {recoveryCheckSubmitted ? (
          <button className="review-item" onClick={() => onNavigate("DR-06")}><Icon>monitor_heart</Icon><div><strong>Evening check submitted</strong><span>Pain 2/10 · medication once</span></div><Icon>chevron_right</Icon></button>
        ) : <div className="empty-state"><Icon>task_alt</Icon><p>No recovery checks need review.</p></div>}
        <Button icon="event_repeat" onClick={() => onNavigate("DR-06")}>Open follow-up inbox</Button>
      </Card>
    </div>
  );
}

function PatientReport({
  reportSubmitted,
  setReportSubmitted,
  doctorFollowupReply,
  onNavigate,
  showToast,
}: {
  reportSubmitted: boolean;
  setReportSubmitted: (value: boolean) => void;
  doctorFollowupReply: boolean;
  onNavigate: (id: PageId) => void;
  showToast: (message: string) => void;
}) {
  const [symptom, setSymptom] = useState("Bite feels high");
  const [severity, setSeverity] = useState(4);
  const [message, setMessage] = useState("My filling touches first when I close my teeth. It feels uneven, but the pain is mild.");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiHistory, setAiHistory] = useState<Array<{ role: "patient" | "assistant"; text: string }>>([
    { role: "assistant", text: "I can help you describe the concern and find the relevant recovery guidance. I do not replace your dental team." },
  ]);
  const attachmentOptions = [
    ["photo_camera", "Photo"],
    ["videocam", "Video"],
    ["mic", "Voice"],
    ["note_alt", "Text note"],
  ];

  const askAssistant = (prompt = aiPrompt) => {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt) return;
    const response = cleanPrompt.toLowerCase().includes("urgent") || cleanPrompt.toLowerCase().includes("swelling")
      ? "Worsening swelling, trouble breathing, fever, or uncontrolled bleeding need urgent clinical attention. For a high bite without those signs, send the care team a report so they can assess whether an adjustment is needed."
      : cleanPrompt.toLowerCase().includes("photo")
        ? "A clear photo can help if there is visible swelling, bleeding, or a damaged restoration. For a bite that feels high, a short description or voice note is often more useful than a photo."
        : "A filling that contacts first can sometimes need a brief bite adjustment. Add when it started, whether it is changing, and your pain level, then send the report for the dental team to review.";
    setAiHistory((history) => [...history, { role: "patient", text: cleanPrompt }, { role: "assistant", text: response }]);
    setAiPrompt("");
  };

  const toggleAttachment = (label: string) => {
    setAttachments((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label]);
  };

  return (
    <div className="screen-grid report-screen ai-report-screen">
      <Card className="span-8 followup-thread-card">
        <CardHead title="Follow-up Thread" action={reportSubmitted ? <Pill tone="success">Sent to care team</Pill> : <Pill tone="info">Secure draft</Pill>} />
        <div className="context-banner"><Icon>auto_awesome</Icon><div><strong>Treatment context attached</strong><p>Tooth #30 · Composite restoration · Day 1 · Latest pain check 2/10</p></div><button onClick={() => onNavigate("PT-05")}>Open recovery plan</button></div>
        <div className="thread-messages">
          <article className="thread-message clinic-message">
            <div className="thread-avatar"><Icon>health_and_safety</Icon></div>
            <div><span>DentAlign Care · 9:12 AM</span><p>Tell us what feels different. Your treatment and recovery details are already attached for the team.</p></div>
          </article>
          {reportSubmitted && (
            <article className="thread-message patient-message">
              <div><span>You · just now</span><strong>{symptom} · concern {severity}/10</strong><p>{message}</p>{attachments.length > 0 && <small>{attachments.join(" · ")} attached</small>}</div>
              <img src="/assets/patient-avatar-v2.png" alt="" />
            </article>
          )}
          {doctorFollowupReply && (
            <article className="thread-message clinic-message clinician-reply">
              <img src="/assets/doctor-avatar-v2.png" alt="" />
              <div><span>Dr. Michael Chen · just now</span><strong>Thanks for the update, Emily.</strong><p>A slightly high bite can be adjusted quickly. We recommend a short follow-up visit tomorrow.</p><button onClick={() => onNavigate("PT-01")}>View appointment task <Icon>arrow_forward</Icon></button></div>
            </article>
          )}
        </div>
        <div className="thread-composer">
          <div className="symptom-chips" aria-label="Concern type">
            {["Pain", "Swelling", "Bite feels high", "Bleeding", "Sensitivity"].map((item) => <button type="button" className={symptom === item ? "selected" : ""} onClick={() => setSymptom(item)} key={item}>{item}</button>)}
          </div>
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Describe what changed, when it started and what makes it better or worse…" aria-label="Message to the care team" />
          <div className="composer-toolbar">
            <div className="attachment-tools" aria-label="Add supporting information">
              {attachmentOptions.map(([icon, label]) => (
                <button type="button" className={attachments.includes(label) ? "selected" : ""} onClick={() => toggleAttachment(label)} key={label} aria-pressed={attachments.includes(label)}>
                  <Icon>{icon}</Icon><span>{label}</span>
                </button>
              ))}
            </div>
            <label className="compact-severity"><span>Concern</span><input type="range" min="1" max="10" value={severity} onChange={(event) => setSeverity(Number(event.target.value))} /><strong>{severity}/10</strong></label>
            <Button variant="primary" icon="send" onClick={() => { setReportSubmitted(true); showToast("Report submitted securely to the follow-up inbox."); }}>Send</Button>
          </div>
        </div>
      </Card>
      <div className="span-4 report-side ai-report-side">
        <Card className="care-assistant-card">
          <CardHead title="AI Care Assistant" action={<Pill tone="purple">Guidance</Pill>} />
          <p className="assistant-disclaimer"><Icon>verified_user</Icon>Uses your approved recovery plan. Clinical decisions stay with your dental team.</p>
          <div className="assistant-chat" aria-live="polite">
            {aiHistory.map((item, index) => <div className={item.role === "assistant" ? "assistant-bubble" : "patient-bubble"} key={`${item.role}-${index}`}>{item.role === "assistant" && <Icon>auto_awesome</Icon>}<p>{item.text}</p></div>)}
          </div>
          <div className="assistant-suggestions">
            {["Is this urgent?", "Would a photo help?", "Help me describe it"].map((item) => <button key={item} onClick={() => askAssistant(item)}>{item}</button>)}
          </div>
          <div className="assistant-input"><input value={aiPrompt} onChange={(event) => setAiPrompt(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") askAssistant(); }} placeholder="Ask about your recovery…" aria-label="Ask the AI care assistant" /><button onClick={() => askAssistant()} aria-label="Send to AI assistant"><Icon>arrow_upward</Icon></button></div>
        </Card>
        <Card className="report-status">
          <CardHead title="Report status" />
          {[
            ["edit_note", "Draft created", true],
            ["send", "Sent to care team", reportSubmitted],
            ["visibility", "Reviewed by clinic", doctorFollowupReply],
            ["forum", "Care team response", doctorFollowupReply],
          ].map(([icon, label, done]) => <div className={done ? "done" : ""} key={label as string}><span><Icon>{icon as string}</Icon></span><p><strong>{label}</strong><small>{done ? "Complete" : "Pending"}</small></p></div>)}
        </Card>
        <Card className="urgent-help"><Icon>emergency</Icon><div><h3>Need urgent help?</h3><p>For severe swelling, trouble breathing or uncontrolled bleeding, contact emergency services.</p></div></Card>
      </div>
    </div>
  );
}

function ClinicianFollowup({
  reportSubmitted,
  setReportSubmitted,
  doctorFollowupReply,
  setDoctorFollowupReply,
  followupCreated,
  setFollowupCreated,
  onNavigate,
  showToast,
}: {
  reportSubmitted: boolean;
  setReportSubmitted: (value: boolean) => void;
  doctorFollowupReply: boolean;
  setDoctorFollowupReply: (value: boolean) => void;
  followupCreated: boolean;
  setFollowupCreated: (value: boolean) => void;
  onNavigate: (id: PageId) => void;
  showToast: (message: string) => void;
}) {
  const [reply, setReply] = useState("A slightly high bite can be adjusted quickly. We recommend a short follow-up visit tomorrow.");
  return (
    <div className="screen-grid followup-screen">
      <Card className="span-4 inbox-panel">
        <CardHead title="Follow-up inbox" action={<Pill tone={reportSubmitted ? "danger" : "success"}>{reportSubmitted ? "1 new" : "Clear"}</Pill>} />
        <div className="inbox-tabs"><button className="active">Open</button><button>Waiting</button><button>Resolved</button></div>
        <button className="inbox-item selected"><span className="severity-indicator" /><img src="/assets/patient-photo-v2.png" alt="" /><div><strong>Emily Carter</strong><p>{reportSubmitted ? "Bite feels high after restoration" : "Recovery check review"}</p><small>Tooth #30 · Day 1 · just now</small></div><Pill tone={reportSubmitted ? "danger" : "warning"}>{reportSubmitted ? "New" : "Review"}</Pill></button>
        <button className="inbox-item"><span /><div className="initial-avatar">JR</div><div><strong>James Reed</strong><p>Swelling question</p><small>Tooth #18 · Day 3 · 42 min</small></div><Pill tone="warning">Waiting</Pill></button>
      </Card>
      <Card className="span-8 case-review">
        <CardHead title="Case review" action={<div className="tag-row"><Pill tone="warning">Priority: medium</Pill><Pill tone="info">Unassigned</Pill></div>} />
        <div className="case-header"><img src="/assets/patient-photo-v2.png" alt="" /><div><h2>Emily Carter</h2><p>Composite restoration · Tooth #30 · Day 1</p></div><Button icon="person_add">Assign</Button><Button icon="more_horiz">More</Button></div>
        <div className="case-content">
          <div className="symptom-summary"><span className="eyebrow">PATIENT REPORT</span><h3>Bite feels high</h3><p>Started this morning · About the same · Concern 4/10</p><blockquote>“The filling touches first when I close my teeth. It is not very painful, but it feels uneven.”</blockquote></div>
          <div className="context-summary"><span className="eyebrow">ATTACHED CONTEXT</span>{[["dentistry", "Treatment", "Composite restoration · yesterday"], ["monitor_heart", "Latest check", "Pain 2/10 · no swelling"], ["medication", "Medication", "Ibuprofen once"], ["trending_down", "Trend", "Recovery otherwise improving"]].map(([icon, label, value]) => <div key={label}><Icon>{icon}</Icon><p><strong>{label}</strong><span>{value}</span></p></div>)}</div>
        </div>
        <button className="context-jump" onClick={() => onNavigate("DR-05")}><Icon>open_in_new</Icon>Open full recovery plan and trend</button>
      </Card>
      <Card className="span-8 response-workspace">
        <CardHead title="Response & disposition" />
        <div className="response-types">{["Reply", "Request information", "Schedule visit", "Team handoff"].map((item, index) => <button className={index === 0 ? "active" : ""} key={item}>{item}</button>)}</div>
        <label>Message to patient<textarea value={reply} onChange={(event) => setReply(event.target.value)} /></label>
        <div className="disposition-grid">
          <label>Clinical outcome<select><option>Recommend short follow-up</option><option>Reassure and monitor</option><option>Urgent review</option></select></label>
          <label>Owner<select><option>Dr. Michael Chen</option><option>Sarah Miller</option><option>Lena Kim</option></select></label>
        </div>
        <div className="inline-actions"><Button icon="save">Save note</Button><Button variant="primary" icon="send" onClick={() => { setDoctorFollowupReply(true); setReportSubmitted(false); showToast("Reply sent to PT-06."); }}>Send response</Button></div>
      </Card>
      <Card className="span-4 case-actions">
        <CardHead title="Next action" />
        <Button icon="event" onClick={() => { setFollowupCreated(true); showToast("Follow-up task added to both home views."); }}>Create follow-up visit</Button>
        <Button icon="group_add">Hand off to team</Button>
        <Button variant="primary" icon="task_alt" disabled={!doctorFollowupReply} onClick={() => { showToast("Report resolved and archived."); onNavigate("DR-01"); }}>Resolve report</Button>
        {followupCreated && <div className="notice notice-success"><Icon>event_available</Icon><div><strong>Follow-up task created</strong><p>Visible on PT-01 and DR-01.</p></div></div>}
      </Card>
    </div>
  );
}

function BottomBar({
  role,
  page,
  onNavigate,
  showToast,
}: {
  role: Role;
  page: PageId;
  onNavigate: (id: PageId) => void;
  showToast: (message: string) => void;
}) {
  const home: PageId = role === "patient" ? "PT-01" : "DR-01";
  const actions: Partial<Record<PageId, { primary?: [string, string, PageId?]; secondary?: [string, string] }>> = {
    "PT-01": { primary: ["arrow_forward", "Open current task", "PT-02"], secondary: ["clinical_notes", "Report a problem"] },
    "PT-02": { primary: ["arrow_forward", "Continue to check", "PT-03"], secondary: ["bookmark", "Save for later"] },
    "PT-03": { primary: ["visibility", "Review explanation", "PT-02"], secondary: ["save", "Save progress"] },
    "PT-04": { secondary: ["lock", "Session navigation locked"] },
    "PT-05": { primary: ["clinical_notes", "Report a concern", "PT-06"], secondary: ["bookmark", "Save plan"] },
    "PT-06": { primary: ["healing", "Back to recovery", "PT-05"], secondary: ["save", "Save draft"] },
    "DR-01": { primary: ["edit", "Open current task", "DR-02"], secondary: ["chair", "Begin chairside"] },
    "DR-02": { primary: ["visibility", "Preview patient version", "PT-02"], secondary: ["save", "Save draft"] },
    "DR-03": { primary: ["edit", "Edit source content", "DR-02"], secondary: ["save", "Save workspace"] },
    "DR-04": { secondary: ["lock", "Live console active"] },
    "DR-05": { primary: ["event_repeat", "Open follow-up inbox", "DR-06"], secondary: ["save", "Save plan"] },
    "DR-06": { primary: ["healing", "Recovery monitoring", "DR-05"], secondary: ["save", "Save case note"] },
  };
  const config = actions[page] ?? {};
  return (
    <footer className="action-bar">
      <div className="sync-copy"><Icon>{page.includes("04") ? "sensors" : "sync"}</Icon><span>{page.includes("04") ? "Live encounter connected" : "Shared record synchronized"}</span></div>
      <div className="bar-actions">
        {page !== home && !page.includes("04") && <Button icon="arrow_back" onClick={() => onNavigate(home)}>{role === "patient" ? "Patient home" : "Patient overview"}</Button>}
        {config.secondary && <Button icon={config.secondary[0]} onClick={() => showToast(config.secondary?.[1] ?? "Saved")}>{config.secondary[1]}</Button>}
        {config.primary && <Button variant="primary" icon={config.primary[0]} onClick={() => config.primary?.[2] ? onNavigate(config.primary[2]) : showToast(config.primary?.[1] ?? "Done")}>{config.primary[1]}</Button>}
      </div>
    </footer>
  );
}

export default function Home() {
  const [page, setPage] = useState<PageId>("PT-01");
  const [toast, setToast] = useState<{ message: string; icon: string } | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
  const [doctorReplied, setDoctorReplied] = useState(false);
  const [published, setPublished] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Composite Restoration");
  const [planConfirmed, setPlanConfirmed] = useState(false);
  const [chairsideRequest, setChairsideRequest] = useState(false);
  const [chairsideResolved, setChairsideResolved] = useState(false);
  const [recoveryPublished, setRecoveryPublished] = useState(false);
  const [recoveryCheckSubmitted, setRecoveryCheckSubmitted] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [doctorFollowupReply, setDoctorFollowupReply] = useState(false);
  const [followupCreated, setFollowupCreated] = useState(false);
  const role: Role = page.startsWith("PT") ? "patient" : "clinician";

  const showToast = (message: string) => {
    const normalized = message.toLowerCase();
    const icon = normalized.includes("locked")
      ? "lock"
      : normalized.includes("reset")
        ? "restart_alt"
        : normalized.includes("backend")
          ? "construction"
          : "check_circle";
    setToast({ message, icon });
  };

  const liveStatus = useMemo(() => {
    if (page === "DR-02" && published) return { label: "Published · Version 2", tone: "success" as Tone };
    if (page === "PT-02" && published) return { label: "Version 2 · Published", tone: "success" as Tone };
    if (page === "DR-03" && doctorReplied) return { label: "Ready to confirm", tone: "success" as Tone };
    if (page === "PT-03" && doctorReplied) return { label: "Doctor replied", tone: "success" as Tone };
    if (page === "DR-05" && recoveryPublished) return { label: "Plan published", tone: "success" as Tone };
    if (page === "PT-05" && recoveryCheckSubmitted) return { label: "Check-in complete", tone: "success" as Tone };
    if (page === "DR-06" && !reportSubmitted) return { label: "Inbox reviewed", tone: "success" as Tone };
    if (page === "PT-06" && doctorFollowupReply) return { label: "Care team replied", tone: "success" as Tone };
    return null;
  }, [page, published, doctorReplied, recoveryPublished, recoveryCheckSubmitted, reportSubmitted, doctorFollowupReply]);

  const activityItems = useMemo(() => {
    const items: Array<{ icon: string; title: string; note: string; target: PageId }> = [];
    if (followupCreated) items.unshift({ icon: "event_available", title: "Follow-up visit created", note: "Visible on both home views", target: "PT-01" });
    if (doctorFollowupReply) items.unshift({ icon: "forum", title: "Care team replied", note: "Patient report updated", target: "PT-06" });
    if (reportSubmitted) items.unshift({ icon: "clinical_notes", title: "New recovery report", note: "Added to the clinician inbox", target: "DR-06" });
    if (recoveryCheckSubmitted) items.unshift({ icon: "monitor_heart", title: "Recovery check submitted", note: "Pain and swelling trend updated", target: "DR-05" });
    if (recoveryPublished) items.unshift({ icon: "healing", title: "Recovery plan published", note: "Available in the patient app", target: "PT-05" });
    if (chairsideResolved) items.unshift({ icon: "task_alt", title: "Chairside request resolved", note: "Live session can continue", target: "PT-04" });
    if (chairsideRequest) items.unshift({ icon: "pan_tool", title: "Patient requested a pause", note: "Clinician console notified", target: "DR-04" });
    if (planConfirmed) items.unshift({ icon: "fact_check", title: "Treatment plan confirmed", note: "Preference shared with the clinic", target: "DR-03" });
    if (doctorReplied) items.unshift({ icon: "mark_chat_read", title: "Doctor answered a question", note: "Patient alignment is ready", target: "PT-03" });
    if (questionSubmitted) items.unshift({ icon: "help", title: "Patient question submitted", note: "Clinician review is required", target: "DR-03" });
    if (published) items.unshift({ icon: "publish", title: "Explanation published", note: "Patient version is now available", target: "PT-02" });
    return items;
  }, [
    followupCreated,
    doctorFollowupReply,
    reportSubmitted,
    recoveryCheckSubmitted,
    recoveryPublished,
    chairsideResolved,
    chairsideRequest,
    planConfirmed,
    doctorReplied,
    questionSubmitted,
    published,
  ]);

  const completedMilestones = [
    published,
    questionSubmitted,
    doctorReplied,
    planConfirmed,
    chairsideResolved,
    recoveryPublished,
    recoveryCheckSubmitted,
    doctorFollowupReply,
  ].filter(Boolean).length;
  const demoProgress = Math.round((completedMilestones / 8) * 100);

  useEffect(() => {
    const applyHash = () => {
      const candidate = window.location.hash.replace("#", "").toUpperCase() as PageId;
      if (pageIds.includes(candidate)) setPage(candidate);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  useEffect(() => {
    const hydrateTimer = window.setTimeout(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem(demoStorageKey) ?? "{}") as Record<string, unknown>;
        if (typeof saved.questionSubmitted === "boolean") setQuestionSubmitted(saved.questionSubmitted);
        if (typeof saved.doctorReplied === "boolean") setDoctorReplied(saved.doctorReplied);
        if (typeof saved.published === "boolean") setPublished(saved.published);
        if (typeof saved.selectedOption === "string") setSelectedOption(saved.selectedOption);
        if (typeof saved.planConfirmed === "boolean") setPlanConfirmed(saved.planConfirmed);
        if (typeof saved.chairsideRequest === "boolean") setChairsideRequest(saved.chairsideRequest);
        if (typeof saved.chairsideResolved === "boolean") setChairsideResolved(saved.chairsideResolved);
        if (typeof saved.recoveryPublished === "boolean") setRecoveryPublished(saved.recoveryPublished);
        if (typeof saved.recoveryCheckSubmitted === "boolean") setRecoveryCheckSubmitted(saved.recoveryCheckSubmitted);
        if (typeof saved.reportSubmitted === "boolean") setReportSubmitted(saved.reportSubmitted);
        if (typeof saved.doctorFollowupReply === "boolean") setDoctorFollowupReply(saved.doctorFollowupReply);
        if (typeof saved.followupCreated === "boolean") setFollowupCreated(saved.followupCreated);
      } catch {
        window.localStorage.removeItem(demoStorageKey);
      } finally {
        setHydrated(true);
      }
    }, 0);
    return () => window.clearTimeout(hydrateTimer);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const dismissTimer = window.setTimeout(() => setToast(null), 3400);
    return () => window.clearTimeout(dismissTimer);
  }, [toast]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      demoStorageKey,
      JSON.stringify({
        questionSubmitted,
        doctorReplied,
        published,
        selectedOption,
        planConfirmed,
        chairsideRequest,
        chairsideResolved,
        recoveryPublished,
        recoveryCheckSubmitted,
        reportSubmitted,
        doctorFollowupReply,
        followupCreated,
      }),
    );
  }, [
    hydrated,
    questionSubmitted,
    doctorReplied,
    published,
    selectedOption,
    planConfirmed,
    chairsideRequest,
    chairsideResolved,
    recoveryPublished,
    recoveryCheckSubmitted,
    reportSubmitted,
    doctorFollowupReply,
    followupCreated,
  ]);

  useEffect(() => {
    const handlePreviewAction = (event: Event) => {
      const message =
        (event as CustomEvent<{ message?: string }>).detail?.message ??
        "This action is ready for backend integration.";
      showToast(message);
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setGuideOpen(false);
      setActivityOpen(false);
    };
    window.addEventListener("dentalign:preview-action", handlePreviewAction);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("dentalign:preview-action", handlePreviewAction);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const navigate = (target: PageId) => {
    const validLiveTransition =
      target === page ||
      target === rolePair[page] ||
      (page === "DR-04" && target === "DR-05") ||
      (page === "PT-04" && target === "PT-01");
    if ((page === "PT-04" || page === "DR-04") && !validLiveTransition) {
      showToast("Navigation is locked during a live treatment session.");
      return;
    }
    if (window.location.hash !== `#${target.toLowerCase()}`) {
      window.location.hash = target.toLowerCase();
    } else {
      setPage(target);
    }
    document.querySelector(".content")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetDemo = () => {
    setQuestionSubmitted(false);
    setDoctorReplied(false);
    setPublished(false);
    setSelectedOption("Composite Restoration");
    setPlanConfirmed(false);
    setChairsideRequest(false);
    setChairsideResolved(false);
    setRecoveryPublished(false);
    setRecoveryCheckSubmitted(false);
    setReportSubmitted(false);
    setDoctorFollowupReply(false);
    setFollowupCreated(false);
    setGuideOpen(false);
    setActivityOpen(false);
    window.localStorage.removeItem(demoStorageKey);
    window.location.hash = "pt-01";
    setPage("PT-01");
    showToast("Demo reset to a clean patient journey.");
  };

  const screen = useMemo(() => {
    switch (page) {
      case "PT-01":
        return <PatientHome onNavigate={navigate} reviewed={published || questionSubmitted} followupCreated={followupCreated} recoveryPublished={recoveryPublished} />;
      case "DR-01":
        return <ClinicianOverview onNavigate={navigate} questionSubmitted={questionSubmitted} recoveryCheckSubmitted={recoveryCheckSubmitted} followupCreated={followupCreated} />;
      case "PT-02":
        return <PatientExplanation onNavigate={navigate} questionSubmitted={questionSubmitted} setQuestionSubmitted={setQuestionSubmitted} selectedOption={selectedOption} setSelectedOption={setSelectedOption} showToast={showToast} />;
      case "DR-02":
        return <ClinicianEditor onNavigate={navigate} published={published} setPublished={setPublished} selectedOption={selectedOption} setSelectedOption={setSelectedOption} showToast={showToast} />;
      case "PT-03":
        return <PatientAlignment onNavigate={navigate} doctorReplied={doctorReplied} planConfirmed={planConfirmed} setPlanConfirmed={setPlanConfirmed} selectedOption={selectedOption} showToast={showToast} />;
      case "DR-03":
        return <ClinicianAlignment onNavigate={navigate} questionSubmitted={questionSubmitted} doctorReplied={doctorReplied} setDoctorReplied={setDoctorReplied} setQuestionSubmitted={setQuestionSubmitted} showToast={showToast} />;
      case "PT-04":
        return <PatientChairside chairsideRequest={chairsideRequest} setChairsideRequest={setChairsideRequest} chairsideResolved={chairsideResolved} showToast={showToast} />;
      case "DR-04":
        return <ClinicianChairside chairsideRequest={chairsideRequest} setChairsideRequest={setChairsideRequest} chairsideResolved={chairsideResolved} setChairsideResolved={setChairsideResolved} onNavigate={navigate} showToast={showToast} />;
      case "PT-05":
        return <PatientRecovery onNavigate={navigate} recoveryPublished={recoveryPublished} recoveryCheckSubmitted={recoveryCheckSubmitted} setRecoveryCheckSubmitted={setRecoveryCheckSubmitted} showToast={showToast} />;
      case "DR-05":
        return <ClinicianRecovery recoveryPublished={recoveryPublished} setRecoveryPublished={setRecoveryPublished} recoveryCheckSubmitted={recoveryCheckSubmitted} onNavigate={navigate} showToast={showToast} />;
      case "PT-06":
        return <PatientReport reportSubmitted={reportSubmitted} setReportSubmitted={setReportSubmitted} doctorFollowupReply={doctorFollowupReply} onNavigate={navigate} showToast={showToast} />;
      case "DR-06":
        return <ClinicianFollowup reportSubmitted={reportSubmitted} setReportSubmitted={setReportSubmitted} doctorFollowupReply={doctorFollowupReply} setDoctorFollowupReply={setDoctorFollowupReply} followupCreated={followupCreated} setFollowupCreated={setFollowupCreated} onNavigate={navigate} showToast={showToast} />;
    }
  }, [page, questionSubmitted, doctorReplied, published, selectedOption, planConfirmed, chairsideRequest, chairsideResolved, recoveryPublished, recoveryCheckSubmitted, reportSubmitted, doctorFollowupReply, followupCreated]);

  return (
    <main className="portal-shell">
      <div className="system-bar">
        <div className="system-brand">
          <span>DA</span>
          <div><strong>DentAlign</strong><small>{hydrated ? "Demo progress saved on this device" : "Loading demo state…"}</small></div>
        </div>
        <div className="screen-switcher">
          <span>12-screen system</span>
          <select value={page} onChange={(event) => navigate(event.target.value as PageId)} aria-label="Jump to a prototype screen">
            <optgroup label="Patient app">{pageIds.slice(0, 6).map((id) => <option key={id} value={id}>{id} · {pageMeta[id].title}</option>)}</optgroup>
            <optgroup label="Clinician app">{pageIds.slice(6).map((id) => <option key={id} value={id}>{id} · {pageMeta[id].title}</option>)}</optgroup>
          </select>
        </div>
        <div className="system-tools">
          <div className="demo-progress" aria-label={`${demoProgress}% of the demo flow completed`}>
            <span><i style={{ width: `${demoProgress}%` }} /></span>
            <strong>{demoProgress}%</strong>
          </div>
          <button className="system-action" onClick={() => { setGuideOpen(true); setActivityOpen(false); }}>
            <Icon>explore</Icon><span>Guide</span>
          </button>
          <div className="activity-anchor">
            <button
              className={`system-action ${activityOpen ? "active" : ""}`}
              onClick={() => setActivityOpen((value) => !value)}
              aria-expanded={activityOpen}
              aria-controls="demo-activity"
            >
              <Icon>notifications</Icon><span>Updates</span>
              {activityItems.length > 0 && <i className="activity-count">{activityItems.length}</i>}
            </button>
            {activityOpen && (
              <section className="activity-popover" id="demo-activity" aria-label="Shared demo updates">
                <div className="popover-head">
                  <div><strong>Shared updates</strong><span>Patient and clinician actions stay linked</span></div>
                  <button onClick={() => setActivityOpen(false)} aria-label="Close updates"><Icon>close</Icon></button>
                </div>
                <div className="activity-list">
                  {activityItems.length === 0 ? (
                    <div className="activity-empty"><Icon>sync</Icon><p><strong>No updates yet</strong><span>Complete an action to see it appear across roles.</span></p></div>
                  ) : (
                    activityItems.map((item) => (
                      <button key={`${item.target}-${item.title}`} onClick={() => { navigate(item.target); setActivityOpen(false); }}>
                        <span><Icon>{item.icon}</Icon></span>
                        <p><strong>{item.title}</strong><small>{item.note}</small></p>
                        <Icon>chevron_right</Icon>
                      </button>
                    ))
                  )}
                </div>
              </section>
            )}
          </div>
          <button className="system-action" onClick={resetDemo}><Icon>restart_alt</Icon><span>Reset</span></button>
          <div className="role-segment" aria-label="Role switch">
            <button className={role === "patient" ? "active" : ""} onClick={() => navigate(role === "patient" ? page : rolePair[page])}><Icon>person</Icon>Patient</button>
            <button className={role === "clinician" ? "active" : ""} onClick={() => navigate(role === "clinician" ? page : rolePair[page])}><Icon>stethoscope</Icon>Clinician</button>
          </div>
        </div>
      </div>
      <div className={`app-frame ${role} ${page.includes("04") ? "live-mode" : ""}`}>
        <Sidebar role={role} page={page} onNavigate={navigate} onSwitch={() => navigate(rolePair[page])} />
        <Header
          role={role}
          page={page}
          onSwitch={() => navigate(rolePair[page])}
          status={liveStatus?.label}
          statusTone={liveStatus?.tone}
        />
        <div className="content">
          {!page.includes("04") && <Journey role={role} page={page} onNavigate={navigate} />}
          {screen}
        </div>
        <BottomBar role={role} page={page} onNavigate={navigate} showToast={showToast} />
        {toast && <div className="toast" role="status" aria-live="polite"><Icon>{toast.icon}</Icon><span>{toast.message}</span><i /></div>}
      </div>
      {guideOpen && (
        <div className="guide-overlay" onClick={() => setGuideOpen(false)}>
          <section className="guide-dialog" role="dialog" aria-modal="true" aria-labelledby="guide-title" onClick={(event) => event.stopPropagation()}>
            <div className="guide-head">
              <div><span className="eyebrow">INTERACTIVE DEMO</span><h2 id="guide-title">Explore the connected care journey</h2><p>Start anywhere. Each patient action can create a matching clinician task, and progress is saved on this device.</p></div>
              <button onClick={() => setGuideOpen(false)} aria-label="Close demo guide"><Icon>close</Icon></button>
            </div>
            <div className="guide-grid">
              {guideSteps.map((step, index) => {
                const target = role === "patient" ? step.patient : step.clinician;
                return (
                  <button key={step.title} onClick={() => { navigate(target); setGuideOpen(false); }}>
                    <span>{index + 1}</span>
                    <Icon>{step.icon}</Icon>
                    <div><strong>{step.title}</strong><p>{step.description}</p></div>
                    <Icon>arrow_forward</Icon>
                  </button>
                );
              })}
            </div>
            <div className="guide-foot">
              <div><Icon>info</Icon><p><strong>Prototype mode</strong><span>Data is fictional and stored only in this browser. Backend, accounts and live clinic integrations come next.</span></p></div>
              <Button variant="primary" icon="play_arrow" onClick={() => { window.location.hash = "pt-01"; setPage("PT-01"); setGuideOpen(false); }}>Start patient flow</Button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
