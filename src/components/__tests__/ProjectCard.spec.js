import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProjectCard from '../ProjectCard.vue';

describe('ProjectCard.vue', () => {
  const mockProject = {
    id: 1,
    title: 'Enterprise Portfolio Engine',
    slug: 'enterprise-portfolio-engine',
    description: 'A decoupled Laravel and Vue 3 showcase application.',
    image_path: 'http://localhost/storage/projects/demo.jpg',
    tech_stack: ['Laravel', 'Vue.js', 'Tailwind CSS']
  };

  const globalOptions = {
    stubs: {
      RouterLink: {
        template: '<a><slot /></a>'
      }
    }
  };

  it('renders project title correctly', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject },
      global: globalOptions
    });

    expect(wrapper.text()).toContain('Enterprise Portfolio Engine')
  });

  it('renders tech stack badges correctly', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject },
      global: globalOptions
    });

    expect(wrapper.text()).toContain('Laravel');
    expect(wrapper.text()).toContain('Vue.js');
    expect(wrapper.text()).toContain('Tailwind CSS');
  });
});