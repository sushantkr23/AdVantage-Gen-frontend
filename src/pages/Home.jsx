import React from 'react';
import { Link } from 'react-router-dom';
import { FiZap, FiLayers, FiMessageSquare, FiArrowRight, FiCheck } from 'react-icons/fi';

const features = [
  {
    icon: <FiZap size={24} />,
    title: 'Parallel AI Generation',
    desc: 'Image & copy generated simultaneously — Hugging Face + Gemini running in parallel to cut wait time in half.',
    color: 'from-orange-400 to-red-500',
  },
  {
    icon: <FiLayers size={24} />,
    title: 'Auto Brand Compositing',
    desc: 'Your logo and CTA button are automatically overlaid on every generated image. Ready to publish instantly.',
    color: 'from-violet-400 to-purple-600',
  },
  {
    icon: <FiMessageSquare size={24} />,
    title: 'Brand Voice Tuning',
    desc: 'Pick from Witty, Professional, Urgent, or Inspirational — the AI writes copy that sounds exactly like your brand.',
    color: 'from-sky-400 to-blue-600',
  },
];

const stats = [
  { value: '4', label: 'Brand Voices' },
  { value: '4', label: 'Platforms' },
  { value: '~30s', label: 'Generation Time' },
  { value: '∞', label: 'Possibilities' },
];

const platforms = ['Instagram', 'LinkedIn', 'Facebook', 'Twitter'];

const Home = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
        {/* Background glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 opacity-10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-red-500 opacity-10 rounded-full blur-3xl translate-y-1/2" />

        <div className="relative max-w-5xl mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-orange-300 font-medium mb-8 backdrop-blur-sm">
            <FiZap size={14} /> AI-Powered Social Media Campaigns
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 font-['Poppins']">
            Generate Complete{' '}
            <span className="gradient-text">Ad Campaigns</span>
            <br />in Seconds
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            One prompt. One click. Get a stunning AI-generated image, optimized caption, hashtags,
            and a branded CTA — all formatted for your platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/register" className="btn-primary text-base px-8 py-3 pulse-glow inline-flex items-center gap-2 justify-center">
              Start for Free <FiArrowRight size={16} />
            </Link>
            <Link to="/pricing" className="btn-secondary text-base px-8 py-3 inline-flex items-center gap-2 justify-center">
              View Pricing
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl py-4 px-3 text-center">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform badges ── */}
      <section className="bg-gray-50 border-y border-gray-100 py-5">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-gray-500 font-medium mr-2">Optimized for:</span>
          {platforms.map((p) => (
            <span key={p} className="bg-white border border-gray-200 text-gray-700 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm">
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-title mb-3">Everything in one click</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            No more juggling between tools. AdVantage Gen handles the entire creative pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="card group fade-in-up">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title mb-3">How it works</h2>
          <p className="text-gray-500 mb-12">Three steps to a publish-ready campaign</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Write your prompt', desc: 'Describe your product, theme, or campaign idea in plain English.' },
              { step: '02', title: 'Choose your settings', desc: 'Pick brand voice, platform, CTA text, and optionally upload your logo.' },
              { step: '03', title: 'Download & publish', desc: 'Get your AI-generated image with copy — ready to post in seconds.' },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 shadow-soft border border-orange-100 text-left">
                <span className="text-4xl font-black text-orange-100 block mb-3">{item.step}</span>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gradient-to-r from-orange-500 via-red-500 to-rose-500 py-20 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 font-['Poppins']">Ready to launch faster?</h2>
          <p className="text-orange-100 text-lg mb-8">10 free campaigns every month. No credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register" className="bg-white text-orange-600 font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors shadow-lg inline-flex items-center gap-2 justify-center">
              Get Started Free <FiArrowRight size={16} />
            </Link>
            <Link to="/pricing" className="border-2 border-white/50 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors inline-flex items-center gap-2 justify-center">
              See Pricing
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-orange-100">
            {['No credit card', 'Cancel anytime', 'Free forever plan'].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><FiCheck size={14} /> {t}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
