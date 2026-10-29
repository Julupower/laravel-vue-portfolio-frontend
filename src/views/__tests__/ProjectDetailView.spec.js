import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import ProjectDetailView from '@/views/ProjectDetailView.vue';

// Mock vue-router and globally stub RouterLink
const mockReplace = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    replace: mockReplace
  })
}));

describe('ProjectDetailView.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
    setActivePinia(createPinia());
  });

  it('renders loading state initially', async () => {
    vi.stubGlobal('fetch', vi.fn().mockImplementation(() => new Promise(() => {})));

    const wrapper = mount(ProjectDetailView, {
      props: { slug: 'test-project' },
      global: {
        plugins: [createPinia()],
        stubs: {
          RouterLink: { template: '<a><slot /></a>' }
        }
      }
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Loading project details...');
  });

  it('renders project details successfully when fetch succeeds', async () => {
    const mockNode = {
      slug: 'enterprise-vue-app',
      title: 'Enterprise Vue App',
      content: 'Detailed description of the application architecture.',
      excerpt: 'A robust portfolio solution.',
      featuredImage: { node: { sourceUrl: 'http://localhost/storage/test.jpg' } },
      techStack: ['Vue 3', 'Laravel']
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          project: mockNode
        }
      })
    }));

    const wrapper = mount(ProjectDetailView, {
      props: { slug: 'enterprise-vue-app' },
      global: {
        plugins: [createPinia()],
        stubs: {
          RouterLink: { template: '<a><slot /></a>' }
        }
      }
    });

    await vi.waitFor(() => {
      expect(wrapper.text()).toContain('Enterprise Vue App');
    });

    expect(wrapper.text()).toContain('A robust portfolio solution.');
    expect(wrapper.text()).toContain('Vue 3');
    expect(wrapper.text()).toContain('Laravel');
  });

  it('redirects to not-found when project is missing (404)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          project: null
        }
      })
    }));

    mount(ProjectDetailView, {
      props: { slug: 'non-existent-project' },
      global: {
        plugins: [createPinia()],
        stubs: {
          RouterLink: { template: '<a><slot /></a>' }
        }
      }
    });

    await vi.waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith({ name: 'not-found' });
    });
  });
});