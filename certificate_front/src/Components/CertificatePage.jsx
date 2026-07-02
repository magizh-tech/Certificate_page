import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CertificatePage = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [certificateId, setCertificateId] = useState(""); // Added certificate ID
  const [selectedCourse, setSelectedCourse] = useState(
    location.state?.type === 'internship' 
      ? 'FULL STACK DEVELOPER (Internship Completed)' 
      : 'FULL STACK DEVELOPER (Course Completed)'
  ); // Renamed to selectedCourse
  
  const navigate = useNavigate();

  const generateCertificate = async () => {
    // Basic validation
    if (!name || !selectedCourse) {
      alert("Please fill in all required details before proceeding.");
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const token = localStorage.getItem('adminToken');
    const finalId = certificateId || `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const docType = selectedCourse.includes("Internship") ? "internship" : "course";

    const payload = {
      document_type: docType,
      recipient_name: name,
      recipient_email: null,
      issue_date: issueDate || new Date().toISOString().split('T')[0],
      metadata_json: {
        name,
        course: selectedCourse,
        certificateId: finalId
      }
    };

    let uniqueHash = '';
    let dbId = '';

    try {
      const res = await fetch(`${API_URL}/api/documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const docData = await res.json();
        uniqueHash = docData.unique_hash;
        dbId = docData.id;
      }
    } catch (err) {
      console.error('Backend save failed for certificate, using fallback:', err);
    }

    // Navigate to the appropriate form based on document type
    navigate("/generate-certificate", { 
      state: {
        name,
        issueDate: issueDate || new Date().toISOString().split('T')[0],
        certificateId: uniqueHash || finalId,
        course: selectedCourse,
        dbId: dbId
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Generate Your Certificate
          </h1>
          <p className="text-lg text-gray-600">
            Create professional certificates with our easy-to-use generator
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="p-8 sm:p-10">
            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={() => navigate('/offer-letter/form')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Offer Letter
              </button>
              <button
                onClick={() => navigate('/experience-certificate/form')}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Create Experience Certificate
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 text-base transition duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 text-base"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Certificate ID
                  </label>
                  <input
                    type="text"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 text-base"
                    placeholder="e.g., CERT-1234"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Document Type
                </label>
                <div className="mt-1 relative">
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="appearance-none block w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  >
                    <option value="">Select document type</option>
                    <option value="FULL STACK DEVELOPER (Course Completed)">FULL STACK DEVELOPER (Course Completed)</option>
                    <option value="FULL STACK DEVELOPER (Internship Completed)">FULL STACK DEVELOPER (Internship Completed)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={generateCertificate}
                  disabled={!name || !issueDate || !certificateId || !selectedCourse}
                  className={`w-full flex justify-center items-center px-6 py-3.5 border border-transparent rounded-xl text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5 ${!name || !issueDate || !certificateId || !selectedCourse ? 'opacity-70 cursor-not-allowed' : 'shadow-lg'}`}
                >
                  <span>Generate Document</span>
                  <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            Your data is secure and will only be used to generate your document.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
