import { mockSuggestions } from "./profile";

export const createThread = async (profileId, data) => {
  const user = mockSuggestions.results.find((user) => user.id === profileId);
  return user;
};