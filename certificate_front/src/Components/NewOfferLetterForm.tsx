'use client'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Loader2 } from 'lucide-react'

type LetterType = 'employment' | 'internship'

interface OfferLetterFormData {
  letterType: LetterType
  employeeName: string
  designation: string
  department: string
  // Employment only
  joiningDate: string
  salary: string
  // Internship only
  startDate: string
  internshipDays: string
  // Common
  workLocation: string
  issueDate: string
  companyName: string
  companyAddress: string
  companyWebsite: string
  companyEmail: string
  companyPhone: string
}

const defaultFormData: OfferLetterFormData = {
  letterType: 'employment',
  employeeName: '',
  designation: '',
  department: '',
  joiningDate: '',
  salary: '',
  startDate: '',
  internshipDays: '',
  workLocation: '',
  issueDate: new Date().toISOString().split('T')[0],
  companyName: 'Magizh Technologies',
  companyAddress: '28,1st Floor, JK Complex, Above Indian Stores, Mettupalayam MainRoad, NorthRangasamudram, Sathyamangalam-638401',
  companyWebsite: 'www.magizhtechnologies.com',
  companyEmail: 'info@magizhtechnologies.com',
  companyPhone: '+91 9342209140',
}

export default function OfferLetterFormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<OfferLetterFormData>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isInternship = formData.letterType === 'internship';

  const setLetterType = (type: LetterType) => {
    setFormData(prev => ({ ...prev, letterType: type }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const loadSampleData = () => {
    if (isInternship) {
      setFormData(prev => ({
        ...prev,
        employeeName: 'Priya Sharma',
        designation: 'Frontend Developer Intern',
        department: 'Engineering',
        startDate: new Date().toISOString().split('T')[0],
        internshipDays: '90',
        workLocation: 'Chennai, India',
        issueDate: new Date().toISOString().split('T')[0],
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        employeeName: 'John Doe',
        designation: 'Senior Software Engineer',
        department: 'Engineering',
        joiningDate: '2024-03-15',
        salary: '1,50,000',
        workLocation: 'Chennai, India',
        issueDate: new Date().toISOString().split('T')[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const params = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        params.set(key, value);
      });
      navigate(`/preview?${params.toString()}`);
    } catch (error) {
      console.error('Error generating offer letter:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full text-base text-gray-900 border-b border-gray-300 pb-3 focus:border-gray-900 outline-none transition-colors bg-transparent"

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-16 pb-16 sm:pb-24">
        <button
          onClick={() => window.history.back()}
          className="text-gray-600 hover:text-gray-900 mb-12 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="max-w-2xl">
          <h1 className="text-5xl sm:text-6xl font-light tracking-tight text-gray-900 mb-4">
            Offer Letter
          </h1>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            Create a professional offer letter. Choose the type below and fill in the details.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">

        {/* Letter Type Toggle */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Letter Type</h2>
          <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
            <button
              type="button"
              onClick={() => setLetterType('employment')}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                !isInternship
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Employment
            </button>
            <button
              type="button"
              onClick={() => setLetterType('internship')}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                isInternship
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Internship
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-16">
          {/* Person Information */}
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-12">
              {isInternship ? 'Intern Information' : 'Employee Information'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <label className="block text-sm text-gray-600 mb-4">
                  {isInternship ? 'Intern Name' : 'Employee Name'}
                </label>
                <input
                  type="text"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-4">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder={isInternship ? 'Frontend Developer Intern' : 'Senior Software Engineer'}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-4">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Engineering"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-4">Work Location</label>
                <input
                  type="text"
                  name="workLocation"
                  value={formData.workLocation}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Chennai, India"
                  required
                />
              </div>
            </div>
          </div>

          {/* Details — differs by letter type */}
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-12">
              {isInternship ? 'Internship Details' : 'Employment Details'}
            </h2>

            {isInternship ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                  <label className="block text-sm text-gray-600 mb-4">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-4">Duration (Days)</label>
                  <input
                    type="number"
                    name="internshipDays"
                    value={formData.internshipDays}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="e.g. 90"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-4">Issue Date</label>
                  <input
                    type="date"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleInputChange}
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                  <label className="block text-sm text-gray-600 mb-4">Joining Date</label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleInputChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-4">Annual Salary (CTC)</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="5,00,000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-4">Issue Date</label>
                  <input
                    type="date"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleInputChange}
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* Company Information */}
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-12">Company Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <label className="block text-sm text-gray-600 mb-4">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-4">Company Website</label>
                <input
                  type="text"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-4">Company Email</label>
                <input
                  type="email"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-4">Company Phone</label>
                <input
                  type="tel"
                  name="companyPhone"
                  value={formData.companyPhone}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-4">Company Address</label>
                <textarea
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleInputChange}
                  rows={2}
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 pt-8">
            <button
              type="button"
              onClick={loadSampleData}
              className="px-8 py-3 text-gray-900 font-light hover:bg-gray-100 rounded transition-colors"
            >
              Load Sample
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gray-900 text-white font-light rounded hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating
                </>
              ) : (
                'Generate Letter'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
