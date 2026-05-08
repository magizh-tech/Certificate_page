'use client'

import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Phone, Globe, ArrowLeft } from 'lucide-react';

function OfferLetterPreview() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const state = {
    employeeName: searchParams.get('employeeName') || '',
    designation: searchParams.get('designation') || '',
    department: searchParams.get('department') || '',
    joiningDate: searchParams.get('joiningDate') || '',
    salary: searchParams.get('salary') || '',
    workLocation: searchParams.get('workLocation') || '',
    issueDate: searchParams.get('issueDate') || '',
    companyCEO: searchParams.get('companyCEO') || '',
    companyName: searchParams.get('companyName') || 'Magizh Technologies',
    companyAddress: searchParams.get('companyAddress') || '',
    companyWebsite: searchParams.get('companyWebsite') || '',
    companyEmail: searchParams.get('companyEmail') || '',
    companyPhone: searchParams.get('companyPhone') || '',
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate(-1);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="text-gray-900 font-light whitespace-pre-line">
      <div className="max-w-3xl mx-auto">
        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-8 print:hidden gap-4">
          <button
            onClick={handleBack}
            className="px-5 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700 rounded-md hover:bg-slate-50 transition-colors duration-200 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 transition-colors duration-200"
          >
            Print
          </button>
        </div>

        {/* Document Container */}
        <div className="bg-white shadow-lg overflow-hidden border border-slate-200">
          
          {/* Header Section */}
          <div className="border-b-2 border-slate-900">
            <div className="px-10 py-5 md:px-14">
              <div className="flex flex-col items-center text-center">
                {/* Logo */}
                <img 
                  src="/logo.png" 
                  alt="Company Logo" 
                  className="h-14 w-auto"
                />
                
                {/* Company Name */}
                <div className="mt-2">
                  <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                    {state.companyName}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-10 py-6 md:px-14">
            {/* Date */}
            <div className="flex justify-end mb-4">
              <p className="text-sm text-slate-600">
                <span className="font-medium">Date:</span> {formatDate(state.issueDate)}
              </p>
            </div>
            
            {/* Title */}
            <div className="text-center mb-5">
              <h1 className="text-3xl font-normal text-gray-900 mb-3 tracking-tight">
                OFFER OF EMPLOYMENT
              </h1>
            </div>

            {/* Body Text */}
            <div className="space-y-3 text-slate-700 leading-6 font-light text-sm">
              <p>
                Dear <span className="font-semibold text-slate-900">{state.employeeName || '[Employee Name]'}</span>,
              </p>
              
              <p className="text-justify">
                We are pleased to extend an offer to you for the position of <span className="font-semibold text-slate-900">{state.designation || '[Designation]'}</span> within our <span className="font-semibold text-slate-900">{state.department || '[Department]'}</span> department. We are confident that your skills and experience will be a valuable addition to our organization.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-3 my-6">
                <div className="flex justify-between">
                  <span className="text-slate-600">Position:</span>
                  <span className="font-semibold text-slate-900">{state.designation || '[Designation]'}</span>
                </div>
                <div className="border-t border-slate-200" />
                <div className="flex justify-between">
                  <span className="text-slate-600">Department:</span>
                  <span className="font-semibold text-slate-900">{state.department || '[Department]'}</span>
                </div>
                <div className="border-t border-slate-200" />
                <div className="flex justify-between">
                  <span className="text-slate-600">Annual Compensation:</span>
                  <span className="font-semibold text-slate-900">{state.salary ? `Rs. ${parseInt(state.salary).toLocaleString('en-IN')}/-` : '[Salary]'}</span>
                </div>
              </div>
              
              <p className="text-justify">
                We are eager to welcome you to our team. Please review the terms of this offer carefully. To indicate your acceptance, kindly sign and return a copy of this letter at your earliest convenience.
              </p>

              <p className="text-justify">
                We look forward to a rewarding professional relationship with you.
              </p>
              
              {/* Signature Section */}
              <div className="mt-20 pt-16 border-t border-slate-300 -ml-6">
                <p className="font-semibold text-slate-900 mb-3 text-base">Sincerely,</p>
                <div className="h-40 w-60">
                  <img 
                    src="/sig.png" 
                    alt="Authorized Signature" 
                    className="h-full w-full object-contain object-left"
                  />
                </div>
                <div className="border-t-2 border-slate-700 w-60 pt-4 mt-2">
                  <p className="text-sm text-gray-900 font-light mt-1">{state.companyCEO}</p>
                  <p className="text-slate-600 text-sm mt-1">Authorized Signatory</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700 text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} {state.companyName}. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfferLetterPreview;
