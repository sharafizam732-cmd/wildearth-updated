import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Film } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-12 bg-[#070d0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-['Montserrat']">
            Contact Wildlife Conservation Channel
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Have questions about institutional screening rights, film submissions, or conservation sponsorships? Send our production office a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Card */}
          <div className="bg-[#0b1510] border border-[#2d5a47]/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl h-fit">
            <h2 className="text-xl font-bold text-white font-['Montserrat']">
              Production Office
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-white font-semibold block">Conservation Studio & Archives</span>
                  <span className="text-neutral-400">
                    Wildlife Conservation Channel Media Trust, Nairobi & Cape Town
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-white font-semibold block">Direct Dispatch</span>
                  <span className="text-neutral-400">expeditions@wildearth-cinema.org</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Film className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-white font-semibold block">Documentary Filmmaker Submissions</span>
                  <span className="text-neutral-400">films@wildearth-cinema.org</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#070d0a] border border-white/5 text-[11px] text-neutral-400 space-y-1">
              <span className="font-semibold text-emerald-400 block">Typical Response Time</span>
              <span>Field producers review all legitimate communications within 24 to 48 hours.</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-[#0b1510] border border-[#2d5a47]/50 rounded-3xl p-6 sm:p-8 shadow-xl">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white font-['Montserrat']">Message Dispatched!</h3>
                <p className="text-xs text-neutral-300 max-w-md mx-auto">
                  Thank you for reaching out, {name}. Our conservation communications desk has received your message and will reply via {email}.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-200 text-xs font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. Jane Goodall"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070d0a] border border-[#2d5a47] focus:border-emerald-400 text-white text-xs placeholder:text-neutral-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@wildlife-trust.org"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070d0a] border border-[#2d5a47] focus:border-emerald-400 text-white text-xs placeholder:text-neutral-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#070d0a] border border-[#2d5a47] focus:border-emerald-400 text-white text-xs"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Documentary Submission">Documentary Film Submission</option>
                    <option value="Institutional License">Institutional / Educational Screening License</option>
                    <option value="Press & Media">Press & Media Interview</option>
                    <option value="Conservation Partnership">Conservation Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">Message</label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry, project scope, or screening proposal..."
                    className="w-full px-4 py-3 rounded-xl bg-[#070d0a] border border-[#2d5a47] focus:border-emerald-400 text-white text-xs placeholder:text-neutral-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#070d0a] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
