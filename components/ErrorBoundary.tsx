import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-[#0C1115] text-white">
          <div className="text-center">
            <span className="material-symbols-outlined text-4xl text-red-500 mb-4">error</span>
            <h1 className="text-xl font-bold">Algo deu errado.</h1>
            <button 
                onClick={() => window.location.reload()}
                className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/20"
            >
                Recarregar App
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

export default ErrorBoundary;