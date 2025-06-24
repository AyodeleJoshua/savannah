import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import useArchiveRecommendation from '../useArchiveRecommendation';
import * as recommendationsService from '../../services/recommendations';
import toast from 'react-hot-toast';

vi.mock('../../services/recommendations', () => ({
  archiveRecommendation: vi.fn(),
}));

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useArchiveRecommendation', () => {
  const mockArchiveRecommendation = vi.mocked(recommendationsService.archiveRecommendation);
  const mockToast = vi.mocked(toast);

  beforeEach(() => {
    vi.clearAllMocks();
    mockArchiveRecommendation.mockResolvedValue({ success: true });
  });

  afterEach(() => {
    vi.clearAllMocks();
    consoleSpy.mockClear();
  });

  describe('when isArchived is false (archiving)', () => {
    it('should archive a recommendation successfully', async () => {
      const { result } = renderHook(() => useArchiveRecommendation(false), {
        wrapper: createWrapper(),
      });

      const recommendationId = 'test-id';
      result.current.mutate(recommendationId);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockArchiveRecommendation).toHaveBeenCalledWith(
        recommendationId,
        'archive',
      );
      expect(mockToast.success).toHaveBeenCalledWith(
        'Recommendation archived successfully',
      );
      expect(mockNavigate).toHaveBeenCalledWith('/recommendations/archived');
    });

    it('should handle archive error', async () => {
      const error = new Error('Archive failed');
      mockArchiveRecommendation.mockRejectedValue(error);

      const { result } = renderHook(() => useArchiveRecommendation(false), {
        wrapper: createWrapper(),
      });

      const recommendationId = 'test-id';
      result.current.mutate(recommendationId);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to archive recommendation:',
        error,
      );
      expect(mockToast.error).toHaveBeenCalledWith(
        'Archive failed',
      );
    });

    it('should handle archive error with no message', async () => {
      const error = new Error();
      mockArchiveRecommendation.mockRejectedValue(error);

      const { result } = renderHook(() => useArchiveRecommendation(false), {
        wrapper: createWrapper(),
      });

      const recommendationId = 'test-id';
      result.current.mutate(recommendationId);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(mockToast.error).toHaveBeenCalledWith(
        '',
      );
    });
  });

  describe('when isArchived is true (unarchiving)', () => {
    it('should unarchive a recommendation successfully', async () => {
      const { result } = renderHook(() => useArchiveRecommendation(true), {
        wrapper: createWrapper(),
      });

      const recommendationId = 'test-id';
      result.current.mutate(recommendationId);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockArchiveRecommendation).toHaveBeenCalledWith(
        recommendationId,
        'unarchive',
      );
      expect(mockToast.success).toHaveBeenCalledWith(
        'Recommendation unarchived successfully',
      );
      expect(mockNavigate).toHaveBeenCalledWith('/recommendations');
    });

    it('should handle unarchive error', async () => {
      const error = new Error('Unarchive failed');
      mockArchiveRecommendation.mockRejectedValue(error);

      const { result } = renderHook(() => useArchiveRecommendation(true), {
        wrapper: createWrapper(),
      });

      const recommendationId = 'test-id';
      result.current.mutate(recommendationId);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to archive recommendation:',
        error,
      );
      expect(mockToast.error).toHaveBeenCalledWith(
        'Unarchive failed',
      );
    });
  });

  it('should invalidate queries on success', async () => {
    const { result } = renderHook(() => useArchiveRecommendation(false), {
      wrapper: createWrapper(),
    });

    const recommendationId = 'test-id';
    result.current.mutate(recommendationId);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockArchiveRecommendation).toHaveBeenCalled();
  });

  it('should handle loading state', () => {
    const { result } = renderHook(() => useArchiveRecommendation(false), {
      wrapper: createWrapper(),
    });

    expect(result.current.isPending).toBe(false);
  });

  it('should handle mutation with different recommendation IDs', async () => {
    const { result } = renderHook(() => useArchiveRecommendation(false), {
      wrapper: createWrapper(),
    });

    const recommendationId1 = 'id-1';
    const recommendationId2 = 'id-2';

    result.current.mutate(recommendationId1);
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockArchiveRecommendation).toHaveBeenCalledWith(
      recommendationId1,
      'archive',
    );

    vi.clearAllMocks();
    mockArchiveRecommendation.mockResolvedValue({ success: true });

    result.current.mutate(recommendationId2);
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockArchiveRecommendation).toHaveBeenCalledWith(
      recommendationId2,
      'archive',
    );
  });
}); 