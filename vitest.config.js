import { defineConfig } from 'vitest/config'
import tsConfigPath from 'vitest-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPath()],
})
