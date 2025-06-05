import * as React from 'react';

type ErrorBoundaryProps = {
    fallback: React.ReactNode;
    captureOwnerStack: () => string;
    children: React.ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
    readonly state: ErrorBoundaryState = { hasError: false };
    constructor(props: ErrorBoundaryProps) {
        super(props);
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        console.error(`derived state:`, error);
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error(`component did catch:`, error);
        console.error(`component stack:`, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return this.props.fallback;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
