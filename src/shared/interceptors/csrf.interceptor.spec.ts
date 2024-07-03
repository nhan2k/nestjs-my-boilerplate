import { CsrfInterceptor } from './csrf.interceptor';

describe('CsrfInterceptor', () => {
  it('should be defined', () => {
    expect(new CsrfInterceptor()).toBeDefined();
  });
});
