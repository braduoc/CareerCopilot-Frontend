export interface DashboardSummary {
  currentAtsScore: number | null;
  latestMatchScore: number | null;
  historyCount: number;
  plan: string;
  interviewsUsed: number;
  interviewsLimit: number | null;
  monthMatches: number;
  matchesLimit: number | null;
}
