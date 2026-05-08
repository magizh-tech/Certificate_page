"use client"

import React from "react"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { CalendarIcon, Download, Plus, ArrowLeft } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ReceiptData = {
  receiptNumber: string;
  date: Date | undefined;
  from: string;
  to: string;
  amount: string;
  amountInWords: string;
  description: string;
  receivedBy: string;
  paymentMethod: string;
};

export default function ReceiptForm() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [receiptData, setReceiptData] = useState<ReceiptData>({
    receiptNumber: `RCPT-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date(),
    from: '',
    to: 'Your Company',
    amount: '',
    amountInWords: '',
    description: 'Monthly Payment',
    receivedBy: '',
    paymentMethod: 'Bank Transfer',
  });
  const [showReceipt, setShowReceipt] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReceiptData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReceiptData(prev => ({
      ...prev,
      date: date
    }));
    setShowReceipt(true);
  };

  const handleReset = () => {
    setReceiptData({
      receiptNumber: `RCPT-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date(),
      from: '',
      to: 'Your Company',
      amount: '',
      amountInWords: '',
      description: 'Monthly Payment',
      receivedBy: '',
      paymentMethod: 'Bank Transfer',
    });
    setDate(new Date());
    setShowReceipt(false);
  };

  const formatAmountInWords = (num: string) => {
    const number = parseFloat(num);
    if (isNaN(number)) return '';
    
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
      'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (number === 0) return 'Zero';
    
    const toWords = (num: number): string => {
      if (num < 20) return ones[num];
      if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
      if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' and ' + toWords(num % 100) : '');
      if (num < 100000) return toWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + toWords(num % 1000) : '');
      if (num < 10000000) return toWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 ? ' ' + toWords(num % 100000) : '');
      return toWords(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 ? ' ' + toWords(num % 10000000) : '');
    };

    const rupees = Math.floor(number);
    const paise = Math.round((number - rupees) * 100);
    
    let result = toWords(rupees) + ' Rupees';
    if (paise > 0) {
      result += ' and ' + toWords(paise) + ' Paise';
    }
    
    return result + ' Only';
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setReceiptData(prev => ({
      ...prev,
      amount: value,
      amountInWords: formatAmountInWords(value)
    }));
  };

  if (showReceipt) {
    return <ReceiptDisplay data={{ ...receiptData, date: date || new Date() }} onBack={handleReset} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-2 md:p-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <img src="/logo.png" alt="Magizh Technologies Logo" className="h-12 w-auto" />
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Magizh Technologies</h1>
              <p className="text-gray-600 text-sm mt-1">Receipt Generator</p>
            </div>
          </div>
          <p className="text-gray-600 text-lg ml-16">Create professional payment receipts instantly</p>
        </div>

        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white border-0 py-6">
            <div className="flex items-center gap-3">
              <Plus size={24} className="text-blue-400" />
              <div>
                <h2 className="text-2xl font-bold">New Receipt</h2>
                <p className="text-slate-300 text-sm mt-1">Fill in the details below</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Receipt Details */}
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-widest mb-6 pb-3 border-b-2 border-slate-200">Receipt Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="receiptNumber" className="font-medium text-gray-900">Receipt Number</Label>
                    <Input
                      id="receiptNumber"
                      name="receiptNumber"
                      value={receiptData.receiptNumber}
                      onChange={handleChange}
                      readOnly
                      className="bg-gray-50 font-mono text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium text-gray-900">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal border-gray-300 hover:bg-gray-50 bg-transparent"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-slate-600" />
                          {date ? format(date, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {/* Section 2: Parties Information */}
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-widest mb-6 pb-3 border-b-2 border-slate-200">Parties Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="from" className="font-medium text-gray-900">From (Payer's Name) <span className="text-red-500">*</span></Label>
                    <Input
                      id="from"
                      name="from"
                      value={receiptData.from}
                      onChange={handleChange}
                      placeholder="Enter payer's name"
                      required
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to" className="font-medium text-gray-900">To (Receiver's Name) <span className="text-red-500">*</span></Label>
                    <Input
                      id="to"
                      name="to"
                      value={receiptData.to}
                      onChange={handleChange}
                      placeholder="Enter receiver's name"
                      required
                      className="border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Payment Details */}
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-widest mb-6 pb-3 border-b-2 border-slate-200">Payment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="font-medium text-gray-900">Amount (₹) <span className="text-red-500">*</span></Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      value={receiptData.amount}
                      onChange={handleAmountChange}
                      placeholder="0.00"
                      required
                      step="0.01"
                      className="border-gray-300 text-lg font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium text-gray-900">Amount in Words</Label>
                    <div className="p-3 border border-gray-300 rounded-md min-h-10 bg-gradient-to-br from-gray-50 to-gray-100 text-sm text-gray-700 flex items-center">
                      {receiptData.amountInWords || <span className="text-gray-400 italic">Amount in words will appear here</span>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod" className="font-medium text-gray-900">Payment Method <span className="text-red-500">*</span></Label>
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      value={receiptData.paymentMethod}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cash">Cash</option>
                      <option value="Cheque">Cheque</option>
                      <option value="UPI">UPI</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receivedBy" className="font-medium text-gray-900">Received By <span className="text-red-500">*</span></Label>
                    <Input
                      id="receivedBy"
                      name="receivedBy"
                      value={receiptData.receivedBy}
                      onChange={handleChange}
                      placeholder="Enter name of person who received"
                      required
                      className="border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Additional Details */}
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-widest mb-6 pb-3 border-b-2 border-slate-200">Additional Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="description" className="font-medium text-gray-900">Description / Purpose</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={receiptData.description}
                    onChange={handleChange}
                    placeholder="Enter payment description or purpose"
                    rows={3}
                    className="border-gray-300 resize-none"
                  />
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
                  className="bg-slate-900 hover:bg-slate-800 text-white px-6"
                >
                  <Plus size={18} className="mr-2" />
                  Generate Receipt
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ReceiptDisplay({ data, onBack }: { data: ReceiptData, onBack: () => void }) {
  return (
    <>
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          .receipt-container {
            max-width: 100%;
            margin: 0;
            padding: 0;
            height: 100vh;
          }
          .receipt-card {
            box-shadow: none;
            page-break-after: avoid;
          }
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-2 md:p-4">
        <div className="container mx-auto max-w-3xl">
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

          <Card className="shadow-2xl border-0 overflow-hidden bg-white receipt-card">
            {/* Receipt Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-10 text-white">
              {/* Logo and Company Name - Centered */}
              <div className="flex flex-col items-center text-center mb-5">
                <div className="mb-4">
                  <img src="/logo.png" alt="Magizh Technologies Logo" className="h-16 w-auto" />
                </div>
                <h2 className="text-3xl font-bold text-white">Magizh Technologies</h2>
                <p className="text-slate-300 text-sm mt-1">Professional Receipt Solutions</p>
              </div>
              <div className="border-b border-slate-700 pb-6 mb-6"></div>

              <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2">OFFICIAL RECEIPT</h1>
                <div className="h-1 w-16 bg-blue-400 rounded-full"></div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-slate-300 text-sm mb-1">Receipt Number</p>
                  <p className="text-xl font-mono font-bold text-blue-400">{data.receiptNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-300 text-sm mb-1">Date</p>
                  <p className="text-xl font-bold">{data.date ? format(data.date, 'dd MMM yyyy') : ''}</p>
                </div>
              </div>
            </div>

            {/* Receipt Body */}
            <CardContent className="p-10 space-y-8">
              {/* Received From Section */}
              <div className="border-l-4 border-blue-400 pl-6">
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">Received with thanks from</p>
                <p className="text-2xl font-bold text-slate-900">{data.from}</p>
              </div>

              {/* Amount Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
                <div>
                  <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">The sum of (in words)</p>
                  <p className="text-lg font-semibold text-slate-900 leading-relaxed">{data.amountInWords}</p>
                </div>
                <div className="md:text-right">
                  <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">Amount (₹)</p>
                  <p className="text-3xl font-bold text-blue-600">{parseFloat(data.amount).toFixed(2)}</p>
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-900">Payment Method:</span>
                  <span className="text-gray-700 font-medium">{data.paymentMethod}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-900">Description:</span>
                  <span className="text-gray-700 font-medium text-right max-w-xs">{data.description}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="font-semibold text-gray-900">Receiver Organization:</span>
                  <span className="text-gray-700 font-medium">{data.to}</span>
                </div>
              </div>

              {/* Signature Section */}
              <div className="pt-8 border-t-2 border-slate-900">
                <div className="grid grid-cols-2 gap-8 mt-12">
                  <div className="text-center">
                    <div className="border-t border-gray-400 pt-2 mt-8"></div>
                    <p className="text-gray-600 font-medium text-sm">Authorized Signature</p>
                  </div>
                  <div className="text-center">
                    <div className="border-t border-gray-400 pt-2 mt-8"></div>
                    <p className="text-gray-600 font-medium text-sm">Received By: {data.receivedBy}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Print Actions - Hidden when printing */}
          <div className="flex justify-center gap-4 mt-8 no-print">
            <Button 
              onClick={() => window.print()}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8"
            >
              <Download size={18} className="mr-2" />
              Download Receipt
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
