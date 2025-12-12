const fs = require('fs').promises;
const path = require('path');

async function generateNotice() {
  try {
    const rootLicenses = require('./root_licenses.json');
    const frontendLicenses = require('./frontend/frontend_licenses.json');
    const backendLicenses = require('./backend/backend_licenses.json');

    // マージして重複を除去
    const mergedLicenses = {
      ...rootLicenses,
      ...frontendLicenses,
      ...backendLicenses
    };

    let noticeContent = "This project includes the following third-party open source software components:\n\n";

    for (const [packageName, info] of Object.entries(mergedLicenses)) {
      noticeContent += `${packageName}\n`;
      noticeContent += `License: ${info.licenses || 'Unknown'}\n`;
      noticeContent += `Source: ${info.repository || 'Unknown'}\n\n`;

      if (info.licenseText) {
        noticeContent += `${info.licenseText}\n\n`;
      }

      noticeContent += "------------------------\n\n";
    }

    await fs.writeFile(path.join(__dirname, 'NOTICE'), noticeContent);
    console.log('NOTICE file has been generated.');
    console.log(`Total number of packages: ${Object.keys(mergedLicenses).length}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

generateNotice();
