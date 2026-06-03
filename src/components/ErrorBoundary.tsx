import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * React Error Boundary — class component required for catching render errors.
 * Shows a friendly fallback UI with KO/EN messages and a reload button.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Read language directly from localStorage since hooks aren't available in class components
      let isKorean = true;
      try {
        const stored = localStorage.getItem('hofstede-language');
        isKorean = stored !== 'en';
      } catch {
        // ignore
      }

      return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--ivory-light)' }}>
          <div className="luxury-card rounded-lg p-8 sm:p-12 max-w-md w-full text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2
              className="text-xl font-medium text-[#1A1A1A] mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {isKorean ? '문제가 발생했습니다' : 'Something went wrong'}
            </h2>
            <p className="text-sm text-[#444444] mb-6 leading-relaxed">
              {isKorean
                ? '앱 실행 중 오류가 발생했습니다. 페이지를 새로고침해 보세요.'
                : 'An error occurred while running the app. Please reload the page.'}
            </p>
            {this.state.error && (
              <div className="mb-6 p-3 bg-[#F5F4F0] rounded-lg text-left overflow-auto">
                <code className="text-[11px] text-[#555555]">
                  {this.state.error.message}
                </code>
              </div>
            )}
            <button
              onClick={this.handleReload}
              className="btn-luxury btn-gold"
            >
              {isKorean ? '새로고침' : 'Reload'}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
