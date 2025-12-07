import React, { useState } from 'react';

const Sidebar = () => {
  const [activeService, setActiveService] = useState('Active');
  const [activeInvoice, setActiveInvoice] = useState('Proforma Invoices');
  const [servicesExpanded, setServicesExpanded] = useState(true);
  const [invoicesExpanded, setInvoicesExpanded] = useState(true);

  return (
    <aside className="w-64 bg-[#1A1D1F] text-white min-h-screen flex flex-col">
      {/* User/Tenant Info */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold">
            V
          </div>
          <div>
            <div className="font-semibold text-sm">Vault</div>
            <div className="text-xs text-gray-400">Anurag Yadav</div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-4">
        <div className="px-4 space-y-2">
          <NavItem icon="📊" label="Dashboard" />
          <NavItem icon="🔗" label="Nexus" />
          <NavItem icon="📥" label="Intake" />
        </div>

        {/* Services Section */}
        <div className="mt-6">
          <div className="px-4 py-2">
            <button 
              onClick={() => setServicesExpanded(!servicesExpanded)}
              className="w-full flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 hover:text-gray-300"
            >
              Services
              <span>{servicesExpanded ? '▼' : '▶'}</span>
            </button>
            {servicesExpanded && <div className="space-y-1">
              <StatusItem 
                label="Pre-active" 
                isActive={activeService === 'Pre-active'}
                onClick={() => setActiveService('Pre-active')}
              />
              <StatusItem 
                label="Active" 
                isActive={activeService === 'Active'}
                onClick={() => setActiveService('Active')}
              />
              <StatusItem 
                label="Blocked" 
                isActive={activeService === 'Blocked'}
                onClick={() => setActiveService('Blocked')}
              />
            </div>}
          </div>
        </div>

        {/* Invoices Section */}
        <div className="mt-6">
          <div className="px-4 py-2">
            <button 
              onClick={() => setInvoicesExpanded(!invoicesExpanded)}
              className="w-full flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 hover:text-gray-300"
            >
              Invoices
              <span>{invoicesExpanded ? '▼' : '▶'}</span>
            </button>
            {invoicesExpanded && <div className="space-y-1">
              <InvoiceItem 
                label="Proforma Invoices" 
                isActive={activeInvoice === 'Proforma Invoices'}
                onClick={() => setActiveInvoice('Proforma Invoices')}
              />
              <InvoiceItem 
                label="Final Invoices" 
                isActive={activeInvoice === 'Final Invoices'}
                onClick={() => setActiveInvoice('Final Invoices')}
              />
            </div>}
          </div>
        </div>
      </nav>
    </aside>
  );
};

const NavItem = ({ icon, label }) => (
  <button className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800 transition-colors text-left">
    <span className="text-lg">{icon}</span>
    <span className="text-sm">{label}</span>
  </button>
);

const StatusItem = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
    }`}
  >
    <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-gray-500'}`} />
    <span className="text-sm">{label}</span>
  </button>
);

const InvoiceItem = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full px-3 py-2 rounded text-left text-sm transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
    }`}
  >
    {label}
  </button>
);

export default Sidebar;
