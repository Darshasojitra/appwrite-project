import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'; 

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // Appwrite Sites provides the endpoint and project ID during the build.
  // The remaining values are public client configuration, not API secrets.
  const appwriteConfig = {
    VITE_APPWRITE_URL:
      process.env.APPWRITE_SITE_API_ENDPOINT ||
      process.env.VITE_APPWRITE_URL ||
      env.VITE_APPWRITE_URL ||
      'https://fra.cloud.appwrite.io/v1',
    VITE_APPWRITE_PROJECT_ID:
      process.env.APPWRITE_SITE_PROJECT_ID ||
      process.env.VITE_APPWRITE_PROJECT_ID ||
      env.VITE_APPWRITE_PROJECT_ID ||
      '69a2b3b500124023e1bc',
    VITE_APPWRITE_DATABASE_ID:
      process.env.VITE_APPWRITE_DATABASE_ID ||
      env.VITE_APPWRITE_DATABASE_ID ||
      '69a2b7790019b3e87ffa',
    VITE_APPWRITE_COLLECTION_ID:
      process.env.VITE_APPWRITE_COLLECTION_ID ||
      env.VITE_APPWRITE_COLLECTION_ID ||
      'articles',
    VITE_APPWRITE_BUCKET_ID:
      process.env.VITE_APPWRITE_BUCKET_ID ||
      env.VITE_APPWRITE_BUCKET_ID ||
      '69a2c0dc003765e638f4',
  }

  return {
    plugins: [react(),tailwindcss()],
    define: Object.fromEntries(
      Object.entries(appwriteConfig).map(([key, value]) => [
        `import.meta.env.${key}`,
        JSON.stringify(value),
      ]),
    ),
  }
})
