import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe2, BarChart3, Table, MessageSquare, Layers } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

interface HamburgerMenuProps {
  onScrollToSection: (sectionId: string) => void;
  onToggleSidebar: () => void;
}

export function HamburgerMenu({ onScrollToSection, onToggleSidebar }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const menuItems: MenuItem[] = [
    {
      id: 'country-selector',
      label: '국가 선택',
      icon: <Globe2 className="w-5 h-5" strokeWidth={1.5} />,
      action: () => {
        onScrollToSection('country-selector');
        setIsOpen(false);
      },
    },
    {
      id: 'dimension-comparison',
      label: '문화 차원 비교',
      icon: <BarChart3 className="w-5 h-5" strokeWidth={1.5} />,
      action: () => {
        onScrollToSection('dimension-comparison');
        setIsOpen(false);
      },
    },
    {
      id: 'comparison-table',
      label: '차원별 비교',
      icon: <Table className="w-5 h-5" strokeWidth={1.5} />,
      action: () => {
        onScrollToSection('comparison-table');
        setIsOpen(false);
      },
    },
    {
      id: 'bilateral-advice',
      label: '양국 간 조언',
      icon: <MessageSquare className="w-5 h-5" strokeWidth={1.5} />,
      action: () => {
        onScrollToSection('bilateral-advice');
        setIsOpen(false);
      },
    },
    {
      id: 'cluster-sidebar',
      label: '문화 클러스터 정보',
      icon: <Layers className="w-5 h-5" strokeWidth={1.5} />,
      action: () => {
        onToggleSidebar();
        setIsOpen(false);
      },
    },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when menu is open
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

  // Menu drawer content - rendered via portal
  const menuDrawer = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            style={{ zIndex: 9998 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Full Screen on Mobile, Side Drawer on larger screens */}
          <motion.div
            ref={menuRef}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
              opacity: { duration: 0.2 }
            }}
            className="fixed inset-0 sm:inset-auto sm:top-0 sm:right-0 sm:h-full sm:w-80 bg-white shadow-2xl overflow-y-auto"
            style={{
              zIndex: 9999,
              boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.12)',
            }}
          >
            {/* Drawer Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-black/5 p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #B8956A, #9D7E57)' }}
                  >
                    <Globe2 className="w-4 h-4 text-white" strokeWidth={1.5} />
                  </div>
                  <span
                    className="text-base font-medium text-[#1A1A1A]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    메뉴
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-[#F5F4F0] transition-colors duration-300"
                  aria-label="메뉴 닫기"
                >
                  <X className="w-5 h-5 text-[#444444]" strokeWidth={1.5} />
                </motion.button>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="p-4 sm:p-5">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.05 + 0.1,
                      duration: 0.3,
                    }}
                  >
                    <button
                      onClick={item.action}
                      className="w-full flex items-center gap-4 p-4 min-h-[56px] rounded-xl text-left
                        hover:bg-gradient-to-r hover:from-[#FAFAF8] hover:to-[#F5F4F0]
                        border border-transparent hover:border-[#B8956A]/20
                        transition-all duration-300 group"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center
                          bg-[#F5F4F0] group-hover:bg-white
                          border border-black/5 group-hover:border-[#B8956A]/30
                          transition-all duration-300"
                      >
                        <span className="text-[#9D7E57] group-hover:text-[#B8956A] transition-colors duration-300">
                          {item.icon}
                        </span>
                      </div>
                      <span className="text-[#333333] group-hover:text-[#1A1A1A] font-medium transition-colors duration-300">
                        {item.label}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer in Drawer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 border-t border-black/5 bg-[#FAFAF8]">
              <p className="text-xs text-[#444444]/60 text-center tracking-wide">
                © 2026 Trinos Research Lab
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        ref={buttonRef}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-black/10 hover:border-[#B8956A] hover:bg-[#FAFAF8] transition-all duration-500"
        aria-label="메뉴 열기"
        aria-expanded={isOpen}
      >
        <Menu className="w-5 h-5 text-[#444444]" strokeWidth={1.5} />
      </motion.button>

      {/* Render menu drawer via portal to document.body */}
      {createPortal(menuDrawer, document.body)}
    </>
  );
}
