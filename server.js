const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const PDF_NAME = 'Letter of Price BidD.pdf';
const PDF_PATH = path.join(__dirname, 'public', PDF_NAME);

// Route to view the 1-click download HTML page directly
app.get('/download-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'download.html'));
});

// Host-based check for subdomain: old.* or ?subdomain=old
app.use((req, res, next) => {
  const host = (req.headers.host || '').toLowerCase();
  if (host.startsWith('old.') || req.query.subdomain === 'old') {
    // If requesting PDF directly
    if (req.path.endsWith('.pdf')) {
      if (fs.existsSync(PDF_PATH)) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${PDF_NAME}"`);
        return res.sendFile(PDF_PATH);
      }
    }
    // Otherwise serve the 1-click download HTML page
    return res.sendFile(path.join(__dirname, 'download.html'));
  }
  next();
});

// Explicit download routes
app.get('/download', (req, res) => {
  if (fs.existsSync(PDF_PATH)) {
    return res.download(PDF_PATH, PDF_NAME);
  }
  res.status(404).send('File not found');
});

// Static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));

// Catch-all fallback to index.html for main portal
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Nepal e-GP app running on http://localhost:${PORT}`);
});
