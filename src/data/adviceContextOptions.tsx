import {
  Lightbulb,
  MessageSquare,
  FileText,
  Award,
  Users,
  Handshake,
  MessageCircle,
  Scale,
} from 'lucide-react';
import type { AdviceContext } from '../types';

export interface ContextOption {
  key: AdviceContext;
  icon: React.ReactNode;
  color: string;
  emoji: string;
}

export const contextOptions: ContextOption[] = [
  {
    key: 'MEETING_IDEA',
    icon: <Lightbulb className="w-5 h-5" strokeWidth={1.5} />,
    color: '#B8956A',
    emoji: '💡',
  },
  {
    key: 'DISAGREE_BOSS',
    icon: <MessageSquare className="w-5 h-5" strokeWidth={1.5} />,
    color: '#C4886B',
    emoji: '🗣️',
  },
  {
    key: 'REPORTING',
    icon: <FileText className="w-5 h-5" strokeWidth={1.5} />,
    color: '#7D8471',
    emoji: '📋',
  },
  {
    key: 'REWARD_RECOGNITION',
    icon: <Award className="w-5 h-5" strokeWidth={1.5} />,
    color: '#C9A227',
    emoji: '🏆',
  },
  {
    key: 'TEAM_COLLABORATION',
    icon: <Users className="w-5 h-5" strokeWidth={1.5} />,
    color: '#8B7355',
    emoji: '🤝',
  },
  {
    key: 'NEGOTIATION',
    icon: <Handshake className="w-5 h-5" strokeWidth={1.5} />,
    color: '#9D7E57',
    emoji: '🎯',
  },
  {
    key: 'FEEDBACK',
    icon: <MessageCircle className="w-5 h-5" strokeWidth={1.5} />,
    color: '#6B7B8C',
    emoji: '💬',
  },
  {
    key: 'CONFLICT_RESOLUTION',
    icon: <Scale className="w-5 h-5" strokeWidth={1.5} />,
    color: '#722F37',
    emoji: '⚖️',
  },
];
