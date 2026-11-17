import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  FileDown,
  Printer,
  Sun,
  Moon,
  Check,
  X,
  Plus,
  Trash2,
  Edit3,
  Copy,
  RefreshCw,
  ShieldCheck,
  LogOut,
  Video,
  Award,
  Database,
  Upload,
  FileText,
  Eye,
  Phone
} from 'lucide-react';

export type ApprovalStatus = 'مصادق عليه' | 'في طور المصادقة' | 'ملغى';
export type AcademicLevel = 'طالب(ة) ماستر' | 'طالب(ة) باحث(ة) في الدكتوراه';

export interface SessionItem {
  id: string;
  session_date: string;
  topic: string;
  location: string;
  zoom_url?: string;
}

export interface RegistrationRecord {
  id: string;
  reg_code: string;
  full_name: string;
  dob: string;
  cne: string;
  phone_whatsapp: string;
  email: string;
  access_password: string;
  university: string;
  academic_level: AcademicLevel;
  specialty: string;
  topic: string;
  session_date: string;
  student_card_name: string;
  student_card_url: string;
  degree_cert_name: string;
  degree_cert_url: string;
  status: ApprovalStatus;
  zoom_attended: boolean;
}

const DEFAULT_SB_URL = '';
const DEFAULT_SB_KEY = '';

const UNIVERSITIES: string[] = [
  'جامعة محمد الخامس بالرباط - كلية الحقوق أكدال',
  'جامعة محمد الخامس بالرباط - كلية الحقوق السويسي',
  'جامعة سيدي محمد بن عبد الله بفاس',
  'جامعة القاضي عياض بمراكش',
  'جامعة الحسن الثاني بالدار البيضاء',
  'جامعة مولاي إسماعيل بمكناس',
  'جامعة عبد المالك السعدي بطنجة',
  'جامعة ابن طفيل بالقنيطرة',
  'جامعة محمد الأول بوجدة',
  'جامعة ابن زهر بأكادير'
];

const SPECIALTIES: string[] = [
  'القانون الخاص والعلوم الجنائية',
  'القانون العام والعلوم السياسية',
  'قانون الأعمال والمقاولات',
  'الوساطة والتحكيم والعدالة البديلة',
  'الرقمنة والأمن السيبراني القانوني',
  'الحكامة القضائية وحقوق الإنسان'
];

const INITIAL_SESSIONS: SessionItem[] = [
  { id: 'ses-1', session_date: '2026-12-03', topic: 'استقلال السلطة القضائية وضمانات المحاكمة العادلة', location: 'Zoom', zoom_url: 'https://zoom.us/j/91420261001' },
  { id: 'ses-2', session_date: '2026-12-17', topic: 'الرقمنة والذكاء الاصطناعي في خدمة العدالة الناجعة', location: 'Zoom', zoom_url: 'https://zoom.us/j/91420261002' },
  { id: 'ses-3', session_date: '2027-01-14', topic: 'التخليق القضائي وآليات التفتيش والحكامة', location: 'Zoom', zoom_url: 'https://zoom.us/j/91420261003' },
  { id: 'ses-4', session_date: '2027-01-28', topic: 'البدائل العقابية والعدالة التصالحية في ضوء التشريع المغربي', location: 'Zoom', zoom_url: 'https://zoom.us/j/91420261004' }
];

function makeSampleSvgDoc(title: string, subtitle: string, code: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">
    <rect width="640" height="400" rx="20" fill="#07262e"/>
    <rect x="20" y="20" width="600" height="360" rx="14" fill="none" stroke="#d4af37" stroke-width="2"/>
    <text x="320" y="130" text-anchor="middle" fill="#f9e58a" font-family="Cairo, sans-serif" font-size="26" font-weight="bold">${title}</text>
    <text x="320" y="190" text-anchor="middle" fill="#ffffff" font-family="Cairo, sans-serif" font-size="20">${subtitle}</text>
    <text x="320" y="260" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="16">${code}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const INITIAL_REGISTRATIONS: RegistrationRecord[] = [
  {
    id: 'reg-101',
    reg_code: 'JSR-2026-1001',
    full_name: 'سلمى بنعلي',
    dob: '2001-05-14',
    cne: 'J139482015',
    phone_whatsapp: '+212661234567',
    email: 'salma.benali@um5.ac.ma',
    access_password: 'JSR-8421',
    university: 'جامعة محمد الخامس بالرباط - كلية الحقوق أكدال',
    academic_level: 'طالب(ة) ماستر',
    specialty: 'القانون الخاص والعلوم الجنائية',
    topic: 'استقلال السلطة القضائية وضمانات المحاكمة العادلة',
    session_date: '2026-12-03',
    student_card_name: 'بطاقة_الطالب_سلمى_بنعلي.png',
    student_card_url: makeSampleSvgDoc('بطاقة الطالب الجامعية', 'سلمى بنعلي — جامعة محمد الخامس بالرباط', 'CNE: J139482015'),
    degree_cert_name: 'شهادة_الإجازة_سلمى_بنعلي.png',
    degree_cert_url: makeSampleSvgDoc('شهادة الإجازة في الدراسات الأساسية', 'تخصص القانون الخاص — سلمى بنعلي', 'JSR-2026-1001'),
    status: 'مصادق عليه',
    zoom_attended: true
  },
  {
    id: 'reg-102',
    reg_code: 'JSR-2026-1002',
    full_name: 'يوسف التازي',
    dob: '1997-11-22',
    cne: 'N148201943',
    phone_whatsapp: '+212662987654',
    email: 'youssef.tazi@usmba.ac.ma',
    access_password: 'JSR-5190',
    university: 'جامعة سيدي محمد بن عبد الله بفاس',
    academic_level: 'طالب(ة) باحث(ة) في الدكتوراه',
    specialty: 'الرقمنة والأمن السيبراني القانوني',
    topic: 'الرقمنة والذكاء الاصطناعي في خدمة العدالة الناجعة',
    session_date: '2026-12-17',
    student_card_name: 'بطاقة_الباحث_يوسف_التازي.png',
    student_card_url: makeSampleSvgDoc('بطاقة طالب باحث في الدكتوراه', 'يوسف التازي — جامعة سيدي محمد بن عبد الله', 'CNE: N148201943'),
    degree_cert_name: 'دبلوم_الماستر_يوسف_التازي.png',
    degree_cert_url: makeSampleSvgDoc('شهادة الماستر في القانون', 'الرقمنة والأمن السيبراني القانوني — يوسف التازي', 'JSR-2026-1002'),
    status: 'في طور المصادقة',
    zoom_attended: false
  },
  {
    id: 'reg-103',
    reg_code: 'JSR-2026-1003',
    full_name: 'حمزة العمراني',
    dob: '2000-03-08',
    cne: 'M135729104',
    phone_whatsapp: '+212663456789',
    email: 'hamza.elamrani@umi.ac.ma',
    access_password: 'JSR-3318',
    university: 'جامعة مولاي إسماعيل بمكناس',
    academic_level: 'طالب(ة) ماستر',
    specialty: 'الحكامة القضائية وحقوق الإنسان',
    topic: 'التخليق القضائي وآليات التفتيش والحكامة',
    session_date: '2027-01-14',
    student_card_name: 'بطاقة_الطالب_حمزة_العمراني.png',
    student_card_url: makeSampleSvgDoc('بطاقة الطالب الجامعية', 'حمزة العمراني — جامعة مولاي إسماعيل بمكناس', 'CNE: M135729104'),
    degree_cert_name: 'شهادة_الإجازة_حمزة_العمراني.png',
    degree_cert_url: makeSampleSvgDoc('شهادة الإجازة في القانون العام', 'الحكامة القضائية وحقوق الإنسان — حمزة العمراني', 'JSR-2026-1003'),
    status: 'ملغى',
    zoom_attended: false
  }
];

const COLUMN_LABELS: Record<string, string> = {
  reg_code: 'المرجع',
  full_name: 'الاسم الكامل',
  cne: 'الرقم الوطني للطالب',
  phone_whatsapp: 'الهاتف (واتساب)',
  email: 'البريد الإلكتروني',
  university: 'المؤسسة الجامعية',
  academic_level: 'المستوى الدراسي',
  specialty: 'التخصص',
  topic: 'الموضوع',
  session_date: 'التاريخ',
  status: 'الحالة'
};

const SQL_SCHEMA = `CREATE TABLE IF NOT EXISTS public.joussour_sessions (
  id TEXT PRIMARY KEY,
  session_date DATE NOT NULL,
  topic TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Zoom',
  zoom_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.joussour_registrations (
  id TEXT PRIMARY KEY,
  reg_code TEXT NOT NULL,
  full_name TEXT NOT NULL,
  dob DATE NOT NULL,
  cne TEXT NOT NULL,
  phone_whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  access_password TEXT NOT NULL,
  university TEXT NOT NULL,
  academic_level TEXT NOT NULL,
  specialty TEXT NOT NULL,
  topic TEXT NOT NULL,
  session_date DATE NOT NULL,
  student_card_name TEXT NOT NULL,
  student_card_url TEXT NOT NULL,
  degree_cert_name TEXT NOT NULL,
  degree_cert_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'في طور المصادقة',
  zoom_attended BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.joussour_registrations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all on joussour_registrations" ON public.joussour_registrations;
CREATE POLICY "Allow all on joussour_registrations"
  ON public.joussour_registrations FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);`;

function safeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors in restricted environments
  }
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('تعذر قراءة الملف المرفق'));
    reader.readAsDataURL(file);
  });
}

const JoussourLogo: React.FC<{ size?: 'md' | 'lg'; isLight?: boolean }> = ({ size = 'md', isLight = false }) => {
  const svgW = size === 'lg' ? 'w-44 sm:w-48' : 'w-32 sm:w-40 lg:w-44';
  const archStroke = isLight ? '#0f4c5c' : '#f0fdfa';

  return (
    <div className="flex flex-col items-center leading-none select-none">
      <svg className={`${svgW} h-auto`} viewBox="0 0 220 68" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="جسور">
        <defs>
          <linearGradient id="joussourGoldTsx" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9E58A" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#9A7214" />
          </linearGradient>
        </defs>
        <path d="M38 35 C37 46, 28 54, 15 56" stroke="url(#joussourGoldTsx)" strokeWidth="4.2" strokeLinecap="round" />
        <circle cx="57" cy="31" r="6.5" stroke="url(#joussourGoldTsx)" strokeWidth="3.6" />
        <path d="M63 33 C63 46, 54 55, 42 57" stroke="url(#joussourGoldTsx)" strokeWidth="4" strokeLinecap="round" />
        <path d="M64 38 L145 38" stroke="url(#joussourGoldTsx)" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M74 38 C74 22, 92 22, 92 38" stroke={archStroke} strokeWidth="2.8" strokeLinecap="round" />
        <path d="M95 38 C95 16, 117 16, 117 38" stroke="url(#joussourGoldTsx)" strokeWidth="3" strokeLinecap="round" />
        <path d="M120 38 C120 22, 138 22, 138 38" stroke={archStroke} strokeWidth="2.8" strokeLinecap="round" />
        <line x1="93.5" y1="24" x2="93.5" y2="42" stroke="url(#joussourGoldTsx)" strokeWidth="1.6" opacity="0.85" />
        <line x1="118.5" y1="24" x2="118.5" y2="42" stroke="url(#joussourGoldTsx)" strokeWidth="1.6" opacity="0.85" />
        <path d="M145 38 C154 38, 166 36, 174 28 C162 24, 152 25, 146 28" stroke="url(#joussourGoldTsx)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M167 34 C178 40, 176 54, 158 56 C146 57, 138 52, 135 46" stroke="url(#joussourGoldTsx)" strokeWidth="3.8" strokeLinecap="round" />
        <rect x="155" y="43" width="4.8" height="4.8" rx="0.8" transform="rotate(45 157.4 45.4)" fill="#F9E58A" />
      </svg>
      <div className="flex items-center gap-1.5 -mt-1">
        <span className="w-3 h-[1px] bg-gradient-to-l from-amber-400/70 to-transparent" />
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            letterSpacing: '0.35em'
          }}
          className={`${size === 'lg' ? 'text-xs' : 'text-[10px] sm:text-[11px]'} font-bold uppercase text-amber-400`}
        >
          JOUSSOUR
        </span>
        <span className="w-3 h-[1px] bg-gradient-to-r from-amber-400/70 to-transparent" />
      </div>
    </div>
  );
};

export default function App() {
  const [isLight, setIsLight] = useState<boolean>(() => safeGet('joussour_theme_light', false));
  const [route, setRoute] = useState<'#register' | '#participant' | '#admin'>('#register');
  const [adminTab, setAdminTab] = useState<'requests' | 'settings'>('requests');

  const [sessions, setSessions] = useState<SessionItem[]>(() => safeGet('joussour_sessions_v4', INITIAL_SESSIONS));
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>(() => safeGet('joussour_registrations_v4', INITIAL_REGISTRATIONS));

  const [adminCreds, setAdminCreds] = useState<{ username: string; password: string }>(() =>
    safeGet('joussour_admin_creds_v1', { username: 'admin@cspj.ma', password: 'Joussour@2026' })
  );
  const [adminAuth, setAdminAuth] = useState<boolean>(() => safeGet('joussour_admin_auth_v1', false));

  const [currentParticipantId, setCurrentParticipantId] = useState<string | null>(null);

  // Supabase REST / Realtime Config
  const [sbUrl, setSbUrl] = useState<string>(() => safeGet('joussour_sb_url', DEFAULT_SB_URL));
  const [sbKey, setSbKey] = useState<string>(() => safeGet('joussour_sb_key', DEFAULT_SB_KEY));
  const [isLiveDb, setIsLiveDb] = useState<boolean>(false);
  const [diagMsg, setDiagMsg] = useState<string>('');

  // Registration Form State
  const [regFullName, setRegFullName] = useState('');
  const [regDob, setRegDob] = useState('');
  const [regCne, setRegCne] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regUniversity, setRegUniversity] = useState(UNIVERSITIES[0]);
  const [regLevel, setRegLevel] = useState<AcademicLevel>('طالب(ة) ماستر');
  const [regSpecialty, setRegSpecialty] = useState('');
  const [regTopic, setRegTopic] = useState(INITIAL_SESSIONS[0].topic);
  const [regDate, setRegDate] = useState(INITIAL_SESSIONS[0].session_date);
  const [studentCardFile, setStudentCardFile] = useState<{ name: string; url: string } | null>(null);
  const [degreeCertFile, setDegreeCertFile] = useState<{ name: string; url: string } | null>(null);
  const [regSuccessModal, setRegSuccessModal] = useState<{ email: string; pass: string } | null>(null);

  // Participant Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Admin Login & Filters State
  const [adminLoginUser, setAdminLoginUser] = useState('');
  const [adminLoginPass, setAdminLoginPass] = useState('');
  const [searchByName, setSearchByName] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterTopic, setFilterTopic] = useState('');
  const [filterUniversity, setFilterUniversity] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advCode, setAdvCode] = useState('');
  const [advCne, setAdvCne] = useState('');
  const [advStatus, setAdvStatus] = useState('');
  const [advBirthYear, setAdvBirthYear] = useState('');

  // Modals & Editors
  const [editingRecord, setEditingRecord] = useState<RegistrationRecord | null>(null);
  const [previewDocModal, setPreviewDocModal] = useState<{ title: string; name: string; url: string } | null>(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportTitle, setExportTitle] = useState('اللائحة الاسمية للمشاركين');
  const [exportCols, setExportCols] = useState<string[]>(Object.keys(COLUMN_LABELS));

  // Session Editor Form
  const [sessionEditId, setSessionEditId] = useState('');
  const [sessionDateInput, setSessionDateInput] = useState('');
  const [sessionTopicInput, setSessionTopicInput] = useState('');
  const [sessionCityInput, setSessionCityInput] = useState('Zoom');
  const [sessionZoomInput, setSessionZoomInput] = useState('');

  // Admin Creds Form
  const [newAdminUser, setNewAdminUser] = useState(adminCreds.username);
  const [newAdminPass, setNewAdminPass] = useState(adminCreds.password);

  const [toast, setToast] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const triggerToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3200);
  };

  useEffect(() => {
    const syncHash = () => {
      const h = window.location.hash;
      const p = window.location.pathname;
      if (p.endsWith('/admin') || h === '#admin') setRoute('#admin');
      else if (h === '#participant') setRoute('#participant');
      else setRoute('#register');
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  const changeRoute = (next: '#register' | '#participant' | '#admin') => {
    setRoute(next);
    try {
      window.location.hash = next;
    } catch {
      // ignore hash restriction
    }
  };

  const syncWithSupabase = async (url = sbUrl, key = sbKey, silent = false) => {
    const cleanUrl = url.trim().replace(/\/$/, '');
    const cleanKey = key.trim();
    if (!cleanUrl || !cleanKey) {
      setIsLiveDb(false);
      return;
    }
    try {
      const headers = {
        apikey: cleanKey,
        Authorization: `Bearer ${cleanKey}`,
        'Content-Type': 'application/json'
      };
      const regRes = await fetch(`${cleanUrl}/rest/v1/joussour_registrations?select=*`, { headers });
      if (!regRes.ok) throw new Error(`HTTP ${regRes.status}`);
      const regData: RegistrationRecord[] = await regRes.json();

      const sesRes = await fetch(`${cleanUrl}/rest/v1/joussour_sessions?select=*`, { headers });
      const sesData: SessionItem[] = sesRes.ok ? await sesRes.json() : [];

      setRegistrations([...regData].reverse());
      if (sesData.length > 0) setSessions(sesData);
      setIsLiveDb(true);
      setDiagMsg(`متصل — إجمالي الطلبات في Supabase: ${regData.length}`);
      if (!silent) triggerToast(`تم الاتصال بـ Supabase (${regData.length} طلب)`, 'success');
    } catch (err) {
      setIsLiveDb(false);
      setDiagMsg(`تعذر الاتصال بـ Supabase: ${(err as Error).message}`);
      if (!silent) triggerToast('تعذر الاتصال بـ Supabase', 'error');
    }
  };

  useEffect(() => {
    if (sbUrl && sbKey) {
      syncWithSupabase(sbUrl, sbKey, true);
    }
  }, []);

  useEffect(() => {
    safeSet('joussour_sessions_v4', sessions);
    safeSet('joussour_registrations_v4', registrations);
  }, [sessions, registrations]);

  const sortedSessions = useMemo(
    () => [...sessions].sort((a, b) => a.session_date.localeCompare(b.session_date)),
    [sessions]
  );

  const filteredRegistrations = useMemo(() => {
    const q = searchByName.trim().toLowerCase();
    return registrations.filter((r) => {
      if (
        q &&
        !(
          r.full_name.toLowerCase().includes(q) ||
          (r.cne || '').toLowerCase().includes(q) ||
          (r.phone_whatsapp || '').toLowerCase().includes(q)
        )
      )
        return false;
      if (filterDate && r.session_date !== filterDate) return false;
      if (filterTopic && r.topic !== filterTopic) return false;
      if (filterUniversity && r.university !== filterUniversity) return false;
      if (filterSpecialty && r.specialty !== filterSpecialty) return false;
      if (filterLevel && r.academic_level !== filterLevel) return false;
      if (advCode && !r.reg_code.toLowerCase().includes(advCode.toLowerCase())) return false;
      if (advCne && !(r.cne || '').toLowerCase().includes(advCne.toLowerCase())) return false;
      if (advStatus && r.status !== advStatus) return false;
      if (advBirthYear && !String(r.dob).startsWith(advBirthYear)) return false;
      return true;
    });
  }, [
    registrations,
    searchByName,
    filterDate,
    filterTopic,
    filterUniversity,
    filterSpecialty,
    filterLevel,
    advCode,
    advCne,
    advStatus,
    advBirthYear
  ]);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'student_card' | 'degree_cert'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      triggerToast('حجم الوثيقة يجب ألا يتجاوز 5 ميغابايت', 'error');
      return;
    }
    try {
      const dataUrl = await readFileAsDataUrl(file);
      if (target === 'student_card') {
        setStudentCardFile({ name: file.name, url: dataUrl });
      } else {
        setDegreeCertFile({ name: file.name, url: dataUrl });
      }
    } catch {
      triggerToast('تعذر قراءة الملف المرفق', 'error');
    }
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentCardFile || !degreeCertFile) {
      triggerToast('يرجى إرفاق بطاقة الطالب والشهادة الجامعية', 'error');
      return;
    }
    const generatedPassword = `JSR-${Math.floor(1000 + Math.random() * 9000)}`;

    const newReg: RegistrationRecord = {
      id: `reg-${Date.now()}`,
      reg_code: `JSR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      full_name: regFullName.trim(),
      dob: regDob,
      cne: regCne.trim().toUpperCase(),
      phone_whatsapp: regPhone.trim(),
      email: regEmail.trim(),
      access_password: generatedPassword,
      university: regUniversity,
      academic_level: regLevel,
      specialty: regSpecialty.trim(),
      topic: regTopic,
      session_date: regDate,
      student_card_name: studentCardFile.name,
      student_card_url: studentCardFile.url,
      degree_cert_name: degreeCertFile.name,
      degree_cert_url: degreeCertFile.url,
      status: 'في طور المصادقة',
      zoom_attended: false
    };

    if (isLiveDb && sbUrl && sbKey) {
      const res = await fetch(`${sbUrl.replace(/\/$/, '')}/rest/v1/joussour_registrations`, {
        method: 'POST',
        headers: {
          apikey: sbKey,
          Authorization: `Bearer ${sbKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReg)
      });
      if (!res.ok) {
        triggerToast('خطأ في حفظ الطلب على Supabase', 'error');
        return;
      }
    }

    setRegistrations((prev) => [newReg, ...prev]);
    setLoginEmail(newReg.email);
    setLoginPassword(generatedPassword);
    setRegSuccessModal({ email: newReg.email, pass: generatedPassword });
    setRegFullName('');
    setRegDob('');
    setRegCne('');
    setRegPhone('');
    setRegEmail('');
    setRegSpecialty('');
    setStudentCardFile(null);
    setDegreeCertFile(null);
  };

  const handleParticipantLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const em = loginEmail.trim().toLowerCase();
    const pw = loginPassword.trim();

    const part = registrations.find((r) => r.email.toLowerCase() === em && r.access_password === pw);
    if (part) {
      setCurrentParticipantId(part.id);
      return;
    }

    triggerToast('بيانات الدخول غير صحيحة', 'error');
  };

  const handleAdminStatusChange = async (reg: RegistrationRecord, status: ApprovalStatus) => {
    if (isLiveDb && sbUrl && sbKey) {
      await fetch(`${sbUrl.replace(/\/$/, '')}/rest/v1/joussour_registrations?id=eq.${encodeURIComponent(reg.id)}`, {
        method: 'PATCH',
        headers: {
          apikey: sbKey,
          Authorization: `Bearer ${sbKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
    }
    setRegistrations((prev) => prev.map((r) => (r.id === reg.id ? { ...r, status } : r)));
    triggerToast(`تم تحديث حالة ${reg.full_name}: ${status}`, 'success');
  };

  const handleToggleZoom = async (reg: RegistrationRecord) => {
    const nextZoom = !reg.zoom_attended;
    if (isLiveDb && sbUrl && sbKey) {
      await fetch(`${sbUrl.replace(/\/$/, '')}/rest/v1/joussour_registrations?id=eq.${encodeURIComponent(reg.id)}`, {
        method: 'PATCH',
        headers: {
          apikey: sbKey,
          Authorization: `Bearer ${sbKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ zoom_attended: nextZoom })
      });
    }
    setRegistrations((prev) =>
      prev.map((r) => (r.id === reg.id ? { ...r, zoom_attended: nextZoom } : r))
    );
    triggerToast(nextZoom ? 'تم تأكيد الحضور وتفعيل الشهادة' : 'تم إلغاء تأكيد الحضور', 'success');
  };

  const exportCsvOrDoc = (format: 'print' | 'word') => {
    if (filteredRegistrations.length === 0) {
      triggerToast('لا توجد بيانات للتصدير', 'error');
      return;
    }
    if (format === 'print') {
      window.print();
      return;
    }
    const cols = exportCols.length > 0 ? exportCols : Object.keys(COLUMN_LABELS);
    const htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40" dir="rtl">
      <head><meta charset="utf-8"><title>${exportTitle}</title></head>
      <body style="font-family:'Cairo',sans-serif; direction:rtl;">
        <h2 style="text-align:center; color:#0f4c5c;">المجلس الأعلى للسلطة القضائية — منصة جسور</h2>
        <h3 style="text-align:center;">${exportTitle} (${filteredRegistrations.length})</h3>
        <table border="1" style="width:100%; border-collapse:collapse; text-align:right;">
          <thead>
            <tr style="background:#0f4c5c; color:#ffffff;">
              ${cols.map((c) => `<th style="padding:8px;">${COLUMN_LABELS[c]}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${filteredRegistrations
              .map(
                (r) =>
                  `<tr>${cols
                    .map((c) => `<td style="padding:6px;">${String((r as unknown as Record<string, unknown>)[c] ?? '')}</td>`)
                    .join('')}</tr>`
              )
              .join('')}
          </tbody>
        </table>
      </body></html>`;
    const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `joussour_list_${new Date().toISOString().slice(0, 10)}.doc`;
    a.click();
    triggerToast('تم تصدير الملف بنجاح', 'success');
  };

  const currentParticipant = registrations.find((r) => r.id === currentParticipantId) || null;

  const statusBadgeClass = (st: ApprovalStatus) =>
    st === 'مصادق عليه'
      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30'
      : st === 'ملغى'
        ? 'bg-rose-500/15 text-rose-300 border border-rose-400/30'
        : 'bg-amber-500/15 text-amber-300 border border-amber-400/30';

  const cardSurface = isLight
    ? 'bg-white/85 border-teal-900/10 text-slate-900 shadow-xl'
    : 'bg-[#09232b]/75 border-white/15 text-slate-50 shadow-2xl';

  const dockSurface = isLight
    ? 'bg-white/95 border-teal-900/15 text-slate-900 shadow-lg'
    : 'bg-[#0b2b35]/90 border-white/15 text-slate-50 shadow-2xl';

  const fieldSurface = isLight
    ? 'bg-white border-teal-900/15 text-slate-900 focus:border-amber-600'
    : 'bg-[#05151a]/80 border-white/15 text-slate-50 focus:border-amber-400';

  return (
    <div
      dir="rtl"
      style={{
        fontFamily: "'Cairo', 'Plus Jakarta Sans', sans-serif",
        background: isLight
          ? 'linear-gradient(135deg, #dff2ef 0%, #f4faf9 48%, #f7f0e0 100%)'
          : 'linear-gradient(135deg, #030e12 0%, #07262e 50%, #061c24 100%)'
      }}
      className={`min-h-screen flex flex-col transition-colors duration-300 ${isLight ? 'text-slate-900' : 'text-slate-50'}`}
    >
      {/* Top Floating Dock */}
      <header className="sticky top-3 z-40 mx-auto max-w-[1400px] w-full px-3 sm:px-6 lg:px-10">
        <nav className={`${dockSurface} backdrop-blur-2xl border rounded-2xl px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3`}>
          <div className="flex items-center gap-3">
            <JoussourLogo size="md" isLight={isLight} />
            <div className="hidden sm:block h-8 w-px bg-current opacity-15" />
            <div className="hidden sm:block">
              <p className="text-xs font-bold opacity-90">المجلس الأعلى للسلطة القضائية</p>
              <p className="text-[11px] opacity-65">اللقاءات التواصلية عن بعد</p>
            </div>
          </div>

          {route !== '#admin' ? (
            <div className="flex items-center gap-2 sm:gap-4 order-3 sm:order-2 w-full sm:w-auto justify-between sm:justify-center pt-1.5 sm:pt-0 border-t sm:border-t-0 border-current/10">
              <button
                type="button"
                onClick={() => changeRoute('#register')}
                className={`flex-1 sm:flex-initial min-h-[40px] px-4 py-1.5 rounded-xl text-sm font-extrabold transition ${
                  route === '#register' ? 'bg-amber-500 text-slate-950 shadow' : 'opacity-85 hover:opacity-100'
                }`}
              >
                بوابة التسجيل
              </button>
              <button
                type="button"
                onClick={() => changeRoute('#participant')}
                className={`flex-1 sm:flex-initial min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                  route === '#participant' ? 'bg-amber-500/20 text-amber-400 font-bold' : 'opacity-70 hover:opacity-100'
                }`}
              >
                لقد قمت بالتسجيل
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 order-2">
              <span className="text-xs font-bold text-amber-400">لوحة الإدارة</span>
              <button
                type="button"
                onClick={() => changeRoute('#register')}
                className="px-3.5 py-1.5 rounded-xl border border-current/15 text-xs font-semibold hover:bg-white/5"
              >
                بوابة التسجيل
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 order-2 sm:order-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl border border-current/15 text-[10px] font-semibold">
              <span className={`w-2 h-2 rounded-full ${isLiveDb ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>{isLiveDb ? 'متصل' : 'محلي'}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                const next = !isLight;
                setIsLight(next);
                safeSet('joussour_theme_light', next);
              }}
              className="w-9 h-9 rounded-xl border border-current/15 flex items-center justify-center text-amber-400 hover:bg-white/5"
            >
              {isLight ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-[1400px] w-full flex-1 px-3 sm:px-6 lg:px-10 py-6 sm:py-8 space-y-6">
        {/* ==================== PAGE 1: REGISTRATION ==================== */}
        {route === '#register' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-start">
            <aside className={`lg:col-span-4 lg:sticky lg:top-24 ${cardSurface} backdrop-blur-2xl border rounded-[24px] p-4 sm:p-5 space-y-3`}>
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-extrabold text-amber-400">الرزنامة</h3>
                <span className="text-[11px] opacity-70">{sortedSessions.length} لقاءات</span>
              </div>
              <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-x-visible pb-1">
                {sortedSessions.map((s) => {
                  const selected = s.session_date === regDate;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setRegTopic(s.topic);
                        setRegDate(s.session_date);
                      }}
                      className={`shrink-0 w-56 sm:w-64 lg:w-full text-right p-3.5 rounded-[16px] border transition-all ${
                        selected ? 'border-amber-400 bg-amber-500/15' : 'border-current/10 hover:border-amber-400/40'
                      }`}
                    >
                      <span className="text-[11px] font-bold text-amber-400 block mb-1" dir="ltr">
                        {s.session_date}
                      </span>
                      <p className="text-xs font-bold leading-snug line-clamp-2">{s.topic}</p>
                    </button>
                  );
                })}
              </div>
            </aside>

            <form
              onSubmit={handleRegistrationSubmit}
              className={`lg:col-span-8 ${cardSurface} backdrop-blur-2xl border rounded-[24px] p-5 sm:p-7 lg:p-8 space-y-5`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-current/10">
                <h2 className="text-base sm:text-lg font-extrabold">طلب المشاركة</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5 opacity-85">الاسم الكامل</label>
                  <input
                    type="text"
                    required
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="سلمى بنعلي"
                    className={`${fieldSurface} w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 opacity-85">تاريخ الازدياد</label>
                  <input
                    type="date"
                    required
                    value={regDob}
                    onChange={(e) => setRegDob(e.target.value)}
                    dir="ltr"
                    className={`${fieldSurface} w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 opacity-85">الرقم الوطني للطالب (CNE / Massar)</label>
                  <input
                    type="text"
                    required
                    dir="ltr"
                    value={regCne}
                    onChange={(e) => setRegCne(e.target.value)}
                    placeholder="J139482015"
                    className={`${fieldSurface} w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none uppercase`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 opacity-85">رقم الهاتف (واتساب)</label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+212 600-000000"
                    className={`${fieldSurface} w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none`}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium mb-1.5 opacity-85">البريد الإلكتروني</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    dir="ltr"
                    placeholder="name@university.ac.ma"
                    className={`${fieldSurface} w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none`}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium mb-1.5 opacity-85">المؤسسة الجامعية</label>
                  <select
                    value={regUniversity}
                    onChange={(e) => setRegUniversity(e.target.value)}
                    className={`${fieldSurface} w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none`}
                  >
                    {UNIVERSITIES.map((u) => (
                      <option key={u} value={u} className="bg-slate-900 text-white">
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 opacity-85">المستوى الدراسي</label>
                  <select
                    value={regLevel}
                    onChange={(e) => setRegLevel(e.target.value as AcademicLevel)}
                    className={`${fieldSurface} w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none`}
                  >
                    <option value="طالب(ة) ماستر" className="bg-slate-900 text-white">طالب(ة) ماستر</option>
                    <option value="طالب(ة) باحث(ة) في الدكتوراه" className="bg-slate-900 text-white">طالب(ة) باحث(ة) في الدكتوراه</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 opacity-85">التخصص</label>
                  <input
                    type="text"
                    required
                    list="specListTsx"
                    value={regSpecialty}
                    onChange={(e) => setRegSpecialty(e.target.value)}
                    placeholder="القانون الخاص والعلوم الجنائية"
                    className={`${fieldSurface} w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none`}
                  />
                  <datalist id="specListTsx">
                    {SPECIALTIES.map((sp) => (
                      <option key={sp} value={sp} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 opacity-85">موضوع اللقاء</label>
                  <select
                    value={regTopic}
                    onChange={(e) => {
                      const val = e.target.value;
                      setRegTopic(val);
                      const found = sessions.find((s) => s.topic === val);
                      if (found) setRegDate(found.session_date);
                    }}
                    className={`${fieldSurface} w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none`}
                  >
                    {sortedSessions.map((s) => (
                      <option key={s.id} value={s.topic} className="bg-slate-900 text-white">
                        {s.topic}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 opacity-85">التاريخ</label>
                  <input
                    type="date"
                    required
                    value={regDate}
                    onChange={(e) => {
                      setRegDate(e.target.value);
                      const found = sessions.find((s) => s.session_date === e.target.value);
                      if (found) setRegTopic(found.topic);
                    }}
                    dir="ltr"
                    className={`${fieldSurface} w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none`}
                  />
                </div>

                {/* Document Upload Fields */}
                <div>
                  <label className="block text-xs font-medium mb-1.5 opacity-85">نسخة من بطاقة الطالب (PDF / صورة)</label>
                  <label className={`${fieldSurface} flex items-center justify-between gap-2 w-full rounded-xl px-3.5 py-2.5 text-xs border cursor-pointer hover:border-amber-400/60 transition`}>
                    <span className="truncate opacity-85">
                      {studentCardFile ? studentCardFile.name : 'إرفاق بطاقة الطالب...'}
                    </span>
                    <Upload className="w-4 h-4 text-amber-400 shrink-0" />
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      required={!studentCardFile}
                      onChange={(e) => handleFileUpload(e, 'student_card')}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5 opacity-85">نسخة من الشهادة الجامعية (إجازة / ماستر / ما يعادلها)</label>
                  <label className={`${fieldSurface} flex items-center justify-between gap-2 w-full rounded-xl px-3.5 py-2.5 text-xs border cursor-pointer hover:border-amber-400/60 transition`}>
                    <span className="truncate opacity-85">
                      {degreeCertFile ? degreeCertFile.name : 'إرفاق الشهادة الجامعية...'}
                    </span>
                    <Upload className="w-4 h-4 text-amber-400 shrink-0" />
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      required={!degreeCertFile}
                      onChange={(e) => handleFileUpload(e, 'degree_cert')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setRegFullName('');
                    setRegDob('');
                    setRegCne('');
                    setRegPhone('');
                    setRegEmail('');
                    setRegSpecialty('');
                    setStudentCardFile(null);
                    setDegreeCertFile(null);
                  }}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl border border-current/15 text-xs font-medium hover:bg-white/5"
                >
                  تفريغ
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] px-6 py-2.5 rounded-[14px] bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 font-extrabold text-sm shadow-lg"
                >
                  إرسال الطلب
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ==================== PAGE 2: PARTICIPANT ACCOUNT ==================== */}
        {route === '#participant' && (
          <div className="max-w-5xl mx-auto space-y-6">
            {!currentParticipant ? (
              <div className={`${dockSurface} backdrop-blur-2xl border rounded-3xl p-6 sm:p-8 max-w-md mx-auto space-y-5 mt-4`}>
                <div className="flex flex-col items-center space-y-2">
                  <JoussourLogo size="lg" isLight={isLight} />
                  <h2 className="text-lg font-extrabold text-center pt-1">تسجيل الدخول</h2>
                </div>
                <form onSubmit={handleParticipantLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5 opacity-85">البريد الإلكتروني</label>
                    <input
                      type="email"
                      required
                      dir="ltr"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="name@university.ac.ma"
                      className={`${fieldSurface} w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5 opacity-85">كلمة المرور</label>
                    <input
                      type="password"
                      required
                      dir="ltr"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`${fieldSurface} w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full min-h-[44px] py-2.5 rounded-xl bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 font-extrabold text-sm"
                  >
                    دخول
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-5">
                <div className={`${dockSurface} border rounded-3xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4`}>
                  <div>
                    <span className="text-xs font-bold text-amber-400" dir="ltr">
                      {currentParticipant.reg_code} • CNE: {currentParticipant.cne}
                    </span>
                    <h2 className="text-lg sm:text-xl font-extrabold mt-0.5">{currentParticipant.full_name}</h2>
                    <p className="text-xs opacity-70">
                      {currentParticipant.university} • {currentParticipant.academic_level}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentParticipantId(null)}
                    className="px-4 py-2 rounded-xl border border-current/15 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" /> خروج
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className={`${cardSurface} border rounded-3xl p-6 space-y-3 text-xs`}>
                    <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                      <Video className="w-4 h-4" /> بيانات اللقاء والوثائق
                    </h3>
                    <p><span className="opacity-65">الموضوع:</span> <strong>{currentParticipant.topic}</strong></p>
                    <p><span className="opacity-65">التاريخ:</span> <strong dir="ltr">{currentParticipant.session_date}</strong></p>
                    <p><span className="opacity-65">الهاتف (واتساب):</span> <strong dir="ltr">{currentParticipant.phone_whatsapp}</strong></p>
                    <p><span className="opacity-65">الحالة:</span> <strong>{currentParticipant.status}</strong></p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewDocModal({
                            title: 'بطاقة الطالب',
                            name: currentParticipant.student_card_name,
                            url: currentParticipant.student_card_url
                          })
                        }
                        className="px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 text-[11px] font-bold flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" /> بطاقة الطالب
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewDocModal({
                            title: 'الشهادة الجامعية',
                            name: currentParticipant.degree_cert_name,
                            url: currentParticipant.degree_cert_url
                          })
                        }
                        className="px-3 py-1.5 rounded-xl bg-teal-500/15 text-teal-300 text-[11px] font-bold flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" /> الشهادة الجامعية
                      </button>
                    </div>
                    <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-400/25">
                      <span className="block text-[11px] text-teal-300 font-semibold mb-1">رابط Zoom</span>
                      <span className="text-[11px] break-all" dir="ltr">
                        {sessions.find((s) => s.topic === currentParticipant.topic)?.zoom_url || 'https://zoom.us/j/91420261001'}
                      </span>
                    </div>
                  </div>

                  <div className={`${cardSurface} border rounded-3xl p-6 flex flex-col justify-between space-y-5`}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                          <Award className="w-4 h-4" /> شهادة المشاركة
                        </h3>
                        <span
                          className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold ${
                            currentParticipant.zoom_attended ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'
                          }`}
                        >
                          {currentParticipant.zoom_attended ? 'مفعلة' : 'غير مفعلة'}
                        </span>
                      </div>
                      <p className="text-xs opacity-80">
                        {currentParticipant.zoom_attended
                          ? 'تم تأكيد المشاركة الفعلية عبر Zoom.'
                          : 'تُفعّل الشهادة بعد تأكيد حضورك في اللقاء من طرف المسؤول.'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={!currentParticipant.zoom_attended}
                        onClick={() => window.print()}
                        className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs disabled:opacity-35"
                      >
                        تحميل / طباعة الشهادة
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== PAGE 3: ADMIN (#admin) ==================== */}
        {route === '#admin' && (
          <div className="space-y-6">
            {!adminAuth ? (
              <div className={`${dockSurface} border rounded-3xl p-7 max-w-md mx-auto space-y-5 mt-4`}>
                <h2 className="text-lg font-extrabold text-center">دخول الإدارة</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (adminLoginUser.trim() === adminCreds.username && adminLoginPass.trim() === adminCreds.password) {
                      setAdminAuth(true);
                      safeSet('joussour_admin_auth_v1', true);
                    } else {
                      triggerToast('بيانات الدخول غير صحيحة', 'error');
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-medium mb-1.5 opacity-85">اسم المستخدم</label>
                    <input
                      type="text"
                      required
                      dir="ltr"
                      value={adminLoginUser}
                      onChange={(e) => setAdminLoginUser(e.target.value)}
                      placeholder="admin@cspj.ma"
                      className={`${fieldSurface} w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5 opacity-85">كلمة المرور</label>
                    <input
                      type="password"
                      required
                      dir="ltr"
                      value={adminLoginPass}
                      onChange={(e) => setAdminLoginPass(e.target.value)}
                      placeholder="••••••••"
                      className={`${fieldSurface} w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full min-h-[44px] py-2.5 rounded-xl bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 font-extrabold text-sm"
                  >
                    دخول
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-5">
                <div className={`${cardSurface} border rounded-2xl p-2 flex flex-wrap items-center justify-between gap-2`}>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setAdminTab('requests')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                        adminTab === 'requests' ? 'bg-amber-500 text-slate-950' : 'opacity-80'
                      }`}
                    >
                      الطلبات ({registrations.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdminTab('settings')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                        adminTab === 'settings' ? 'bg-amber-500 text-slate-950' : 'opacity-80'
                      }`}
                    >
                      الإعدادات
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setAdminAuth(false);
                      safeSet('joussour_admin_auth_v1', false);
                    }}
                    className="px-3.5 py-2 rounded-xl text-rose-400 hover:bg-rose-500/15 text-xs font-semibold flex items-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5" /> خروج
                  </button>
                </div>

                {/* Admin Tab 1: Requests */}
                {adminTab === 'requests' && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className={`${cardSurface} border rounded-2xl p-4`}>
                        <p className="text-[11px] opacity-65">الطلبات</p>
                        <p className="text-2xl font-extrabold mt-1" dir="ltr">{registrations.length}</p>
                      </div>
                      <div className={`${cardSurface} border rounded-2xl p-4`}>
                        <p className="text-[11px] opacity-65">مصادق عليه</p>
                        <p className="text-2xl font-extrabold text-emerald-400 mt-1" dir="ltr">
                          {registrations.filter((r) => r.status === 'مصادق عليه').length}
                        </p>
                      </div>
                      <div className={`${cardSurface} border rounded-2xl p-4`}>
                        <p className="text-[11px] opacity-65">حضور Zoom</p>
                        <p className="text-2xl font-extrabold text-amber-400 mt-1" dir="ltr">
                          {registrations.filter((r) => r.zoom_attended).length}
                        </p>
                      </div>
                      <div className={`${cardSurface} border rounded-2xl p-4`}>
                        <p className="text-[11px] opacity-65">نتائج الفلتر</p>
                        <p className="text-2xl font-extrabold text-teal-400 mt-1" dir="ltr">{filteredRegistrations.length}</p>
                      </div>
                    </div>

                    <div className={`${cardSurface} border rounded-3xl p-5 space-y-4`}>
                      <div className="flex flex-wrap items-center justify-between gap-2.5">
                        <div className="flex-1 min-w-[200px] relative">
                          <input
                            type="text"
                            value={searchByName}
                            onChange={(e) => setSearchByName(e.target.value)}
                            placeholder="بحث بالاسم أو الرقم الوطني أو الهاتف..."
                            className={`${fieldSurface} w-full rounded-xl pr-4 pl-10 py-2.5 text-sm border outline-none`}
                          />
                          <Search className="w-4 h-4 opacity-50 absolute left-3.5 top-3.5" />
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="px-3.5 py-2 rounded-xl border border-current/15 text-xs font-semibold flex items-center gap-1.5"
                          >
                            <SlidersHorizontal className="w-3.5 h-3.5" /> بحث متقدم
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSearchByName('');
                              setFilterDate('');
                              setFilterTopic('');
                              setFilterUniversity('');
                              setFilterSpecialty('');
                              setFilterLevel('');
                              setAdvCode('');
                              setAdvCne('');
                              setAdvStatus('');
                              setAdvBirthYear('');
                            }}
                            className="px-3.5 py-2 rounded-xl border border-current/15 text-xs font-medium flex items-center gap-1.5"
                          >
                            <RotateCcw className="w-3.5 h-3.5" /> إعادة ضبط
                          </button>
                          <button
                            type="button"
                            onClick={() => setExportModalOpen(true)}
                            className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center gap-1.5"
                          >
                            <FileDown className="w-3.5 h-3.5" /> تصدير مخصص
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                        <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className={`${fieldSurface} rounded-xl px-3 py-2 text-xs border outline-none`}>
                          <option value="">التاريخ</option>
                          {[...new Set(registrations.map((r) => r.session_date))].map((d) => (
                            <option key={d} value={d} className="bg-slate-900 text-white">{d}</option>
                          ))}
                        </select>
                        <select value={filterTopic} onChange={(e) => setFilterTopic(e.target.value)} className={`${fieldSurface} rounded-xl px-3 py-2 text-xs border outline-none`}>
                          <option value="">الموضوع</option>
                          {[...new Set(registrations.map((r) => r.topic))].map((t) => (
                            <option key={t} value={t} className="bg-slate-900 text-white">{t}</option>
                          ))}
                        </select>
                        <select value={filterUniversity} onChange={(e) => setFilterUniversity(e.target.value)} className={`${fieldSurface} rounded-xl px-3 py-2 text-xs border outline-none`}>
                          <option value="">الجامعة</option>
                          {UNIVERSITIES.map((u) => (
                            <option key={u} value={u} className="bg-slate-900 text-white">{u}</option>
                          ))}
                        </select>
                        <select value={filterSpecialty} onChange={(e) => setFilterSpecialty(e.target.value)} className={`${fieldSurface} rounded-xl px-3 py-2 text-xs border outline-none`}>
                          <option value="">التخصص</option>
                          {[...new Set(registrations.map((r) => r.specialty))].map((s) => (
                            <option key={s} value={s} className="bg-slate-900 text-white">{s}</option>
                          ))}
                        </select>
                        <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className={`${fieldSurface} rounded-xl px-3 py-2 text-xs border outline-none`}>
                          <option value="">جميع المستويات</option>
                          <option value="طالب(ة) ماستر" className="bg-slate-900 text-white">طالب(ة) ماستر</option>
                          <option value="طالب(ة) باحث(ة) في الدكتوراه" className="bg-slate-900 text-white">طالب(ة) باحث(ة) في الدكتوراه</option>
                        </select>
                      </div>

                      {showAdvanced && (
                        <div className="pt-3 border-t border-current/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                          <input type="text" value={advCode} onChange={(e) => setAdvCode(e.target.value)} placeholder="رقم التسجيل" className={`${fieldSurface} rounded-xl px-3 py-2 text-xs border outline-none`} />
                          <input type="text" value={advCne} onChange={(e) => setAdvCne(e.target.value)} placeholder="الرقم الوطني للطالب (CNE)" className={`${fieldSurface} rounded-xl px-3 py-2 text-xs border outline-none`} />
                          <select value={advStatus} onChange={(e) => setAdvStatus(e.target.value)} className={`${fieldSurface} rounded-xl px-3 py-2 text-xs border outline-none`}>
                            <option value="">جميع الحالات</option>
                            <option value="مصادق عليه" className="bg-slate-900 text-white">مصادق عليه</option>
                            <option value="في طور المصادقة" className="bg-slate-900 text-white">في طور المصادقة</option>
                            <option value="ملغى" className="bg-slate-900 text-white">ملغى</option>
                          </select>
                          <input type="number" value={advBirthYear} onChange={(e) => setAdvBirthYear(e.target.value)} placeholder="سنة الازدياد" className={`${fieldSurface} rounded-xl px-3 py-2 text-xs border outline-none`} />
                        </div>
                      )}
                    </div>

                    <div className={`${cardSurface} border rounded-3xl overflow-hidden`}>
                      <div className="px-5 py-3.5 border-b border-current/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold">اللوائح الاسمية والوثائق المرفقة</h3>
                          <button
                            type="button"
                            onClick={() => syncWithSupabase(sbUrl, sbKey)}
                            className="px-2.5 py-1 rounded-lg border border-current/15 text-[11px] font-semibold flex items-center gap-1"
                          >
                            <RefreshCw className="w-3 h-3" /> تحديث
                          </button>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <button type="button" onClick={() => exportCsvOrDoc('print')} className="px-3 py-1.5 rounded-lg bg-rose-500/15 text-rose-300 font-bold">PDF</button>
                          <button type="button" onClick={() => exportCsvOrDoc('word')} className="px-3 py-1.5 rounded-lg bg-teal-500/15 text-teal-300 font-bold">DOCX</button>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-right border-collapse text-xs">
                          <thead>
                            <tr className="border-b border-current/10 text-[11px] opacity-70 bg-black/15">
                              <th className="py-3 px-4">المرجع و CNE</th>
                              <th className="py-3 px-4">المشارك والهاتف</th>
                              <th className="py-3 px-4">المؤسسة والمستوى</th>
                              <th className="py-3 px-4">اللقاء</th>
                              <th className="py-3 px-4">الوثائق المرفقة</th>
                              <th className="py-3 px-4">الحالة</th>
                              <th className="py-3 px-4">Zoom</th>
                              <th className="py-3 px-4 text-center">إجراءات</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-current/10">
                            {filteredRegistrations.map((r) => (
                              <tr key={r.id}>
                                <td className="py-3 px-4">
                                  <div className="font-bold text-amber-400" dir="ltr">{r.reg_code}</div>
                                  <div className="text-[11px] font-semibold opacity-85" dir="ltr">CNE: {r.cne}</div>
                                  <div className="text-[10px] opacity-65" dir="ltr">{r.email}</div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="font-bold">{r.full_name}</div>
                                  <div className="text-[11px] opacity-70" dir="ltr">{r.dob}</div>
                                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5" dir="ltr">
                                    <Phone className="w-3 h-3" /> {r.phone_whatsapp}
                                  </div>
                                </td>
                                <td className="py-3 px-4 max-w-[180px]">
                                  <div className="font-semibold">{r.university}</div>
                                  <div className="text-[11px] text-amber-400 mt-0.5">{r.academic_level}</div>
                                  <div className="text-[10px] opacity-65">{r.specialty}</div>
                                </td>
                                <td className="py-3 px-4 max-w-[180px]">
                                  <div className="font-semibold line-clamp-2">{r.topic}</div>
                                  <div className="text-[11px] text-teal-300 mt-0.5" dir="ltr">{r.session_date}</div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex flex-col gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setPreviewDocModal({
                                          title: `بطاقة الطالب — ${r.full_name}`,
                                          name: r.student_card_name,
                                          url: r.student_card_url
                                        })
                                      }
                                      className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 text-[10px] font-bold flex items-center gap-1 w-fit"
                                    >
                                      <Eye className="w-3 h-3" /> بطاقة الطالب
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setPreviewDocModal({
                                          title: `الشهادة الجامعية — ${r.full_name}`,
                                          name: r.degree_cert_name,
                                          url: r.degree_cert_url
                                        })
                                      }
                                      className="px-2.5 py-1 rounded-lg bg-teal-500/15 text-teal-300 text-[10px] font-bold flex items-center gap-1 w-fit"
                                    >
                                      <Eye className="w-3 h-3" /> الشهادة الجامعية
                                    </button>
                                  </div>
                                </td>
                                <td className="py-3 px-4 space-y-1.5">
                                  <span className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${statusBadgeClass(r.status)}`}>
                                    {r.status}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      title="مصادقة"
                                      onClick={() => handleAdminStatusChange(r, 'مصادق عليه')}
                                      className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[10px] font-bold"
                                    >
                                      مصادقة
                                    </button>
                                    <button
                                      type="button"
                                      title="إلغاء"
                                      onClick={() => handleAdminStatusChange(r, 'ملغى')}
                                      className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 text-[10px] font-bold"
                                    >
                                      إلغاء
                                    </button>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <button
                                    type="button"
                                    onClick={() => handleToggleZoom(r)}
                                    className={`px-2.5 py-1 rounded-md border text-[10px] font-semibold ${
                                      r.zoom_attended ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/35' : 'border-current/15 opacity-70'
                                    }`}
                                  >
                                    {r.zoom_attended ? '✓ حضر Zoom' : 'تأكيد Zoom'}
                                  </button>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center justify-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => setEditingRecord(r)}
                                      className="p-1.5 rounded-lg bg-amber-500/15 text-amber-300"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setRegistrations((prev) => prev.filter((x) => x.id !== r.id))}
                                      className="p-1.5 rounded-lg bg-rose-500/15 text-rose-300"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Admin Tab 2: Settings */}
                {adminTab === 'settings' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className={`lg:col-span-7 ${cardSurface} border rounded-3xl p-6 space-y-5`}>
                      <h2 className="text-base font-extrabold">الرزنامة</h2>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const payload: SessionItem = {
                            id: sessionEditId || `ses-${Date.now()}`,
                            session_date: sessionDateInput,
                            topic: sessionTopicInput.trim(),
                            location: sessionCityInput.trim() || 'Zoom',
                            zoom_url: sessionZoomInput.trim() || 'https://zoom.us/j/91420261001'
                          };
                          setSessions((prev) =>
                            sessionEditId ? prev.map((s) => (s.id === sessionEditId ? payload : s)) : [...prev, payload]
                          );
                          setSessionEditId('');
                          setSessionDateInput('');
                          setSessionTopicInput('');
                          setSessionZoomInput('');
                          triggerToast('تم تحديث الرزنامة', 'success');
                        }}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 rounded-2xl bg-black/15 border border-current/10"
                      >
                        <input
                          type="date"
                          required
                          dir="ltr"
                          value={sessionDateInput}
                          onChange={(e) => setSessionDateInput(e.target.value)}
                          className={`sm:col-span-4 ${fieldSurface} rounded-xl px-3 py-2 text-xs border outline-none`}
                        />
                        <input
                          type="text"
                          required
                          value={sessionTopicInput}
                          onChange={(e) => setSessionTopicInput(e.target.value)}
                          placeholder="موضوع اللقاء"
                          className={`sm:col-span-8 ${fieldSurface} rounded-xl px-3 py-2 text-xs border outline-none`}
                        />
                        <input
                          type="text"
                          value={sessionCityInput}
                          onChange={(e) => setSessionCityInput(e.target.value)}
                          placeholder="Zoom"
                          className={`sm:col-span-6 ${fieldSurface} rounded-xl px-3 py-2 text-xs border outline-none`}
                        />
                        <input
                          type="url"
                          dir="ltr"
                          value={sessionZoomInput}
                          onChange={(e) => setSessionZoomInput(e.target.value)}
                          placeholder="https://zoom.us/j/..."
                          className={`sm:col-span-6 ${fieldSurface} rounded-xl px-3 py-2 text-xs border outline-none`}
                        />
                        <div className="sm:col-span-12 flex justify-end gap-2">
                          <button type="submit" className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center gap-1">
                            <Plus className="w-3.5 h-3.5" /> حفظ
                          </button>
                        </div>
                      </form>

                      <div className="space-y-2.5">
                        {sortedSessions.map((s) => (
                          <div key={s.id} className="p-3.5 rounded-2xl bg-black/15 border border-current/10 flex items-center justify-between gap-3">
                            <div>
                              <span className="text-[11px] font-bold text-amber-400" dir="ltr">{s.session_date}</span>
                              <p className="text-xs font-bold mt-0.5">{s.topic}</p>
                            </div>
                            <div className="flex gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setSessionEditId(s.id);
                                  setSessionDateInput(s.session_date);
                                  setSessionTopicInput(s.topic);
                                  setSessionCityInput(s.location);
                                  setSessionZoomInput(s.zoom_url || '');
                                }}
                                className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 text-xs font-semibold"
                              >
                                تعديل
                              </button>
                              <button
                                type="button"
                                onClick={() => setSessions((prev) => prev.filter((x) => x.id !== s.id))}
                                className="px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-300 text-xs font-semibold"
                              >
                                حذف
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5 space-y-6">
                      <div className={`${cardSurface} border rounded-3xl p-6 space-y-4`}>
                        <h2 className="text-base font-extrabold flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-amber-400" /> بيانات دخول المسؤول
                        </h2>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const next = { username: newAdminUser.trim(), password: newAdminPass.trim() };
                            setAdminCreds(next);
                            safeSet('joussour_admin_creds_v1', next);
                            triggerToast('تم تحديث بيانات الدخول', 'success');
                          }}
                          className="space-y-3"
                        >
                          <input
                            type="text"
                            required
                            dir="ltr"
                            value={newAdminUser}
                            onChange={(e) => setNewAdminUser(e.target.value)}
                            className={`${fieldSurface} w-full rounded-xl px-3 py-2 text-xs border outline-none`}
                          />
                          <input
                            type="text"
                            required
                            dir="ltr"
                            value={newAdminPass}
                            onChange={(e) => setNewAdminPass(e.target.value)}
                            className={`${fieldSurface} w-full rounded-xl px-3 py-2 text-xs border outline-none`}
                          />
                          <button type="submit" className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs">
                            تحديث
                          </button>
                        </form>
                      </div>

                      <div className={`${cardSurface} border rounded-3xl p-6 space-y-4`}>
                        <h2 className="text-base font-extrabold flex items-center gap-1.5">
                          <Database className="w-4 h-4 text-emerald-400" /> Supabase Realtime
                        </h2>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            safeSet('joussour_sb_url', sbUrl);
                            safeSet('joussour_sb_key', sbKey);
                            syncWithSupabase(sbUrl, sbKey);
                          }}
                          className="space-y-3"
                        >
                          <input
                            type="url"
                            dir="ltr"
                            value={sbUrl}
                            onChange={(e) => setSbUrl(e.target.value)}
                            placeholder="https://your-project.supabase.co"
                            className={`${fieldSurface} w-full rounded-xl px-3 py-2 text-xs border outline-none`}
                          />
                          <input
                            type="password"
                            dir="ltr"
                            value={sbKey}
                            onChange={(e) => setSbKey(e.target.value)}
                            placeholder="Anon Key"
                            className={`${fieldSurface} w-full rounded-xl px-3 py-2 text-xs border outline-none`}
                          />
                          <div className="flex gap-2">
                            <button type="submit" className="flex-1 py-2 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs">
                              ربط
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setIsLiveDb(false);
                                setDiagMsg('الوضع المحلي');
                              }}
                              className="px-3 py-2 rounded-xl border border-current/15 text-xs"
                            >
                              محلي
                            </button>
                          </div>
                          {diagMsg && <p className="text-[11px] text-amber-400 font-semibold">{diagMsg}</p>}
                        </form>

                        <div className="p-3 rounded-2xl bg-black/20 border border-current/10 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-400">SQL Schema</span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard?.writeText(SQL_SCHEMA);
                                triggerToast('تم نسخ SQL', 'success');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 text-[11px] font-bold flex items-center gap-1"
                            >
                              <Copy className="w-3 h-3" /> نسخ
                            </button>
                          </div>
                          <pre dir="ltr" className="text-[10px] opacity-80 overflow-x-auto max-h-28 p-2 rounded-xl bg-black/30">
                            {SQL_SCHEMA}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="mx-auto max-w-[1400px] w-full px-4 sm:px-6 lg:px-10 py-5 text-center text-[11px] opacity-60">
        <span>جسور • المجلس الأعلى للسلطة القضائية</span>
      </footer>

      {/* Document Preview Modal */}
      {previewDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className={`${dockSurface} border rounded-3xl max-w-2xl w-full p-5 sm:p-6 space-y-4`}>
            <div className="flex items-center justify-between border-b border-current/10 pb-3">
              <div>
                <h3 className="text-sm font-extrabold">{previewDocModal.title}</h3>
                <p className="text-[11px] opacity-65">{previewDocModal.name}</p>
              </div>
              <button type="button" onClick={() => setPreviewDocModal(null)} className="w-8 h-8 rounded-xl hover:bg-white/10 text-xs font-bold">✕</button>
            </div>
            <div className="rounded-2xl overflow-hidden bg-black/30 border border-current/10 flex items-center justify-center max-h-[65vh]">
              {previewDocModal.url.startsWith('data:application/pdf') ? (
                <iframe src={previewDocModal.url} title={previewDocModal.title} className="w-full h-[55vh]" />
              ) : (
                <img src={previewDocModal.url} alt={previewDocModal.title} className="max-w-full max-h-[60vh] object-contain" />
              )}
            </div>
            <div className="flex justify-end gap-2">
              <a
                href={previewDocModal.url}
                download={previewDocModal.name}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold"
              >
                تحميل الوثيقة
              </a>
              <button type="button" onClick={() => setPreviewDocModal(null)} className="px-4 py-2 rounded-xl border border-current/15 text-xs">
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Registration Success Modal */}
      {regSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
          <div className={`${dockSurface} border rounded-3xl max-w-sm w-full p-6 space-y-4 text-center`}>
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-300 mx-auto flex items-center justify-center text-lg font-bold">
              ✓
            </div>
            <h3 className="text-base font-extrabold">تم التسجيل بنجاح</h3>
            <p className="text-xs opacity-80">
              أُرسلت كلمة المرور إلى <strong className="text-amber-400 block mt-1" dir="ltr">{regSuccessModal.email}</strong>
            </p>
            <div className="p-3 rounded-2xl bg-black/25 border border-current/15">
              <p className="text-lg font-extrabold text-amber-400 tracking-wider" dir="ltr">{regSuccessModal.pass}</p>
            </div>
            <div className="flex justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setRegSuccessModal(null);
                  changeRoute('#participant');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs"
              >
                حسابي
              </button>
              <button
                type="button"
                onClick={() => setRegSuccessModal(null)}
                className="px-4 py-2 rounded-xl border border-current/15 text-xs"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Studio Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
          <div className={`${dockSurface} border rounded-3xl max-w-lg w-full p-6 space-y-4`}>
            <div className="flex items-center justify-between border-b border-current/10 pb-3">
              <h3 className="text-sm font-extrabold">تصدير مخصص</h3>
              <button type="button" onClick={() => setExportModalOpen(false)} className="w-7 h-7 rounded-lg hover:bg-white/10 text-xs font-bold">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <input
                type="text"
                value={exportTitle}
                onChange={(e) => setExportTitle(e.target.value)}
                className={`${fieldSurface} w-full rounded-xl px-3 py-2 text-xs border outline-none`}
              />
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(COLUMN_LABELS).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 p-2 rounded-xl bg-black/15 border border-current/10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exportCols.includes(key)}
                      onChange={(e) =>
                        setExportCols((prev) => (e.target.checked ? [...prev, key] : prev.filter((k) => k !== key)))
                      }
                      className="accent-amber-500"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-current/10">
              <button type="button" onClick={() => { setExportModalOpen(false); exportCsvOrDoc('print'); }} className="px-3.5 py-2 rounded-xl border border-current/15 text-xs font-semibold flex items-center gap-1">
                <Printer className="w-3.5 h-3.5" /> طباعة / PDF
              </button>
              <button type="button" onClick={() => { setExportModalOpen(false); exportCsvOrDoc('word'); }} className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold">
                DOCX
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setRegistrations((prev) => prev.map((r) => (r.id === editingRecord.id ? editingRecord : r)));
              setEditingRecord(null);
              triggerToast('تم حفظ التعديلات', 'success');
            }}
            className={`${dockSurface} border rounded-3xl max-w-xl w-full p-6 space-y-4 text-xs`}
          >
            <div className="flex items-center justify-between border-b border-current/10 pb-3">
              <h3 className="text-sm font-extrabold">تعديل الطلب</h3>
              <button type="button" onClick={() => setEditingRecord(null)} className="w-7 h-7 rounded-lg text-xs font-bold">✕</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={editingRecord.full_name}
                onChange={(e) => setEditingRecord({ ...editingRecord, full_name: e.target.value })}
                placeholder="الاسم الكامل"
                className={`${fieldSurface} rounded-xl px-3 py-2 border outline-none`}
              />
              <input
                type="date"
                dir="ltr"
                value={editingRecord.dob}
                onChange={(e) => setEditingRecord({ ...editingRecord, dob: e.target.value })}
                className={`${fieldSurface} rounded-xl px-3 py-2 border outline-none`}
              />
              <input
                type="text"
                dir="ltr"
                value={editingRecord.cne}
                onChange={(e) => setEditingRecord({ ...editingRecord, cne: e.target.value })}
                placeholder="الرقم الوطني للطالب (CNE)"
                className={`${fieldSurface} rounded-xl px-3 py-2 border outline-none`}
              />
              <input
                type="tel"
                dir="ltr"
                value={editingRecord.phone_whatsapp}
                onChange={(e) => setEditingRecord({ ...editingRecord, phone_whatsapp: e.target.value })}
                placeholder="رقم الهاتف (واتساب)"
                className={`${fieldSurface} rounded-xl px-3 py-2 border outline-none`}
              />
              <select
                value={editingRecord.university}
                onChange={(e) => setEditingRecord({ ...editingRecord, university: e.target.value })}
                className={`sm:col-span-2 ${fieldSurface} rounded-xl px-3 py-2 border outline-none`}
              >
                {UNIVERSITIES.map((u) => (
                  <option key={u} value={u} className="bg-slate-900 text-white">{u}</option>
                ))}
              </select>
              <select
                value={editingRecord.status}
                onChange={(e) => setEditingRecord({ ...editingRecord, status: e.target.value as ApprovalStatus })}
                className={`${fieldSurface} rounded-xl px-3 py-2 border outline-none`}
              >
                <option value="مصادق عليه" className="bg-slate-900 text-white">مصادق عليه</option>
                <option value="في طور المصادقة" className="bg-slate-900 text-white">في طور المصادقة</option>
                <option value="ملغى" className="bg-slate-900 text-white">ملغى</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-current/10">
              <button type="button" onClick={() => setEditingRecord(null)} className="px-4 py-2 rounded-xl border border-current/15">إلغاء</button>
              <button type="submit" className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold">حفظ</button>
            </div>
          </form>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-5 left-5 z-50">
          <div className={`${dockSurface} border px-4 py-3 rounded-2xl text-xs font-bold shadow-xl`}>
            {toast.text}
          </div>
        </div>
      )}
    </div>
  );
}
