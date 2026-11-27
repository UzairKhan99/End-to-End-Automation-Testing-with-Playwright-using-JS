const { test, expect } = require('@playwright/test');
const postData = require('../../test-data/apiPost.json');

test.describe('Posts API Tests', () => {
  test.use({ baseURL: 'https://jsonplaceholder.typicode.com' });

  test('GET - Retrieve a post', async ({ request }) => {
    let response;
    let responseBody;

    await test.step('Send GET request for post 1', async () => {
      response = await request.get('/posts/1');
    });

    await test.step('Verify response status', async () => {
      expect(response.status()).toBe(200);
    });

    await test.step('Verify response data', async () => {
      responseBody = await response.json();

      expect(responseBody.id).toBe(1);
      expect(responseBody.userId).toBe(1);
      expect(responseBody.title).toBeTruthy();
    });
  });

  test('POST - Create a new post', async ({ request }) => {
    const response = await request.post('/posts', {
      data: postData
    });

    expect(response.status()).toBe(201);

    const createdPost = await response.json();
    expect(createdPost).toMatchObject(postData);
    expect(createdPost.id).toEqual(expect.any(Number));
  });

  test('PUT - Update an existing post', async ({ request }) => {
    const updatedPost = {
      id: 1,
      ...postData
    };
    const response = await request.put('/posts/1', {
      data: updatedPost
    });

    expect(response.status()).toBe(200);

    const responsePost = await response.json();
    expect(responsePost).toMatchObject(updatedPost);
  });

  test('DELETE - Delete a post', async ({ request }) => {
    const response = await request.delete('/posts/1');

    expect(response.status()).toBe(200);
  });

  test('GET - Retrieve a non-existing post', async ({ request }) => {
    const response = await request.get('/posts/9999');

    expect(response.status()).toBe(404);
  });
});
