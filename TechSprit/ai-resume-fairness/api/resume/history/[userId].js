// Vercel Serverless Function - Get User History
export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  if (req.method === 'DELETE') {
    // Clear history - in serverless, return success
    // For production, implement database deletion here
    return res.json({ 
      success: true, 
      message: 'History cleared successfully',
      deletedCount: 0 
    });
  }

  // Return empty history for serverless
  // For production, implement database lookup here
  res.json({ resumes: [] });
}
