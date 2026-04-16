/**
 * Infrastructure Layer - Network Service
 * Placeholder for your API client configuration (e.g., Axios instance).
 */
export const apiClient = {
    post: async (url: string, body: any) => {
        console.log(`[API Client] POST to ${url}`, body);
        // Simulate network latency
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true };
    },
    get: async (url: string) => {
        console.log(`[API Client] GET ${url}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true };
    }
};
