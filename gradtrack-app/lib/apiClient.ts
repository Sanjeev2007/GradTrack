/**
 * API Client with timeout handling, caching, and fallback to mock data
 *
 * Provides a centralized way to fetch data from the backend API with:
 * - Automatic fallback to mock data when backend is offline
 * - Request timeout handling (10s default)
 * - Simple in-memory cache with TTL (1 minute default)
 * - Environment-based backend URL configuration
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface FetchOptions {
  useCache?: boolean;
  timeout?: number;
  cacheTTL?: number;
}

class APIClient {
  private backendUrl: string;
  private cache: Map<string, CacheEntry<unknown>>;
  private defaultTimeout: number = 10000; // 10 seconds
  private defaultCacheTTL: number = 60000; // 1 minute

  constructor() {
    // Use environment variable or fallback to localhost
    this.backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';
    this.cache = new Map();
  }

  /**
   * Checks if cached data is still valid
   */
  private isCacheValid<T>(cacheKey: string, ttl: number): T | null {
    const cached = this.cache.get(cacheKey);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > ttl) {
      // Cache expired
      this.cache.delete(cacheKey);
      return null;
    }

    return cached.data as T;
  }

  /**
   * Sets cache entry with current timestamp
   */
  private setCache<T>(cacheKey: string, data: T): void {
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Fetches data from API with timeout
   */
  private async fetchWithTimeout(
    url: string,
    timeout: number
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Fetches data from backend API with fallback to mock data
   *
   * @param endpoint - API endpoint (e.g., '/api/study/hours')
   * @param fallbackData - Mock data to use if API fails
   * @param options - Fetch options (cache, timeout, TTL)
   * @returns Promise resolving to API data or fallback data
   */
  async fetchWithFallback<T>(
    endpoint: string,
    fallbackData: T,
    options: FetchOptions = {}
  ): Promise<T> {
    const {
      useCache = true,
      timeout = this.defaultTimeout,
      cacheTTL = this.defaultCacheTTL,
    } = options;

    const cacheKey = endpoint;

    // Check cache first
    if (useCache) {
      const cachedData = this.isCacheValid<T>(cacheKey, cacheTTL);
      if (cachedData !== null) {
        console.log(`[APIClient] Cache hit for ${endpoint}`);
        return cachedData;
      }
    }

    // Try fetching from API
    try {
      const url = `${this.backendUrl}${endpoint}`;
      console.log(`[APIClient] Fetching from ${url}`);

      const response = await this.fetchWithTimeout(url, timeout);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: T = await response.json();

      // Cache successful response
      if (useCache) {
        this.setCache(cacheKey, data);
      }

      console.log(`[APIClient] Successfully fetched from ${endpoint}`);
      return data;
    } catch (error) {
      // Log error and fallback to mock data
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.warn(
            `[APIClient] Request timeout for ${endpoint}, using fallback data`
          );
        } else {
          console.warn(
            `[APIClient] Failed to fetch ${endpoint}: ${error.message}, using fallback data`
          );
        }
      } else {
        console.warn(
          `[APIClient] Unknown error for ${endpoint}, using fallback data`
        );
      }

      return fallbackData;
    }
  }

  /**
   * Checks if backend is healthy
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await this.fetchWithTimeout(
        `${this.backendUrl}/health`,
        3000
      );
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Clears all cached data
   */
  clearCache(): void {
    this.cache.clear();
    console.log('[APIClient] Cache cleared');
  }

  /**
   * Gets the configured backend URL
   */
  getBackendUrl(): string {
    return this.backendUrl;
  }
}

// Export singleton instance
export const apiClient = new APIClient();

// Export types for consumers
export type { FetchOptions };
