import type { FallbackProps } from 'react-error-boundary';

export function ErrorBoundaryFallback({ error }: FallbackProps) {
  return (
    <div className="p-10 flex flex-col items-start">
      <h1 className="text-3xl mb-4">Произошла неожиданная ошибка!</h1>
      <h3 className="text-2xl mb-2">Детали</h3>
      <p className="mb-2">
        <code>"{String(error)}"</code>.
      </p>

      {error instanceof Error && Boolean(error.stack) && (
        <pre className="text-sm max-w-full overflow-scroll">{error.stack}</pre>
      )}

      <a href="/" className="btn mt-4">
        На главную
      </a>
    </div>
  );
}
