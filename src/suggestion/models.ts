export interface InsertSuggestionParams {
  suggestedBy: number;
  suggestedTo: number;
  spotifyId: string;
  type: string;
}

export interface UpdateSuggestionParams {
  suggestionId: number;
  rating: number;
}

export interface DeleteSuggestionParams {
  suggestionId: number;
}

export interface BaseSuggestion {
  id: number;
  type: string;
  spotifyId: string;
  rating: number;
}

export interface UserReceivedSuggestions extends BaseSuggestion {
  sentBy: { name: string; id: number };
}

export interface UserSentSuggestions extends BaseSuggestion {
  sentTo: { name: string; id: number };
}
