import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiZap, FiArrowRight } from 'react-icons/fi';

const plans = [
  {
    name: 'Free',
    price: 0,
    period: '/month',
    tagline: 'Perfect to get started',
    limit: '10 campaigns/month',
    features: ['10 campaigns per month', 'AI image generation', 'Standard quality', 'All 4 brand voices', 'Email support'],
    cta: 'Get Started Free',
    href: '/register',
    highlight: false,
    badge: null,
  },
  {
    name: 'Pro',
    price: 29.99,
    period: '/month',
    tagline: 'For serious marketers',
    limit: '100 campaigns/month',
    features: ['100 campaigns per month', 'HD image generation', 'Priority processing', 'Priority support', 'Advanced brand voice', 'Custom CTA styles', 'Campaign analytics'],
    cta: 'Start Pro Trial',
    href: '/register',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 99.99,
    period: '/month',
    tagline: 'For teams & agencies',
    limit: 'Unlimited campaigns',
    features: ['Unlimited campaigns', '4K image generation', 'Fastest processing', '24/7 dedicated support', 'API access', 'Team collaboration', 'Custom AI model', 'White-label exports'],
    cta: 'Contact Sales',
    href: '/register',
    highlight: false,
    badge: null,
  },
];

const Pricing = () => (
  <div className="min-h-screen bg-gray-50">
    {/* Header */}
    <section className="bg-gradient-to-br from-slate-900 to-gray-900 text-white py-20 px-4 text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-orange-500 opacity-10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="relative max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-orange-300 font-medium mb-6">
          <FiZap size={14} /> Simple, transparent pricing
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Poppins']">Choose your plan</h1>
        <p className="text-gray-400 text-lg">Start free. Upgrade when you're ready. Cancel anytime.</p>
      </div>
    </section>

    {/* Plans */}
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white rounded-3xl border overflow-hidden transition-all duration-300 hover:shadow-xl ${
              plan.highlight
                ? 'border-orange-400 shadow-xl shadow-orange-100 scale-[1.02]'
                : 'border-gray-100 shadow-soft hover:-translate-y-1'
            }`}
          >
            {plan.badge ? (
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold text-center py-2 tracking-wider uppercase">
                {plan.badge}
              </div>
            ) : (
              <div className="h-8" />
            )}

            <div className="p-7">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h2>
              <p className="text-gray-400 text-sm mb-5">{plan.tagline}</p>

              <div className="flex items-end gap-1 mb-2">
                <span className="text-4xl font-black text-gray-900">${plan.price}</span>
                <span className="text-gray-400 mb-1">{plan.period}</span>
              </div>
              <p className="text-sm font-semibold text-orange-500 mb-6">{plan.limit}</p>

              <Link
                to={plan.href}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all mb-7 ${
                  plan.highlight
                    ? 'btn-primary'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {plan.cta} <FiArrowRight size={15} />
              </Link>

              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlight ? 'bg-orange-100' : 'bg-gray-100'}`}>
                      <FiCheck size={11} className={plan.highlight ? 'text-orange-500' : 'text-gray-500'} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ note */}
      <p className="text-center text-gray-400 text-sm mt-10">
        All plans include a 14-day money-back guarantee. Questions?{' '}
        <a href="mailto:support@advantage-gen.com" className="text-orange-500 hover:underline">Contact us</a>
      </p>
    </section>
  </div>
);

export default Pricing;
