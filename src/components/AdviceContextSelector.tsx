/**
 * 조언 상황(AdviceContext) 선택 컴포넌트
 */

import { motion, AnimatePresence } from 'framer-motion';
import type { AdviceContext } from '../types';
import { contextOptions } from '../data/adviceContextOptions';
import { useLanguage } from '../i18n';
import type { TranslationKeys } from '../i18n/translations';

interface AdviceContextSelectorProps {
  selectedContext: AdviceContext | null;
  onContextSelect: (context: AdviceContext | null) => void;
}

const contextTranslationKeys: Record<AdviceContext, { name: keyof TranslationKeys; desc: keyof TranslationKeys }> = {
  MEETING_IDEA: { name: 'contextMeetingIdea', desc: 'contextMeetingIdeaDesc' },
  DISAGREE_BOSS: { name: 'contextDisagreeBoss', desc: 'contextDisagreeBossDesc' },
  REPORTING: { name: 'contextReporting', desc: 'contextReportingDesc' },
  REWARD_RECOGNITION: { name: 'contextRewardRecognition', desc: 'contextRewardRecognitionDesc' },
  TEAM_COLLABORATION: { name: 'contextTeamCollaboration', desc: 'contextTeamCollaborationDesc' },
  NEGOTIATION: { name: 'contextNegotiation', desc: 'contextNegotiationDesc' },
  FEEDBACK: { name: 'contextFeedback', desc: 'contextFeedbackDesc' },
  CONFLICT_RESOLUTION: { name: 'contextConflictResolution', desc: 'contextConflictResolutionDesc' },
};

export function AdviceContextSelector({
  selectedContext,
  onContextSelect,
}: AdviceContextSelectorProps) {
  const { t } = useLanguage();

  return (
    <div className="luxury-card rounded-lg p-4 sm:p-8">
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        <div className="accent-bar" />
        <h2
          className="text-lg sm:text-xl font-medium text-[#1A1A1A]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t('selectSituation')}
        </h2>
      </div>
      <p className="text-xs sm:text-sm text-[#444444] mb-4 sm:mb-6 flex items-center gap-2">
        <span className="text-base sm:text-lg">💼</span>
        {t('whatSituationAdvice')}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        {contextOptions.map((option, index) => {
          const isSelected = selectedContext === option.key;
          const keys = contextTranslationKeys[option.key];
          return (
            <motion.button
              key={option.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.06,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                onContextSelect(isSelected ? null : option.key)
              }
              className={`
                relative flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-5 rounded-lg
                transition-all duration-500 text-center min-h-[80px] sm:min-h-0
                ${isSelected
                  ? 'bg-white shadow-md border-b-2'
                  : 'bg-[#F5F4F0] border border-black/5 hover:bg-white hover:shadow-sm'
                }
              `}
              style={{
                borderBottomColor: isSelected ? option.color : 'transparent',
              }}
              title={t(keys.desc)}
            >
              {/* Emoji */}
              <span className="text-xl sm:text-2xl">{option.emoji}</span>

              {/* Label */}
              <span
                className={`text-[10px] sm:text-xs font-medium leading-tight tracking-wide ${
                  isSelected ? 'text-[#1A1A1A]' : 'text-[#444444]'
                }`}
              >
                {t(keys.name)}
              </span>

              {/* Selected indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -top-1 -right-1"
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: option.color }}
                  />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Selected context description */}
      <AnimatePresence>
        {selectedContext && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-6 overflow-hidden"
          >
            <div
              className="p-5 rounded-lg border-l-2 bg-[#F5F4F0]"
              style={{
                borderLeftColor: contextOptions.find((o) => o.key === selectedContext)?.color,
              }}
            >
              <p className="text-sm text-[#444444] leading-relaxed">
                {t(contextTranslationKeys[selectedContext].desc)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdviceContextSelector;
