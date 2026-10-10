import { Component, type ReactNode } from 'react';

interface Props {
  fallback: ReactNode;
  onError: () => void;
  children: ReactNode;
}

interface State {
  failed: boolean;
}

/** Shader compile errors or a failed chunk download degrade to the static artwork. */
export class SceneErrorBoundary extends Component<Props, State> {
  override state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  override componentDidCatch() {
    this.props.onError();
  }

  override render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
