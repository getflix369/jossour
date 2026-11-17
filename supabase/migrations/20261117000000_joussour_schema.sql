-- ============================================================================
-- Joussour Platform — Production PostgreSQL Schema & Row-Level Security (RLS)
-- Supreme Council of the Judiciary (CSPJ)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.joussour_sessions (
  id TEXT PRIMARY KEY,
  session_date DATE NOT NULL,
  topic TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Zoom',
  zoom_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
  status TEXT NOT NULL DEFAULT 'في طور المصادقة' CHECK (status IN ('مصادق عليه', 'في طور المصادقة', 'ملغى')),
  zoom_attended BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.joussour_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.joussour_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all on joussour_sessions" ON public.joussour_sessions;
CREATE POLICY "Allow all on joussour_sessions"
  ON public.joussour_sessions FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on joussour_registrations" ON public.joussour_registrations;
CREATE POLICY "Allow all on joussour_registrations"
  ON public.joussour_registrations FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.joussour_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.joussour_registrations;
