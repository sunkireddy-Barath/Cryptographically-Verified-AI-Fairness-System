import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Cpu, CheckCircle, Lock, FileText, Zap, Eye, EyeOff, ArrowRight, Sparkles, Globe, Users } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign in with Google');
    }

    setLoading(false);
  };

  const features = [
    {
      icon: <Lock size={24} />,
      title: 'SHA-256 Cryptographic Hashing',
      description: 'Every document is cryptographically hashed ensuring tamper-proof verification',
      gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
    },
    {
      icon: <Cpu size={24} />,
      title: 'Dual AI Model Evaluation',
      description: 'OpenRouter LLM + Vertex AI work together for unbiased assessment',
      gradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)'
    },
    {
      icon: <CheckCircle size={24} />,
      title: 'Fairness Verification',
      description: 'Real-time bias detection and fairness scoring for every evaluation',
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
    },
    {
      icon: <FileText size={24} />,
      title: 'Smart Content Extraction',
      description: 'Automatically extracts and analyzes key information from your documents',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
    }
  ];

  const stats = [
    { value: '3 AI', label: 'Models Used', icon: <Cpu size={18} /> },
    { value: '<3s', label: 'Analysis Time', icon: <Zap size={18} /> },
    { value: '100+', label: 'Doc Types', icon: <FileText size={18} /> },
    { value: '99.9%', label: 'Accuracy', icon: <CheckCircle size={18} /> }
  ];

  const testimonials = [
    { name: 'TechCorp', role: 'Enterprise', text: 'Transformed our hiring process' },
    { name: 'FinanceHub', role: 'Finance', text: 'Unbiased loan evaluations' },
    { name: 'EduFirst', role: 'Education', text: 'Fair student assessments' }
  ];

  return (
    <div className="login-container" style={{
      minHeight: '100vh',
      background: '#030712',
      display: 'flex',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Mesh Gradient Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 80% 50% at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse 60% 50% at 80% 60%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
          radial-gradient(ellipse 50% 40% at 50% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)
        `,
        animation: 'meshMove 20s ease-in-out infinite alternate'
      }} />

      {/* Floating Orbs */}
      <div className="floating-orb orb-1" />
      <div className="floating-orb orb-2" />
      <div className="floating-orb orb-3" />

      {/* Grid Pattern Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)'
      }} />

      {/* Left Side - Project Overview */}
      <div className="left-panel" style={{
        flex: 1,
        padding: '50px 60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Logo & Title */}
        <div style={{ marginBottom: '36px' }} className="slide-up">
          <div className="logo-header" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px'
          }}>
            <div className="logo-container" style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(99, 102, 241, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
              position: 'relative',
              flexShrink: 0
            }}>
              <Shield size={28} color="#fff" />
              <div className="logo-ring" />
            </div>
            <div>
              <h1 className="brand-title" style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#fff',
                margin: 0,
                letterSpacing: '-0.3px'
              }}>
                AI Document Fairness
              </h1>
              <p style={{
                fontSize: '13px',
                color: '#818cf8',
                margin: 0,
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Sparkles size={12} />
                Cryptographically Verified System
              </p>
            </div>
          </div>

          <h2 className="hero-title" style={{
            fontSize: '48px',
            fontWeight: '800',
            color: '#fff',
            lineHeight: '1.1',
            marginBottom: '24px',
            letterSpacing: '-1.5px'
          }}>
            Ensuring <span className="gradient-text-animated">Fair & Unbiased</span><br />
            Document Evaluation
          </h2>

          <p className="hero-description" style={{
            fontSize: '17px',
            color: '#94a3b8',
            lineHeight: '1.8',
            maxWidth: '520px'
          }}>
            Our cutting-edge AI system uses <span style={{ color: '#a5b4fc', fontWeight: '500' }}>dual-model verification</span> with 
            <span style={{ color: '#a5b4fc', fontWeight: '500' }}> cryptographic hashing</span> to ensure every document is 
            evaluated fairly, transparently, and without human bias.
          </p>
        </div>

        {/* Stats Section - Enhanced */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '36px'
        }} className="slide-up-delay-1">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card" style={{
              textAlign: 'center',
              padding: '20px 28px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              flex: 1,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'default',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), transparent)',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }} className="stat-glow" />
              <div style={{ color: '#6366f1', marginBottom: '8px', opacity: 0.8 }}>
                {stat.icon}
              </div>
              <div style={{
                fontSize: '26px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #fff, #a5b4fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid - Enhanced with Animation */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '14px',
          marginBottom: '32px'
        }} className="slide-up-delay-2">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className={`feature-card ${activeFeature === idx ? 'active' : ''}`}
              style={{
                padding: '22px',
                background: activeFeature === idx ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                borderRadius: '20px',
                border: `1px solid ${activeFeature === idx ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.05)'}`,
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transform: activeFeature === idx ? 'scale(1.02)' : 'scale(1)'
              }}
              onClick={() => setActiveFeature(idx)}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '3px',
                background: feature.gradient,
                opacity: activeFeature === idx ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }} />
              <div style={{
                width: '46px',
                height: '46px',
                background: activeFeature === idx ? feature.gradient : 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: activeFeature === idx ? '#fff' : '#818cf8',
                marginBottom: '14px',
                transition: 'all 0.3s ease',
                boxShadow: activeFeature === idx ? '0 8px 20px rgba(99, 102, 241, 0.3)' : 'none'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#fff',
                marginBottom: '6px'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '12px',
                color: '#64748b',
                lineHeight: '1.6',
                margin: 0
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Workflow Preview - Enhanced */}
        <div style={{
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.03))',
          borderRadius: '20px',
          border: '1px solid rgba(99, 102, 241, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }} className="slide-up-delay-3">
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.4), transparent)'
          }} />
          <div style={{ 
            fontSize: '11px', 
            color: '#6366f1', 
            marginBottom: '18px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Sparkles size={14} />
            How It Works
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '6px'
          }}>
            {[
              { icon: '📄', label: 'Upload' },
              { icon: '🔐', label: 'Hash' },
              { icon: '🤖', label: 'Analyze' },
              { icon: '🧠', label: 'Cross-Check' },
              { icon: '✅', label: 'Verify' },
              { icon: '📊', label: 'Result' }
            ].map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="workflow-step" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  background: 'rgba(99, 102, 241, 0.08)',
                  borderRadius: '14px',
                  border: '1px solid rgba(99, 102, 241, 0.15)',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}>
                  <span style={{ fontSize: '18px' }}>{step.icon}</span>
                  <span style={{ fontSize: '9px', color: '#a5b4fc', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {step.label}
                  </span>
                </div>
                {idx < 5 && (
                  <ArrowRight size={14} style={{ color: '#4b5563', flexShrink: 0 }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }} className="slide-up-delay-4">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={16} color="#6366f1" />
            <span style={{ fontSize: '12px', color: '#64748b' }}>Global Coverage</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={16} color="#6366f1" />
            <span style={{ fontSize: '12px', color: '#64748b' }}>10K+ Users</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={16} color="#6366f1" />
            <span style={{ fontSize: '12px', color: '#64748b' }}>Enterprise Ready</span>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="right-panel" style={{
        width: '580px',
        minWidth: '520px',
        padding: '40px 50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        zIndex: 1,
        background: 'linear-gradient(180deg, rgba(10, 10, 20, 0.8) 0%, rgba(10, 10, 20, 0.95) 100%)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
        paddingTop: '60px',
        overflowY: 'auto'
      }}>
        {/* Mobile Header - Only visible on mobile */}
        <div className="mobile-header" style={{
          display: 'none',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '28px',
          textAlign: 'center',
          width: '100%',
          padding: '0 16px'
        }}>
          {/* Logo and Brand */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '20px'
          }}>
            <div className="mobile-logo" style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)'
            }}>
              <Shield size={26} color="#fff" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <span style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#fff',
                display: 'block'
              }}>AI Document Fairness</span>
              <span style={{
                fontSize: '11px',
                color: '#818cf8',
                fontWeight: '500'
              }}>Cryptographically Verified</span>
            </div>
          </div>
          
          {/* Mobile Hero Text */}
          <h2 className="mobile-hero-title" style={{
            fontSize: '26px',
            fontWeight: '800',
            color: '#fff',
            marginBottom: '12px',
            lineHeight: '1.2',
            letterSpacing: '-0.5px'
          }}>
            Fair & Unbiased<br />
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Document Evaluation</span>
          </h2>
          
          {/* Mobile Stats */}
          <div className="mobile-stats" style={{
            display: 'flex',
            gap: '16px',
            marginTop: '8px'
          }}>
            <div style={{
              padding: '8px 14px',
              background: 'rgba(99, 102, 241, 0.1)',
              borderRadius: '20px',
              border: '1px solid rgba(99, 102, 241, 0.2)'
            }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#a5b4fc' }}>3 AI</span>
              <span style={{ fontSize: '10px', color: '#64748b', marginLeft: '4px' }}>Models</span>
            </div>
            <div style={{
              padding: '8px 14px',
              background: 'rgba(16, 185, 129, 0.1)',
              borderRadius: '20px',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#34d399' }}>&lt;3s</span>
              <span style={{ fontSize: '10px', color: '#64748b', marginLeft: '4px' }}>Analysis</span>
            </div>
            <div style={{
              padding: '8px 14px',
              background: 'rgba(245, 158, 11, 0.1)',
              borderRadius: '20px',
              border: '1px solid rgba(245, 158, 11, 0.2)'
            }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#fbbf24' }}>99.9%</span>
              <span style={{ fontSize: '10px', color: '#64748b', marginLeft: '4px' }}>Accurate</span>
            </div>
          </div>
        </div>

        <div className="login-card" style={{
          width: '100%',
          maxWidth: '420px',
          padding: '44px',
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
          backdropFilter: 'blur(40px)',
          borderRadius: '32px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: `
            0 30px 60px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset,
            0 -20px 40px rgba(99, 102, 241, 0.05) inset
          `,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Card Glow Effect */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'conic-gradient(from 180deg, transparent, rgba(99, 102, 241, 0.1), transparent 30%)',
            animation: 'rotate 8s linear infinite',
            opacity: 0.5
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div className="login-logo" style={{
                width: '72px',
                height: '72px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)',
                borderRadius: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                position: 'relative'
              }}>
                <Shield size={36} color="#fff" />
                <div className="login-logo-pulse" />
              </div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#fff',
                marginBottom: '8px',
                letterSpacing: '-0.5px'
              }}>
                Welcome Back
              </h1>
              <p style={{
                fontSize: '14px',
                color: '#64748b'
              }}>
                Sign in to continue to AI Document Fairness
              </p>
            </div>

            {error && (
              <div className="error-shake" style={{
                padding: '14px 18px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '14px',
                color: '#f87171',
                fontSize: '13px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px'
                }}>!</div>
                {error}
              </div>
            )}

            {/* Google Sign-in Button - Enhanced */}
            <button 
              type="button" 
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="google-btn"
              style={{
                width: '100%',
                padding: '16px 24px',
                background: 'linear-gradient(135deg, #fff, #f8fafc)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                color: '#1f2937',
                fontSize: '15px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '24px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: loading ? 0.7 : 1,
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '20px 0',
              color: '#64748b'
            }}>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
              <span style={{ padding: '0 16px', fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>or continue with email</span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#94a3b8',
                  marginBottom: '10px',
                  letterSpacing: '0.3px'
                }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input-animated"
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '2px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '14px',
                      color: '#fff',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#94a3b8',
                  marginBottom: '10px',
                  letterSpacing: '0.3px'
                }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input-animated"
                    style={{
                      width: '100%',
                      padding: '16px 50px 16px 20px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '2px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '14px',
                      color: '#fff',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxSizing: 'border-box'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#64748b',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'color 0.2s ease'
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="submit-btn"
                style={{
                  width: '100%',
                  padding: '18px 28px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  border: 'none',
                  borderRadius: '16px',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: loading ? 0.7 : 1,
                  boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  {loading ? (
                    <>
                      <div className="btn-spinner" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={18} />
                    </>
                  )}
                </span>
              </button>
            </form>

            <div style={{
              textAlign: 'center',
              marginTop: '28px',
              fontSize: '14px',
              color: '#64748b'
            }}>
              Don't have an account?{' '}
              <Link to="/register" style={{
                color: '#818cf8',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'color 0.2s ease'
              }}>
                Sign up
              </Link>
            </div>

            {/* Trust Badges - Enhanced */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '24px',
              marginTop: '32px',
              paddingTop: '28px',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              {[
                { icon: <Lock size={16} />, label: 'Secure', color: '#6366f1' },
                { icon: <Shield size={16} />, label: 'Verified', color: '#10b981' },
                { icon: <Zap size={16} />, label: 'Fast', color: '#f59e0b' }
              ].map((badge, idx) => (
                <div key={idx} className="trust-badge" style={{ 
                  textAlign: 'center',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}>
                  <div style={{ color: badge.color, marginBottom: '4px' }}>{badge.icon}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>{badge.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes meshMove {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(20px, -20px) scale(1.05); }
        }
        
        @keyframes rotate {
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0; }
        }
        
        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: float 8s ease-in-out infinite;
        }
        
        .orb-1 {
          top: 10%;
          left: 15%;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%);
          animation-delay: 0s;
        }
        
        .orb-2 {
          bottom: 20%;
          right: 20%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
          animation-delay: -2s;
        }
        
        .orb-3 {
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
          animation-delay: -4s;
        }
        
        .logo-container {
          position: relative;
        }
        
        .logo-ring {
          position: absolute;
          inset: -6px;
          border: 2px solid rgba(99, 102, 241, 0.3);
          border-radius: 20px;
          animation: ringPulse 2s ease-in-out infinite;
        }
        
        .gradient-text-animated {
          background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899, #6366f1);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientFlow 4s ease infinite;
        }
        
        .slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
        
        .slide-up-delay-1 {
          animation: slideUp 0.6s ease-out 0.1s forwards;
          opacity: 0;
        }
        
        .slide-up-delay-2 {
          animation: slideUp 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }
        
        .slide-up-delay-3 {
          animation: slideUp 0.6s ease-out 0.3s forwards;
          opacity: 0;
        }
        
        .slide-up-delay-4 {
          animation: slideUp 0.6s ease-out 0.4s forwards;
          opacity: 0;
        }
        
        .stat-card:hover {
          background: rgba(99, 102, 241, 0.08) !important;
          border-color: rgba(99, 102, 241, 0.2) !important;
          transform: translateY(-4px);
        }
        
        .stat-card:hover .stat-glow {
          opacity: 1 !important;
        }
        
        .workflow-step:hover {
          background: rgba(99, 102, 241, 0.15);
          transform: translateY(-2px);
        }
        
        .login-card {
          animation: slideUp 0.6s ease-out;
        }
        
        .login-logo {
          animation: float 4s ease-in-out infinite;
        }
        
        .login-logo-pulse {
          position: absolute;
          inset: -8px;
          border: 2px solid rgba(99, 102, 241, 0.3);
          border-radius: 26px;
          animation: ringPulse 2s ease-in-out infinite;
        }
        
        .error-shake {
          animation: shake 0.4s ease-out;
        }
        
        .google-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2) !important;
        }
        
        .form-input-animated:focus {
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15), 0 0 20px rgba(99, 102, 241, 0.1) !important;
          background: rgba(99, 102, 241, 0.05) !important;
        }
        
        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .submit-btn:hover::before {
          left: 100%;
        }
        
        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(99, 102, 241, 0.5) !important;
        }
        
        .btn-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        
        .trust-badge:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        
        input::placeholder {
          color: #4b5563;
        }
        
        /* ===== RESPONSIVE STYLES ===== */
        @media (max-width: 1200px) {
          .orb-1, .orb-2, .orb-3 {
            display: none;
          }
          .left-panel {
            padding: 40px !important;
          }
          .hero-title {
            font-size: 36px !important;
          }
        }
        
        @media (max-width: 1024px) {
          .login-container {
            flex-direction: column !important;
            background: linear-gradient(180deg, #030712 0%, #0f0a1e 50%, #030712 100%) !important;
          }
          .left-panel {
            display: none !important;
          }
          .right-panel {
            width: 100% !important;
            min-width: unset !important;
            border-left: none !important;
            padding: 24px 20px !important;
            padding-top: 50px !important;
            padding-bottom: 40px !important;
            align-items: center !important;
            min-height: 100vh;
            background: transparent !important;
          }
          .mobile-header {
            display: flex !important;
          }
          .login-card {
            max-width: 420px !important;
            padding: 36px 28px !important;
            border-radius: 28px !important;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 100px rgba(99, 102, 241, 0.1) !important;
          }
        }
        
        @media (max-width: 768px) {
          .right-panel {
            padding: 20px 16px !important;
            padding-top: 40px !important;
          }
          .mobile-header {
            margin-bottom: 24px !important;
          }
          .mobile-hero-title {
            font-size: 24px !important;
          }
          .mobile-stats {
            gap: 10px !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
          }
          .mobile-stats > div {
            padding: 6px 12px !important;
          }
          .mobile-stats span:first-child {
            font-size: 12px !important;
          }
          .mobile-stats span:last-child {
            font-size: 9px !important;
          }
          .login-card {
            padding: 32px 24px !important;
            border-radius: 24px !important;
            max-width: 100% !important;
          }
          .login-logo {
            width: 64px !important;
            height: 64px !important;
            border-radius: 18px !important;
          }
          .login-card h1 {
            font-size: 24px !important;
          }
          .google-btn {
            padding: 15px 20px !important;
            font-size: 14px !important;
            border-radius: 14px !important;
          }
          .form-input-animated {
            padding: 15px 18px !important;
            font-size: 15px !important;
            border-radius: 14px !important;
          }
          .submit-btn {
            padding: 16px 24px !important;
            font-size: 15px !important;
            border-radius: 14px !important;
          }
        }
        
        @media (max-width: 480px) {
          .right-panel {
            padding: 16px 14px !important;
            padding-top: 32px !important;
          }
          .mobile-header {
            margin-bottom: 20px !important;
          }
          .mobile-logo {
            width: 42px !important;
            height: 42px !important;
            border-radius: 12px !important;
          }
          .mobile-header > div:first-child span:first-child {
            font-size: 16px !important;
          }
          .mobile-hero-title {
            font-size: 22px !important;
          }
          .mobile-stats {
            gap: 8px !important;
          }
          .mobile-stats > div {
            padding: 5px 10px !important;
            border-radius: 16px !important;
          }
          .login-card {
            padding: 28px 20px !important;
            border-radius: 22px !important;
          }
          .login-logo {
            width: 56px !important;
            height: 56px !important;
            border-radius: 16px !important;
            margin-bottom: 20px !important;
          }
          .login-card h1 {
            font-size: 22px !important;
            margin-bottom: 6px !important;
          }
          .login-card > div > div:first-child p {
            font-size: 13px !important;
          }
          .google-btn {
            padding: 14px 18px !important;
            font-size: 14px !important;
            border-radius: 14px !important;
            margin-bottom: 20px !important;
          }
          .form-input-animated {
            padding: 14px 16px !important;
            font-size: 15px !important;
            border-radius: 14px !important;
          }
          .submit-btn {
            padding: 15px 22px !important;
            font-size: 15px !important;
            border-radius: 14px !important;
          }
          .trust-badge {
            padding: 8px 10px !important;
          }
        }
        
        @media (max-width: 380px) {
          .right-panel {
            padding: 12px !important;
            padding-top: 24px !important;
          }
          .mobile-header {
            margin-bottom: 16px !important;
          }
          .mobile-logo {
            width: 38px !important;
            height: 38px !important;
          }
          .mobile-header > div:first-child span:first-child {
            font-size: 15px !important;
          }
          .mobile-hero-title {
            font-size: 20px !important;
          }
          .mobile-stats > div {
            padding: 4px 8px !important;
          }
          .login-card {
            padding: 24px 18px !important;
            border-radius: 20px !important;
          }
          .login-logo {
            width: 50px !important;
            height: 50px !important;
            margin-bottom: 16px !important;
          }
          .login-card h1 {
            font-size: 20px !important;
          }
          .google-btn {
            padding: 13px 16px !important;
            font-size: 13px !important;
            border-radius: 12px !important;
          }
          .form-input-animated {
            padding: 13px 14px !important;
            font-size: 14px !important;
            border-radius: 12px !important;
          }
          .submit-btn {
            padding: 14px 20px !important;
            font-size: 14px !important;
            border-radius: 12px !important;
          }
        }
        
        /* Mobile-first touch enhancements */
        @media (hover: none) and (pointer: coarse) {
          .google-btn {
            transition: transform 0.1s ease, box-shadow 0.1s ease !important;
          }
          .google-btn:active {
            transform: scale(0.97);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
          }
          .submit-btn {
            transition: transform 0.1s ease, box-shadow 0.1s ease !important;
          }
          .submit-btn:active {
            transform: scale(0.97);
            box-shadow: 0 5px 20px rgba(99, 102, 241, 0.3) !important;
          }
          .form-input-animated {
            font-size: 16px !important; /* Prevents zoom on iOS */
          }
          .trust-badge {
            -webkit-tap-highlight-color: transparent;
          }
          .trust-badge:active {
            transform: scale(0.95);
          }
        }
        
        /* Safe area for notched phones */
        @supports (padding-top: env(safe-area-inset-top)) {
          .right-panel {
            padding-top: calc(40px + env(safe-area-inset-top)) !important;
            padding-bottom: calc(40px + env(safe-area-inset-bottom)) !important;
            padding-left: max(16px, env(safe-area-inset-left)) !important;
            padding-right: max(16px, env(safe-area-inset-right)) !important;
          }
        }
        
        /* Landscape mobile */
        @media (max-height: 600px) and (orientation: landscape) {
          .right-panel {
            padding-top: 20px !important;
          }
          .mobile-header {
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
            margin-bottom: 16px !important;
          }
          .mobile-hero-title {
            display: none !important;
          }
          .mobile-stats {
            margin-top: 0 !important;
          }
          .login-card {
            padding: 24px !important;
          }
          .login-logo {
            width: 48px !important;
            height: 48px !important;
            margin-bottom: 12px !important;
          }
          .login-card h1 {
            font-size: 20px !important;
            margin-bottom: 4px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
