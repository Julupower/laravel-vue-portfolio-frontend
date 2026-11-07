import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import ProjectDetailView from '@/views/ProjectDetailView.vue';

// Mock vue-router hooks
const mockReplace = vi.fn();
vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { slug: 'enterprise-vue-app' }
  }),
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
      props: { slug: 'enterprise-vue-app' },
      global: {
        plugins: [createPinia()],
        stubs: {
          RouterLink: { template: '<a><slot /></a>' }
        }
      }
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Loading');
  });

  it('renders project details successfully when fetch succeeds', async () => {
    const mockProject = {
      slug: 'enterprise-vue-app',
      title: 'Enterprise Vue App',
      content: 'Detailed description of the application architecture.',
      summary: 'A robust portfolio solution.',
      excerpt: 'A robust portfolio solution.',
      image_url: 'http://localhost/storage/test.jpg',
      tech_stack: ['Vue 3', 'Laravel']
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockProject
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

  it('renders error message when project is missing (404)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 404
    }));

    const wrapper = mount(ProjectDetailView, {
      props: { slug: 'non-existent-project' },
      global: {
        plugins: [createPinia()],
        stubs: {
          RouterLink: { template: '<a><slot /></a>' }
        }
      }
    });

    await vi.waitFor(() => {
      expect(wrapper.text()).toContain('Failed to fetch project details.');
    });
  });
});