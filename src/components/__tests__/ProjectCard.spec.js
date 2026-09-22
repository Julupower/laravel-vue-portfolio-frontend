import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCard from '../ProjectCard.vue'

describe('ProjectCard.vue', () => {
  const mockProject = {
    id: 1,
    title: 'Enterprise Portfolio Engine',
    summary: 'A decoupled Laravel and Vue 3 showcase application.',
    image_url: 'http://localhost/storage/projects/demo.jpg',
    tech_stack: ['Laravel', 'Vue.js', 'Tailwind CSS']
  };

  const globalOptions = {
    stubs: {
      RouterLink: {
        template: '<a><slot /></a>'
      }
    }
  };

  it('renders project title and summary correctly', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject },
      global: globalOptions
    })

    expect(wrapper.text()).toContain('Enterprise Portfolio Engine')
    expect(wrapper.text()).toContain('A decoupled Laravel and Vue 3 showcase application.')
  });

  it('renders tech stack badges correctly', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject },
      global: globalOptions
    });

    const badges = wrapper.findAll('span')
    expect(badges.length).toBe(3)
    expect(badges[0].text()).toBe('Laravel')
    expect(badges[1].text()).toBe('Vue.js')
    expect(badges[2].text()).toBe('Tailwind CSS')
  });
});