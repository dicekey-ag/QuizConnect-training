import React, { useState, useEffect } from 'react';
import './OpenSourceLicensesPage.css';

const OpenSourceLicensesPage = () => {
  const [noticeContent, setNoticeContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedLicense, setExpandedLicense] = useState(null);

  useEffect(() => {
    fetch('/notice')
      .then(response => response.text())
      .then(data => setNoticeContent(data))
      .catch(error => console.error('Error loading notice file:', error));
  }, []);

  const licenses = noticeContent.split('------------------------\n')
    .filter(section => section.trim() !== '')
    .map((section, index) => {
      const lines = section.trim().split('\n');
      const name = lines[0];
      const details = {};
      lines.slice(1).forEach(line => {
        const [key, value] = line.split(': ');
        if (key && value) {
          details[key.toLowerCase()] = value;
        }
      });
      return { name, ...details, fullText: section, id: index };
    });

  const filteredLicenses = licenses.filter(license =>
    license.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (license.license && license.license.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="open-source-licenses">
      <h1>オープンソースライセンス</h1>
      <input
        type="text"
        placeholder="ライブラリ名やライセンスで検索..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="licenses-list">
        {filteredLicenses.map((license) => (
          <div key={license.id} className="license-item">
            <div
              className="license-header"
              onClick={() => setExpandedLicense(expandedLicense === license.id ? null : license.id)}
            >
              <h3>{license.name}</h3>
              <span>{license.license}</span>
            </div>
            {expandedLicense === license.id && (
              <div className="license-details">
                <pre>{license.fullText}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenSourceLicensesPage;
