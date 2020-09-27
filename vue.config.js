module.exports = {
  devServer: {
    // proxy: 'http://localhost:3000'
    proxy: {
      "^/api/sri": {
        target: 'https://chmurki-api.herokuapp.com',
        logLevel: 'debug'
      },
      "^/maps": {
        target: "http://a.tile.stamen.com",
        pathRewrite: {'^/maps' : '/toner'}
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ],
  "pwa": {
    "name": "Chmurki",
    "appleMobileWebAppCapable": "yes",
    "appleMobileWebAppStatusBarStyle": "black",
    "iconPaths": {
      "favicon16": "favchmurka.png",
      "favicon32": null,
      "appleTouchIcon": null,
      "maskIcon": null,
      "msTileImage": null
    },
    "manifestOptions": {
      "theme_color": "#F5FBFF",
      "background_color": "#2286C3",
      "icons": [
        {
            "src": "chmurka.svg",
            "sizes": "144x144 192x192 512x512"
        }
      ]
    },
    "workboxPluginMode": "GenerateSW"
  }
}
