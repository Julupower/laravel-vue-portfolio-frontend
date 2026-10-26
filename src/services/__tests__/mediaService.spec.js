import { describe, it, expect } from 'vitest';
import { resolveImageUrl } from '../mediaService.js';

describe('mediaService', () => {
  it('returns default placeholder when path is null or undefined', () => {
    expect(resolveImageUrl(null)).toBe('/assets/placeholder-project.svg');
    expect(resolveImageUrl('')).toBe('/assets/placeholder-project.svg');
  });

  it('preserves full absolute HTTP/HTTPS URLs', () => {
    const externalUrl = 'https://images.unsplash.com/photo-1';
    expect(resolveImageUrl(externalUrl)).toBe(externalUrl);
  });

  it('appends relative relative media paths to base URL', () => {
    const relativePath = 'storage/media/project1.jpg';
    const result = resolveImageUrl(relativePath);
    expect(result).toContain(relativePath);
  });
});