import { describe, it, expect, beforeEach } from 'vitest';
import router from '@/router';

describe('Router Configuration', () => {
  beforeEach(async () => {
    await router.push('/');
    await router.isReady();
  });

  it('resolves the home path to the project list view', async () => {
    expect(router.currentRoute.value.name).toBe('home');
  });

  it('resolves the dynamic project detail path and passes the slug prop', async () => {
    await router.push('/projects/enterprise-app');
    await router.isReady();

    expect(router.currentRoute.value.name).toBe('project-detail');
    expect(router.currentRoute.value.params.slug).toBe('enterprise-app');
  });

  it('resolves unhandled paths to the not-found view', async () => {
    await router.push('/non-existent-route');
    await router.isReady();

    expect(router.currentRoute.value.name).toBe('not-found');
  });
});