import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const GeneratedCertificate = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const certificateRef = useRef();

  // Safely extract state variables with fallbacks
  const name = state?.name || "Gokulakrishnan M";
  const issueDate = state?.issueDate || new Date().toISOString().split('T')[0];
  const certificateId = state?.certificateId || "CERT-12345";
  const course = state?.course || "FULL STACK DEVELOPER (Course Completed)";

  const getFormattedProgram = (courseName) => {
    if (!courseName) return "FULL STACK DEVELOPER PROGRAM";
    const formatted = courseName.toUpperCase();
    if (formatted.includes("INTERNSHIP COMPLETED")) {
      return "FULL STACK DEVELOPER INTERNSHIP PROGRAM";
    } else if (formatted.includes("COURSE COMPLETED")) {
      return "FULL STACK DEVELOPER PROGRAM";
    }
    return formatted;
  };

  const handleDownload = () => {
    if (certificateRef.current) {
      toPng(certificateRef.current, { quality: 1.0, pixelRatio: 2 })
        .then((dataUrl) => {
          const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
          });
          pdf.addImage(dataUrl, 'PNG', 0, 0, 297, 210);
          pdf.save(`${name.replace(/\s+/g, '_')}_certificate.pdf`);
        })
        .catch((err) => {
          console.error('Failed to generate certificate PDF:', err);
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 py-12 px-6">
      {/* Navigation button */}
      <div className="mb-6 self-start max-w-[1600px] mx-auto w-full flex justify-between items-center">
        <button
          onClick={() => navigate('/certificate')}
          className="flex items-center text-slate-300 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Generator
        </button>
      </div>

      {/* Certificate Container */}
      <div
        className="relative w-[1600px] h-[1000px] bg-white shadow-2xl overflow-hidden select-none"
        ref={certificateRef}
        style={{
          background: '#ffffff',
          border: '4px solid #1a1a2e',
          padding: '40px',
          boxSizing: 'border-box',
        }}
      >
        {/* Gold double line border */}
        <div style={{
          position: 'absolute',
          inset: '24px',
          border: '6px double #c9a84c',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Corner Accents */}
        <div style={{ position: 'absolute', width: '36px', height: '36px', zIndex: 3, top: '22px', left: '22px', borderTop: '4px solid #c9a84c', borderLeft: '4px solid #c9a84c' }} />
        <div style={{ position: 'absolute', width: '36px', height: '36px', zIndex: 3, top: '22px', right: '22px', borderTop: '4px solid #c9a84c', borderRight: '4px solid #c9a84c' }} />
        <div style={{ position: 'absolute', width: '36px', height: '36px', zIndex: 3, bottom: '22px', left: '22px', borderBottom: '4px solid #c9a84c', borderLeft: '4px solid #c9a84c' }} />
        <div style={{ position: 'absolute', width: '36px', height: '36px', zIndex: 3, bottom: '22px', right: '22px', borderBottom: '4px solid #c9a84c', borderRight: '4px solid #c9a84c' }} />

        {/* Watermark Background */}
        <div
          style={{
            position: 'absolute',
            opacity: 0.20,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <img
            src="/logo.png"
            onError={(e) => { e.target.style.display = 'none'; }}
            alt="Watermark Logo"
            className="w-[450px] h-[450px] object-contain"
          />
        </div>

        {/* QR Code for Verification (Top-Right, placed neatly inside border) */}
        <div
          style={{
            position: 'absolute',
            top: '55px',
            right: '55px',
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/public/qr/${certificateId}`}
            onError={(e) => { e.target.style.display = 'none'; }}
            alt="Verification QR Code"
            className="w-24 h-24 border border-gray-200 p-1 bg-white"
          />
          <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-sans">Scan to Verify</span>
        </div>

        {/* Certificate Content */}
        <div className="relative z-10 flex flex-col justify-between h-full py-6 px-10">
          
          {/* Top Logo */}
          <div className="flex flex-col items-center mb-2">
            <img
              src="/logo.png"
              onError={(e) => { e.target.style.display = 'none'; }}
              alt="Organization Logo"
              className="w-24 h-24 object-contain"
              style={{ filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.12))' }}
            />
          </div>

          {/* Certificate Title */}
          <div>
            <h1
              className="text-5xl font-bold text-center uppercase tracking-wide"
              style={{ fontFamily: "'Cinzel', serif", color: '#1a1a2e' }}
            >
              Certificate of Course Completion
            </h1>
            <p 
              className="text-center text-2xl italic mt-3"
              style={{ fontFamily: "'Playfair Display', serif", color: '#6b7280' }}
            >
              This certifies that
            </p>
          </div>

          {/* Recipient Name */}
          <div className="my-2">
            <h2
              className="text-6xl text-center"
              style={{ fontFamily: "'Great Vibes', cursive", color: '#1a1a2e' }}
            >
              {name}
            </h2>
          </div>

          {/* Completion & Program Details */}
          <div>
            <p 
              className="text-center text-xl uppercase tracking-widest font-light mb-2"
              style={{ fontFamily: "'Roboto', sans-serif", color: '#4b5563' }}
            >
              has successfully completed the
            </p>
            <h3
              className="text-4xl font-bold text-center uppercase tracking-wider mb-2"
              style={{ fontFamily: "'Cinzel', serif", color: '#c9a84c' }}
            >
              {getFormattedProgram(course)}
            </h3>
            <p 
              className="text-center text-lg italic"
              style={{ fontFamily: "'Playfair Display', serif", color: '#6b7280' }}
            >
              Completed in 3 months
            </p>
          </div>

          {/* Program Syllabus / Description Paragraph */}
          <div className="max-w-[1100px] mx-auto">
            <p 
              className="text-center text-lg leading-relaxed font-light"
              style={{ fontFamily: "'Roboto', sans-serif", color: '#4b5563' }}
            >
              This program covered front-end development using React and Tailwind CSS,
              as well as back-end technologies like FastAPI and SQLAlchemy. The recipient
              demonstrated proficiency in building RESTful APIs, database management, and deploying
              applications. Practical hands-on experience included integrating third-party services
              and version control systems like Git.
            </p>
          </div>

          {/* Metadata Block (Date, ID, verify link) */}
          <div 
            className="flex justify-between w-[1200px] mx-auto mt-2 font-light"
            style={{ fontFamily: "'Roboto', sans-serif", color: '#4b5563' }}
          >
            <div className="text-left space-y-1">
              <p className="text-xl"><strong>Organization:</strong> Magizh Technologies</p>
              <p className="text-xl"><strong>Issue Date:</strong> {issueDate}</p>
            </div>

            <div className="text-right space-y-1">
              <p className="text-xl"><strong>Certificate ID:</strong> {certificateId}</p>
              <p className="text-xl">
                <strong>Verify here:</strong>{' '}
                <a
                  href="https://www.magizhtechnologies.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-normal"
                >
                  www.magizhtechnologies.com
                </a>
              </p>
            </div>
          </div>

          {/* Divider */}
          <div 
            className="w-[1200px] mx-auto border-t mt-2 mb-4" 
            style={{ borderColor: '#d1d5db' }}
          />

          {/* Three-Column Footer */}
          <div className="flex justify-between items-end w-[1200px] mx-auto">
            
            {/* Signature Column */}
            <div className="flex flex-col items-center text-center w-[280px]">
              <div className="h-24 flex items-end justify-center mb-2">
                <img
                  src="/sig.png"
                  onError={(e) => { e.target.style.display = 'none'; }}
                  alt="Signature"
                  className="max-h-40 w-auto object-contain"
                  style={{ filter: 'contrast(1.3) brightness(0.9)' }}
                />
              </div>
              <div className="w-full border-t my-0" style={{ borderColor: '#9ca3af' }} />
              <p className="font-semibold text-lg mt-1" style={{ fontFamily: "'Roboto', sans-serif", color: '#1a1a2e' }}>Vijay P.</p>
              <p className="text-sm" style={{ fontFamily: "'Roboto', sans-serif", color: '#6b7280' }}>CEO, Magizh Technologies</p>
            </div>

            {/* MSME Registered Column */}
            <div className="flex flex-col items-center text-center w-[280px]">
              <div className="h-24 flex items-center justify-center mb-2">
                <img
                  src="/msme.png"
                  onError={(e) => { e.target.style.display = 'none'; }}
                  alt="MSME Registered"
                  className="max-h-20 w-auto object-contain"
                  style={{ filter: 'contrast(1.1)' }}
                />
              </div>
              <p 
                className="text-sm font-semibold tracking-wide mt-2"
                style={{ fontFamily: "'Roboto', sans-serif", color: '#1a1a2e' }}
              >
                MSME Registered
              </p>
            </div>

            {/* Official Seal Column */}
            <div className="flex flex-col items-center text-center w-[280px]">
              <div className="h-24 flex items-center justify-center mb-2">
                <img
                  src="/Magizh Technologies.png"
                  onError={(e) => { e.target.style.display = 'none'; }}
                  alt="Official Seal"
                  className="max-h-24 w-auto object-contain"
                  style={{ filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15))' }}
                />
              </div>
              <p 
                className="text-sm font-semibold tracking-wide mt-2"
                style={{ fontFamily: "'Roboto', sans-serif", color: '#1a1a2e' }}
              >
                Official Seal
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex space-x-4">
        <button
          onClick={handleDownload}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium py-3 px-8 rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          Download PDF Certificate
        </button>
      </div>
    </div>
  );
};

export default GeneratedCertificate;
