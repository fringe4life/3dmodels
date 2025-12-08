refactor:
♻️ Renamed not-found component to unsuccessful-state for unified error/not-found handling
🎨 Added isError prop with conditional red styling via data-error attribute
🔧 Changed links prop to action (ReactNode) for flexible button/link rendering
✨ Added MODELS_ERROR_LIST constant with generic error troubleshooting guidance
🎯 Updated all error boundaries to use UnsuccessfulState with error guidance
📝 Added data-error custom Tailwind variant for error state styling

fix:
🐛 Fixed getCategoryBySlug to throw errors instead of returning null for database failures
🔧 Ensured all error.tsx files can be properly triggered by database/connection errors

docs:
📝 Updated README with unsuccessful-state component documentation
📝 Added error boundary documentation for model detail pages
