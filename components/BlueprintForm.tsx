'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BlueprintForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    birthday: '',
    birthTime: '',
    birthLocation: '',
    
    // Human Design Information
    humanDesignType: '',
    humanDesignProfile: '',
    humanDesignAuthority: '',
    
    // Crystal Preferences
    favoriteCrystals: ['', '', ''],
    
    // Work Style
    salesStyle: '',
    communicationStyle: '',
    favoriteProducts: ['', '', ''],
    
    // Personal Information
    personalGoals: {
      career: '',
      spiritual: '',
      financial: ''
    },
    loveLanguage: '',
    moonSign: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{success: boolean, message: string} | null>(null);

  // Handler for form changes
  const handleChange = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);
    
    try {
      const response = await fetch('/api/blueprint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to save blueprint');
      }
      
      console.log('Blueprint saved! Actions:', result.actions);
      setSubmitResult({
        success: true,
        message: 'Soul Blueprint saved successfully! The Crystal Portal will now use this information to provide personalized insights and reminders.'
      });
      
      // In a real app, we might redirect to a dashboard or actions view
      // router.push('/dashboard');
    } catch (error) {
      console.error('Error saving blueprint:', error);
      setSubmitResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Failed to save blueprint'}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      {/* Top Nav Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="bg-black px-3 py-2 rounded">
          <span className="text-white font-['Space_Mono'] font-bold">💎 Crystal Portal</span>
        </div>
        <div className="flex items-center">
          <div className="bg-[#9966CC] text-white px-3 py-1 rounded-md mr-2 font-['Space_Mono']">
            Soul Blueprint ▼
          </div>
          <div className="bg-[#00FF00] border-2 border-black w-8 h-8 flex items-center justify-center text-black font-bold rounded-sm">?</div>
        </div>
      </div>

      {/* Main Title */}
      <div className="text-center mb-10">
        <div className="bg-black inline-block px-4 py-2">
          <span className="text-white font-['Space_Mono'] text-3xl font-bold">Crystal Portal</span>
        </div>
        <div className="bg-[#9966CC] text-white px-2 py-1 text-sm rounded inline-block ml-2 font-['Space_Mono']">
          Soul Blueprint
        </div>
      </div>
      
      {/* Submission Result Message */}
      {submitResult && (
        <div className={`p-4 mb-6 rounded-lg border-2 border-black ${submitResult.success ? 'bg-green-200' : 'bg-red-200'}`}>
          <p className="font-['Space_Mono'] text-center">{submitResult.message}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="crystal-card-amethyst">
          <h3 className="card-title">Personal Information</h3>
          <p className="text-white mb-4">Enter your personal details to create your unique Soul Blueprint</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label text-white">Full Name</label>
              <input 
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
            
            <div>
              <label className="form-label text-white">Birthday</label>
              <input 
                type="date"
                className="form-input"
                value={formData.birthday}
                onChange={(e) => handleChange('birthday', e.target.value)}
              />
            </div>
            
            <div>
              <label className="form-label text-white">Birth Time (if known)</label>
              <input 
                type="time"
                className="form-input"
                value={formData.birthTime}
                onChange={(e) => handleChange('birthTime', e.target.value)}
              />
            </div>
            
            <div>
              <label className="form-label text-white">Birth Location</label>
              <input 
                type="text"
                className="form-input"
                value={formData.birthLocation}
                onChange={(e) => handleChange('birthLocation', e.target.value)}
                placeholder="City, Country"
              />
            </div>
          </div>
        </div>
        
        {/* Human Design Section */}
        <div className="crystal-card-rose-quartz">
          <h3 className="card-title">Human Design</h3>
          <p className="mb-4">Share your Human Design details (leave blank if unknown)</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Human Design Type</label>
              <div className="select-wrapper">
                <select 
                  className="select-input"
                  value={formData.humanDesignType}
                  onChange={(e) => handleChange('humanDesignType', e.target.value)}
                >
                  <option value="">Select type (if known)</option>
                  <option value="Manifestor">Manifestor</option>
                  <option value="Generator">Generator</option>
                  <option value="Manifesting Generator">Manifesting Generator</option>
                  <option value="Projector">Projector</option>
                  <option value="Reflector">Reflector</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="form-label">Profile</label>
              <div className="select-wrapper">
                <select 
                  className="select-input"
                  value={formData.humanDesignProfile}
                  onChange={(e) => handleChange('humanDesignProfile', e.target.value)}
                >
                  <option value="">Select profile (if known)</option>
                  <option value="1/3">1/3 - Investigator/Martyr</option>
                  <option value="1/4">1/4 - Investigator/Opportunist</option>
                  <option value="2/4">2/4 - Hermit/Opportunist</option>
                  <option value="2/5">2/5 - Hermit/Heretic</option>
                  <option value="3/5">3/5 - Martyr/Heretic</option>
                  <option value="3/6">3/6 - Martyr/Role Model</option>
                  <option value="4/6">4/6 - Opportunist/Role Model</option>
                  <option value="4/1">4/1 - Opportunist/Investigator</option>
                  <option value="5/1">5/1 - Heretic/Investigator</option>
                  <option value="5/2">5/2 - Heretic/Hermit</option>
                  <option value="6/2">6/2 - Role Model/Hermit</option>
                  <option value="6/3">6/3 - Role Model/Martyr</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="form-label">Authority</label>
            <div className="select-wrapper">
              <select 
                className="select-input"
                value={formData.humanDesignAuthority}
                onChange={(e) => handleChange('humanDesignAuthority', e.target.value)}
              >
                <option value="">Select authority (if known)</option>
                <option value="Emotional">Emotional/Solar Plexus</option>
                <option value="Sacral">Sacral</option>
                <option value="Splenic">Splenic</option>
                <option value="Ego">Ego/Heart</option>
                <option value="G Center">Self/G Center</option>
                <option value="Lunar">Lunar/No Inner Authority</option>
                <option value="Environmental">Environmental/Outer Authority</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Crystal Preferences Section */}
        <div className="crystal-card-citrine">
          <h3 className="card-title">Crystal Preferences</h3>
          <p className="mb-4">Tell us about your favorite crystals and their meaning to you</p>
          
          <div className="space-y-4">
            <div>
              <label className="form-label">Top 3 Favorite Crystals</label>
              <div className="grid grid-cols-1 gap-3">
                <input 
                  type="text"
                  className="form-input"
                  value={formData.favoriteCrystals[0]}
                  onChange={(e) => {
                    const newCrystals = [...formData.favoriteCrystals];
                    newCrystals[0] = e.target.value;
                    handleChange('favoriteCrystals', newCrystals);
                  }}
                  placeholder="1st Favorite Crystal"
                />
                <input 
                  type="text"
                  className="form-input"
                  value={formData.favoriteCrystals[1]}
                  onChange={(e) => {
                    const newCrystals = [...formData.favoriteCrystals];
                    newCrystals[1] = e.target.value;
                    handleChange('favoriteCrystals', newCrystals);
                  }}
                  placeholder="2nd Favorite Crystal"
                />
                <input 
                  type="text"
                  className="form-input"
                  value={formData.favoriteCrystals[2]}
                  onChange={(e) => {
                    const newCrystals = [...formData.favoriteCrystals];
                    newCrystals[2] = e.target.value;
                    handleChange('favoriteCrystals', newCrystals);
                  }}
                  placeholder="3rd Favorite Crystal"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Work Style Section */}
        <div className="crystal-card-aventurine">
          <h3 className="card-title">Work Style</h3>
          <p className="mb-4">Share your natural work and communication preferences</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Sales Style</label>
              <div className="select-wrapper">
                <select 
                  className="select-input"
                  value={formData.salesStyle}
                  onChange={(e) => handleChange('salesStyle', e.target.value)}
                >
                  <option value="">Select your primary style</option>
                  <option value="Empath">Empath - Connection through feeling</option>
                  <option value="Educator">Educator - Teaching and informing</option>
                  <option value="Intuitive">Intuitive - Following inner guidance</option>
                  <option value="Connector">Connector - Building relationships</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="form-label">Communication Style</label>
              <div className="select-wrapper">
                <select 
                  className="select-input"
                  value={formData.communicationStyle}
                  onChange={(e) => handleChange('communicationStyle', e.target.value)}
                >
                  <option value="">Select your communication style</option>
                  <option value="Playful">Playful - Lighthearted and fun</option>
                  <option value="Grounded">Grounded - Practical and direct</option>
                  <option value="Professional">Professional - Polished and formal</option>
                  <option value="Mystical">Mystical - Spiritual and intuitive</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="form-label">Favorite Products to Recommend</label>
            <div className="grid grid-cols-1 gap-3">
              <input 
                type="text"
                className="form-input"
                value={formData.favoriteProducts[0]}
                onChange={(e) => {
                  const newProducts = [...formData.favoriteProducts];
                  newProducts[0] = e.target.value;
                  handleChange('favoriteProducts', newProducts);
                }}
                placeholder="1st Favorite Product"
              />
              <input 
                type="text"
                className="form-input"
                value={formData.favoriteProducts[1]}
                onChange={(e) => {
                  const newProducts = [...formData.favoriteProducts];
                  newProducts[1] = e.target.value;
                  handleChange('favoriteProducts', newProducts);
                }}
                placeholder="2nd Favorite Product"
              />
              <input 
                type="text"
                className="form-input"
                value={formData.favoriteProducts[2]}
                onChange={(e) => {
                  const newProducts = [...formData.favoriteProducts];
                  newProducts[2] = e.target.value;
                  handleChange('favoriteProducts', newProducts);
                }}
                placeholder="3rd Favorite Product"
              />
            </div>
          </div>
        </div>
        
        {/* Personal Goals Section */}
        <div className="crystal-card-clear-quartz">
          <h3 className="card-title">Personal Goals & Preferences</h3>
          <p className="mb-4">Share your aspirations and preferences to help us support your journey</p>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="form-label">Career Goals</label>
              <textarea 
                className="form-input min-h-[80px]"
                value={formData.personalGoals.career}
                onChange={(e) => {
                  const newGoals = {...formData.personalGoals, career: e.target.value};
                  handleChange('personalGoals', newGoals);
                }}
                placeholder="What are your career aspirations?"
              />
            </div>
            
            <div>
              <label className="form-label">Spiritual Goals</label>
              <textarea 
                className="form-input min-h-[80px]"
                value={formData.personalGoals.spiritual}
                onChange={(e) => {
                  const newGoals = {...formData.personalGoals, spiritual: e.target.value};
                  handleChange('personalGoals', newGoals);
                }}
                placeholder="What are your spiritual intentions?"
              />
            </div>
            
            <div>
              <label className="form-label">Financial Goals</label>
              <textarea 
                className="form-input min-h-[80px]"
                value={formData.personalGoals.financial}
                onChange={(e) => {
                  const newGoals = {...formData.personalGoals, financial: e.target.value};
                  handleChange('personalGoals', newGoals);
                }}
                placeholder="What are your financial goals?"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="form-label">Love Language</label>
              <div className="select-wrapper">
                <select 
                  className="select-input"
                  value={formData.loveLanguage}
                  onChange={(e) => handleChange('loveLanguage', e.target.value)}
                >
                  <option value="">Select your primary love language</option>
                  <option value="Words of Affirmation">Words of Affirmation</option>
                  <option value="Acts of Service">Acts of Service</option>
                  <option value="Receiving Gifts">Receiving Gifts</option>
                  <option value="Quality Time">Quality Time</option>
                  <option value="Physical Touch">Physical Touch</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="form-label">Moon Sign (if known)</label>
              <div className="select-wrapper">
                <select 
                  className="select-input"
                  value={formData.moonSign}
                  onChange={(e) => handleChange('moonSign', e.target.value)}
                >
                  <option value="">Select your moon sign</option>
                  <option value="Aries">Aries</option>
                  <option value="Taurus">Taurus</option>
                  <option value="Gemini">Gemini</option>
                  <option value="Cancer">Cancer</option>
                  <option value="Leo">Leo</option>
                  <option value="Virgo">Virgo</option>
                  <option value="Libra">Libra</option>
                  <option value="Scorpio">Scorpio</option>
                  <option value="Sagittarius">Sagittarius</option>
                  <option value="Capricorn">Capricorn</option>
                  <option value="Aquarius">Aquarius</option>
                  <option value="Pisces">Pisces</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="blueprint-submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'SAVING...' : 'SAVE MY SOUL BLUEPRINT'}
        </button>
      </form>
    </div>
  );
} 