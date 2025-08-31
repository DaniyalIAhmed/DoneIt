import 'dotenv/config';

export default {
  expo: {
    name: "DoneIt",
    slug: "todo-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon_launcher.png",
    scheme: "todoapp", // 👈 needed for linking
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#1e293b",
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#1e293b",
          resizeMode: "contain",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      LLAMA_API_KEY: process.env.LLAMA_API_KEY,
      router: {},
      eas: {
        projectId: "f03aeaf5-1c6c-40d2-96aa-65415aa03c75",
      },
    },
  },
};
