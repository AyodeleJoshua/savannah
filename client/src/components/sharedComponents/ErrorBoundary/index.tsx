import { Component, type ReactNode } from 'react';
import styles from './styles.module.scss';

interface IErrorBoundaryProps {
	children: ReactNode;
}

interface IErrorBoundaryState {
	hasError: boolean;
	error?: Error;
	errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
	constructor(props: IErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): IErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		console.error('Error caught by ErrorBoundary:', error, errorInfo);
		
		this.setState({
			error,
			errorInfo,
		});
	}

	handleRetry = (): void => {
		this.setState({ hasError: false, error: undefined, errorInfo: undefined });
	};

	render(): ReactNode {
		if (this.state.hasError) {
			return (
				<div className={styles['error-boundary__container']}>
					<div className={styles['error-boundary__content']}>
						<div className={styles['error-boundary__icon']}>
							⚠️
						</div>
						<h1 className={styles['error-boundary__title']}>
							Something went wrong
						</h1>
						<p className={styles['error-boundary__message']}>
							We're sorry, but something unexpected happened. 
							Please try refreshing the page or contact support if the problem persists.
						</p>
						<div className={styles['error-boundary__actions']}>
							<button 
								onClick={this.handleRetry}
								className={`${styles['error-boundary__button']} ${styles['error-boundary__button--retry']}`}
							>
								Try Again
							</button>
							<button 
								onClick={() => window.location.reload()}
								className={`${styles['error-boundary__button']} ${styles['error-boundary__button--refresh']}`}
							>
								Refresh Page
							</button>
						</div>
						{process.env.NODE_ENV === 'development' && this.state.error && (
							<details className={styles['error-boundary__details']}>
								<summary>Error Details (Development)</summary>
								<pre className={styles['error-boundary__stack']}>
									{this.state.error.toString()}
									{this.state.errorInfo?.componentStack}
								</pre>
							</details>
						)}
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary; 