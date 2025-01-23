import { faker } from "@faker-js/faker";

const mockCompetion = (() => {
    return Array.from({ length: 10 }).map(() => ({
        id: faker.number.int({ min: 1, max: 999 }),
        name: faker.company.name(),
    }));
})();

const mockUniversity = (() => {
    return Array.from({ length: 10 }).map(() => ({
        id: faker.number.int({ min: 1, max: 999 }),
        name: faker.company.name(),
    }));
})();

const mockDomain = (() => {
    return Array.from({ length: 10 }).map(() => ({
        id: faker.number.int({ min: 1, max: 999 }),
        name: faker.company.name(),
        color: faker.color.rgb(),
        sub_domains: Array.from({ length: 3 }).map(() => ({
            id: faker.number.int({ min: 1, max: 999 }),
            name: faker.company.name(),
            color: faker.color.rgb(),
        }))
    }));
})();

export const getCompetion = async (data) => {
    return mockCompetion;
}

export const getUniversity = async (data) => {
    return mockUniversity;
}

export const getDomain = async (data) => {
    return mockDomain;
}