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
