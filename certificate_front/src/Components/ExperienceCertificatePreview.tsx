// import { useLocation, useNavigate } from 'react-router-dom'
// import { useRef } from 'react'
// import Certificate from './Certificate'

// export default function PreviewPage() {
//   const { state } = useLocation()
//   const navigate = useNavigate()
//   const certRef = useRef(null)

//   if (!state?.formData) {
//     navigate('/')
//     return null
//   }

//   const { formData } = state

//   const handleDownload = async () => {
//     const element = certRef.current
//     if (!element) return

//     try {
//       // Dynamically import html2pdf
//       const html2pdf = (await import('html2pdf.js')).default
//       const opt = {
//         margin: 0,
//         filename: `Experience_Certificate_${formData.employeeName.replace(/\s+/g, '_')}.pdf`,
//         image: { type: 'jpeg', quality: 0.98 },
//         html2canvas: {
//           scale: 3,
//           useCORS: true,
//           logging: false,
//           backgroundColor: '#ffffff',
//         },
//         jsPDF: {
//           unit: 'mm',
//           format: 'a4',
//           orientation: 'portrait',
//         },
//       }
//       await html2pdf().set(opt).from(element).save()
//     } catch (err) {
//       console.error('PDF generation failed:', err)
//       window.print()
//     }
//   }

//   return (
//     <div className="min-h-screen bg-[#f0ede8] py-10 px-4">
//       {/* Top Action Bar */}
//       <div className="max-w-[900px] mx-auto mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//         <div>
//           <div className="flex items-center gap-2 mb-1">
//             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//             <span className="font-mono text-xs tracking-widest text-[#1a1a2e]/50 uppercase">Preview Ready</span>
//           </div>
//           <h1 className="font-display text-2xl font-bold text-[#1a1a2e]">Certificate Preview</h1>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => navigate('/', { state: { formData } })}
//             className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#1a1a2e] border border-[#1a1a2e]/15 bg-white/80 hover:bg-white transition-all flex items-center gap-2"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//             Back to Edit
//           </button>
//           <button
//             onClick={handleDownload}
//             className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#1a1a2e] hover:bg-[#2d2d4e] active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-[#1a1a2e]/20"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//             Download PDF
//           </button>
//         </div>
//       </div>

//       {/* Certificate */}
//       <div className="max-w-[900px] mx-auto">
//         <div ref={certRef}>
//           <Certificate data={formData} />
//         </div>
//       </div>

//       <p className="text-center text-xs text-[#1a1a2e]/30 mt-8 font-mono tracking-wider pb-10">
//         Generated with CertGen Pro · {new Date().getFullYear()}
//       </p>
//     </div>
//   )
// }