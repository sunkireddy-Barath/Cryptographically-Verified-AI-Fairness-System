import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
  Shield, 
  Upload, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  Copy,
  LogOut,
  Cpu,
  Activity,
  Hash,
  User,
  X,
  Zap
} from 'lucide-react';

// Use environment variable for API URL, fallback to localhost for development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('upload');
  const [models, setModels] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [verifyHash, setVerifyHash] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [history, setHistory] = useState([]);
  const [processingStep, setProcessingStep] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [showNonZKP, setShowNonZKP] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch models on mount
  useEffect(() => {
    fetchModels();
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchModels = async () => {
    try {
      const response = await axios.get(`${API_URL}/models`);
      setModels(response.data.models);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/resume/history/${user.uid}`);
      setHistory(response.data.resumes);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const clearHistory = async () => {
    if (window.confirm('Are you sure you want to clear all your evaluation history?')) {
      try {
        await axios.delete(`${API_URL}/resume/history/${user.uid}`);
        setHistory([]);
      } catch (error) {
        console.error('Error clearing history:', error);
        // Clear locally even if server fails
        setHistory([]);
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;
    
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      alert('Please upload a PDF or DOC file');
      return;
    }

    setFile(selectedFile);
    setUploadResult(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProcessingStep(1);

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('userId', user.uid);
    formData.append('userName', user.displayName || 'Anonymous');
    formData.append('email', user.email);

    try {
      // Simulate processing steps
      await new Promise(r => setTimeout(r, 1000));
      setProcessingStep(2); // Hashing

      await new Promise(r => setTimeout(r, 1500));
      setProcessingStep(3); // AI Evaluation

      await new Promise(r => setTimeout(r, 1500));
      setProcessingStep(4); // Fairness Verification

      const response = await axios.post(`${API_URL}/resume/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setProcessingStep(5); // Complete
      await new Promise(r => setTimeout(r, 500));

      setUploadResult(response.data);
      fetchHistory();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading document. Please try again.');
    }

    setUploading(false);
    setProcessingStep(0);
  };

  const handleVerify = async () => {
    if (!verifyHash.trim()) return;

    setVerifying(true);
    setVerifyResult(null);

    try {
      const response = await axios.post(`${API_URL}/verify`, {
        hash: verifyHash.trim()
      });

      setVerifyResult(response.data);
    } catch (error) {
      console.error('Verify error:', error);
      setVerifyResult({ found: false, message: 'Error verifying hash' });
    }

    setVerifying(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Hash copied to clipboard!');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      verified: { icon: CheckCircle, label: 'Verified', class: 'verified' },
      biased: { icon: XCircle, label: 'Biased', class: 'biased' },
      under_review: { icon: Clock, label: 'Under Review', class: 'under_review' }
    };
    
    const config = statusConfig[status] || statusConfig.under_review;
    const Icon = config.icon;
    
    return (
      <span className={`status-badge ${config.class}`}>
        <Icon size={14} style={{ marginRight: 4 }} />
        {config.label}
      </span>
    );
  };

  const renderVerifyResultStatus = () => {
    if (!verifyResult) return null;

    if (!verifyResult.found) {
      return (
        <div className="verify-result not-found">
          <div className="result-emoji">❓</div>
          <div className="result-status">Not Found</div>
          <div className="result-message">{verifyResult.message}</div>
        </div>
      );
    }

    const status = verifyResult.status;
    const statusClass = status.status.toLowerCase();

    return (
      <div className={`verify-result ${statusClass}`}>
        <div className="result-emoji">{status.emoji}</div>
        <div className="result-status">{status.message}</div>
        <div className="result-message">
          Evaluated: {new Date(verifyResult.evaluatedAt).toLocaleString()}
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">
          <div className="nav-logo">
            <Shield size={24} color="#fff" />
          </div>
          <span className="nav-title">AI Document Fairness System</span>
        </div>
        
        <div className="nav-actions">
          <div className="user-info">
            <div className="user-avatar">
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </div>
            <span className="user-name">{user?.displayName || user?.email}</span>
          </div>
          <button className="btn-logout" onClick={logout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">Cryptographic Verification Dashboard</h1>
          <p className="page-description">
            Upload documents for AI evaluation with fairness verification
          </p>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            <Upload size={16} style={{ marginRight: 8 }} />
            Upload & Evaluate
          </button>
          <button 
            className={`tab ${activeTab === 'models' ? 'active' : ''}`}
            onClick={() => setActiveTab('models')}
          >
            <Cpu size={16} style={{ marginRight: 8 }} />
            AI Models
          </button>
          <button 
            className={`tab ${activeTab === 'verify' ? 'active' : ''}`}
            onClick={() => setActiveTab('verify')}
          >
            <Search size={16} style={{ marginRight: 8 }} />
            Verify Hash
          </button>
          <button 
            className={`tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <Activity size={16} style={{ marginRight: 8 }} />
            History
          </button>
        </div>

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div>
            <div className="upload-section">
              <h2 className="section-title">
                <FileText size={24} />
                Upload Document for Evaluation
              </h2>

              <div 
                className={`upload-area ${dragActive ? 'dragging' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                />
                <div className="upload-icon">
                  <Upload size={32} color="#6366f1" />
                </div>
                <p className="upload-text">
                  Drag and drop your document here, or click to browse
                </p>
                <p className="upload-hint">
                  Supported formats: PDF, DOC, DOCX (Max 10MB)
                </p>
              </div>

              {file && (
                <div className="file-preview">
                  <div className="file-icon">
                    <FileText size={24} color="#fff" />
                  </div>
                  <div className="file-info">
                    <h4>{file.name}</h4>
                    <p>{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <button className="btn-remove" onClick={() => setFile(null)}>
                    <X size={14} /> Remove
                  </button>
                </div>
              )}

              {file && !uploading && !uploadResult && (
                <button 
                  className="btn btn-primary" 
                  style={{ marginTop: 24 }}
                  onClick={handleUpload}
                >
                  <Shield size={18} />
                  Evaluate Document with AI
                </button>
              )}
            </div>

            {/* Upload Result */}
            {uploadResult && (
              <div className="results-panel">
                <div className="result-header">
                  <h3 className="result-title">✅ Evaluation Complete</h3>
                  <button 
                    className="copy-hash"
                    onClick={() => copyToClipboard(uploadResult.hash)}
                  >
                    <Copy size={16} />
                    Copy Hash
                  </button>
                </div>

                {/* Primary Status */}
                <div style={{ 
                  textAlign: 'center', 
                  padding: '24px', 
                  background: uploadResult.publicStatus?.status === 'Fair' ? 'rgba(16, 185, 129, 0.1)' :
                              uploadResult.publicStatus?.status === 'Unfair' ? 'rgba(239, 68, 68, 0.1)' :
                              'rgba(245, 158, 11, 0.1)',
                  borderRadius: '16px',
                  marginBottom: '24px',
                  border: `1px solid ${uploadResult.publicStatus?.status === 'Fair' ? 'rgba(16, 185, 129, 0.3)' :
                              uploadResult.publicStatus?.status === 'Unfair' ? 'rgba(239, 68, 68, 0.3)' :
                              'rgba(245, 158, 11, 0.3)'}`
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>
                    {uploadResult.publicStatus?.emoji}
                  </div>
                  <div style={{ 
                    fontSize: '24px', 
                    fontWeight: '700',
                    color: uploadResult.publicStatus?.status === 'Fair' ? '#34d399' :
                           uploadResult.publicStatus?.status === 'Unfair' ? '#f87171' : '#fbbf24'
                  }}>
                    {uploadResult.publicStatus?.message}
                  </div>
                </div>

                {/* Two Model Comparison Section */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                  gap: '20px',
                  marginBottom: '24px'
                }}>
                  {/* Model 1: OpenRouter */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    borderRadius: '16px',
                    padding: '20px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Cpu size={20} color="#fff" />
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>
                          MODEL 1: OpenRouter
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                          Mistral 7B Instruct
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: '12px', color: '#818cf8', marginBottom: '12px' }}>
                      📋 Task: Document Evaluation & Scoring
                    </div>
                    <div style={{ 
                      background: 'rgba(0,0,0,0.2)', 
                      borderRadius: '10px', 
                      padding: '12px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: '#94a3b8', fontSize: '12px' }}>Score</span>
                        <span style={{ 
                          color: uploadResult.evaluation?.score >= 70 ? '#34d399' : '#fbbf24',
                          fontWeight: '700',
                          fontSize: '16px'
                        }}>
                          {uploadResult.evaluation?.score}/100
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: '#94a3b8', fontSize: '12px' }}>Recommendation</span>
                        <span style={{ color: '#e2e8f0', fontSize: '13px' }}>
                          {uploadResult.evaluation?.shortlistRecommendation}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#94a3b8', fontSize: '12px' }}>Skills Found</span>
                        <span style={{ color: '#e2e8f0', fontSize: '13px' }}>
                          {uploadResult.evaluation?.skills?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Model 2: Vertex AI */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '16px',
                    padding: '20px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Shield size={20} color="#fff" />
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>
                          MODEL 2: Vertex AI
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                          Gemini Pro - Fairness Auditor
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: '12px', color: '#34d399', marginBottom: '12px' }}>
                      🔍 Task: Verify OpenRouter Output for Bias
                    </div>
                    <div style={{ 
                      background: 'rgba(0,0,0,0.2)', 
                      borderRadius: '10px', 
                      padding: '12px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: '#94a3b8', fontSize: '12px' }}>Fairness Score</span>
                        <span style={{ 
                          color: uploadResult.fairnessResult?.fairnessScore >= 80 ? '#34d399' : '#fbbf24',
                          fontWeight: '700',
                          fontSize: '16px'
                        }}>
                          {uploadResult.fairnessResult?.fairnessScore?.toFixed(0)}%
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: '#94a3b8', fontSize: '12px' }}>Decision</span>
                        <span style={{ 
                          color: uploadResult.fairnessResult?.status === 'verified' ? '#34d399' : 
                                 uploadResult.fairnessResult?.status === 'biased' ? '#f87171' : '#fbbf24',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {uploadResult.fairnessResult?.status?.toUpperCase()}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#94a3b8', fontSize: '12px' }}>Checks Performed</span>
                        <span style={{ color: '#e2e8f0', fontSize: '13px' }}>
                          {uploadResult.fairnessResult?.checks ? Object.keys(uploadResult.fairnessResult.checks).length : 6}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Model Flow Indicator */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ 
                    padding: '8px 16px', 
                    background: 'rgba(99, 102, 241, 0.2)', 
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: '#818cf8'
                  }}>
                    📄 Document
                  </div>
                  <span style={{ color: '#64748b' }}>→</span>
                  <div style={{ 
                    padding: '8px 16px', 
                    background: 'rgba(99, 102, 241, 0.2)', 
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: '#818cf8'
                  }}>
                    🤖 OpenRouter (Evaluate)
                  </div>
                  <span style={{ color: '#64748b' }}>→</span>
                  <div style={{ 
                    padding: '8px 16px', 
                    background: 'rgba(236, 72, 153, 0.2)', 
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: '#f472b6'
                  }}>
                    🧠 Claude AI (Cross-Check)
                  </div>
                  <span style={{ color: '#64748b' }}>→</span>
                  <div style={{ 
                    padding: '8px 16px', 
                    background: 'rgba(16, 185, 129, 0.2)', 
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: '#34d399'
                  }}>
                    🔍 Vertex AI (Verify)
                  </div>
                  <span style={{ color: '#64748b' }}>→</span>
                  <div style={{ 
                    padding: '8px 16px', 
                    background: uploadResult.publicStatus?.status === 'Fair' ? 'rgba(16, 185, 129, 0.2)' :
                                uploadResult.publicStatus?.status === 'Unfair' ? 'rgba(239, 68, 68, 0.2)' :
                                'rgba(245, 158, 11, 0.2)',
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: uploadResult.publicStatus?.status === 'Fair' ? '#34d399' :
                           uploadResult.publicStatus?.status === 'Unfair' ? '#f87171' : '#fbbf24'
                  }}>
                    {uploadResult.publicStatus?.emoji} {uploadResult.publicStatus?.status}
                  </div>
                </div>

                <div className="result-grid">
                  <div className="result-item" style={{ 
                    gridColumn: '1 / -1',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))',
                    border: '2px solid rgba(129, 140, 248, 0.4)',
                    borderRadius: '16px',
                    padding: '24px',
                    textAlign: 'center'
                  }}>
                    <div className="result-item-label" style={{ 
                      fontSize: '16px', 
                      fontWeight: '600',
                      marginBottom: '16px',
                      color: '#a5b4fc'
                    }}>
                      🔐 Document Hash (SHA-256)
                    </div>
                    <div className="result-item-value" style={{ 
                      fontFamily: 'monospace', 
                      fontSize: '18px',
                      fontWeight: '600',
                      wordBreak: 'break-all',
                      color: '#818cf8',
                      background: 'rgba(0, 0, 0, 0.3)',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      letterSpacing: '1px',
                      lineHeight: '1.6'
                    }}>
                      {uploadResult.hash}
                    </div>
                    <div style={{ 
                      marginTop: '12px', 
                      fontSize: '12px', 
                      color: '#64748b' 
                    }}>
                      This cryptographic hash uniquely identifies your document
                    </div>
                  </div>

                  <div className="result-item">
                    <div className="result-item-label">AI Evaluation Score</div>
                    <div className="result-item-value" style={{ 
                      fontSize: '28px', 
                      fontWeight: '700',
                      color: uploadResult.evaluation?.score >= 70 ? '#34d399' : 
                             uploadResult.evaluation?.score >= 50 ? '#fbbf24' : '#f87171'
                    }}>
                      {uploadResult.evaluation?.score || 'N/A'}/100
                    </div>
                  </div>

                  <div className="result-item">
                    <div className="result-item-label">Experience Level</div>
                    <div className="result-item-value">
                      {uploadResult.evaluation?.experienceLevel || 'N/A'}
                      {uploadResult.evaluation?.experienceYears && 
                        ` (${uploadResult.evaluation.experienceYears} years)`}
                    </div>
                  </div>

                  <div className="result-item">
                    <div className="result-item-label">Fairness Score</div>
                    <div className="result-item-value">
                      {uploadResult.fairnessResult?.fairnessScore?.toFixed(1) || 'N/A'}%
                    </div>
                  </div>

                  <div className="result-item">
                    <div className="result-item-label">Shortlist Recommendation</div>
                    <div className="result-item-value" style={{
                      color: uploadResult.evaluation?.shortlistRecommendation === 'Yes' ? '#34d399' :
                             uploadResult.evaluation?.shortlistRecommendation === 'Maybe' ? '#fbbf24' : '#f87171'
                    }}>
                      {uploadResult.evaluation?.shortlistRecommendation || 'N/A'}
                    </div>
                  </div>

                  <div className="result-item">
                    <div className="result-item-label">Verification Model</div>
                    <div className="result-item-value" style={{ fontSize: '12px' }}>
                      {uploadResult.fairnessResult?.verificationModel || 'Fairness Engine v2.0'}
                    </div>
                  </div>
                </div>

                {/* Non-ZKP Toggle Button */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  marginTop: '20px',
                  marginBottom: '16px'
                }}>
                  <button
                    onClick={() => setShowNonZKP(!showNonZKP)}
                    style={{
                      padding: '12px 24px',
                      background: showNonZKP 
                        ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
                        : 'linear-gradient(135deg, #f59e0b, #d97706)',
                      border: 'none',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Zap size={18} />
                    {showNonZKP ? 'Hide Non-ZKP Data' : 'Show Non-ZKP Data'}
                  </button>
                </div>

                {/* Skills Section - Hidden by default (Non-ZKP) */}
                {showNonZKP && uploadResult.evaluation?.skills && uploadResult.evaluation.skills.length > 0 && (
                  <div className="result-item" style={{ marginTop: 20 }}>
                    <div className="result-item-label">Skills Identified ({uploadResult.evaluation.skills.length})</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                      {uploadResult.evaluation.skills.map((skill, idx) => (
                        <span key={idx} style={{
                          padding: '6px 12px',
                          background: 'rgba(99, 102, 241, 0.2)',
                          borderRadius: '20px',
                          fontSize: '12px',
                          color: '#818cf8'
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Strengths Section - Hidden by default (Non-ZKP) */}
                {showNonZKP && uploadResult.evaluation?.strengths && uploadResult.evaluation.strengths.length > 0 && (
                  <div className="result-item" style={{ marginTop: 16 }}>
                    <div className="result-item-label">Key Strengths</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                      {uploadResult.evaluation.strengths.map((strength, idx) => (
                        <span key={idx} style={{
                          padding: '6px 12px',
                          background: 'rgba(16, 185, 129, 0.2)',
                          borderRadius: '20px',
                          fontSize: '12px',
                          color: '#34d399'
                        }}>
                          ✓ {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reasoning Section - Hidden by default (Non-ZKP) */}
                {showNonZKP && uploadResult.evaluation?.reasoning && (
                  <div className="result-item" style={{ marginTop: 16 }}>
                    <div className="result-item-label">AI Analysis Summary</div>
                    <div className="result-item-value" style={{ 
                      fontSize: '13px', 
                      lineHeight: '1.6',
                      color: '#94a3b8',
                      marginTop: '8px'
                    }}>
                      {uploadResult.evaluation.reasoning}
                    </div>
                  </div>
                )}

                {/* Fairness Checks */}
                {uploadResult.fairnessResult?.checks && (
                  <div className="result-item" style={{ marginTop: 20 }}>
                    <div className="result-item-label">Fairness Verification Checks</div>
                    <div style={{ marginTop: '12px' }}>
                      {Object.entries(uploadResult.fairnessResult.checks).map(([key, check]) => (
                        <div key={key} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 0',
                          borderBottom: '1px solid rgba(255,255,255,0.05)'
                        }}>
                          <span style={{ color: check.passed ? '#34d399' : '#f87171' }}>
                            {check.passed ? '✅' : '❌'}
                          </span>
                          <span style={{ color: '#e2e8f0', fontSize: '13px' }}>
                            {check.description || key}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button 
                  className="btn btn-primary" 
                  style={{ marginTop: 24 }}
                  onClick={() => {
                    setFile(null);
                    setUploadResult(null);
                  }}
                >
                  Upload Another Document
                </button>
              </div>
            )}
          </div>
        )}

        {/* Models Tab */}
        {activeTab === 'models' && (
          <div>
            <h2 className="section-title" style={{ marginBottom: 24 }}>
              <Cpu size={24} />
              AI Models Overview
            </h2>
            
            {/* System Architecture Description */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1), rgba(16, 185, 129, 0.1))',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '32px'
            }}>
              <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '12px' }}>
                🔄 Three-Model Verification System
              </h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '14px' }}>
                Our system uses a <strong style={{ color: '#818cf8' }}>triple-model architecture</strong> to ensure fair and unbiased document evaluation. 
                The first model (OpenRouter/Mistral) evaluates and scores documents, the second model (Claude AI) performs an independent cross-check 
                to validate the analysis, and the third model (Vertex AI/Gemini) verifies whether the decisions are fair or biased. 
                This multi-layer cross-verification approach ensures maximum transparency and accountability in AI-powered decisions.
              </p>
            </div>

            {/* Three Main Models */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '24px',
              marginBottom: '32px'
            }}>
              {/* Model 1: OpenRouter */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))',
                border: '2px solid rgba(99, 102, 241, 0.4)',
                borderRadius: '20px',
                padding: '28px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(99, 102, 241, 0.3)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  color: '#a5b4fc'
                }}>
                  PRIMARY MODEL
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)'
                  }}>
                    <Cpu size={28} color="#fff" />
                  </div>
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', margin: 0 }}>
                      OpenRouter API
                    </h3>
                    <p style={{ color: '#818cf8', fontSize: '13px', margin: '4px 0 0 0' }}>
                      Mistral 7B Instruct / Gemini
                    </p>
                  </div>
                </div>

                <div style={{ 
                  background: 'rgba(0, 0, 0, 0.2)', 
                  borderRadius: '12px', 
                  padding: '16px',
                  marginBottom: '16px'
                }}>
                  <div style={{ color: '#a5b4fc', fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>
                    📋 PRIMARY TASK
                  </div>
                  <p style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                    Evaluates documents (resumes, loan applications, financial reports, insurance claims, etc.) by analyzing content, criteria, and relevant factors. 
                    Generates a comprehensive score and recommendation.
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ padding: '6px 12px', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '20px', fontSize: '11px', color: '#818cf8' }}>
                    Document Scoring
                  </span>
                  <span style={{ padding: '6px 12px', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '20px', fontSize: '11px', color: '#818cf8' }}>
                    Skill Extraction
                  </span>
                  <span style={{ padding: '6px 12px', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '20px', fontSize: '11px', color: '#818cf8' }}>
                    Experience Analysis
                  </span>
                  <span style={{ padding: '6px 12px', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '20px', fontSize: '11px', color: '#818cf8' }}>
                    Shortlist Decision
                  </span>
                </div>
              </div>

              {/* Model 2: Claude AI - Cross-Check Model */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(219, 39, 119, 0.15))',
                border: '2px solid rgba(236, 72, 153, 0.4)',
                borderRadius: '20px',
                padding: '28px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(236, 72, 153, 0.3)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  color: '#f9a8d4'
                }}>
                  CROSS-CHECK MODEL
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #ec4899, #db2777)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 20px rgba(236, 72, 153, 0.3)'
                  }}>
                    <Zap size={28} color="#fff" />
                  </div>
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', margin: 0 }}>
                      Claude AI
                    </h3>
                    <p style={{ color: '#f472b6', fontSize: '13px', margin: '4px 0 0 0' }}>
                      Anthropic - Cross Validator
                    </p>
                  </div>
                </div>

                <div style={{ 
                  background: 'rgba(0, 0, 0, 0.2)', 
                  borderRadius: '12px', 
                  padding: '16px',
                  marginBottom: '16px'
                }}>
                  <div style={{ color: '#f9a8d4', fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>
                    🧠 CROSS-CHECK TASK
                  </div>
                  <p style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                    Independently validates the OpenRouter evaluation by performing a secondary analysis. 
                    Identifies potential inconsistencies or overlooked factors in the initial assessment.
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ padding: '6px 12px', background: 'rgba(236, 72, 153, 0.2)', borderRadius: '20px', fontSize: '11px', color: '#f472b6' }}>
                    Secondary Analysis
                  </span>
                  <span style={{ padding: '6px 12px', background: 'rgba(236, 72, 153, 0.2)', borderRadius: '20px', fontSize: '11px', color: '#f472b6' }}>
                    Consistency Check
                  </span>
                  <span style={{ padding: '6px 12px', background: 'rgba(236, 72, 153, 0.2)', borderRadius: '20px', fontSize: '11px', color: '#f472b6' }}>
                    Gap Detection
                  </span>
                  <span style={{ padding: '6px 12px', background: 'rgba(236, 72, 153, 0.2)', borderRadius: '20px', fontSize: '11px', color: '#f472b6' }}>
                    Score Validation
                  </span>
                </div>
              </div>

              {/* Model 3: Vertex AI */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.15))',
                border: '2px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '20px',
                padding: '28px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(16, 185, 129, 0.3)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  color: '#6ee7b7'
                }}>
                  VERIFICATION MODEL
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
                  }}>
                    <Shield size={28} color="#fff" />
                  </div>
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', margin: 0 }}>
                      Vertex AI
                    </h3>
                    <p style={{ color: '#34d399', fontSize: '13px', margin: '4px 0 0 0' }}>
                      Gemini Pro - Fairness Auditor
                    </p>
                  </div>
                </div>

                <div style={{ 
                  background: 'rgba(0, 0, 0, 0.2)', 
                  borderRadius: '12px', 
                  padding: '16px',
                  marginBottom: '16px'
                }}>
                  <div style={{ color: '#6ee7b7', fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>
                    🔍 VERIFICATION TASK
                  </div>
                  <p style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                    Independently audits the OpenRouter model's evaluation to detect potential bias. 
                    Determines if the scoring decision is <strong style={{ color: '#34d399' }}>Fair</strong> or <strong style={{ color: '#f87171' }}>Biased</strong>.
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ padding: '6px 12px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '20px', fontSize: '11px', color: '#34d399' }}>
                    Bias Detection
                  </span>
                  <span style={{ padding: '6px 12px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '20px', fontSize: '11px', color: '#34d399' }}>
                    Fairness Scoring
                  </span>
                  <span style={{ padding: '6px 12px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '20px', fontSize: '11px', color: '#34d399' }}>
                    Cross-Validation
                  </span>
                  <span style={{ padding: '6px 12px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '20px', fontSize: '11px', color: '#34d399' }}>
                    Quality Audit
                  </span>
                </div>
              </div>
            </div>

            {/* Flow Diagram */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '32px'
            }}>
              <h4 style={{ color: '#6366f1', fontSize: '12px', fontWeight: '700', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={14} /> How It Works
              </h4>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                {/* Step 1: Upload */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '10px',
                  padding: '16px 20px',
                  background: 'rgba(99, 102, 241, 0.08)',
                  borderRadius: '14px',
                  border: '1px solid rgba(99, 102, 241, 0.15)',
                  minWidth: '90px'
                }}>
                  <div style={{ fontSize: '24px' }}>📄</div>
                  <span style={{ fontSize: '11px', color: '#a5b4fc', fontWeight: '600', textTransform: 'uppercase' }}>Upload</span>
                </div>
                <span style={{ color: '#4b5563', fontSize: '16px' }}>→</span>
                
                {/* Step 2: Hash */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '10px',
                  padding: '16px 20px',
                  background: 'rgba(251, 191, 36, 0.08)',
                  borderRadius: '14px',
                  border: '1px solid rgba(251, 191, 36, 0.15)',
                  minWidth: '90px'
                }}>
                  <div style={{ fontSize: '24px' }}>🔐</div>
                  <span style={{ fontSize: '11px', color: '#fbbf24', fontWeight: '600', textTransform: 'uppercase' }}>Hash</span>
                </div>
                <span style={{ color: '#4b5563', fontSize: '16px' }}>→</span>
                
                {/* Step 3: Analyze (OpenRouter) */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '10px',
                  padding: '16px 20px',
                  background: 'rgba(99, 102, 241, 0.08)',
                  borderRadius: '14px',
                  border: '1px solid rgba(99, 102, 241, 0.15)',
                  minWidth: '90px'
                }}>
                  <div style={{ fontSize: '24px' }}>🤖</div>
                  <span style={{ fontSize: '11px', color: '#818cf8', fontWeight: '600', textTransform: 'uppercase' }}>Analyze</span>
                </div>
                <span style={{ color: '#4b5563', fontSize: '16px' }}>→</span>
                
                {/* Step 4: Cross-Check (Claude AI) - NEW */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '10px',
                  padding: '16px 20px',
                  background: 'rgba(236, 72, 153, 0.08)',
                  borderRadius: '14px',
                  border: '1px solid rgba(236, 72, 153, 0.15)',
                  minWidth: '90px'
                }}>
                  <div style={{ fontSize: '24px' }}>🧠</div>
                  <span style={{ fontSize: '11px', color: '#f472b6', fontWeight: '600', textTransform: 'uppercase' }}>Cross-Check</span>
                </div>
                <span style={{ color: '#4b5563', fontSize: '16px' }}>→</span>
                
                {/* Step 5: Verify (Vertex AI) */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '10px',
                  padding: '16px 20px',
                  background: 'rgba(16, 185, 129, 0.08)',
                  borderRadius: '14px',
                  border: '1px solid rgba(16, 185, 129, 0.15)',
                  minWidth: '90px'
                }}>
                  <div style={{ fontSize: '24px' }}>✅</div>
                  <span style={{ fontSize: '11px', color: '#34d399', fontWeight: '600', textTransform: 'uppercase' }}>Verify</span>
                </div>
                <span style={{ color: '#4b5563', fontSize: '16px' }}>→</span>
                
                {/* Step 6: Result */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '10px',
                  padding: '16px 20px',
                  background: 'rgba(139, 92, 246, 0.08)',
                  borderRadius: '14px',
                  border: '1px solid rgba(139, 92, 246, 0.15)',
                  minWidth: '90px'
                }}>
                  <div style={{ fontSize: '24px' }}>📊</div>
                  <span style={{ fontSize: '11px', color: '#a78bfa', fontWeight: '600', textTransform: 'uppercase' }}>Result</span>
                </div>
              </div>
            </div>

            {/* Additional Models from API */}
            <h3 style={{ color: '#fff', fontSize: '16px', marginBottom: '16px' }}>
              📋 Registered AI Models
            </h3>
            <div className="models-grid">
              {models.map((model) => (
                <div key={model.id} className="model-card">
                  <div className="model-header">
                    <div className="model-icon">
                      <Cpu size={24} color="#fff" />
                    </div>
                    {getStatusBadge(model.status)}
                  </div>
                  <h3 className="model-name">{model.name}</h3>
                  <p className="model-domain">{model.domain}</p>
                  <div className="model-stats">
                    <div className="stat">
                      <div className="stat-label">Impact Ratio</div>
                      <div className="stat-value">{model.impactRatio}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-label">Last Audit</div>
                      <div className="stat-value">{model.lastAudit}</div>
                    </div>
                  </div>
                  <div className="model-hash">
                    <div className="hash-label">Model ID</div>
                    <div className="hash-value">{model.id}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verify Tab */}
        {activeTab === 'verify' && (
          <div className="verify-section">
            <h2 className="section-title">
              <Search size={24} />
              Verify Your Decision Inclusion
            </h2>
            <p style={{ color: '#94a3b8', marginBottom: 24 }}>
              Enter your document hash to verify if it was included in the AI fairness audit
            </p>

            <div className="verify-input-group">
              <input
                type="text"
                className="verify-input"
                placeholder="Enter your document hash (SHA-256)"
                value={verifyHash}
                onChange={(e) => setVerifyHash(e.target.value)}
              />
              <button 
                className="btn-verify" 
                onClick={handleVerify}
                disabled={verifying || !verifyHash.trim()}
              >
                {verifying ? 'Verifying...' : 'Verify Inclusion'}
              </button>
            </div>

            {renderVerifyResultStatus()}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="upload-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                <Activity size={24} />
                Your Evaluation History
              </h2>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
                  }}
                >
                  <X size={16} />
                  Clear History
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <p style={{ color: '#94a3b8', textAlign: 'center', padding: 40 }}>
                No evaluations yet. Upload a document to get started.
              </p>
            ) : (
              <table className="history-table">
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>Hash</th>
                    <th>Score</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, index) => (
                    <tr key={index}>
                      <td>{item.fileName}</td>
                      <td className="hash-cell">
                        {item.hash.substring(0, 16)}...
                        <button 
                          style={{ 
                            background: 'none', 
                            border: 'none', 
                            color: '#818cf8', 
                            cursor: 'pointer',
                            marginLeft: 8 
                          }}
                          onClick={() => copyToClipboard(item.hash)}
                        >
                          <Copy size={14} />
                        </button>
                      </td>
                      <td>{item.score}/100</td>
                      <td>
                        <span style={{ 
                          color: item.status?.status === 'Fair' ? '#34d399' : 
                                 item.status?.status === 'Unfair' ? '#f87171' : '#fbbf24'
                        }}>
                          {item.status?.emoji} {item.status?.status}
                        </span>
                      </td>
                      <td>{new Date(item.uploadedAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>

      {/* Processing Overlay */}
      {uploading && (
        <div className="processing-overlay">
          <div className="processing-card" style={{ maxWidth: '500px' }}>
            <div className="spinner"></div>
            <h3 className="processing-title">Processing Document</h3>
            <p style={{ color: '#94a3b8', marginBottom: 20 }}>
              Three AI models are analyzing your document
            </p>
            
            <div className="processing-steps">
              <div className={`step ${processingStep >= 1 ? (processingStep > 1 ? 'completed' : 'active') : ''}`}>
                <div className="step-icon">
                  {processingStep > 1 ? '✓' : '1'}
                </div>
                <div>
                  <div>Uploading document...</div>
                </div>
              </div>
              <div className={`step ${processingStep >= 2 ? (processingStep > 2 ? 'completed' : 'active') : ''}`}>
                <div className="step-icon">
                  {processingStep > 2 ? '✓' : '2'}
                </div>
                <div>
                  <div>Generating SHA-256 hash...</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Cryptographic fingerprint</div>
                </div>
              </div>
              <div className={`step ${processingStep >= 3 ? (processingStep > 3 ? 'completed' : 'active') : ''}`}>
                <div className="step-icon" style={{ background: processingStep === 3 ? 'rgba(99, 102, 241, 0.3)' : '' }}>
                  {processingStep > 3 ? '✓' : '3'}
                </div>
                <div>
                  <div style={{ color: processingStep === 3 ? '#818cf8' : '' }}>
                    🤖 MODEL 1: OpenRouter LLM
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    Mistral 7B - Document Evaluation
                  </div>
                </div>
              </div>
              <div className={`step ${processingStep >= 4 ? (processingStep > 4 ? 'completed' : 'active') : ''}`}>
                <div className="step-icon" style={{ background: processingStep === 4 ? 'rgba(236, 72, 153, 0.3)' : '' }}>
                  {processingStep > 4 ? '✓' : '4'}
                </div>
                <div>
                  <div style={{ color: processingStep === 4 ? '#f472b6' : '' }}>
                    🧠 MODEL 2: Claude AI
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    Anthropic - Cross-Check Analysis
                  </div>
                </div>
              </div>
              <div className={`step ${processingStep >= 5 ? (processingStep > 5 ? 'completed' : 'active') : ''}`}>
                <div className="step-icon" style={{ background: processingStep === 5 ? 'rgba(16, 185, 129, 0.3)' : '' }}>
                  {processingStep > 5 ? '✓' : '5'}
                </div>
                <div>
                  <div style={{ color: processingStep === 5 ? '#34d399' : '' }}>
                    🔍 MODEL 3: Vertex AI
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    Gemini Pro - Final Verification
                  </div>
                </div>
              </div>
              <div className={`step ${processingStep >= 6 ? 'completed' : ''}`}>
                <div className="step-icon">
                  {processingStep >= 6 ? '✓' : '6'}
                </div>
                <div>Complete!</div>
              </div>
            </div>

            {processingStep === 3 && (
              <div style={{ 
                marginTop: '20px', 
                padding: '12px', 
                background: 'rgba(99, 102, 241, 0.1)', 
                borderRadius: '10px',
                fontSize: '12px',
                color: '#818cf8'
              }}>
                OpenRouter analyzing skills, experience & qualifications...
              </div>
            )}

            {processingStep === 4 && (
              <div style={{ 
                marginTop: '20px', 
                padding: '12px', 
                background: 'rgba(236, 72, 153, 0.1)', 
                borderRadius: '10px',
                fontSize: '12px',
                color: '#f472b6'
              }}>
                Claude AI performing independent cross-check analysis...
              </div>
            )}

            {processingStep === 5 && (
              <div style={{ 
                marginTop: '20px', 
                padding: '12px', 
                background: 'rgba(16, 185, 129, 0.1)', 
                borderRadius: '10px',
                fontSize: '12px',
                color: '#34d399'
              }}>
                Vertex AI verifying for bias and fairness...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
