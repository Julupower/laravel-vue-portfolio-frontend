import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import router from '@/router'

describe('Router Configuration', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('resolves the home path to the home view', async () => {
    await router.push('/')
    await router.isReady()
    expect(router.currentRoute.value.name).toBe('home')
  })

  it('resolves the dynamic project detail path and passes the slug prop', async () => {
    await router.push('/projects/test-slug')
    await router.isReady()
    expect(router.currentRoute.value.name).toBe('project-detail')
    expect(router.currentRoute.value.params.slug).toBe('test-slug')
  })

  it('resolves unhandled paths to the not-found view', async () => {
    await router.push('/non-existent-path')
    await router.isReady()
    expect(router.currentRoute.value.name).toBe('not-found')
  })
})