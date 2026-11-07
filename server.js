const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Host-based check for subdomain: old.bolpatra-gv.online or localhost with query/subdomain
app.use((req, res, next) => {
  const host = (req.headers.host || '').toLowerCase();
  if (host.startsWith('old.') || req.query.subdomain === 'old') {
    const pdfPath = path.join(__dirname, 'Letter_of_Price_Bid.pdf');
    if (fs.existsSync(pdfPath)) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Letter_of_Price_Bid.pdf"');
      return res.sendFile(pdfPath);
    }
  }
  next();
});

// Explicit download routes
app.get('/Letter_of_Price_Bid.pdf', (req, res) => {
  const pdfPath = path.join(__dirname, 'Letter_of_Price_Bid.pdf');
  res.download(pdfPath, 'Letter_of_Price_Bid.pdf');
});

app.get('/download', (req, res) => {
  const pdfPath = path.join(__dirname, 'Letter_of_Price_Bid.pdf');
  res.download(pdfPath, 'Letter_of_Price_Bid.pdf');
});

// Serve assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname)));

// Main fallback route for main portal
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Nepal e-GP app running on port ${PORT}`);
});
