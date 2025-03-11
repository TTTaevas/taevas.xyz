export default {
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        inlineDynamicImports : true,
        entryFileNames: `compressed/[name].js`,
        chunkFileNames: `compressed/[name].js`,
        assetFileNames: `compressed/[name].[ext]`
      }
    }
  }
}