const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const filePath = path.join(process.cwd(), 'Letter_of_Price_Bid.pdf');
  
  if (!fs.existsSync(filePath)) {
    res.status(404).send('File not found');
    return;
  }

  const stat = fs.statSync(filePath);
  res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Length': stat.size,
    'Content-Disposition': 'attachment; filename="Letter_of_Price_Bid.pdf"'
  });

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
};
