// Vercel Serverless Function - Get AI Models
const modelDatabase = [
  {
    id: 'model-001',
    name: 'Document Evaluation Model v1.2',
    domain: 'Job Hiring & Recruitment',
    status: 'verified',
    impactRatio: '94.2%',
    lastAudit: '2026-01-05'
  },
  {
    id: 'model-002',
    name: 'Loan Application Analyzer',
    domain: 'Banking & Finance',
    status: 'verified',
    impactRatio: '91.8%',
    lastAudit: '2026-01-06'
  },
  {
    id: 'model-003',
    name: 'Credit Risk Assessment',
    domain: 'Financial Services',
    status: 'biased',
    impactRatio: '67.3%',
    lastAudit: '2026-01-04'
  },
  {
    id: 'model-004',
    name: 'Insurance Claims Processor',
    domain: 'Insurance',
    status: 'under_review',
    impactRatio: '78.5%',
    lastAudit: '2026-01-07'
  },
  {
    id: 'model-005',
    name: 'Financial Report Analyzer',
    domain: 'Corporate Finance',
    status: 'verified',
    impactRatio: '89.1%',
    lastAudit: '2026-01-08'
  }
];

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({ models: modelDatabase });
}
