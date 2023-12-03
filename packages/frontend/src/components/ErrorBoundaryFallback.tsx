import type { FallbackProps } from "react-error-boundary";

export function ErrorBoundaryFallback({ error }: FallbackProps) {
  return (
    <div className="flex flex-col items-start p-10">
      <h1 className="mb-4 text-3xl">Произошла неожиданная ошибка!</h1>
      <h3 className="mb-2 text-2xl">Детали</h3>
      <p className="mb-2">
        <code>"{String(error)}"</code>.
      </p>

      {error instanceof Error && Boolean(error.stack) && (
        <pre className="max-w-full overflow-scroll text-sm">{error.stack}</pre>
      )}

      <a href="/" className="btn mt-4">
        На главную
      </a>
    </div>
  );
}
