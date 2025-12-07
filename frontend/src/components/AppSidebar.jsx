import React, { useState } from 'react';

const AppSidebar = () => {
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(true);
  const [invoicesOpen, setInvoicesOpen] = useState(true);
  const [activeService, setActiveService] = useState('Active');
  const [activeInvoice, setActiveInvoice] = useState('Proforma Invoices');

  return (
    <aside className="w-[260px] bg-[#F7F7F8] min-h-screen flex flex-col">
      {/* App Branding with Dark Background and Dropdown */}
      <div className="bg-white px-4 py-4 mb-5 border-b border-gray-200">
        <button
          onClick={() => setMainMenuOpen(!mainMenuOpen)}
          className="w-full text-left"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">V</span>
            </div>
            <div className="flex-1">
              <div className="text-base font-medium text-gray-900">Vault</div>
              <div className="text-xs text-gray-600">Anurag Yadav</div>
            </div>
            <svg 
              className={`w-4 h-4 text-gray-600 transition-transform ${mainMenuOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
      </div>

      {/* Vertical Navigation - Show/Hide based on dropdown */}
      {!mainMenuOpen && (
        <nav className="space-y-1 px-4">
          <NavItem icon="📊" label="Dashboard" />
          <NavItem icon="🔗" label="Nexus" />
          <NavItem icon="📥" label="Intake" />
          
          {/* Services - Expandable */}
          <div className={`rounded-md ${servicesOpen ? 'bg-white' : ''}`}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-left ${
                servicesOpen ? 'hover:bg-gray-50' : 'hover:bg-gray-200'
              }`}
            >
              <span className="text-base">📋</span>
              <span className="text-sm text-gray-700">Services</span>
              <svg 
                className={`ml-auto w-4 h-4 text-gray-500 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {servicesOpen && (
              <div className="ml-6 pb-2 space-y-1">
                <SubMenuItem 
                  label="Pre-active" 
                  isActive={activeService === 'Pre-active'}
                  onClick={() => setActiveService('Pre-active')}
                />
                <SubMenuItem 
                  label="Active" 
                  isActive={activeService === 'Active'}
                  onClick={() => setActiveService('Active')}
                />
                <SubMenuItem 
                  label="Blocked" 
                  isActive={activeService === 'Blocked'}
                  onClick={() => setActiveService('Blocked')}
                />
                <SubMenuItem 
                  label="Closed" 
                  isActive={activeService === 'Closed'}
                  onClick={() => setActiveService('Closed')}
                />
              </div>
            )}
          </div>

          {/* Invoices - Expandable */}
          <div className={`rounded-md ${invoicesOpen ? 'bg-white' : ''}`}>
            <button
              onClick={() => setInvoicesOpen(!invoicesOpen)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-left ${
                invoicesOpen ? 'hover:bg-gray-50' : 'hover:bg-gray-200'
              }`}
            >
              <span className="text-base">📄</span>
              <span className="text-sm text-gray-700">Invoices</span>
              <svg 
                className={`ml-auto w-4 h-4 text-gray-500 transition-transform ${invoicesOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {invoicesOpen && (
              <div className="ml-6 pb-2 space-y-1">
                <SubMenuItem 
                  label="Proforma Invoices" 
                  isActive={activeInvoice === 'Proforma Invoices'}
                  onClick={() => setActiveInvoice('Proforma Invoices')}
                />
                <SubMenuItem 
                  label="Final Invoices" 
                  isActive={activeInvoice === 'Final Invoices'}
                  onClick={() => setActiveInvoice('Final Invoices')}
                />
              </div>
            )}
          </div>
        </nav>
      )}
    </aside>
  );
};

const NavItem = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors text-left"
  >
    <span className="text-base">{icon}</span>
    <span className="text-sm text-gray-700">{label}</span>
  </button>
);

const SubMenuItem = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full px-3 py-2 rounded-md text-left text-sm transition-colors ${
      isActive 
        ? 'bg-gray-300 font-semibold text-gray-900' 
        : 'text-gray-700 hover:bg-gray-200'
    }`}
  >
    {label}
  </button>
);

export default AppSidebar;
