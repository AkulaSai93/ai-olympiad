import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle, Sparkles, Building, Mail, Lock } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const [workspaceName, setWorkspaceName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !workspaceName) return;
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl border border-white/10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Workspace Provisioned!</h3>
              <p className="text-sm text-neutral-300 mb-6">
                We've sent an instant workspace invite link for <span className="text-orange-400 font-bold">{workspaceName}</span> to <span className="font-semibold text-white">{email}</span>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm py-3 rounded-full transition-all cursor-pointer shadow-lg"
              >
                Launch Team Workspace
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400">14-Day Free Access</span>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                Start Streamlining Your Team
              </h3>
              <p className="text-xs text-neutral-300 mb-6 leading-relaxed">
                No credit card required. Includes full 3D team curved gallery, live async sync, and automated performance insights.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Workspace / Team Name
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                      placeholder="e.g. Acme Product Design"
                      className="w-full bg-neutral-950 text-xs text-white pl-10 pr-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Work Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full bg-neutral-950 text-xs text-white pl-10 pr-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm py-3.5 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Create Team Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-[10px] text-center text-neutral-500 mt-3 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>SOC2 Type II Certified & GDPR Compliant</span>
                </p>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
