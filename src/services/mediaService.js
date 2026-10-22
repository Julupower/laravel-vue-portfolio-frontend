/**
 * Resolves media URLs returned from the backend API.
 * Returns a fallback image if no valid path is provided.
 */
const DEFAULT_PLACEHOLDER = '/assets/placeholder-project.svg';

export const resolveImageUrl = (path) => {
  if (!path) {
    return DEFAULT_PLACEHOLDER;
  }

  // Handle absolute external URLs
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Handle local path relative to backend root
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
};