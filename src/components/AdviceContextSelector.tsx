import { motion, AnimatePresence } from 'framer-motion';
import type { AdviceContext } from '../types';
import { useLanguage } from '../i18n';
import type { TranslationKeys } from '../i18n/translations';

interface ContextOption {
  key: AdviceContext;
  nameKey: keyof TranslationKeys;
  descKey: keyof TranslationKeys;
  icon: React.ReactNode;
  color: string;
  emoji: string;
}

const contextOptions: ContextOption[] = [
  {
    key: 'MEETING_IDEA',
    nameKey: 'contextMeetingIdea',
    descKey: 'contextMeetingIdeaDesc',
    icon: <Lightbulb className="w-5 h-5" strokeWidth={1.5} />,
    color: 'var(--color-brass)',
    emoji: '💡',
  },
  {
    key: 'DISAGREE_BOSS',
    nameKey: 'contextDisagreeBoss',
    descKey: 'contextDisagreeBossDesc',
    icon: <MessageSquare className="w-5 h-5" strokeWidth={1.5} />,
    color: 'var(--color-coral)',
    emoji: '🗣️',
  },
  {
    key: 'REPORTING',
    nameKey: 'contextReporting',
    descKey: 'contextReportingDesc',
    icon: <FileText className="w-5 h-5" strokeWidth={1.5} />,
    color: 'var(--color-sage)',
    emoji: '📋',
  },
  {
    key: 'REWARD_RECOGNITION',
    nameKey: 'contextRewardRecognition',
    descKey: 'contextRewardRecognitionDesc',
    icon: <Award className="w-5 h-5" strokeWidth={1.5} />,
    color: 'var(--color-brass-light)',
    emoji: '🏆',
  },
  {
    key: 'TEAM_COLLABORATION',
    nameKey: 'contextTeamCollaboration',
    descKey: 'contextTeamCollaborationDesc',
    icon: <Users className="w-5 h-5" strokeWidth={1.5} />,
    color: 'var(--color-brass)',
    emoji: '🤝',
  },
  {
    key: 'NEGOTIATION',
    nameKey: 'contextNegotiation',
    descKey: 'contextNegotiationDesc',
    icon: <Handshake className="w-5 h-5" strokeWidth={1.5} />,
    color: 'var(--color-brass)',
    emoji: '🎯',
  },
  {
    key: 'FEEDBACK',
    nameKey: 'contextFeedback',
    descKey: 'contextFeedbackDesc',
    icon: <MessageCircle className="w-5 h-5" strokeWidth={1.5} />,
    color: 'var(--color-brass-light)',
    emoji: '💬',
  },
  {
    key: 'CONFLICT_RESOLUTION',
    nameKey: 'contextConflictResolution',
    descKey: 'contextConflictResolutionDesc',
    icon: <Scale className="w-5 h-5" strokeWidth={1.5} />,
    color: 'var(--color-coral)',
    emoji: '⚖️',
  },
];

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
    <div className="glass-card rounded-lg p-4 sm:p-8">
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-3">
          <h2
            className="text-lg sm:text-2xl font-bold text-[var(--color-brass)]"
            style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
          >
            {t('selectSituation')}
          </h2>
        </div>
        <div className="w-16 h-[1px] bg-gradient-to-r from-[var(--color-brass)] to-transparent mt-1" />
      </div>
      
      <p className="text-xs sm:text-sm text-[var(--color-ivory-muted)] mb-4 sm:mb-6 flex items-center gap-2">
        <span className="text-base sm:text-lg">💼</span>
        {t('whatSituationAdvice')}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        {contextOptions.map((option, index) => {
          const isSelected = selectedContext === option.key;
          const _keys = contextTranslationKeys[option.key];
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
                transition-all duration-500 text-center min-h-[80px] sm:min-h-0 cursor-pointer
                ${isSelected
                  ? 'bg-white/10 shadow-lg border-b-2 border-[var(--color-brass)]'
                  : 'bg-white/5 border border-white/5 hover:bg-white/10 hover:shadow-sm'
                }
              `}
              title={t(option.descKey)}
            >
              {/* Emoji */}
              <span className="text-xl sm:text-2xl">{option.emoji}</span>

              {/* Label */}
              <span
                className={`text-[10px] sm:text-xs font-semibold leading-tight tracking-wide ${
                  isSelected ? 'text-[var(--color-ivory)]' : 'text-[var(--color-ivory-muted)]'
                }`}
              >
                {t(option.nameKey)}
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
              className="p-5 rounded-lg border-l-2 bg-white/5 border-l-[var(--color-brass)]"
            >
              <p className="text-sm text-[var(--color-ivory-muted)] leading-relaxed">
                {t(contextOptions.find((o) => o.key === selectedContext)!.descKey)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdviceContextSelector;
