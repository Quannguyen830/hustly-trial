import { faker } from "@faker-js/faker";

const mockProfile = {
  id: "c11faaef-c18b-4909-912c-a07d342fd341",
  updated_at: "2025-01-04T21:00:21.823706",
  created_at: "2025-01-02T22:50:53.682104",
  first_name: "Son",
  last_name: "Pham",
  email: "phamtienson02@gmail.com",
  avatar: "https://storage.googleapis.com/chat-app-e4c3e.appspot.com/file/38855193-fe52-43c0-9a44-a31010ff4621.jpeg",
  social_link: {
    email: null,
    linkedin: null,
    instagram: null,
  },
  skill_set: [
    "CRITICAL_THINKING",
    "CREATIVE_THINKING",
    "TEAMWORK",
    "PROJECT_MANAGEMENT",
  ],
  color: "#0000ff",
  age: 18,
  district: "7",
  city: "1",
  team_member_count: 1,
  university: 333,
  competition: [],
  domain: [
    {
      id: 155,
      sub_domains: [159, 158, 160, 156],
    },
  ],
  archivement: [
    {
      description: "Me code hard",
    },
  ],
  bio: "Son - 22 - HUST - Mi tron - Code",
  bio_image: [
    {
      id: 394,
      file: "https://storage.googleapis.com/chat-app-e4c3e.appspot.com/file/386c1a48-884a-4126-aab9-f9fd5f4c05af.jpeg",
      file_type: "image/jpeg",
    },
  ],
  is_update_setting: true,
  gender: "MALE",
};

const MOCK_COUNT = 60;
const MOCK_LIMIT = 10;

const mockUsers = Array.from({ length: MOCK_COUNT }).map(() => ({
  id: faker.string.uuid(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  avatar: faker.image.avatar(),
  team_member_count: faker.number.int({ min: 1, max: 5 }),
  bio: faker.lorem.sentence(),
  color: faker.color.rgb(),
  age: faker.number.int({ min: 18, max: 60 }),
  district: faker.number.int({ min: 1, max: 999 }).toString(),
  city: faker.number.int({ min: 1, max: 999 }).toString(),
  domain: Array.from({
    length: faker.number.int({ min: 1, max: 5 }),
  }).map(() => ({
    id: faker.number.int({ min: 1, max: 999 }),
    color: faker.color.rgb(),
    parent_domain: faker.number.int({ min: 1, max: 999 }),
  })),
}));

export const mockSuggestions = {
  count: MOCK_COUNT,
  results: mockUsers,
};


export const getSuggestions = async (data) => {
  const page = data?.page ?? 1;
  const limit = MOCK_LIMIT;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const pageResults = mockSuggestions.results.slice(startIndex, endIndex);
  const pageCount = Math.ceil(mockSuggestions.count / limit);
  return {
    data: {
      count: mockSuggestions.count,
      page_count: pageCount,
      results: pageResults,
    },
  };
};

export const getProfile = async (data) => {
  return mockProfile;
};

export const updateProfile = async (data) => {
  return mockProfile;
};

export const getUser = async (profileId, data) => {
  const user = mockSuggestions.results.find((user) => user.id === profileId);
  return user;
};
