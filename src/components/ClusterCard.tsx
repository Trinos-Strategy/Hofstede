import type { ClusterType } from '../types';
import { clusterInfo, getCountriesByCluster } from '../data/countries';
import { useLanguage } from '../i18n';
import type { TranslationKeys } from '../i18n/translations';

interface ClusterCardProps {
  cluster: ClusterType;
  isSelected: boolean;
  onClick?: (cluster: ClusterType) => void;
  onInfoClick?: (cluster: ClusterType) => void;
  bannerArt?: string;
}

const defaultBannerArt: Record<ClusterType, string> = {
  contest: '/art/banner-contest.webp',
  network: '/art/banner-network.webp',
  family: '/art/banner-family.webp',
  pyramid: '/art/banner-pyramid.webp',
  solarSystem: '/art/banner-solar.webp',
  machine: '/art/banner-machine.webp',
};

const clusterTranslationKeys: Record<ClusterType, { name: keyof TranslationKeys; desc: keyof TranslationKeys }> = {
  contest: { name: 'clusterContest', desc: 'descContest' },
  network: { name: 'clusterNetwork', desc: 'descNetwork' },
  family: { name: 'clusterFamily', desc: 'descFamily' },
  pyramid: { name: 'clusterPyramid', desc: 'descPyramid' },
  solarSystem: { name: 'clusterSolarSystem', desc: 'descSolarSystem' },
  machine: { name: 'clusterMachine', desc: 'descMachine' },
};

export function ClusterCard({
  cluster,
  isSelected,
  onClick: _onClick,
  onInfoClick,
  bannerArt,
}: ClusterCardProps) {
  const { t, isKorean } = useLanguage();
  const info = clusterInfo[cluster];
  const countriesInCluster = getCountriesByCluster(cluster);
  const translationKeys = clusterTranslationKeys[cluster];
  const artSrc = bannerArt || defaultBannerArt[cluster];

  const handleOpenModal = () => {
    if (onInfoClick) {
      onInfoClick(cluster);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpenModal();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleOpenModal}
      onDoubleClick={handleOpenModal}
      onKeyDown={handleKeyDown}
      className={`
        group relative aspect-[16/10] overflow-hidden rounded-xl border border-[var(--surface-border)]
        cursor-pointer hover:border-[var(--color-brass)]/50 transition-colors duration-300
        ${isSelected ? 'ring-1 ring-[var(--color-brass)]' : ''}
      `}
    >
      {/* Background image */}
      <img
        src={artSrc}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 pointer-events-none"
      />

      {/* Dim/blur overlay: deep bottom vertical gradient + subtle blur */}
      <div className="banner-scrim" aria-hidden="true" />

      {/* Top text */}
      <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 z-10 pointer-events-none">
        <h3
          className="text-base sm:text-lg font-bold text-[var(--color-ivory)] [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_0_12px_rgba(10,14,26,0.8)]"
          style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.04em' }}
        >
          {t(translationKeys.name)}
        </h3>
        <p className="text-[10px] tracking-widest uppercase text-[var(--color-brass-light)] font-medium mt-0.5">
          {isKorean ? info.name : info.nameKo}
        </p>
      </div>

      {/* Bottom country pills */}
      <div className="absolute bottom-0 left-0 right-0 p-3 z-10 flex flex-wrap gap-1 pointer-events-none">
        {countriesInCluster.slice(0, 4).map((country) => (
          <span
            key={country.code}
            className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-[var(--color-ivory)] border border-white/10 font-medium"
          >
            {isKorean ? country.nameKo : country.name}
          </span>
        ))}
        {countriesInCluster.length > 4 && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-[var(--color-brass-light)] border border-white/10 font-medium">
            +{countriesInCluster.length - 4}
          </span>
        )}
      </div>
    </div>
  );
}
