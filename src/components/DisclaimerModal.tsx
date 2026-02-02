import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Users, Clock, Brain, CheckCircle2, XCircle } from 'lucide-react';
import { useLanguage } from '../i18n';

const DISCLAIMER_STORAGE_KEY = 'hofstede-disclaimer-seen';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DisclaimerModal({ isOpen, onClose }: DisclaimerModalProps) {
  const { t, language } = useLanguage();
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleConfirm = () => {
    if (dontShowAgain) {
      localStorage.setItem(DISCLAIMER_STORAGE_KEY, 'true');
    }
    onClose();
  };

  const sections = [
    {
      icon: Users,
      titleKey: 'disclaimerSection1Title' as const,
      contentKey: 'disclaimerSection1Content' as const,
      color: '#B8956A',
    },
    {
      icon: AlertTriangle,
      titleKey: 'disclaimerSection2Title' as const,
      contentKey: 'disclaimerSection2Content' as const,
      color: '#C4886B',
    },
    {
      icon: Clock,
      titleKey: 'disclaimerSection3Title' as const,
      contentKey: 'disclaimerSection3Content' as const,
      color: '#7D8471',
    },
    {
      icon: Brain,
      titleKey: 'disclaimerSection4Title' as const,
      contentKey: 'disclaimerSection4Content' as const,
      color: '#6B7B8C',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key={`disclaimer-modal-${language}`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
                       sm:w-full sm:max-w-2xl sm:max-h-[85vh]
                       bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-black/5 bg-gradient-to-r from-[#F5F4F0] to-white">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #B8956A, #9D7E57)' }}
                >
                  <AlertTriangle className="w-5 h-5 text-white" strokeWidth={2} />
                </motion.div>
                <h2
                  className="text-lg sm:text-xl font-medium text-[#1A1A1A] leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {t('disclaimerTitle')}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-black/5 transition-colors duration-300"
              >
                <X className="w-5 h-5 text-[#444444]" strokeWidth={1.5} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {/* Sections */}
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.titleKey}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                    className="p-4 rounded-xl bg-[#F5F4F0] border border-black/5 hover:border-black/10 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: `${section.color}15` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: section.color }} strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-medium text-sm sm:text-base text-[#1A1A1A] mb-1.5"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {t(section.titleKey)}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                          {t(section.contentKey)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Recommended Use */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-6 p-4 rounded-xl border-2 border-dashed border-[#B8956A]/30 bg-[#B8956A]/5"
              >
                <h3
                  className="font-medium text-sm sm:text-base text-[#9D7E57] mb-3 flex items-center gap-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <span className="text-lg">*</span>
                  {t('disclaimerRecommendedUse')}
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-xs sm:text-sm text-[#444444]">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span>{t('disclaimerDo1')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs sm:text-sm text-[#444444]">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span>{t('disclaimerDo2')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs sm:text-sm text-[#444444]">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span>{t('disclaimerDo3')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs sm:text-sm text-[#444444] mt-3 pt-3 border-t border-[#B8956A]/20">
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span>{t('disclaimerDont')}</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="p-5 sm:p-6 border-t border-black/5 bg-[#F5F4F0]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Checkbox */}
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={dontShowAgain}
                      onChange={(e) => setDontShowAgain(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded border-2 transition-all duration-300 flex items-center justify-center
                        ${dontShowAgain
                          ? 'bg-[#B8956A] border-[#B8956A]'
                          : 'border-[#444444]/30 group-hover:border-[#B8956A]'
                        }`}
                    >
                      {dontShowAgain && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 text-white"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M2 6l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                        </motion.svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-[#444444] group-hover:text-[#1A1A1A] transition-colors">
                    {t('dontShowAgain')}
                  </span>
                </label>

                {/* Confirm Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirm}
                  className="w-full sm:w-auto px-8 py-3 rounded-lg text-white font-medium text-sm
                             transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #B8956A, #9D7E57)' }}
                >
                  {t('confirm')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Hook to manage disclaimer modal state
export function useDisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const hasSeen = localStorage.getItem(DISCLAIMER_STORAGE_KEY);
    if (!hasSeen) {
      // Small delay to allow page to render first
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
    setHasCheckedStorage(true);
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setHasCheckedStorage(true);
  };

  return {
    isOpen,
    openModal,
    closeModal,
    hasCheckedStorage,
  };
}
