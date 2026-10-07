import { setActivePinia, createPinia } from 'pinia';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { useProjectStore } from '@/stores/useProjectStore';

describe('useProjectStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('fetches and stores projects successfully', async () => {
    const mockProjects = [
      { id: 1, title: 'Project A', slug: 'project-a' },
      { id: 2, title: 'Project B', slug: 'project-b' }
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockProjects })
    });

    const store = useProjectStore();
    await store.fetchProjects();

    expect(store.projects.length).toBe(2);
    expect(store.projects[0].title).toBe('Project A');
    expect(store.loading).toBe(false);
  });

  it('returns cached project if already fetched', async () => {
    const store = useProjectStore();
    store.projects = [{ id: 1, title: 'Cached Project', slug: 'cached-project' }];

    const project = await store.fetchProjectBySlug('cached-project');

    expect(project.title).toBe('Cached Project');
    expect(store.loading).toBe(false);
  });
});