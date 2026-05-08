'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React, { useRef } from 'react'

interface RelievingLetterData {
  companyName: string
  employeeName: string
  employeeId: string
  designation: string
  department: string
  startDate: string
  endDate: string
  reasonForRelief: string
  companyCEO: string
  companyAddress: string
  letterDate: string
}

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

// Sample data for preview
const sampleData: RelievingLetterData = {
  companyName: 'Acme Corporation',
  employeeName: 'John Doe',
  employeeId: 'EMP-2024-001',
  designation: 'Senior Software Engineer',
  department: 'Engineering',
  startDate: '2020-03-15',
  endDate: '2025-12-31',
  reasonForRelief: 'Pursuing higher education abroad',
  companyCEO: 'Jane Smith',
  companyAddress: '123 Business Park, Suite 400\nSan Francisco, CA 94105',
  letterDate: '2026-01-15',
}

export function RelievingLetterPreview() {
  const printRef = useRef<HTMLDivElement>(null)

  // Use URL params if available, otherwise use sample data
  const data: RelievingLetterData = (() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const encoded = params.get('data')
      if (encoded) {
        try {
          return JSON.parse(decodeURIComponent(encoded))
        } catch {
          return sampleData
        }
      }
    }
    return sampleData
  })()

  const handleDownload = async () => {
    const element = printRef.current
    if (!element) return

    try {
      const html2pdf = (await import('html2pdf.js')).default
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${data.employeeName}-Relieving-Letter.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
        },
        jsPDF: { orientation: 'portrait' as const, unit: 'mm' as const, format: 'a4' as const },
        pagebreak: { mode: ['avoid-all'] },
      }
      html2pdf().set(opt).from(element).save()
    } catch {
      window.print()
    }
  }

  return (
    <div className="min-h-screen bg-muted/40 py-12 relative">
      <div className="fixed top-8 right-8 z-10">
        <Button
          onClick={handleDownload}
          className="flex items-center gap-2 rounded"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* Document Container */}
      <div className="max-w-2xl mx-auto">
        <div
          ref={printRef}
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
            lineHeight: '1.8',
            color: '#000',
            width: '190mm',
            height: '277mm',
            overflow: 'hidden',
            margin: '0 auto',
            background: '#fff',
            padding: '14mm 14mm',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
          }}
        >
          {/* Company Header - Centered */}
          <div style={{ textAlign: 'center', marginBottom: '28px', paddingBottom: '18px', borderBottom: '1px solid #e5e7eb' }}>
            <img
              src="/logo.png"
              alt="Company Logo"
              style={{ height: '56px', width: 'auto', margin: '0 auto 12px auto', display: 'block' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
            <h1 style={{ fontSize: '26px', fontWeight: 400, color: '#111', margin: '0 0 8px 0', letterSpacing: '-0.01em' }}>
              {data.companyName}
            </h1>
            <p style={{ fontSize: '13px', color: '#666', fontWeight: 300, margin: 0, whiteSpace: 'pre-line' }}>
              {data.companyAddress}
            </p>
          </div>

          {/* Date */}
          <div style={{ marginBottom: '22px', textAlign: 'right' }}>
            <p style={{ fontSize: '14px', color: '#444', fontWeight: 300, margin: 0 }}>
              {formatDate(data.letterDate)}
            </p>
          </div>

          {/* Salutation */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '15px', color: '#111', fontWeight: 300, margin: 0 }}>Dear Concerned,</p>
          </div>

          {/* Main Letter Body */}
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '14px', lineHeight: '1.9', color: '#111', fontWeight: 300, textAlign: 'justify', margin: '0 0 16px 0' }}>
              This is to certify that {data.companyName} hereby confirms that {data.employeeName} with Employee ID {data.employeeId} has been employed as a {data.designation} in the {data.department} Department with our organization from {formatDate(data.startDate)} to {formatDate(data.endDate)}.
            </p>

            <p style={{ fontSize: '14px', lineHeight: '1.9', color: '#111', fontWeight: 300, textAlign: 'justify', margin: '0 0 16px 0' }}>
              During his/her tenure with us, {data.employeeName} has worked on several key projects of the company and has consistently delivered excellence. He/She has been punctual and regular in his/her duties and has maintained an excellent professional reputation among team members and clients alike. {data.employeeName} is a dedicated team player who has contributed significantly to the growth and success of our organization.
            </p>

            {data.reasonForRelief && (
              <p style={{ fontSize: '14px', lineHeight: '1.9', color: '#111', fontWeight: 300, textAlign: 'justify', margin: '0 0 16px 0' }}>
                Reason for Relief: {data.reasonForRelief.replace(/<[^>]*>?/gm, '')}
              </p>
            )}

            <p style={{ fontSize: '14px', lineHeight: '1.9', color: '#111', fontWeight: 300, textAlign: 'justify', margin: '0 0 16px 0' }}>
              We hereby relieve {data.employeeName} of all responsibilities and duties with immediate effect. This letter is issued for the purpose of his/her future employment or any other official use as required. We wish him/her all the best in his/her future endeavors.
            </p>
          </div>

          {/* Closing Section - pushed to bottom */}
          <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
            <p style={{ fontSize: '14px', color: '#111', fontWeight: 300, margin: '0 0 40px 0' }}>Regards,</p>

            {/* Signature Space */}
            <div>
              <div style={{ borderBottom: '1px solid #999', height: '40px', width: '160px', marginBottom: '6px' }} />
              <p style={{ fontSize: '14px', color: '#111', fontWeight: 300, margin: '0 0 3px 0' }}>{data.companyCEO}</p>
              <p style={{ fontSize: '12px', color: '#666', fontWeight: 300, margin: '0 0 3px 0' }}>Authorized Signatory</p>
              <p style={{ fontSize: '12px', color: '#666', fontWeight: 300, margin: 0 }}>{data.companyName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          * {
            margin: 0 !important;
            padding: 0 !important;
          }
          body {
            background: white;
            margin: 0;
            padding: 0;
          }
          .fixed {
            display: none !important;
          }
        }
        @page {
          size: A4;
          margin: 10mm;
        }
      `}</style>
    </div>
  )
}
