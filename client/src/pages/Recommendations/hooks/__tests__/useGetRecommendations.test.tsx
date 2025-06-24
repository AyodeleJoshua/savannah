import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import useGetRecommendations from '../useGetRecommendations';
import * as recommendationsService from '../../services/recommendations';

vi.mock('../../services/recommendations', () => ({
  getAllRecommendations: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

const mockRecommendationResponse = {
  data: [
    {
      recommendationId: '1',
      title: 'Test Recommendation',
      description: 'Test description',
      score: 75,
      provider: [1, 2],
      frameworks: [
        { name: 'React', section: 'Frontend', subsection: 'React' },
      ],
      reasons: ['Test reason'],
      totalHistoricalViolations: 100,
      impactAssessment: {
        totalViolations: 25,
        mostImpactedScope: {
          name: 'Production',
          type: 'Production',
          count: 15,
        },
      },
      furtherReading: [
        { name: 'Documentation', href: 'https://example.com' },
      ],
      class: 1,
    },
  ],
  pagination: {
    cursor: {
      next: 'next-cursor',
    },
    totalItems: 1,
  },
  availableTags: {
    providers: ['AWS', 'GCP'],
    frameworks: ['React', 'Vue'],
    classes: ['Class 1', 'Class 2'],
    reasons: ['Reason 1', 'Reason 2'],
  },
};

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

describe('useGetRecommendations', () => {
  const mockGetAllRecommendations = vi.mocked(recommendationsService.getAllRecommendations);

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetAllRecommendations.mockResolvedValue(mockRecommendationResponse);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useGetRecommendations(), {
      wrapper: createWrapper(),
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.isFetchingNextPage).toBe(false);
  });

  it('should fetch recommendations with default limit', async () => {
    const { result } = renderHook(() => useGetRecommendations(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockGetAllRecommendations).toHaveBeenCalledWith(
      undefined,
      10,
      '',
      [],
    );
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.pages[0]).toEqual(mockRecommendationResponse);
  });

  it('should fetch recommendations with custom limit', async () => {
    const { result } = renderHook(() => useGetRecommendations({ limit: 20 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockGetAllRecommendations).toHaveBeenCalledWith(
      undefined,
      20,
      '',
      [],
    );
  });

  it('should update search and refetch', async () => {
    const { result } = renderHook(() => useGetRecommendations(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    result.current.setSearch('test search');

    await waitFor(() => {
      expect(mockGetAllRecommendations).toHaveBeenCalledWith(
        undefined,
        10,
        'test search',
        [],
      );
    });
  });

  it('should update tags and refetch', async () => {
    const { result } = renderHook(() => useGetRecommendations(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    result.current.setTags(['tag1', 'tag2']);

    await waitFor(() => {
      expect(mockGetAllRecommendations).toHaveBeenCalledWith(
        undefined,
        10,
        '',
        ['tag1', 'tag2'],
      );
    });
  });

  it('should handle fetchNextPage', async () => {
    const { result } = renderHook(() => useGetRecommendations(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    result.current.fetchNextPage();

    await waitFor(() => {
      expect(mockGetAllRecommendations).toHaveBeenCalledWith(
        'next-cursor',
        10,
        '',
        [],
      );
    });
  });

  it('should handle error state', async () => {
    const error = new Error('API Error');
    mockGetAllRecommendations.mockRejectedValue(error);

    const { result } = renderHook(() => useGetRecommendations(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeDefined();
  });

  it('should handle empty response', async () => {
    const emptyResponse = {
      ...mockRecommendationResponse,
      data: [],
      pagination: {
        cursor: {
          next: null as any,
        },
        totalItems: 0,
      },
    };

    mockGetAllRecommendations.mockResolvedValue(emptyResponse);

    const { result } = renderHook(() => useGetRecommendations(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data?.pages[0]).toEqual(emptyResponse);
    expect(result.current.hasNextPage).toBe(false);
  });
}); 