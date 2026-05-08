'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { CalendarIcon, Download, Plus, ArrowLeft } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type CertificateData = {
  employeeName: string
  employeeId: string
  designation: string
  department: string
  joiningDate: Date | undefined
  exitDate: Date | undefined
  yearsOfService: string
  reportingManager: string
  companyName: string
  companyAddress: string
  achievements: string
  dateOfIssue: Date | undefined
}

export default function ExperienceCertificatePage() {
  const [joiningDate, setJoiningDate] = useState<Date | undefined>(new Date(2020, 0, 1))
  const [exitDate, setExitDate] = useState<Date | undefined>(new Date())
  const [dateOfIssue, setDateOfIssue] = useState<Date | undefined>(new Date())
  const [certificateData, setCertificateData] = useState<CertificateData>({
    employeeName: '',
    employeeId: '',
    designation: '',
    department: '',
    joiningDate: new Date(2020, 0, 1),
    exitDate: new Date(),
    yearsOfService: '',
    reportingManager: '',
    companyName: 'Magizh Technologies',
    companyAddress: 'Chennai, Tamil Nadu, India',
    achievements: '',
    dateOfIssue: new Date(),
  })
  const [showCertificate, setShowCertificate] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setCertificateData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const calculateYearsOfService = () => {
    if (joiningDate && exitDate) {
      const years = Math.floor((exitDate.getTime() - joiningDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25))
      return years.toString()
    }
    return ''
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const yearsOfService = calculateYearsOfService()
    setCertificateData((prev) => ({
      ...prev,
      joiningDate,
      exitDate,
      dateOfIssue,
      yearsOfService,
    }))
    setShowCertificate(true)
  }

  const handleReset = () => {
    setCertificateData({
      employeeName: '',
      employeeId: '',
      designation: '',
      department: '',
      joiningDate: new Date(2020, 0, 1),
      exitDate: new Date(),
      yearsOfService: '',
      reportingManager: '',
      companyName: 'Magizh Technologies',
      companyAddress: 'Chennai, Tamil Nadu, India',
      achievements: '',
      dateOfIssue: new Date(),
    })
    setJoiningDate(new Date(2020, 0, 1))
    setExitDate(new Date())
    setDateOfIssue(new Date())
    setShowCertificate(false)
  }

  if (showCertificate) {
    return (
      <CertificateDisplay
        data={{
          ...certificateData,
          joiningDate: joiningDate || new Date(),
          exitDate: exitDate || new Date(),
          dateOfIssue: dateOfIssue || new Date(),
        }}
        onBack={handleReset}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-2 md:p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <img src="/logo.png" alt="Magizh Technologies Logo" className="h-12 w-auto" />
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Magizh Technologies</h1>
              <p className="text-gray-600 text-sm mt-1">Experience Certificate Generator</p>
            </div>
          </div>
          <p className="text-gray-600 text-lg ml-16">Create professional employee experience certificates</p>
        </div>

        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 py-8">
            <div className="flex items-center gap-3">
              <Plus size={28} className="text-blue-200" />
              <div>
                <h2 className="text-2xl font-bold">New Experience Certificate</h2>
                <p className="text-blue-100 text-sm mt-1">Fill in the employee details below</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Employee Information */}
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-widest mb-6 pb-3 border-b-2 border-blue-200">
                  Employee Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="employeeName" className="font-medium text-gray-900">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="employeeName"
                      name="employeeName"
                      value={certificateData.employeeName}
                      onChange={handleChange}
                      placeholder="Enter employee's full name"
                      required
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId" className="font-medium text-gray-900">
                      Employee ID <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="employeeId"
                      name="employeeId"
                      value={certificateData.employeeId}
                      onChange={handleChange}
                      placeholder="e.g., EMP-12345"
                      required
                      className="border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Position Details */}
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-widest mb-6 pb-3 border-b-2 border-blue-200">
                  Position Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="designation" className="font-medium text-gray-900">
                      Designation <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="designation"
                      name="designation"
                      value={certificateData.designation}
                      onChange={handleChange}
                      placeholder="e.g., Senior Developer"
                      required
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department" className="font-medium text-gray-900">
                      Department <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="department"
                      name="department"
                      value={certificateData.department}
                      onChange={handleChange}
                      placeholder="e.g., Engineering"
                      required
                      className="border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Employment Duration */}
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-widest mb-6 pb-3 border-b-2 border-blue-200">
                  Employment Duration
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-medium text-gray-900">Joining Date <span className="text-red-500">*</span></Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal border-gray-300 hover:bg-gray-50 bg-transparent"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-blue-600" />
                          {joiningDate ? format(joiningDate, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={joiningDate}
                          onSelect={setJoiningDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium text-gray-900">Exit Date <span className="text-red-500">*</span></Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal border-gray-300 hover:bg-gray-50 bg-transparent"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-blue-600" />
                          {exitDate ? format(exitDate, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={exitDate}
                          onSelect={setExitDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {/* Section 4: Reporting Manager */}
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-widest mb-6 pb-3 border-b-2 border-blue-200">
                  Approving Authority
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="reportingManager" className="font-medium text-gray-900">
                    Reporting Manager/Authorized Signatory <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="reportingManager"
                    name="reportingManager"
                    value={certificateData.reportingManager}
                    onChange={handleChange}
                    placeholder="Enter manager's full name and title"
                    required
                    className="border-gray-300"
                  />
                </div>
              </div>

              {/* Section 5: Company Information */}
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-widest mb-6 pb-3 border-b-2 border-blue-200">
                  Company Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="font-medium text-gray-900">
                      Company Name
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={certificateData.companyName}
                      onChange={handleChange}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyAddress" className="font-medium text-gray-900">
                      Company Address
                    </Label>
                    <Input
                      id="companyAddress"
                      name="companyAddress"
                      value={certificateData.companyAddress}
                      onChange={handleChange}
                      className="border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Section 6: Achievements/Remarks */}
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-widest mb-6 pb-3 border-b-2 border-blue-200">
                  Additional Remarks
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="achievements" className="font-medium text-gray-900">
                    Professional Achievements & Remarks
                  </Label>
                  <Textarea
                    id="achievements"
                    name="achievements"
                    value={certificateData.achievements}
                    onChange={handleChange}
                    placeholder="Highlight key achievements, skills, or notable contributions..."
                    rows={4}
                    className="border-gray-300 resize-none"
                  />
                </div>
              </div>

              {/* Section 7: Date of Issue */}
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-widest mb-6 pb-3 border-b-2 border-blue-200">
                  Certificate Details
                </h3>
                <div className="space-y-2">
                  <Label className="font-medium text-gray-900">Date of Issue</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal border-gray-300 hover:bg-gray-50 bg-transparent"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-blue-600" />
                        {dateOfIssue ? format(dateOfIssue, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateOfIssue}
                        onSelect={setDateOfIssue}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                >
                  Reset Form
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  <Plus size={18} className="mr-2" />
                  Generate Certificate
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CertificateDisplay({
  data,
  onBack,
}: {
  data: CertificateData
  onBack: () => void
}) {
  const yearsText =
    data.yearsOfService === '1' ? 'year' : 'years'

  return (
    <>
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          .certificate-container {
            max-width: 100%;
            margin: 0;
            padding: 0;
          }
          .certificate-card {
            box-shadow: none;
            page-break-after: avoid;
            border: none;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-2 md:p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6 no-print">
            <Button
              onClick={onBack}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 text-gray-700 bg-transparent"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Form
            </Button>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden certificate-card border-0">
            {/* Certificate Header with Decorative Elements */}
            <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-12 py-16 relative overflow-hidden">
              {/* Decorative circles in background */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16"></div>

              <div className="relative z-10">
                {/* Logo and Company Name */}
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="mb-4">
                    <img src="/logo.png" alt="Company Logo" className="h-20 w-auto" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">{data.companyName}</h2>
                  <p className="text-blue-100 text-sm mt-2">{data.companyAddress}</p>
                </div>

                {/* Certificate Title */}
                <div className="text-center py-6">
                  <div className="inline-block">
                    <div className="border-b-4 border-yellow-300 pb-2 mb-3">
                      <h1 className="text-4xl font-bold text-white tracking-widest">
                        EXPERIENCE CERTIFICATE
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Body */}
            <div className="px-12 py-16 space-y-8 bg-white">
              {/* Salutation */}
              <div className="text-center mb-8">
                <p className="text-lg text-gray-700 font-serif italic">
                  This is to certify that
                </p>
              </div>

              {/* Employee Name - Prominent */}
              <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
                <p className="text-3xl font-bold text-blue-700 tracking-wide">
                  {data.employeeName.toUpperCase()}
                </p>
                <p className="text-gray-600 text-sm mt-2">Employee ID: {data.employeeId}</p>
              </div>

              {/* Main Certificate Text */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg border-l-4 border-blue-600">
                <p className="text-gray-800 leading-relaxed text-justify font-serif text-base">
                  has been a valued member of our organization working as a{' '}
                  <span className="font-semibold text-blue-700">{data.designation}</span> in the{' '}
                  <span className="font-semibold text-blue-700">{data.department}</span> department.
                  During the employment period from{' '}
                  <span className="font-semibold">
  {data.joiningDate ? format(data.joiningDate, 'dd MMMM yyyy') : 'N/A'}
</span>
<span className="font-semibold">
  {data.exitDate ? format(data.exitDate, 'dd MMMM yyyy') : 'N/A'}
</span>
                  period of{' '}
                  <span className="font-semibold text-blue-700">
                    {data.yearsOfService} {yearsText}
                  </span>
                  , the employee has demonstrated exceptional commitment, professionalism, and dedication to
                  their role.
                </p>
              </div>

              {/* Achievements Section */}
              {data.achievements && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-3">
                    Key Achievements & Contributions
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-justify font-serif">
                    {data.achievements}
                  </p>
                </div>
              )}

              {/* Closing Statement */}
              <div className="pt-6 text-center">
                <p className="text-gray-800 leading-relaxed font-serif text-base">
                  We wish the employee continued success in all future endeavors.
                </p>
              </div>

              {/* Signature Section */}
              <div className="pt-12 border-t-2 border-gray-300">
                <div className="grid grid-cols-2 gap-16 mt-16">
                  {/* Left Signature */}
                  <div className="text-center">
                    <div className="border-t-2 border-gray-400 pt-2 mb-2" style={{ marginBottom: '60px' }}></div>
                    <p className="font-semibold text-gray-900 text-sm">Authorized Signatory</p>
                    <p className="text-gray-600 text-xs mt-2">{data.reportingManager}</p>
                    <p className="text-gray-600 text-xs">{data.companyName}</p>
                  </div>

                  {/* Right Date */}
                  <div className="text-center">
                    <p className="text-gray-700 text-sm mb-2">
                      <span className="font-semibold">Date of Issue:</span>
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {data.dateOfIssue ? format(data.dateOfIssue, 'dd MMMM yyyy') : 'N/A'}
                    </p>
                    <div className="border-t-2 border-gray-400 mt-10 pt-2"></div>
                    <p className="text-gray-600 text-xs mt-2">Official Seal/Stamp</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center pt-8 border-t border-gray-200 mt-12">
                <p className="text-gray-500 text-xs">
                  This certificate is issued as a proof of employment and professional conduct.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  © {new Date().getFullYear()} {data.companyName}. All rights reserved.
                </p>
              </div>
            </div>
          </div>

          {/* Print Actions */}
          <div className="flex justify-center gap-4 mt-8 no-print">
            <Button
              onClick={() => window.print()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              <Download size={18} className="mr-2" />
              Download Certificate
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
