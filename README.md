# Repos

A gallery page that dynamically displays all publicly accessible GitHub repositories belonging to a specific user.

## Rate Limits

The GitHub API rate limit for public access (unauthenticated requests) is 60 requests per hour. For authenticated users, the rate limit is significantly higher at 5,000 requests per hour.

You can see your remaining requests and reset time in the response headers of each API call.

**Header name** | **Description**
x-ratelimit-limit | The maximum number of requests that you can make per hour
x-ratelimit-remaining | The number of requests remaining in the current rate limit window
x-ratelimit-used | The number of requests you have made in the current rate limit window
x-ratelimit-reset | The time at which the current rate limit window resets, in UTC epoch seconds
x-ratelimit-resource | The rate limit resource that the request counted against. For more information about the different resources, see REST API endpoints for rate limits.

For reference: https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api#checking-the-status-of-your-rate-limit
