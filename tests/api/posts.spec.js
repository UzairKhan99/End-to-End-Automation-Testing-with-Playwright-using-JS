const { test, expect } = require('@playwright/test');
const { performance } = require('node:perf_hooks');
const apiData = require('../../test-data/apiPost.json');

function expectResponseMetadata(response, expected, startedAt) {
  expect(response.status()).toBe(expected.status);
  expect(response.headers()['content-type']).toContain(expected.contentType);
  expect(performance.now() - startedAt).toBeLessThan(expected.maxResponseTimeMs);
}

function expectMatchesSchema(value, schema) {
  expect(value).toEqual(expect.any(Object));
  expect(Array.isArray(value)).toBe(false);

  for (const property of schema.required) {
    expect(value).toHaveProperty(property);

    const propertyType = schema.properties[property].type;
    if (propertyType === 'integer') {
      expect(Number.isInteger(value[property])).toBe(true);
    } else {
      expect(typeof value[property]).toBe(propertyType);
    }
  }
}

test.describe('Posts API Tests', () => {
  test.use({ baseURL: apiData.baseURL });

  test('GET - Retrieve a post', async ({ request }) => {
    let response;
    let responseBody;
    const startedAt = performance.now();

    await test.step('Send GET request for post 1', async () => {
      response = await request.get(apiData.endpoints.getPost);
    });

    await test.step('Verify response status, headers, and timing', async () => {
      expectResponseMetadata(response, apiData.expected.getPost, startedAt);
    });

    await test.step('Verify response data', async () => {
      responseBody = await response.json();

      expect(responseBody.id).toBe(1);
      expect(responseBody.userId).toBe(1);
      expect(responseBody.title).toBeTruthy();
      expectMatchesSchema(responseBody, apiData.schemas.post);
    });
  });

  test('POST - Create a new post', async ({ request }) => {
    const startedAt = performance.now();
    const response = await request.post(apiData.endpoints.createPost, {
      data: apiData.post
    });

    expectResponseMetadata(response, apiData.expected.createPost, startedAt);

    const createdPost = await response.json();
    expect(createdPost).toMatchObject(apiData.post);
    expect(createdPost.id).toEqual(expect.any(Number));
    expectMatchesSchema(createdPost, apiData.schemas.post);
  });

  test('PUT - Update an existing post', async ({ request }) => {
    const updatedPost = {
      id: 1,
      ...apiData.post
    };
    const startedAt = performance.now();
    const response = await request.put(apiData.endpoints.updatePost, {
      data: updatedPost
    });

    expectResponseMetadata(response, apiData.expected.updatePost, startedAt);

    const responsePost = await response.json();
    expect(responsePost).toMatchObject(updatedPost);
    expectMatchesSchema(responsePost, apiData.schemas.post);
  });

  test('PATCH - Partially update an existing post', async ({ request }) => {
    const startedAt = performance.now();
    const response = await request.patch(apiData.endpoints.patchPost, {
      data: apiData.patch
    });

    expectResponseMetadata(response, apiData.expected.patchPost, startedAt);

    const patchedPost = await response.json();
    expect(patchedPost).toMatchObject({
      id: 1,
      ...apiData.patch
    });
    expectMatchesSchema(patchedPost, apiData.schemas.patchedPost);
  });

  test('DELETE - Delete a post', async ({ request }) => {
    const startedAt = performance.now();
    const response = await request.delete(apiData.endpoints.deletePost);

    expectResponseMetadata(response, apiData.expected.deletePost, startedAt);
  });

  test('GET - Retrieve a non-existing post', async ({ request }) => {
    const startedAt = performance.now();
    const response = await request.get(apiData.endpoints.missingPost);

    expectResponseMetadata(response, apiData.expected.missingPost, startedAt);
  });
});
