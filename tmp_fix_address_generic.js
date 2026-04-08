const fs = require('fs');

const filePath = 'c:\\Users\\xheen908\\Documents\\ocpp-landing-page\\translations.js';
let content = fs.readFileSync(filePath, 'utf8');

// This regex targets any text starting with V-Ledger followed by anything in parentheses,
// then a line break, then some labels/text, and finally the email.
// It will replace it with the standardized address.
content = content.replace(/V-Ledger \(.*?\)<br>.*?info@V-Ledger\.com/g, 
    'V-Ledger<br>Albertstr. 7<br>47059 Duisburg<br>Email: info@V-Ledger.com');

fs.writeFileSync(filePath, content);
console.log('Standardized address applied to all imprints in translations.js');
