interface RecommendationFramework {
  name: string;
  section: string;
  subsection: string;
}

export interface Recommendation {
  recommendationId: string;
  title: string;
  description: string;
  score: number;
  provider: number[];
  frameworks: RecommendationFramework[];
  reasons: string[];
  totalHistoricalViolations: number;
  impactAssessment: {
    totalViolations: number;
    mostImpactedScope: {
      name: string;
      type: string;
      count: number;
    };
  };
  furtherReading: {
    name: string;
    href: string;
  }[];
  class: number;
}

interface AvailableTags {
  providers: string[];
}

export interface RecommendationResponse {
  data: Recommendation[];
  pagination: {
    cursor: {
      next: string;
    };
    totalItems: number;
  };
  availableTags: AvailableTags;
}
