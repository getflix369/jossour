import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, AlignmentType, WidthType } from 'docx';
import { RegistrationRecord } from '../types/joussour';

export const EXPORT_COLUMN_LABELS: Record<string, string> = {
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

export async function generateCustomDocx(
  rows: RegistrationRecord[],
  selectedCols: string[],
  title: string
): Promise<void> {
  const cols = selectedCols.length > 0 ? selectedCols : Object.keys(EXPORT_COLUMN_LABELS);

  const headerRow = new TableRow({
    children: cols.map((c) =>
      new TableCell({
        shading: { fill: '0F4C5C' },
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            children: [
              new TextRun({
                text: EXPORT_COLUMN_LABELS[c] || c,
                bold: true,
                color: 'FFFFFF',
                font: 'Cairo',
                size: 20,
                rightToLeft: true
              })
            ]
          })
        ]
      })
    )
  });

  const dataRows = rows.map(
    (r) =>
      new TableRow({
        children: cols.map((c) => {
          const val = String((r as unknown as Record<string, unknown>)[c] ?? '');
          return new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                bidirectional: true,
                children: [new TextRun({ text: val, font: 'Cairo', size: 18, rightToLeft: true })]
              })
            ]
          });
        })
      })
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            bidirectional: true,
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: 'المجلس الأعلى للسلطة القضائية — منصة جسور',
                bold: true,
                size: 28,
                color: '0F4C5C',
                font: 'Cairo',
                rightToLeft: true
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            bidirectional: true,
            spacing: { after: 240 },
            children: [
              new TextRun({
                text: `${title} (${rows.length})`,
                bold: true,
                size: 24,
                font: 'Cairo',
                rightToLeft: true
              })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            visuallyRightToLeft: true,
            rows: [headerRow, ...dataRows]
          })
        ]
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `joussour_list_${new Date().toISOString().slice(0, 10)}.docx`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
