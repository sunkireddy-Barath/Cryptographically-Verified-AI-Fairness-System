import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Cpu, CheckCircle, Lock, FileText, Zap, Award, Users, TrendingUp } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);

    try {
      await signup(formData.email, formData.password, formData.name);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create account');
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

  const benefits = [
    {
      icon: <Award size={24} />,
      title: 'Unbiased AI Evaluation',
      description: 'Get fair assessment without human prejudice or unconscious bias'
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Detailed Content Analysis',
      description: 'Discover insights with comprehensive document analysis'
    },
    {
      icon: <Users size={24} />,
      title: 'Transparent Process',
      description: 'See exactly how your resume was evaluated with full audit trail'
    },
    {
      icon: <Lock size={24} />,
      title: 'Cryptographic Security',
      description: 'Your data is protected with SHA-256 encryption'
    }
  ];

  const workflowSteps = [
    { num: '01', title: 'Upload', desc: 'Submit your document in PDF or DOC format' },
    { num: '02', title: 'Hash', desc: 'SHA-256 cryptographic hash generated' },
    { num: '03', title: 'Analyze', desc: 'OpenRouter AI extracts skills & experience' },
    { num: '04', title: 'Verify', desc: 'Vertex AI checks for bias & fairness' },
    { num: '05', title: 'Result', desc: 'Get verified, unbiased evaluation' }
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
        top: '20%',
        right: '5%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(50px)',
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 8s ease-in-out infinite reverse'
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        left: '40%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(30px)',
        animation: 'float 5s ease-in-out infinite'
      }} />

      {/* Left Side - Project Overview */}
      <div style={{
        flex: 1,
        padding: '50px 60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Logo & Title */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '28px'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)'
            }}>
              <Shield size={28} color="#fff" />
            </div>
            <div>
              <h1 style={{
                fontSize: '24px',
                fontWeight: '800',
                color: '#fff',
                margin: 0,
                letterSpacing: '-0.5px'
              }}>
                AI Document Fairness
              </h1>
              <p style={{
                fontSize: '13px',
                color: '#818cf8',
                margin: 0,
                fontWeight: '500'
              }}>
                Cryptographically Verified System
              </p>
            </div>
          </div>

          <h2 style={{
            fontSize: '38px',
            fontWeight: '800',
            color: '#fff',
            lineHeight: '1.2',
            marginBottom: '16px',
            letterSpacing: '-1px'
          }}>
            Join the Future of<br />
            <span style={{ 
              background: 'linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Fair Document Evaluation</span>
          </h2>

          <p style={{
            fontSize: '16px',
            color: '#94a3b8',
            lineHeight: '1.7',
            maxWidth: '480px'
          }}>
            Create your account and experience transparent, AI-powered document evaluation 
            that eliminates bias and ensures every submission gets a fair assessment.
          </p>
        </div>

        {/* Benefits Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '14px',
          marginBottom: '32px'
        }}>
          {benefits.map((benefit, idx) => (
            <div key={idx} style={{
              padding: '18px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '14px',
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
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(59, 130, 246, 0.2))',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#34d399',
                marginBottom: '10px'
              }}>
                {benefit.icon}
              </div>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#fff',
                marginBottom: '4px'
              }}>
                {benefit.title}
              </h3>
              <p style={{
                fontSize: '12px',
                color: '#64748b',
                lineHeight: '1.5',
                margin: 0
              }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Workflow Steps */}
        <div style={{
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div style={{ 
            fontSize: '11px', 
            color: '#64748b', 
            marginBottom: '16px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1.5px'
          }}>
            🔄 5-Step Verification Process
          </div>
          <div style={{
            display: 'flex',
            gap: '8px'
          }}>
            {workflowSteps.map((step, idx) => (
              <div key={idx} style={{
                flex: 1,
                padding: '12px',
                background: 'rgba(99, 102, 241, 0.08)',
                borderRadius: '12px',
                border: '1px solid rgba(99, 102, 241, 0.15)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '4px'
                }}>
                  {step.num}
                </div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#fff',
                  marginBottom: '2px'
                }}>
                  {step.title}
                </div>
                <div style={{
                  fontSize: '10px',
                  color: '#64748b',
                  lineHeight: '1.3'
                }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '24px',
          flexWrap: 'wrap'
        }}>
          {['OpenRouter AI', 'Vertex AI', 'SHA-256', 'Firebase', 'React'].map((tech, idx) => (
            <span key={idx} style={{
              padding: '8px 14px',
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '20px',
              fontSize: '11px',
              color: '#94a3b8',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div style={{
        width: '480px',
        padding: '30px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          padding: '32px',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
            }}>
              <Users size={28} color="#fff" />
            </div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#fff',
              marginBottom: '6px'
            }}>
              Create Account
            </h1>
            <p style={{
              fontSize: '13px',
              color: '#64748b'
            }}>
              Start your fair evaluation journey
            </p>
          </div>

          {error && (
            <div style={{
              padding: '12px 16px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              color: '#f87171',
              fontSize: '13px',
              marginBottom: '16px'
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
              padding: '12px 20px',
              background: '#fff',
              border: 'none',
              borderRadius: '12px',
              color: '#333',
              fontSize: '14px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '16px',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.7 : 1
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
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
            margin: '16px 0',
            color: '#64748b'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <span style={{ padding: '0 12px', fontSize: '12px' }}>or register with email</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '500',
                color: '#94a3b8',
                marginBottom: '6px'
              }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#10b981';
                  e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '500',
                color: '#94a3b8',
                marginBottom: '6px'
              }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#10b981';
                  e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '500',
                color: '#94a3b8',
                marginBottom: '6px'
              }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#10b981';
                  e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '500',
                color: '#94a3b8',
                marginBottom: '6px'
              }}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#10b981';
                  e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
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
                padding: '14px 24px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: loading ? 0.7 : 1,
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div style={{
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '13px',
            color: '#64748b'
          }}>
            Already have an account?{' '}
            <Link to="/login" style={{
              color: '#34d399',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              Sign in
            </Link>
          </div>

          {/* Trust Badges */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <Lock size={14} color="#64748b" />
              <div style={{ fontSize: '9px', color: '#64748b', marginTop: '3px' }}>Encrypted</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Shield size={14} color="#64748b" />
              <div style={{ fontSize: '9px', color: '#64748b', marginTop: '3px' }}>Secure</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <CheckCircle size={14} color="#64748b" />
              <div style={{ fontSize: '9px', color: '#64748b', marginTop: '3px' }}>Verified</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Zap size={14} color="#64748b" />
              <div style={{ fontSize: '9px', color: '#64748b', marginTop: '3px' }}>Fast</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        input::placeholder {
          color: #4b5563;
        }
      `}</style>
    </div>
  );
};

export default Register;
