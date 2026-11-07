const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const PDF_NAME = 'Letter of Price BidD.pdf';
const PDF_PATH = path.join(__dirname, 'public', PDF_NAME);

// Subdomain matching or query override
app.use((req, res, next) => {
  const host = (req.headers.host || '').toLowerCase();
  if (host.startsWith('old.') || req.query.subdomain === 'old') {
    if (fs.existsSync(PDF_PATH)) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${PDF_NAME}"`);
      return res.sendFile(PDF_PATH);
    }
  }
  next();
});

// Explicit download routes
app.get(['/download', `/${encodeURI(PDF_NAME)}`, `/${PDF_NAME}`, '/Letter_of_Price_Bid.pdf'], (req, res) => {
  if (fs.existsSync(PDF_PATH)) {
    return res.download(PDF_PATH, PDF_NAME);
  }
  res.status(404).send('File not found');
});

// Static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));

// Fallback to index.html for main portal
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Nepal e-GP app running on port ${PORT}`);
});
