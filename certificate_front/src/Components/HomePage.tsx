'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

interface Document {
  title: string
  description: string
  path: string
  isExternal?: boolean
}

const documentTypes: Document[] = [
  {
    title: 'Experience Certificate',
    description: 'Professional certificates recognizing employee tenure, role, and achievements during employment',
    path: 'https://employee-experience-certificate.vercel.app/',
  },
  {
    title: 'Offer Letter',
    description: 'Comprehensive employment offers with compensation, benefits, and position details',
    path: '/offer-letter',
  },
  {
    title: 'Relieving Letter',
    description: 'Official employee departure documentation with service acknowledgment',
    path: '/relieving-letter/form',
  },
  {
    title: 'Internship Certificate',
    description: 'Formal completion certificates recognizing internship achievements and duration',
    path: '/certificate?type=internship',
  },
  {
    title: 'Pay Slip',
    description: 'Detailed salary statements with earnings, deductions, and tax information',
    path: 'https://pay-slip-xi.vercel.app/',
    isExternal: true,
  },
 
  {
    title: 'Receipt Generator',
    description: 'Professional payment receipts with company branding and transaction details',
    path: '/receipt',
  }
]

const DocumentCard = ({ document }: { document: Document }) => (
  <a
    href={document.path}
    target={document.isExternal ? '_blank' : undefined}
    rel={document.isExternal ? 'noopener noreferrer' : undefined}
    className="group relative bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:border-gray-400 hover:shadow-xl overflow-hidden"
  >
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {document.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {document.description}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-300">
          <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
        </div>
      </div>
    </div>
  </a>
)

export function HomePage() {
  return (
    <div className="bg-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/logo.png" alt="Magizh Technologies Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Magizh Technologies</span>
          </div>
          <Button
            className="rounded-full px-6 bg-gray-900 hover:bg-gray-800 text-white font-medium transition-all duration-300"
          >
            Admin Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-32 sm:py-48 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl sm:text-7xl font-bold text-gray-900 mb-8 leading-tight text-balance">
            Professional documents, created instantly
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed">
            Generate compliant, professional documents for your organization. From employment letters to financial records, create polished documents that reflect your standards.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="rounded-full px-8 bg-gray-900 hover:bg-gray-800 text-white font-medium transition-all duration-300"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-gray-300 text-gray-900 hover:bg-gray-50 font-medium bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Documents Grid Section */}
      <section className="px-6 py-32 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Document Types
            </h2>
            <p className="text-lg text-gray-600">
              Explore our collection of professional templates designed for every organizational need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentTypes.map((doc, index) => (
              <DocumentCard key={index} document={doc} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-32 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-16 text-balance">
            Why organizations trust us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Security First',
                description: 'Enterprise-grade encryption and compliance with industry standards. Your data remains protected and private.'
              },
              {
                title: 'Professional Quality',
                description: 'Meticulously designed templates that meet regulatory requirements and represent your organization.'
              },
              {
                title: 'Rapid Generation',
                description: 'Create documents in seconds with intelligent form handling and instant formatting.'
              }
            ].map((feature, index) => (
              <div key={index}>
                <div className="mb-6">
                  <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 text-white font-bold">✓</div>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-32 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 text-balance">
            Start creating professional documents today
          </h2>
          <p className="text-lg text-gray-300 mb-12">
            Join organizations that rely on Document Pro for their documentation needs.
          </p>
          <Button
            size="lg"
            className="rounded-full px-8 bg-white text-gray-900 hover:bg-gray-100 font-medium transition-all duration-300"
          >
            Create Your First Document
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            {[
              { title: 'Product', links: ['Features', 'Templates', 'Security'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers'] },
              { title: 'Resources', links: ['Documentation', 'API Docs', 'Support'] },
              { title: 'Legal', links: ['Privacy', 'Terms of Service', 'Compliance'] }
            ].map((column, index) => (
              <div key={index}>
                <h4 className="font-semibold text-gray-900 mb-6 text-sm">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
            <p>&copy; 2024 Document Pro. All rights reserved.</p>
            <div className="flex gap-8 mt-6 sm:mt-0">
              <a href="#" className="hover:text-gray-900 transition-colors font-medium">
                Twitter
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors font-medium">
                LinkedIn
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors font-medium">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}