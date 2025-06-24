import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import useGetArchivedRecommendations from '../useGetAllArchievedRecommendations';
import * as recommendationsService from '../../services/recommendations';

vi.mock('../../services/recommendations', () => ({
  getArchivedRecommendations: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

const mockArchivedRecommendationResponse = {
  data: [
    {
      recommendationId: '1',
      title: 'Archived Recommendation',
      description: 'Archived description',
      score: 85,
      provider: [1],
      frameworks: [
        { name: 'Vue', section: 'Frontend', subsection: 'Vue' },
      ],
      reasons: ['Archived reason'],
      totalHistoricalViolations: 50,
      impactAssessment: {
        totalViolations: 10,
        mostImpactedScope: {
          name: 'Development',
          type: 'Development',
          count: 5,
        },
      },
      furtherReading: [
        { name: 'Archived Docs', href: 'https://archived.example.com' },
      ],
      class: 2,
    },
  ],
  pagination: {
    cursor: {
      next: 'archived-next-cursor',
    },
    totalItems: 1,
  },
  availableTags: {
    providers: ['AWS'],
    frameworks: ['Vue'],
    classes: ['Class 2'],
    reasons: ['Archived Reason'],
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

describe('useGetArchivedRecommendations', () => {
  const mockGetArchivedRecommendations = vi.mocked(recommendationsService.getArchivedRecommendations);

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetArchivedRecommendations.mockResolvedValue(mockArchivedRecommendationResponse);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useGetArchivedRecommendations(), {
      wrapper: createWrapper(),
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.isFetchingNextPage).toBe(false);
  });

  it('should fetch archived recommendations with default limit', async () => {
    const { result } = renderHook(() => useGetArchivedRecommendations(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockGetArchivedRecommendations).toHaveBeenCalledWith(
      undefined,
      10,
      '',
      [],
    );
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.pages[0]).toEqual(mockArchivedRecommendationResponse);
  });

  it('should update search and refetch', async () => {
    const { result } = renderHook(() => useGetArchivedRecommendations(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    result.current.setSearch('archived search');

    await waitFor(() => {
      expect(mockGetArchivedRecommendations).toHaveBeenCalledWith(
        undefined,
        10,
        'archived search',
        [],
      );
    });
  });

  it('should update tags and refetch', async () => {
    const { result } = renderHook(() => useGetArchivedRecommendations(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    result.current.setTags(['archived-tag1', 'archived-tag2']);

    await waitFor(() => {
      expect(mockGetArchivedRecommendations).toHaveBeenCalledWith(
        undefined,
        10,
        '',
        ['archived-tag1', 'archived-tag2'],
      );
    });
  });

  it('should handle fetchNextPage', async () => {
    const { result } = renderHook(() => useGetArchivedRecommendations(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    result.current.fetchNextPage();

    await waitFor(() => {
      expect(mockGetArchivedRecommendations).toHaveBeenCalledWith(
        'archived-next-cursor',
        10,
        '',
        [],
      );
    });
  });

  it('should handle error state', async () => {
    const error = new Error('Archived API Error');
    mockGetArchivedRecommendations.mockRejectedValue(error);

    const { result } = renderHook(() => useGetArchivedRecommendations(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeDefined();
  });

  it('should handle empty archived response', async () => {
    const emptyResponse = {
      ...mockArchivedRecommendationResponse,
      data: [],
      pagination: {
        cursor: {
          next: null as any,
        },
        totalItems: 0,
      },
    };

    mockGetArchivedRecommendations.mockResolvedValue(emptyResponse);

    const { result } = renderHook(() => useGetArchivedRecommendations(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data?.pages[0]).toEqual(emptyResponse);
    expect(result.current.hasNextPage).toBe(false);
  });

  it('should use correct query key for archived recommendations', async () => {
    const { result } = renderHook(() => useGetArchivedRecommendations(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockGetArchivedRecommendations).toHaveBeenCalledWith(
      undefined,
      10,
      '',
      [],
    );
  });
}); 