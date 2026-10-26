import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
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
  });

  it('renders loading state initially', () => {
    vi.stubGlobal('fetch', vi.fn().mockImplementation(() => new Promise(() => {})));

    const wrapper = mount(ProjectDetailView, {
      props: { slug: 'test-project' },
      global: {
        stubs: {
          RouterLink: { template: '<a><slot /></a>' }
        }
      }
    });

    expect(wrapper.text()).toContain('Loading project details...');
  });

  it('renders project details successfully when fetch succeeds', async () => {
    const mockProject = {
      title: 'Enterprise Vue App',
      summary: 'A robust portfolio solution.',
      content: 'Detailed description of the application architecture.',
      image_url: 'http://localhost/storage/test.jpg',
      tech_stack: ['Vue 3', 'Laravel']
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockProject })
    }));

    const wrapper = mount(ProjectDetailView, {
      props: { slug: 'enterprise-vue-app' },
      global: {
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
      ok: false,
      status: 404
    }));

    mount(ProjectDetailView, {
      props: { slug: 'non-existent-project' },
      global: {
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