// Vercel Serverless Function - Verify Hash
// In-memory storage (Note: This resets on each deployment - use a database for persistence)
// For production, use Firebase Firestore, MongoDB Atlas, or similar

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { hash } = req.body;

  if (!hash) {
    return res.status(400).json({ error: 'Hash is required' });
  }

  // In serverless environment, we can't maintain in-memory state
  // Return a message indicating verification status
  // For production, implement database lookup here
  
  res.json({
    found: false,
    message: 'Hash verification requires database integration. Please upload the document again for evaluation.'
  });
}
