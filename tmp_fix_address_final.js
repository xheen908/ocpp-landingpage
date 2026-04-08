const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\xheen908\\Documents\\ocpp-landing-page\\translations.js';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove all legal entity suffixes
content = content.replace(/V-Ledger UG/g, 'V-Ledger');
content = content.replace(/V-Ledger \(haftungsbeschränkt\)/g, 'V-Ledger');

// 2. Fix the old address in the German section
content = content.replace(/Theodor-Heuss-Str\. 104<br>47167 Duisburg/g, 'Albertstr. 7<br>47059 Duisburg');

// 3. Fix the "Geschäftsführer" to "Inhaber"
content = content.replace(/Arndt Christoph Handschuh \(Geschäftsführer\)/g, 'Arndt Christoph Handschuh (Inhaber)');

// 4. Update the Privacy Policy address as well
content = content.replace(/V-Ledger \(haftungsbeschränkt\)<br>Arndt Christoph Handschuh/g, 'V-Ledger<br>Inhaber: Arndt Christoph Handschuh<br>Albertstr. 7, 47059 Duisburg');

// 5. Catch any remaining imprint sections that still have (Duisburg) and add the address
content = content.replace(/V-Ledger \(Duisburg\)/g, 'V-Ledger<br>Albertstr. 7, 47059 Duisburg');

fs.writeFileSync(filePath, content);
console.log('Comprehensive address and entity update completed in translations.js');
