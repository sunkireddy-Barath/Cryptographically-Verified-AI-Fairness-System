import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Cpu, CheckCircle, Lock, FileText, Zap } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

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
      description: 'Every document is cryptographically hashed ensuring tamper-proof verification'
    },
    {
      icon: <Cpu size={24} />,
      title: 'Dual AI Model Evaluation',
      description: 'OpenRouter LLM + Vertex AI work together for unbiased assessment'
    },
    {
      icon: <CheckCircle size={24} />,
      title: 'Fairness Verification',
      description: 'Real-time bias detection and fairness scoring for every evaluation'
    },
    {
      icon: <FileText size={24} />,
      title: 'Smart Content Extraction',
      description: 'Automatically extracts and analyzes key information from your documents'
    }
  ];

  const stats = [
    { value: '2 AI', label: 'Models Used' },
    { value: '<3s', label: 'Analysis Time' },
    { value: '100+', label: 'Doc Types' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
      display: 'flex',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'pulse 4s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'pulse 6s ease-in-out infinite reverse'
      }} />

      {/* Left Side - Project Overview */}
      <div style={{
        flex: 1,
        padding: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Logo & Title */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)'
            }}>
              <Shield size={32} color="#fff" />
            </div>
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#fff',
                margin: 0,
                letterSpacing: '-0.5px'
              }}>
                AI Document Fairness
              </h1>
              <p style={{
                fontSize: '14px',
                color: '#818cf8',
                margin: 0,
                fontWeight: '500'
              }}>
                Cryptographically Verified System
              </p>
            </div>
          </div>

          <h2 style={{
            fontSize: '42px',
            fontWeight: '800',
            color: '#fff',
            lineHeight: '1.2',
            marginBottom: '20px',
            letterSpacing: '-1px'
          }}>
            Ensuring <span style={{ 
              background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Fair & Unbiased</span><br />
            Document Evaluation
          </h2>

          <p style={{
            fontSize: '18px',
            color: '#94a3b8',
            lineHeight: '1.7',
            maxWidth: '500px'
          }}>
            Our cutting-edge AI system uses dual-model verification with cryptographic 
            hashing to ensure every document is evaluated fairly, transparently, and 
            without human bias.
          </p>
        </div>

        {/* Stats Section */}
        <div style={{
          display: 'flex',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{
              textAlign: 'center',
              padding: '16px 24px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div style={{
                fontSize: '28px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px'
        }}>
          {features.map((feature, idx) => (
            <div key={idx} style={{
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              transition: 'all 0.3s ease',
              cursor: 'default'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#818cf8',
                marginBottom: '12px'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '15px',
                fontWeight: '600',
                color: '#fff',
                marginBottom: '6px'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#64748b',
                lineHeight: '1.5',
                margin: 0
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Workflow Preview */}
        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div style={{ 
            fontSize: '12px', 
            color: '#64748b', 
            marginBottom: '16px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            How It Works
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            {[
              { icon: '📄', label: 'Upload Document' },
              { icon: '🔐', label: 'SHA-256 Hash' },
              { icon: '🤖', label: 'OpenRouter AI' },
              { icon: '✅', label: 'Vertex Verify' },
              { icon: '📊', label: 'Fair Result' }
            ].map((step, idx) => (
              <React.Fragment key={idx}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  background: 'rgba(99, 102, 241, 0.1)',
                  borderRadius: '25px',
                  border: '1px solid rgba(99, 102, 241, 0.2)'
                }}>
                  <span style={{ fontSize: '16px' }}>{step.icon}</span>
                  <span style={{ fontSize: '12px', color: '#a5b4fc', fontWeight: '500' }}>
                    {step.label}
                  </span>
                </div>
                {idx < 4 && (
                  <span style={{ color: '#4b5563', fontSize: '18px' }}>→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div style={{
        width: '650px',
        minWidth: '600px',
        padding: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          width: '100%',
          maxWidth: '520px',
          padding: '56px',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          borderRadius: '28px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 28px',
              boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)'
            }}>
              <Shield size={42} color="#fff" />
            </div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#fff',
              marginBottom: '12px'
            }}>
              Welcome Back
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#64748b'
            }}>
              Sign in to continue to AI Document Fairness
            </p>
          </div>

          {error && (
            <div style={{
              padding: '12px 16px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              color: '#f87171',
              fontSize: '14px',
              marginBottom: '20px'
            }}>
              {error}
            </div>
          )}

          {/* Google Sign-in Button */}
          <button 
            type="button" 
            onClick={handleGoogleSignIn}
            disabled={loading}
            style={{
              width: '100%',
              padding: '18px 28px',
              background: '#fff',
              border: 'none',
              borderRadius: '14px',
              color: '#333',
              fontSize: '17px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              marginBottom: '28px',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.7 : 1
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24">
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
            margin: '24px 0',
            color: '#64748b'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <span style={{ padding: '0 16px', fontSize: '13px' }}>or continue with email</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '26px' }}>
              <label style={{
                display: 'block',
                fontSize: '15px',
                fontWeight: '500',
                color: '#94a3b8',
                marginBottom: '12px'
              }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '14px',
                  color: '#fff',
                  fontSize: '17px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'block',
                fontSize: '15px',
                fontWeight: '500',
                color: '#94a3b8',
                marginBottom: '12px'
              }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '14px',
                  color: '#fff',
                  fontSize: '17px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{
                width: '100%',
                padding: '20px 28px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border: 'none',
                borderRadius: '14px',
                color: '#fff',
                fontSize: '18px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: loading ? 0.7 : 1,
                boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)'
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div style={{
            textAlign: 'center',
            marginTop: '32px',
            fontSize: '16px',
            color: '#64748b'
          }}>
            Don't have an account?{' '}
            <Link to="/register" style={{
              color: '#818cf8',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              Sign up
            </Link>
          </div>

          {/* Trust Badges */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '28px',
            marginTop: '40px',
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <Lock size={20} color="#64748b" />
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>Secure</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Shield size={20} color="#64748b" />
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>Verified</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Zap size={20} color="#64748b" />
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>Fast</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        input::placeholder {
          color: #4b5563;
        }
      `}</style>
    </div>
  );
};

export default Login;
