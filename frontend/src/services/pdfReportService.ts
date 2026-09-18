import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Audit, Finding, CorrectiveAction, Evidence, Facility, Department, User } from '../types';
import { Language } from '../i18n';
import { id } from '../i18n/id';
import { en } from '../i18n/en';

interface ReportData {
  audit: Audit;
  facility?: Facility;
  department?: Department;
  findings: Finding[];
  correctiveActions: CorrectiveAction[];
  evidence: Evidence[];
  users: User[];
  language: Language;
  reportVersion: string;
  generatedAt: string;
}

type Translations = typeof id;

export class PDFReportService {
  private t: (key: keyof Translations) => string;
  private lang: Language;

  constructor(language: Language) {
    this.lang = language;
    const translations = language === 'id' ? id : en;
    this.t = (key: keyof Translations) => translations[key] || key;
  }

  async generateReport(data: ReportData): Promise<Blob> {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPos = margin;

    // Helper functions
    const addPageNumber = (pageNum: number, totalPages: number) => {
      doc.setFontSize(9);
      doc.setTextColor(128);
      doc.text(`${this.t('pdf.page')} ${pageNum} / ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    };

    const checkPageBreak = (requiredSpace: number): boolean => {
      if (yPos + requiredSpace > pageHeight - 30) {
        doc.addPage();
        yPos = margin;
        return true;
      }
      return false;
    };

    const addSectionTitle = (title: string) => {
      checkPageBreak(15);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 64, 175);
      doc.text(title, margin, yPos);
      yPos += 8;
      doc.setDrawColor(30, 64, 175);
      doc.setLineWidth(0.5);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 5;
    };

    const addLabel = (label: string, value: string, x: number = margin) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100);
      doc.text(label, x, yPos);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0);
      const labelWidth = doc.getTextWidth(label) + 2;
      doc.text(value, x + labelWidth, yPos);
      yPos += 6;
    };

    // PAGE 1: COVER PAGE
    doc.setFillColor(30, 64, 175);
    doc.rect(0, 0, pageWidth, 60, 'F');
    
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255);
    doc.text('FAMS', pageWidth / 2, 25, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text(this.t('pdf.auditReport'), pageWidth / 2, 40, { align: 'center' });

    yPos = 80;
    doc.setTextColor(0);
    
    addLabel(`${this.t('pdf.auditNumber')}:`, data.audit.referenceNumber || data.audit.id);
    addLabel(`${this.t('pdf.facility')}:`, data.facility?.name || '-');
    addLabel(`${this.t('pdf.department')}:`, data.department?.name || '-');
    addLabel(`${this.t('pdf.facilityType')}:`, this.t(`facilityType.${data.facility?.facilityType}` as any) || data.facility?.facilityType || '-');
    addLabel(`${this.t('pdf.auditType')}:`, this.t(`auditType.${data.audit.auditType}` as any) || data.audit.auditType);
    addLabel(`${this.t('pdf.auditDate')}:`, new Date(data.audit.auditDate).toLocaleDateString(this.lang === 'id' ? 'id-ID' : 'en-US'));
    
    const leadAuditor = data.users.find(u => u.id === data.audit.auditorId);
    addLabel(`${this.t('pdf.leadAuditor')}:`, leadAuditor?.name || '-');
    
    yPos += 10;
    addLabel(`${this.t('pdf.reportVersion')}:`, data.reportVersion);
    addLabel(`${this.t('pdf.reportLanguage')}:`, this.lang === 'id' ? 'Bahasa Indonesia' : 'English');
    addLabel(`${this.t('pdf.generatedAt')}:`, new Date(data.generatedAt).toLocaleString(this.lang === 'id' ? 'id-ID' : 'en-US'));

    // PAGE 2: EXECUTIVE SUMMARY
    doc.addPage();
    yPos = margin;
    
    addSectionTitle(this.t('pdf.executiveSummary'));
    
    const score = data.audit.overallScore || 0;
    const totalItems = data.audit.passCount + data.audit.failCount + data.audit.naCount;
    const compliance = ((data.audit.passCount / (totalItems - data.audit.naCount)) * 100) || 0;
    
    addLabel(`${this.t('pdf.overallScore')}:`, `${score.toFixed(1)}%`);
    addLabel(`${this.t('pdf.compliance')}:`, `${compliance.toFixed(1)}%`);
    addLabel(`${this.t('pdf.totalChecklistItems')}:`, `${totalItems}`);
    addLabel(`${this.t('pdf.pass')}:`, `${data.audit.passCount}`);
    addLabel(`${this.t('pdf.fail')}:`, `${data.audit.failCount}`);
    addLabel(`${this.t('pdf.na')}:`, `${data.audit.naCount}`);
    
    yPos += 5;
    addLabel(`${this.t('pdf.totalFindings')}:`, `${data.findings.length}`);
    addLabel(`${this.t('pdf.criticalFindings')}:`, `${data.findings.filter(f => f.severity === 'critical').length}`);
    addLabel(`${this.t('pdf.majorFindings')}:`, `${data.findings.filter(f => f.severity === 'major').length}`);
    addLabel(`${this.t('pdf.minorFindings')}:`, `${data.findings.filter(f => f.severity === 'minor').length}`);
    addLabel(`${this.t('pdf.observations')}:`, `${data.findings.filter(f => f.severity === 'observation').length}`);

    // PAGE 3: CHECKLIST RESULTS
    doc.addPage();
    yPos = margin;
    
    addSectionTitle(this.t('pdf.checklistResults'));
    
    if (data.audit.sections && data.audit.sections.length > 0) {
      for (const section of data.audit.sections) {
        checkPageBreak(20);
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0);
        doc.text(section.name, margin, yPos);
        yPos += 5;

        const tableData = section.items.map(item => [
          item.question.substring(0, 50) + (item.question.length > 50 ? '...' : ''),
          item.response || '-',
          item.notes || '-',
          `${item.score}/${item.maxScore}`,
        ]);

        autoTable(doc, {
          startY: yPos,
          head: [[this.t('pdf.question'), this.t('pdf.response'), this.t('pdf.auditorNote'), this.t('pdf.score')]],
          body: tableData,
          margin: { left: margin, right: margin },
          styles: { fontSize: 8, cellPadding: 2 },
          headStyles: { fillColor: [30, 64, 175], textColor: 255 },
          alternateRowStyles: { fillColor: [240, 240, 240] },
        });

        yPos = (doc as any).lastAutoTable.finalY + 10;
      }
    }

    // PAGE 4: FINDINGS
    if (data.findings.length > 0) {
      doc.addPage();
      yPos = margin;
      
      addSectionTitle(this.t('pdf.findings'));
      
      for (const finding of data.findings) {
        checkPageBreak(40);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0);
        doc.text(`${this.t('pdf.findingNumber')}: ${finding.id}`, margin, yPos);
        yPos += 5;
        
        addLabel(`${this.t('pdf.severity')}:`, this.t(`severity.${finding.severity}` as any));
        addLabel(`${this.t('pdf.title')}:`, finding.title);
        addLabel(`${this.t('pdf.description')}:`, finding.description);
        
        if (finding.rootCause) {
          addLabel(`${this.t('pdf.rootCause')}:`, finding.rootCause);
        }
        
        const responsible = data.users.find(u => u.id === finding.createdBy);
        if (responsible) {
          addLabel(`${this.t('pdf.responsiblePerson')}:`, responsible.name);
        }
        
        addLabel(`${this.t('pdf.status')}:`, this.t(`findingStatus.${finding.status}` as any));
        
        yPos += 5;
      }
    }

    // PAGE 5: CORRECTIVE ACTIONS
    if (data.correctiveActions.length > 0) {
      doc.addPage();
      yPos = margin;
      
      addSectionTitle(this.t('pdf.correctiveActions'));
      
      const caTableData = data.correctiveActions.map(ca => {
        const finding = data.findings.find(f => f.id === ca.findingId);
        const responsible = data.users.find(u => u.id === ca.responsiblePersonId);
        return [
          ca.id,
          finding?.title.substring(0, 30) || '-',
          ca.actionDescription.substring(0, 40) || '-',
          responsible?.name || '-',
          new Date(ca.targetDate).toLocaleDateString(this.lang === 'id' ? 'id-ID' : 'en-US'),
          this.t(`caStatus.${ca.status}` as any),
        ];
      });

      autoTable(doc, {
        startY: yPos,
        head: [[this.t('correctiveActions.actionNumber'), this.t('pdf.finding'), this.t('pdf.action'), this.t('pdf.responsiblePerson'), this.t('pdf.dueDate'), this.t('pdf.status')]],
        body: caTableData,
        margin: { left: margin, right: margin },
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [30, 64, 175], textColor: 255 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
      });

      yPos = (doc as any).lastAutoTable.finalY + 10;
    }

    // PAGE 6: APPROVALS & SIGNATURES
    doc.addPage();
    yPos = margin;
    
    addSectionTitle(this.t('pdf.signatures'));
    
    yPos += 10;
    
    // Auditor signature
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(this.t('pdf.auditor'), margin, yPos);
    yPos += 15;
    
    doc.setDrawColor(0);
    doc.line(margin, yPos, margin + 60, yPos);
    yPos += 5;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    addLabel(`${this.t('pdf.name')}:`, leadAuditor?.name || '___________________');
    addLabel(`${this.t('pdf.signature')}:`, '___________________');
    addLabel(`${this.t('pdf.date')}:`, '___________________');
    
    yPos += 15;
    
    // Supervisor signature
    const supervisorTitle = data.facility?.facilityType?.includes('farm') 
      ? this.t('pdf.supervisorFarm') 
      : this.t('pdf.supervisorFacility');
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(supervisorTitle, margin, yPos);
    yPos += 15;
    
    doc.line(margin, yPos, margin + 60, yPos);
    yPos += 5;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    addLabel(`${this.t('pdf.name')}:`, '___________________');
    addLabel(`${this.t('pdf.signature')}:`, '___________________');
    addLabel(`${this.t('pdf.date')}:`, '___________________');
    
    yPos += 15;
    
    // Manager signature
    const managerTitle = data.facility?.facilityType?.includes('farm') 
      ? this.t('pdf.managerFarm') 
      : this.t('pdf.managerFacility');
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(managerTitle, margin, yPos);
    yPos += 15;
    
    doc.line(margin, yPos, margin + 60, yPos);
    yPos += 5;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    addLabel(`${this.t('pdf.name')}:`, '___________________');
    addLabel(`${this.t('pdf.signature')}:`, '___________________');
    addLabel(`${this.t('pdf.date')}:`, '___________________');

    // Add page numbers to all pages
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      addPageNumber(i, totalPages);
    }

    return doc.output('blob');
  }

  downloadReport(data: ReportData, filename?: string): void {
    this.generateReport(data).then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `audit-report-${data.audit.id}-${data.reportVersion}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }
}
