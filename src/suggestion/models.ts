export interface InsertSuggestionParams {
  suggestedBy: number;
  suggestedTo: number;
  spotifyId: string;
  type: string;
}

export interface UpdateSuggestionParams {
  suggestionId: number;
  spotifyId: string;
  type: string;
  rating: number;
  userId: number;
}

export interface DeleteSuggestionParams {
  suggestionId: number;
}

export interface BaseSuggestion {
  id: number;
  type: string;
  spotifyId: string;
  rating: number;
  createdAt: Date;
}

export interface UserSuggestions extends BaseSuggestion {
  suggester: { name: string; id: number };
}
