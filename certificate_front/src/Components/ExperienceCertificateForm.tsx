// 'use client'

// import { useState } from 'react'
// import InputField from './Inputfield'
// import FileUpload from './Fileupload'

// interface FormState {
//   employeeName: string
//   companyName: string
//   jobRole: string
//   startDate: string
//   endDate: string
//   skills: string
//   responsibilities: string
//   issueDate: string
//   logoPreview: string | null
//   signaturePreview: string | null
// }

// interface FormErrors {
//   [key: string]: string
// }

// interface FormCardProps {
//   title: string
//   icon: string
//   children: React.ReactNode
// }

// const initialState: FormState = {
//   employeeName: '',
//   companyName: '',
//   jobRole: '',
//   startDate: '',
//   endDate: '',
//   skills: '',
//   responsibilities: '',
//   issueDate: '',
//   logoPreview: null,
//   signaturePreview: null,
// }

// export default function FormPage() {
//   const [form, setForm] = useState<FormState>(initialState)
//   const [errors, setErrors] = useState<FormErrors>({})

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setForm(prev => ({ ...prev, [name]: value }))
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }))
//     }
//   }

//   const handleFile = (name: string, file: File | null) => {
//     if (!file) return
//     const reader = new FileReader()
//     reader.onloadend = () => {
//       setForm(prev => ({ ...prev, [name]: reader.result as string }))
//       if (errors[name]) {
//         setErrors(prev => ({ ...prev, [name]: '' }))
//       }
//     }
//     reader.readAsDataURL(file)
//   }

//   const validate = (): FormErrors => {
//     const required = ['employeeName', 'companyName', 'jobRole', 'startDate', 'endDate', 'skills', 'responsibilities', 'issueDate']
//     const newErrors: FormErrors = {}
    
//     required.forEach(key => {
//       const value = form[key as keyof FormState]
//       if (typeof value === 'string' && !value.trim()) {
//         newErrors[key] = 'This field is required'
//       }
//     })
    
//     if (form.startDate && form.endDate && form.startDate > form.endDate) {
//       newErrors.endDate = 'End date must be after start date'
//     }
    
//     return newErrors
//   }

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const newErrors = validate()
    
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors)
//       const firstError = document.querySelector('[data-error="true"]')
//       firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
//       return
//     }
    
//     // Create a blob with the form data and redirect
//     const dataStr = JSON.stringify(form)
//     sessionStorage.setItem('formData', dataStr)
//     window.location.href = '/preview'
//   }

//   return (
//     <div className="min-h-screen bg-[#f0ede8] py-12 px-4">
//       {/* Header */}
//       <div className="max-w-3xl mx-auto mb-10">
//         <div className="flex items-center gap-3 mb-2">
//           <div className="w-8 h-8 rounded-full bg-[#1a1a2e] flex items-center justify-center">
//             <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//             </svg>
//           </div>
//           <span className="font-mono text-xs tracking-[0.2em] text-[#1a1a2e]/60 uppercase">CertGen Pro</span>
//         </div>
//         <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a2e] leading-tight">
//           Experience Certificate
//         </h1>
//         <p className="mt-2 text-[#1a1a2e]/55 text-base">
//           Fill in the details below to generate a professional certificate.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} noValidate className="max-w-3xl mx-auto space-y-6">

//         {/* Section 1: Employee Info */}
//         <FormCard title="Employee Information" icon="👤">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <InputField
//                           label="Employee Name"
//                           name="employeeName"
//                           placeholder="e.g. Ranjith Kumar"
//                           value={form.employeeName}
//                           onChange={handleChange}
//                           error={errors.employeeName} hint={undefined}            />
//             <InputField
//                           label="Job Role / Position"
//                           name="jobRole"
//                           placeholder="e.g. Full Stack Developer"
//                           value={form.jobRole}
//                           onChange={handleChange}
//                           error={errors.jobRole} hint={undefined}            />
//           </div>
//         </FormCard>

//         {/* Section 2: Company Info */}
//         <FormCard title="Company Information" icon="🏢">
//           <div className="space-y-5">
//             <InputField
//                           label="Company Name"
//                           name="companyName"
//                           placeholder="e.g. Acme Technologies Pvt. Ltd."
//                           value={form.companyName}
//                           onChange={handleChange}
//                           error={errors.companyName} hint={undefined}            />
//             <FileUpload
//                           label="Company Logo"
//                           hint="PNG or JPG, max 2MB"
//                           preview={form.logoPreview}
//                           onChange={(file: File | null) => handleFile('logoPreview', file)}
//                           error={errors.logoPreview} isSignature={undefined}            />
//           </div>
//         </FormCard>

//         {/* Section 3: Employment Period */}
//         <FormCard title="Employment Period" icon="📅">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//             <InputField
//                           label="Start Date"
//                           name="startDate"
//                           type="date"
//                           value={form.startDate}
//                           onChange={handleChange}
//                           error={errors.startDate} hint={undefined}            />
//             <InputField
//                           label="End Date"
//                           name="endDate"
//                           type="date"
//                           value={form.endDate}
//                           onChange={handleChange}
//                           error={errors.endDate} hint={undefined}            />
//             <InputField
//                           label="Issue Date"
//                           name="issueDate"
//                           type="date"
//                           value={form.issueDate}
//                           onChange={handleChange}
//                           error={errors.issueDate} hint={undefined}            />
//           </div>
//         </FormCard>

//         {/* Section 4: Skills & Responsibilities */}
//         <FormCard title="Skills & Responsibilities" icon="⚡">
//           <div className="space-y-5">
//             <InputField
//               label="Skills"
//               name="skills"
//               placeholder="e.g. React, Node.js, PostgreSQL, REST APIs"
//               hint="Separate each skill with a comma"
//               value={form.skills}
//               onChange={handleChange}
//               error={errors.skills}
//             />
//             <div data-error={!!errors.responsibilities}>
//               <label className="block text-sm font-medium text-[#1a1a2e]/70 mb-1.5">
//                 Responsibilities
//                 <span className="text-red-400 ml-0.5">*</span>
//               </label>
//               <textarea
//                 name="responsibilities"
//                 rows={5}
//                 placeholder="Describe the employee's key responsibilities and contributions..."
//                 value={form.responsibilities}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-3 rounded-xl border text-sm text-[#1a1a2e] bg-white/80 placeholder:text-[#1a1a2e]/30 resize-none transition-all duration-200 outline-none
//                   ${errors.responsibilities
//                     ? 'border-red-300 focus:ring-2 focus:ring-red-200'
//                     : 'border-[#1a1a2e]/10 focus:border-amber-400 focus:ring-2 focus:ring-amber-100'
//                   }`}
//               />
//               {errors.responsibilities && (
//                 <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
//                   <span>⚠</span> {errors.responsibilities}
//                 </p>
//               )}
//             </div>
//           </div>
//         </FormCard>

//         {/* Section 5: Signature */}
//         <FormCard title="Authorization" icon="✍️">
//           <FileUpload
//             label="Authorized Signature"
//             hint="Upload signature image (PNG with transparent background recommended)"
//             preview={form.signaturePreview}
//             onChange={(file: File | null) => handleFile('signaturePreview', file)}
//             error={errors.signaturePreview}
//             isSignature
//           />
//         </FormCard>

//         {/* Submit */}
//         <div className="flex items-center justify-between pt-2 pb-10">
//           <button
//             type="button"
//             onClick={() => setForm(initialState)}
//             className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#1a1a2e]/60 border border-[#1a1a2e]/10 bg-white/60 hover:bg-white transition-all"
//           >
//             Reset Form
//           </button>
//           <button
//             type="submit"
//             className="px-8 py-3 rounded-xl text-sm font-semibold text-white bg-[#1a1a2e] hover:bg-[#2d2d4e] active:scale-95 transition-all duration-200 flex items-center gap-2 shadow-lg shadow-[#1a1a2e]/20"
//           >
//             Preview Certificate
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// function FormCard({ title, icon, children }: FormCardProps) {
//   return (
//     <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-[#1a1a2e]/8 p-6 md:p-7 shadow-sm">
//       <div className="flex items-center gap-2.5 mb-5">
//         <span className="text-lg">{icon}</span>
//         <h2 className="text-lg font-semibold text-[#1a1a2e]">{title}</h2>
//       </div>
//       {children}
//     </div>
//   )
// }
