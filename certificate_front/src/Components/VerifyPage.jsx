import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowLeft, Loader2, Calendar, User, FileText, Check } from 'lucide-react';

export default function VerifyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await fetch(`${API_URL}/api/public/verify/${id}`);
        if (!res.ok) {
          throw new Error('Verification failed. This document signature could not be verified.');
        }
        const data = await res.json();
        setDoc(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [id, API_URL]);

  const getDocTypeLabel = (type) => {
    switch (type) {
      case 'internship': return 'Internship Certificate';
      case 'course': return 'Course Completion Certificate';
      case 'offer_letter': return 'Offer Letter';
      case 'relieving_letter': return 'Relieving Letter';
      case 'receipt': return 'Fee Receipt';
      default: return type.toUpperCase();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between text-white font-sans selection:bg-teal-500 selection:text-slate-950">
      
      {/* Header */}
      <header className="px-6 py-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Magizh Logo" className="w-8 h-8 object-contain" />
            <span className="text-sm font-semibold tracking-wider uppercase text-slate-300">Magizh Technologies</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-xs text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Portal Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 py-16">
        <div className="max-w-md w-full">
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="w-10 h-10 animate-spin text-teal-400 mx-auto mb-4" />
              <p className="text-slate-400 text-sm font-light">Verifying document credentials...</p>
            </div>
          ) : error ? (
            /* VERIFICATION FAILED CARD */
            <div className="bg-slate-950/40 border border-red-500/20 rounded-3xl p-8 backdrop-blur-lg shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-rose-600" />
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-center text-red-400 mb-2">Invalid Document Reference</h2>
              <p className="text-xs text-slate-400 text-center leading-relaxed mb-6">
                This document signature or reference code could not be verified by Magizh Technologies. It may be forged, modified, or revoked.
              </p>
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-center text-slate-500 select-all">
                Reference Code: {id}
              </div>
            </div>
          ) : (
            /* VERIFICATION SUCCESSFUL CARD */
            <div className="bg-slate-950/40 border border-teal-500/20 rounded-3xl p-8 backdrop-blur-lg shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-emerald-500" />
              
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center border border-teal-500/20 animate-pulse">
                  <CheckCircle2 className="w-8 h-8 text-teal-400" />
                </div>
              </div>

              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-2">
                  <Check className="w-3 h-3" /> VERIFIED GENUINE
                </span>
                <h2 className="text-2xl font-bold text-white tracking-tight">Document Verified</h2>
                <p className="text-xs text-slate-400 mt-1">Magizh Technologies Official Registry</p>
              </div>

              {/* Data Items */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/40 hover:border-slate-800 transition-colors duration-200">
                  <User className="w-5 h-5 text-slate-500 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Recipient Name</p>
                    <p className="text-sm font-semibold text-slate-200 mt-0.5">{doc.recipient_name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/40 hover:border-slate-800 transition-colors duration-200">
                  <FileText className="w-5 h-5 text-slate-500 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Document Type</p>
                    <p className="text-sm font-semibold text-slate-200 mt-0.5">{getDocTypeLabel(doc.document_type)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/40 hover:border-slate-800 transition-colors duration-200">
                  <Calendar className="w-5 h-5 text-slate-500 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Date of Issue</p>
                    <p className="text-sm font-semibold text-slate-200 mt-0.5">{formatDate(doc.issue_date)}</p>
                  </div>
                </div>
              </div>

              {/* Extra Document Details (metadata) */}
              {doc.metadata_json && doc.metadata_json.course && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-900/20 border border-slate-800/20 text-xs">
                  <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px] block mb-1">Details / Scope</span>
                  <span className="text-slate-300 font-medium">{doc.metadata_json.course}</span>
                </div>
              )}

              {/* Unique Hash Footer */}
              <div className="mt-8 pt-6 border-t border-slate-800/60">
                <span className="text-[9px] text-slate-600 uppercase tracking-wider block text-center mb-1.5 font-semibold">Verification SHA Signature</span>
                <p className="text-[10px] text-slate-400 font-mono text-center break-all select-all py-2 bg-slate-950/20 rounded-xl border border-slate-900">
                  {doc.unique_hash}
                </p>
              </div>

            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-800 text-center text-xs text-slate-600">
        &copy; {new Date().getFullYear()} Magizh Technologies. Registry Integrity Verified.
      </footer>
    </div>
  );
}
