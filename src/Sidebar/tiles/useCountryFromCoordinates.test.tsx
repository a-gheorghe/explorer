import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useCountryFromCoordinates } from './useCountryFromCoordinates';
import type { ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const createWrapper = (client: QueryClient) => {
  return ({ children }: { children: ReactNode }) => {
    return (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
  };
};

describe('useCountryFromCoordinates', () => {
  let queryClient: QueryClient;
  let fetchSpy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    queryClient = new QueryClient();
    fetchSpy = vi.spyOn(global, 'fetch');
  });

  afterEach(() => {
    queryClient.clear();
    fetchSpy.mockRestore();
  });

  it('should not fetch country data if no coordinates are provided', () => {
    const wrapper = createWrapper(queryClient);
    const { result } = renderHook(
      () => useCountryFromCoordinates(undefined, undefined),
      { wrapper }
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('should fetch country data if coordinates are provided', async () => {
    const wrapper = createWrapper(queryClient);
    const mockResponse: Partial<Response> = {
      ok: true,
      json: async () =>
        Promise.resolve({ address: { country: 'Norway', country_code: 'no' } }),
    };

    fetchSpy.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(
      () => useCountryFromCoordinates(20.123456, 50.123456),
      { wrapper }
    );
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('lat=20.123456&lon=50.123456')
    );
    expect(result.current.data).toStrictEqual({ name: 'Norway', code: 'no' });
  });
  it('should not fetch the country again if the coordinates are the same', async () => {
    const wrapper = createWrapper(queryClient);
    const mockResponse: Partial<Response> = {
      ok: true,
      json: async () =>
        Promise.resolve({ address: { country: 'Norway', country_code: 'no' } }),
    };

    fetchSpy.mockResolvedValueOnce(mockResponse);
    const { result } = renderHook(
      () => useCountryFromCoordinates(20.123456, 50.123456),
      { wrapper }
    );
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('lat=20.123456&lon=50.123456')
    );
    expect(result.current.data).toStrictEqual({ name: 'Norway', code: 'no' });

    const { result: result2 } = renderHook(
      () => useCountryFromCoordinates(20.123456, 50.123456),
      { wrapper }
    );
    expect(result2.current.isLoading).toBe(false);
    expect(result2.current.data).toStrictEqual({ name: 'Norway', code: 'no' });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
  it('should do a new fetch if the coordinates are different even if the country is the same', async () => {
    const wrapper = createWrapper(queryClient);
    const mockResponse: Partial<Response> = {
      ok: true,
      json: async () =>
        Promise.resolve({ address: { country: 'Norway', country_code: 'no' } }),
    };

    fetchSpy.mockResolvedValueOnce(mockResponse);
    fetchSpy.mockResolvedValueOnce(mockResponse);
    const { result } = renderHook(
      () => useCountryFromCoordinates(20.123456, 50.123456),
      { wrapper }
    );
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('lat=20.123456&lon=50.123456')
    );
    expect(result.current.data).toStrictEqual({ name: 'Norway', code: 'no' });

    const { result: result2 } = renderHook(
      () => useCountryFromCoordinates(30.123456, 60.123456),
      { wrapper }
    );
    expect(result2.current.isLoading).toBe(true);
    await waitFor(() => expect(result2.current.isLoading).toBe(false));

    expect(result2.current.data).toStrictEqual({ name: 'Norway', code: 'no' });
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });
});
