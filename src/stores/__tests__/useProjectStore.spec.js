import { setActivePinia, createPinia } from 'pinia';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { useProjectStore } from '@/stores/useProjectStore';

describe('useProjectStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('fetches and stores projects successfully', async () => {
    const mockNodes = [
      { slug: 'project-a', title: 'Project A', content: 'Content A', excerpt: 'Summary A', featuredImage: { node: { sourceUrl: 'http://example.com/a.jpg' } } },
      { slug: 'project-b', title: 'Project B', content: 'Content B', excerpt: 'Summary B', featuredImage: { node: { sourceUrl: 'http://example.com/b.jpg' } } }
    ];

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          projects: {
            nodes: mockNodes
          }
        }
      })
    }));

    const store = useProjectStore();
    await store.fetchProjects();

    expect(store.projects.length).toBe(2);
    expect(store.projects[0].title).toBe('Project A');
    expect(store.loading).toBe(false);
  });

  it('returns cached project if already fetched', async () => {
    const store = useProjectStore();
    store.projects = [{ slug: 'cached-project', title: 'Cached Project', content: '...', summary: '...', image_url: '...' }];

    const project = await store.fetchProjectBySlug('cached-project');

    expect(project.title).toBe('Cached Project');
    expect(store.loading).toBe(false);
  });
});