const fs = require('fs');

const filePath = 'c:\\Users\\xheen908\\Documents\\ocpp-landing-page\\translations.js';
let content = fs.readFileSync(filePath, 'utf8');

// Target the imprint paragraph specifically in any language
// It matches "V-Ledger (something)<br>Email: ..." or "V-Ledger (something)<br>E-Mail: ..."
content = content.replace(/V-Ledger \(.*?\)<br>(E-Mail|Email): info@V-Ledger\.com/gi, 
    'V-Ledger<br>Albertstr. 7<br>47059 Duisburg<br>Email: info@V-Ledger.com');

fs.writeFileSync(filePath, content);
console.log('Final global address fix applied to all languages in translations.js');
