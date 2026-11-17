# منصة جسور (Joussour Platform) — بنية Full-Stack حديثة (React + TypeScript + Vite + Supabase)

تم بناء المشروع وفق معمارية متعددة الملفات (Modular Architecture) جاهزة للنشر على **Vercel / Netlify** مع قاعدة بيانات **Supabase PostgreSQL + RLS + Edge Functions**:

## هيكل المشروع
- `src/types/joussour.ts`: تعريفات الأنواع الصارمة (TypeScript Interfaces).
- `src/constants/institutions.ts`: لوائح الجامعات المغربية والتخصصات والبيانات الأولية.
- `src/lib/supabaseClient.ts`: إعداد عميل Supabase الآمن عبر متغيرات البيئة `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY`.
- `src/store/useJoussourStore.ts`: إدارة الحالة المركزية والمزامنة الحية عبر **Zustand**.
- `src/utils/exportService.ts`: خدمة توليد وتصدير الجداول المخصصة بصيغتي **DOCX** و **PDF**.
- `src/components/layout/JoussourLogo.tsx`: مكون الشعار التايبوغرافي المعماري لحرف السين.
- `supabase/migrations/20261117000000_joussour_schema.sql`: هيكل جداول PostgreSQL وسياسات الحماية **Row-Level Security (RLS)** وتفعيل **Realtime**.
- `supabase/functions/joussour-api/index.ts`: دالة خادم سحابية (**Supabase Edge Function — Deno/TypeScript**) للتحقق الخلفي الآمن من التسجيلات وقرارات المنسقين.

## التشغيل المحلي والنشر
```bash
npm install
cp .env.example .env.local
# أضف VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY داخل .env.local
npm run dev
```
