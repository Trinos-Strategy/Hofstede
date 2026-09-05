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

const clusterColorMap: Record<ClusterType, string> = {
  contest: 'var(--contest-color)',
  network: 'var(--network-color)',
  family: 'var(--family-color)',
  pyramid: 'var(--pyramid-color)',
  solarSystem: 'var(--solar-color)',
  machine: 'var(--machine-color)',
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
        group cluster-banner-card
        hover:border-[var(--color-brass)]/50
        ${isSelected ? 'ring-1 ring-[var(--color-brass)]' : ''}
      `}
    >
      {/* 4px top accent color bar */}
      <div
        className={`cluster-card-color-bar cluster-bar-${cluster}`}
        style={{ backgroundColor: clusterColorMap[cluster] }}
        aria-hidden="true"
      />

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

      {/* Solid dark plate attached to the top */}
      <div className="cluster-title-plate">
        <h3 className="cluster-banner-title">
          {t(translationKeys.name)}
        </h3>
        <p className="cluster-banner-subtitle">
          {isKorean ? info.name : info.nameKo}
        </p>
      </div>

      {/* Bottom country pills — hidden on mobile, visible on desktop */}
      <div className="hidden sm:flex absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10 flex-wrap gap-1.5 pointer-events-none">
        {countriesInCluster.slice(0, 4).map((country) => (
          <span
            key={country.code}
            className="cluster-country-pill"
          >
            {isKorean ? country.nameKo : country.name}
          </span>
        ))}
        {countriesInCluster.length > 4 && (
          <span className="cluster-country-pill-more">
            +{countriesInCluster.length - 4}
          </span>
        )}
      </div>
    </div>
  );
}
