import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Heart, 
  Target, 
  Users, 
  Trophy, 
  Settings, 
  ChevronRight, 
  Star, 
  BarChart2, 
  Clock, 
  User, 
  ArrowLeft,
  CheckCircle2,
  Lock,
  Zap,
  Smile,
  Frown,
  Meh
} from 'lucide-react';

// --- Reusable UI Components ---

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg active:scale-95 disabled:opacity-50 disabled:active:scale-100',
    secondary: 'bg-pink-500 text-white hover:bg-pink-600 shadow-md',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
    ghost: 'text-gray-500 hover:bg-gray-100'
  };
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`px-6 py-3 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-3xl p-6 shadow-sm border border-indigo-50 ${className}`}>
    {children}
  </div>
);

// --- Individual Screen Components ---

function SplashScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-8 h-full min-h-screen">
      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl mb-6 animate-bounce">
        <Brain className="w-16 h-16 text-indigo-600" />
      </div>
      <h1 className="text-4xl font-black tracking-tight mb-2 italic">NeuroNest</h1>
      <p className="text-indigo-100 text-center font-medium animate-pulse">
        Transforming Screen Time into Smart Time
      </p>
    </div>
  );
}

function WelcomeScreen({ onStart, onParent }) {
  return (
    <div className="flex-1 flex flex-col p-8 justify-between bg-white h-full min-h-screen">
      <div className="mt-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute -inset-1 bg-indigo-500 rounded-full blur opacity-25"></div>
            <Brain className="relative w-20 h-20 text-indigo-600" />
          </div>
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4">Welcome to NeuroNest</h2>
        <p className="text-slate-500 px-4">The digital playground that grows with your child's brain.</p>
      </div>

      <div className="space-y-4 mb-12">
        <Button onClick={onStart} className="w-full text-lg py-5">
          Let's Play!
        </Button>
        <Button onClick={onParent} variant="outline" className="w-full">
          <Settings className="w-5 h-5" /> Parent Mode
        </Button>
      </div>
    </div>
  );
}

function ProfileSetup({ profile, setProfile, onComplete }) {
  const [step, setStep] = useState(1);
  const interests = ['Games', 'Stories', 'Puzzles', 'Animals', 'Space', 'Colors'];

  const toggleInterest = (interest) => {
    const current = profile.interests.includes(interest)
      ? profile.interests.filter(i => i !== interest)
      : [...profile.interests, interest];
    setProfile({ ...profile, interests: current });
  };

  return (
    <div className="flex-1 p-8 flex flex-col h-full min-h-screen">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Step {step} of 3</span>
          <div className="flex gap-1">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-2 w-8 rounded-full ${step >= i ? 'bg-indigo-600' : 'bg-indigo-100'}`} />
            ))}
          </div>
        </div>
        <h2 className="text-2xl font-black text-slate-900">
          {step === 1 && "What's your name?"}
          {step === 2 && "What do you like?"}
          {step === 3 && "How do we learn?"}
        </h2>
      </div>

      <div className="flex-1">
        {step === 1 && (
          <div className="space-y-6">
            <input 
              type="text" 
              placeholder="Your Name"
              className="w-full p-4 text-xl rounded-2xl border-2 border-indigo-100 focus:border-indigo-600 outline-none transition-colors"
              value={profile.name}
              onChange={(e) => setProfile({...profile, name: e.target.value})}
            />
            <div className="grid grid-cols-3 gap-3">
              {[3, 4, 5, 6, 7, 8].map(age => (
                <button
                  key={age}
                  onClick={() => setProfile({...profile, age})}
                  className={`p-4 rounded-2xl border-2 font-bold transition-all ${profile.age === age ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 text-slate-400'}`}
                >
                  Age {age}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-2 gap-3">
            {interests.map(item => (
              <button
                key={item}
                onClick={() => toggleInterest(item)}
                className={`p-4 rounded-2xl border-2 font-bold transition-all text-left flex justify-between items-center ${profile.interests.includes(item) ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 text-slate-400'}`}
              >
                {item}
                {profile.interests.includes(item) && <CheckCircle2 className="w-5 h-5" />}
              </button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            {[
              { id: 'fun', label: 'Fun & Playful', desc: 'Lots of rewards and simple tasks' },
              { id: 'challenge', label: 'Challenge Me', desc: 'Harder puzzles and logic games' },
              { id: 'calm', label: 'Calm & Quiet', desc: 'Gentle focus and breathing tasks' }
            ].map(mode => (
              <button
                key={mode.id}
                onClick={() => setProfile({...profile, learningMode: mode.id})}
                className={`w-full p-5 rounded-3xl border-2 text-left transition-all ${profile.learningMode === mode.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100'}`}
              >
                <div className="font-bold text-lg mb-1">{mode.label}</div>
                <div className="text-sm text-slate-500">{mode.desc}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <Button 
        className="mt-6 py-4"
        onClick={() => step < 3 ? setStep(step + 1) : onComplete()}
        disabled={step === 1 && !profile.name}
      >
        {step === 3 ? "Start Journey" : "Next"}
      </Button>
    </div>
  );
}

function Dashboard({ onNavigate, stars }) {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full min-h-screen">
      <div className="bg-white p-6 pb-4 border-b border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <User className="text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Level 4 Explorer</p>
              <h3 className="text-lg font-black text-slate-800">Hi, Buddy!</h3>
            </div>
          </div>
          <div className="bg-amber-100 px-3 py-1.5 rounded-full flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-amber-700">{stars}</span>
          </div>
        </div>

        <div className="bg-indigo-600 rounded-2xl p-4 text-white flex justify-between items-center shadow-lg">
          <div>
            <p className="text-indigo-200 text-xs font-bold uppercase">Daily Challenge</p>
            <h4 className="font-bold text-lg leading-tight">Match 3 Emotions</h4>
          </div>
          <Button variant="secondary" className="px-4 py-2 text-sm" onClick={() => onNavigate('game-emotion')}>
            Go!
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24">
        <h4 className="font-black text-slate-900 mb-4 uppercase text-xs tracking-widest opacity-60">Learning Modules</h4>
        <div className="grid grid-cols-2 gap-4">
          <ModuleCard icon={<Brain className="text-blue-500" />} title="Brain" color="bg-blue-50" onClick={() => onNavigate('game-brain')} />
          <ModuleCard icon={<Heart className="text-pink-500" />} title="Emotion" color="bg-pink-50" onClick={() => onNavigate('game-emotion')} />
          <ModuleCard icon={<Target className="text-orange-500" />} title="Focus" color="bg-orange-50" onClick={() => onNavigate('game-focus')} />
          <ModuleCard icon={<Users className="text-purple-500" />} title="Social" color="bg-purple-50" locked />
        </div>

        <div className="mt-8">
          <h4 className="font-black text-slate-900 mb-4 uppercase text-xs tracking-widest opacity-60">Achievements</h4>
          <Card className="flex items-center gap-4 py-4">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
              <Trophy className="text-amber-500" />
            </div>
            <div>
              <p className="font-bold text-slate-800">Early Bird</p>
              <p className="text-xs text-slate-500">Completed daily quest before 9 AM</p>
            </div>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 p-4 flex justify-around items-center">
        <button className="text-indigo-600 flex flex-col items-center gap-1">
          <Smile className="w-6 h-6" />
          <span className="text-[10px] font-bold">Play</span>
        </button>
        <button className="text-slate-400 flex flex-col items-center gap-1" onClick={() => onNavigate('reward')}>
          <Trophy className="w-6 h-6" />
          <span className="text-[10px] font-bold">Badges</span>
        </button>
        <button className="text-slate-400 flex flex-col items-center gap-1" onClick={() => onNavigate('parent-mode')}>
          <Settings className="w-6 h-6" />
          <span className="text-[10px] font-bold">Parent</span>
        </button>
      </div>
    </div>
  );
}

function ModuleCard({ icon, title, color, onClick, locked }) {
  return (
    <button 
      onClick={!locked ? onClick : undefined}
      className={`${color} rounded-3xl p-6 flex flex-col items-center justify-center gap-3 relative overflow-hidden active:scale-95 transition-transform h-32`}
    >
      {locked && <div className="absolute top-2 right-2"><Lock className="w-4 h-4 text-slate-400" /></div>}
      <div className={`p-3 rounded-2xl bg-white shadow-sm ${locked ? 'opacity-50' : ''}`}>
        {icon}
      </div>
      <span className={`font-black text-slate-800 ${locked ? 'opacity-50' : ''}`}>{title}</span>
    </button>
  );
}

function BrainGame({ onBack, onWin }) {
  const colors = [
    { name: 'blue', bg: 'bg-blue-500' },
    { name: 'red', bg: 'bg-red-500' },
    { name: 'green', bg: 'bg-green-500' },
    { name: 'yellow', bg: 'bg-yellow-500' }
  ];

  return (
    <div className="flex-1 flex flex-col bg-white h-full min-h-screen">
      <div className="p-6 flex items-center justify-between">
        <button onClick={onBack}><ArrowLeft /></button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Pattern Matcher</span>
          <span className="font-bold">Level 1/5</span>
        </div>
        <div className="w-8" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-black mb-2">Find the <span className="text-blue-600">Blue</span> Circle!</h2>
        <p className="text-slate-500 mb-12">Tap as fast as you can</p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          {colors.map(c => (
            <button 
              key={c.name}
              onClick={() => c.name === 'blue' ? onWin() : null}
              className={`${c.bg} aspect-square rounded-[40px] shadow-lg active:scale-90 transition-transform`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function EmotionGame({ onBack, onComplete }) {
  return (
    <div className="flex-1 flex flex-col bg-pink-50 h-full min-h-screen">
       <div className="p-6 flex items-center justify-between">
        <button onClick={onBack}><ArrowLeft /></button>
        <span className="font-bold">Emotion Reader</span>
        <div className="w-8" />
      </div>

      <div className="flex-1 p-8 flex flex-col">
        <Card className="flex-1 flex flex-col items-center justify-center mb-8">
          <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center text-6xl mb-6">😢</div>
          <h3 className="text-xl font-bold mb-4 text-center">Momo the Monkey is sad.</h3>
          <p className="text-slate-600 text-center italic">"I lost my favorite banana today..."</p>
        </Card>

        <div className="space-y-3">
          <Button variant="outline" className="w-full bg-white" onClick={onComplete}>Give Momo a big hug</Button>
          <Button variant="outline" className="w-full bg-white" onClick={onComplete}>Help Momo find his banana</Button>
        </div>
      </div>
    </div>
  );
}

function FocusGame({ onBack, onComplete }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale(s => s === 1 ? 1.4 : 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-teal-50 h-full min-h-screen">
       <div className="p-6 flex items-center justify-between">
        <button onClick={onBack}><ArrowLeft /></button>
        <span className="font-bold">Breathing Buddies</span>
        <div className="w-8" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div 
          className="w-48 h-48 bg-teal-500 rounded-full flex items-center justify-center text-white transition-all duration-[4000ms] ease-in-out shadow-2xl mb-12"
          style={{ transform: `scale(${scale})` }}
        >
          <Zap className="w-16 h-16 animate-pulse" />
        </div>
        <h2 className="text-2xl font-black text-teal-900 mb-2">{scale === 1 ? 'Inhale...' : 'Exhale...'}</h2>
        <Button variant="primary" className="bg-teal-600 mt-8" onClick={onComplete}>I'm Calm Now</Button>
      </div>
    </div>
  );
}

function RewardScreen({ onNext }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-amber-50 h-full min-h-screen">
      <Trophy className="w-32 h-32 text-amber-500 mb-8" />
      <h2 className="text-3xl font-black text-slate-900 mb-2 text-center">Awesome!</h2>
      <p className="text-slate-600 mb-12">+20 Energy Stars Earned</p>
      <Button onClick={onNext} className="w-full">Continue Journey</Button>
    </div>
  );
}

function ParentDashboard({ onBack }) {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full min-h-screen">
      <div className="bg-white p-6 border-b border-slate-200">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 -ml-2"><ArrowLeft /></button>
          <h2 className="text-xl font-bold">Parent Insights</h2>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 bg-indigo-50 p-4 rounded-2xl">
            <p className="text-[10px] font-black text-indigo-400 uppercase">Screen Time</p>
            <p className="text-2xl font-black text-indigo-700">18m</p>
          </div>
          <div className="flex-1 bg-pink-50 p-4 rounded-2xl">
            <p className="text-[10px] font-black text-pink-400 uppercase">Happiness</p>
            <p className="text-2xl font-black text-pink-700">High</p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6 overflow-y-auto pb-8">
        <div>
          <h3 className="text-sm font-black text-slate-400 uppercase mb-4 tracking-widest">Skill Growth</h3>
          <SkillProgress label="Memory" val="75%" color="bg-blue-500" />
          <SkillProgress label="Empathy" val="90%" color="bg-pink-500" />
          <SkillProgress label="Focus" val="45%" color="bg-teal-500" />
        </div>
      </div>
    </div>
  );
}

function SkillProgress({ label, val, color }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
        <span>{label}</span>
        <span>{val}</span>
      </div>
      <div className="h-2 w-full bg-slate-200 rounded-full">
        <div className={`h-full ${color} rounded-full`} style={{ width: val }} />
      </div>
    </div>
  );
}

// --- Main App Entry ---

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [childProfile, setChildProfile] = useState({ name: '', age: '', interests: [], learningMode: 'fun' });
  const [stars, setStars] = useState(120);

  useEffect(() => {
    if (screen === 'splash') {
      const timer = setTimeout(() => setScreen('welcome'), 2500);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const renderScreen = () => {
    switch (screen) {
      case 'splash': return <SplashScreen />;
      case 'welcome': return <WelcomeScreen onStart={() => setScreen('profile-setup')} onParent={() => setScreen('parent-mode')} />;
      case 'profile-setup': return <ProfileSetup profile={childProfile} setProfile={setChildProfile} onComplete={() => setScreen('dashboard')} />;
      case 'dashboard': return <Dashboard onNavigate={setScreen} stars={stars} />;
      case 'game-brain': return <BrainGame onBack={() => setScreen('dashboard')} onWin={() => { setStars(s => s + 20); setScreen('reward'); }} />;
      case 'game-emotion': return <EmotionGame onBack={() => setScreen('dashboard')} onComplete={() => { setStars(s => s + 15); setScreen('reward'); }} />;
      case 'game-focus': return <FocusGame onBack={() => setScreen('dashboard')} onComplete={() => { setStars(s => s + 25); setScreen('reward'); }} />;
      case 'reward': return <RewardScreen onNext={() => setScreen('dashboard')} />;
      case 'parent-mode': return <ParentDashboard onBack={() => setScreen('welcome')} />;
      default: return <WelcomeScreen onStart={() => setScreen('profile-setup')} onParent={() => setScreen('parent-mode')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-white shadow-2xl relative overflow-hidden flex flex-col h-screen sm:h-[800px] sm:rounded-[3rem]">
        {renderScreen()}
      </div>
    </div>
  );
}
