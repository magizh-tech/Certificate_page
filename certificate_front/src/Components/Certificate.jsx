import { formatDate, getEmploymentDuration } from '../utils/dateUtils'

export default function Certificate({ data }) {
  const {
    employeeName, companyName, jobRole,
    startDate, endDate, skills, responsibilities,
    issueDate, logoPreview, signaturePreview
  } = data

  const skillList = skills.split(',').map(s => s.trim()).filter(Boolean)
  const duration = getEmploymentDuration(startDate, endDate)

  return (
    <div
      className="bg-white certificate-shadow"
      style={{
        width: '100%',
        minHeight: '297mm',
        fontFamily: 'Georgia, serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative corner accents */}
      <CornerAccent position="top-left" />
      <CornerAccent position="top-right" />
      <CornerAccent position="bottom-left" />
      <CornerAccent position="bottom-right" />

      {/* Outer border */}
      <div style={{
        position: 'absolute', inset: '12px',
        border: '1px solid #c9a84c',
        pointerEvents: 'none', zIndex: 1,
      }} />
      {/* Inner border */}
      <div style={{
        position: 'absolute', inset: '18px',
        border: '0.5px solid rgba(201,168,76,0.35)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Watermark */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%) rotate(-35deg)',
        fontSize: '120px', fontWeight: 800,
        color: 'rgba(201,168,76,0.045)',
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap', zIndex: 0,
        fontFamily: 'Georgia, serif',
        userSelect: 'none', pointerEvents: 'none',
      }}>
        CERTIFIED
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '52px 64px' }}>

        {/* Top: Logo + Company */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Company Logo"
                style={{ height: '56px', maxWidth: '160px', objectFit: 'contain' }}
              />
            ) : (
              <div style={{
                width: '56px', height: '56px', borderRadius: '12px',
                background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#c9a84c', fontSize: '22px', fontWeight: 700 }}>
                  {companyName.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <p style={{ fontSize: '16px', fontWeight: 700, color: '#1a1a2e', margin: 0, fontFamily: 'Georgia, serif' }}>
                {companyName}
              </p>
              <p style={{ fontSize: '11px', color: '#888', margin: '2px 0 0', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
                Official Document
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '11px', color: '#999', margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
              Issue Date
            </p>
            <p style={{ fontSize: '13px', color: '#1a1a2e', margin: '4px 0 0', fontWeight: 600, fontFamily: 'Georgia, serif' }}>
              {formatDate(issueDate)}
            </p>
          </div>
        </div>

        {/* Divider */}
        <GoldDivider />

        {/* Title */}
        <div style={{ textAlign: 'center', margin: '36px 0 32px' }}>
          <p style={{
            fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase',
            color: '#c9a84c', margin: '0 0 10px', fontFamily: 'sans-serif', fontWeight: 500
          }}>
            This is to certify that
          </p>
          <h1 style={{
            fontSize: '48px', fontWeight: 700, color: '#1a1a2e',
            margin: '0 0 6px', lineHeight: 1.1,
            fontFamily: 'Georgia, serif',
          }}>
            {employeeName}
          </h1>
          <p style={{
            fontSize: '11px', color: '#c9a84c', letterSpacing: '0.25em',
            textTransform: 'uppercase', fontFamily: 'sans-serif',
            margin: 0, fontWeight: 500,
          }}>
            ━━ Experience Certificate ━━
          </p>
        </div>

        {/* Main paragraph */}
        <div style={{
          background: 'linear-gradient(135deg, #fafaf8 0%, #f8f6f0 100%)',
          border: '1px solid rgba(201,168,76,0.25)',
          borderRadius: '12px',
          padding: '28px 32px',
          marginBottom: '28px',
        }}>
          <p style={{
            fontSize: '14.5px', lineHeight: 1.85, color: '#2c2c2c',
            margin: 0, textAlign: 'justify', fontFamily: 'Georgia, serif',
          }}>
            This is to certify that <strong style={{ color: '#1a1a2e' }}>{employeeName}</strong> was
            employed at <strong style={{ color: '#1a1a2e' }}>{companyName}</strong> as a{' '}
            <strong style={{ color: '#1a1a2e' }}>{jobRole}</strong> from{' '}
            <strong style={{ color: '#1a1a2e' }}>{formatDate(startDate)}</strong> to{' '}
            <strong style={{ color: '#1a1a2e' }}>{formatDate(endDate)}</strong>
            {duration ? ` (${duration})` : ''}. During this tenure, {employeeName.split(' ')[0]} demonstrated
            exceptional dedication, technical proficiency, and a consistent commitment to delivering
            high-quality results. We found {employeeName.split(' ')[0]} to be a hardworking, reliable,
            and valuable member of our team.
          </p>
        </div>

        {/* Skills */}
        {skillList.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <SectionLabel>Key Skills & Technologies</SectionLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
              {skillList.map((skill, i) => (
                <span key={i} style={{
                  background: '#1a1a2e', color: '#c9a84c',
                  padding: '5px 14px', borderRadius: '50px',
                  fontSize: '12px', fontFamily: 'monospace',
                  fontWeight: 500, letterSpacing: '0.03em',
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Responsibilities */}
        {responsibilities && (
          <div style={{ marginBottom: '36px' }}>
            <SectionLabel>Roles & Responsibilities</SectionLabel>
            <div style={{
              marginTop: '12px',
              borderLeft: '3px solid #c9a84c',
              paddingLeft: '20px',
            }}>
              <p style={{
                fontSize: '13.5px', lineHeight: 1.8, color: '#444',
                margin: 0, textAlign: 'justify', fontFamily: 'Georgia, serif',
              }}>
                {responsibilities}
              </p>
            </div>
          </div>
        )}

        {/* Bottom divider */}
        <GoldDivider />

        {/* Signature + Seal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '36px' }}>
          {/* Signature */}
          <div style={{ minWidth: '220px' }}>
            {signaturePreview ? (
              <img
                src={signaturePreview}
                alt="Authorized Signature"
                style={{ height: '64px', maxWidth: '200px', objectFit: 'contain', marginBottom: '8px' }}
              />
            ) : (
              <div style={{
                height: '48px', width: '180px',
                borderBottom: '2px solid #1a1a2e',
                marginBottom: '8px',
              }} />
            )}
            <p style={{
              fontSize: '12px', color: '#1a1a2e', margin: '0 0 2px',
              fontWeight: 700, fontFamily: 'Georgia, serif',
            }}>
              Authorized Signatory
            </p>
            <p style={{ fontSize: '11px', color: '#888', margin: 0, fontFamily: 'sans-serif' }}>
              {companyName}
            </p>
          </div>

          {/* Official Seal */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '90px', height: '90px', borderRadius: '50%',
              border: '2px dashed #c9a84c',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              background: 'rgba(201,168,76,0.05)',
            }}>
              <span style={{ fontSize: '22px' }}>🏛️</span>
              <p style={{ fontSize: '7px', color: '#c9a84c', margin: '4px 0 0', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
                Official Seal
              </p>
            </div>
          </div>

          {/* Employment period summary */}
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '11px', color: '#aaa', margin: '0 0 4px', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Period of Employment
            </p>
            <p style={{ fontSize: '13px', color: '#1a1a2e', margin: '0 0 2px', fontWeight: 600, fontFamily: 'Georgia, serif' }}>
              {formatDate(startDate)}
            </p>
            <p style={{ fontSize: '11px', color: '#c9a84c', margin: '0 0 2px', fontFamily: 'sans-serif' }}>to</p>
            <p style={{ fontSize: '13px', color: '#1a1a2e', margin: 0, fontWeight: 600, fontFamily: 'Georgia, serif' }}>
              {formatDate(endDate)}
            </p>
            {duration && (
              <p style={{ fontSize: '11px', color: '#888', margin: '6px 0 0', fontFamily: 'sans-serif' }}>
                {duration}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p style={{
            fontSize: '10px', color: '#bbb', letterSpacing: '0.15em',
            textTransform: 'uppercase', fontFamily: 'sans-serif',
          }}>
            This certificate is issued in good faith and is valid as an official document of {companyName}
          </p>
        </div>
      </div>
    </div>
  )
}

function GoldDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '4px 0' }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #c9a84c)' }} />
      <span style={{ color: '#c9a84c', fontSize: '16px' }}>◆</span>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #c9a84c)' }} />
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{
        display: 'inline-block', width: '3px', height: '14px',
        background: '#c9a84c', borderRadius: '2px',
      }} />
      <p style={{
        fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
        color: '#888', margin: 0, fontWeight: 600, fontFamily: 'sans-serif',
      }}>
        {children}
      </p>
    </div>
  )
}

function CornerAccent({ position }) {
  const styles = {
    'top-left': { top: '8px', left: '8px', borderTop: '2px solid #c9a84c', borderLeft: '2px solid #c9a84c' },
    'top-right': { top: '8px', right: '8px', borderTop: '2px solid #c9a84c', borderRight: '2px solid #c9a84c' },
    'bottom-left': { bottom: '8px', left: '8px', borderBottom: '2px solid #c9a84c', borderLeft: '2px solid #c9a84c' },
    'bottom-right': { bottom: '8px', right: '8px', borderBottom: '2px solid #c9a84c', borderRight: '2px solid #c9a84c' },
  }
  return (
    <div style={{
      position: 'absolute', width: '24px', height: '24px',
      zIndex: 3, ...styles[position]
    }} />
  )
}