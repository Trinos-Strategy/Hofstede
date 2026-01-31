import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { ClusterType } from '../types';
import { clusterInfo, getCountriesByCluster } from '../data/countries';

interface ClusterDetailModalProps {
  cluster: ClusterType | null;
  isOpen: boolean;
  onClose: () => void;
}

// Cluster styles with unique colors
const clusterStyles: Record<ClusterType, {
  color: string;
  iconColor: string;
  lightBg: string;
  gradientBg: string;
}> = {
  contest: {
    color: '#7A5D2E',
    iconColor: '#D4A017',
    lightBg: 'rgba(212, 160, 23, 0.08)',
    gradientBg: 'linear-gradient(135deg, rgba(212, 160, 23, 0.15), rgba(255, 215, 0, 0.05))',
  },
  network: {
    color: '#2E6B5E',
    iconColor: '#1B9E77',
    lightBg: 'rgba(27, 158, 119, 0.08)',
    gradientBg: 'linear-gradient(135deg, rgba(27, 158, 119, 0.15), rgba(46, 107, 94, 0.05))',
  },
  family: {
    color: '#8B4513',
    iconColor: '#CD853F',
    lightBg: 'rgba(205, 133, 63, 0.08)',
    gradientBg: 'linear-gradient(135deg, rgba(205, 133, 63, 0.15), rgba(139, 69, 19, 0.05))',
  },
  pyramid: {
    color: '#8B2323',
    iconColor: '#C41E3A',
    lightBg: 'rgba(196, 30, 58, 0.08)',
    gradientBg: 'linear-gradient(135deg, rgba(196, 30, 58, 0.15), rgba(139, 35, 35, 0.05))',
  },
  solarSystem: {
    color: '#B8860B',
    iconColor: '#FFB300',
    lightBg: 'rgba(255, 179, 0, 0.08)',
    gradientBg: 'linear-gradient(135deg, rgba(255, 179, 0, 0.15), rgba(184, 134, 11, 0.05))',
  },
  machine: {
    color: '#4A5568',
    iconColor: '#5B7C99',
    lightBg: 'rgba(91, 124, 153, 0.08)',
    gradientBg: 'linear-gradient(135deg, rgba(91, 124, 153, 0.15), rgba(74, 85, 104, 0.05))',
  },
};

// Cluster characteristic values descriptions
const clusterCharacteristics: Record<ClusterType, { title: string; values: string[] }> = {
  contest: {
    title: '핵심 가치관',
    values: [
      '개인의 성취와 경쟁을 통한 성공 추구',
      '수평적이고 실력주의적인 관계',
      '변화와 혁신에 대한 개방성',
      '직접적이고 명확한 커뮤니케이션',
    ],
  },
  network: {
    title: '핵심 가치관',
    values: [
      '합의와 협력을 통한 의사결정',
      '평등과 개인 의견 존중',
      '삶의 질과 워라밸 중시',
      '간접적이고 조화로운 소통',
    ],
  },
  family: {
    title: '핵심 가치관',
    values: [
      '가족적 유대와 충성심 중시',
      '어른과 권위에 대한 존경',
      '관계 중심의 비즈니스',
      '유연하고 상황에 따른 규칙 적용',
    ],
  },
  pyramid: {
    title: '핵심 가치관',
    values: [
      '명확한 위계질서와 역할 구분',
      '집단의 조화와 안정 중시',
      '규칙과 절차에 대한 존중',
      '장기적 관계와 신뢰 구축',
    ],
  },
  solarSystem: {
    title: '핵심 가치관',
    values: [
      '제도적 권위와 전문성 존중',
      '개인의 역할과 책임 명확화',
      '공식적 절차와 규범 준수',
      '논리적이고 분석적인 접근',
    ],
  },
  machine: {
    title: '핵심 가치관',
    values: [
      '정확성과 효율성 추구',
      '체계적이고 예측 가능한 시스템',
      '기술과 전문 지식 중시',
      '명확한 책임과 결과 중심',
    ],
  },
};

export function ClusterDetailModal({ cluster, isOpen, onClose }: ClusterDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!cluster) return null;

  const info = clusterInfo[cluster];
  const style = clusterStyles[cluster];
  const characteristics = clusterCharacteristics[cluster];
  const countriesInCluster = getCountriesByCluster(cluster);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            style={{ zIndex: 9998 }}
            onClick={onClose}
          />

          {/* Modal - Full screen on mobile */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
            className="fixed inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
              sm:max-w-lg sm:w-[calc(100%-2rem)] sm:max-h-[90vh] h-full sm:h-auto overflow-y-auto
              bg-white sm:rounded-2xl shadow-2xl"
            style={{ zIndex: 9999 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with gradient background */}
            <div
              className="sticky top-0 p-4 sm:p-6 sm:rounded-t-2xl border-b border-black/5"
              style={{ background: style.gradientBg }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 sm:gap-4">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                    className="text-4xl sm:text-5xl"
                  >
                    {info.icon}
                  </motion.span>
                  <div>
                    <h2
                      className="text-lg sm:text-2xl font-semibold"
                      style={{ color: style.color, fontFamily: "'Playfair Display', serif" }}
                    >
                      {info.nameKo}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#555555] mt-0.5 sm:mt-1">{info.name}</p>
                    <p className="text-[10px] sm:text-xs text-[#777777] mt-0.5">{info.conceptKo}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={onClose}
                  className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/50 transition-colors duration-300"
                  aria-label="닫기"
                >
                  <X className="w-5 h-5 text-[#444444]" strokeWidth={1.5} />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h3
                  className="text-sm font-medium text-[#1A1A1A] mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  클러스터 설명
                </h3>
                <p className="text-sm text-[#444444] leading-relaxed">
                  {info.description}
                </p>
              </motion.div>

              {/* Characteristics */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3
                  className="text-sm font-medium text-[#1A1A1A] mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {characteristics.title}
                </h3>
                <ul className="space-y-2">
                  {characteristics.values.map((value, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + index * 0.05 }}
                      className="flex items-start gap-3 text-sm text-[#444444]"
                    >
                      <span
                        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: style.iconColor }}
                      />
                      {value}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Countries */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <h3
                  className="text-sm font-medium text-[#1A1A1A] mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  소속 국가 ({countriesInCluster.length}개국)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {countriesInCluster.map((country, index) => (
                    <motion.span
                      key={country.code}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.03 }}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium border shadow-sm"
                      style={{
                        backgroundColor: style.lightBg,
                        color: style.color,
                        borderColor: `${style.iconColor}30`,
                      }}
                    >
                      {country.nameKo}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 pt-0 pb-6 sm:pb-6">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full py-3.5 sm:py-3 min-h-[48px] rounded-xl font-medium text-sm text-white transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${style.iconColor}, ${style.color})`,
                  boxShadow: `0 4px 12px ${style.iconColor}40`,
                }}
              >
                닫기
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
