import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        weight: "url('/weight-icon.png')",
      },
      keyframes: {
        visitedAnimation: {
          "0%": {
            transform: "scale(0.4)",
            borderRadius: "50%",
            outline: "0",
            backgroundColor: "rgba(89, 224, 202, 0.75)",
          },
          "50%": {
            transform: "scale(0.8)",
            outline: "0",
          },
          "100%": {
            transform: "scale(1)",
            backgroundColor: "yellow",
          },
        },
        // visitedAnimation: {
        //   "0%": {
        //     transform: "scale(0.3 )",
        //     borderRadius: "50%",
        //     outline: "0",
        //     backgroundColor: "rgba(89, 224, 202, 0.75)",
        //   },
        //   "50%": {
        //     outline: "0",
        //     backgroundColor: "rgba(12, 37, 180, 0.75)",
        //   },
        //   "60%": {
        //     transform: "scale(1)",
        //     outline: "1px",
        //     backgroundColor: "rgba(60, 96, 196, 0.75)",
        //   },
        //   "100%": {
        //     transform: "scale(1)",
        //     backgroundColor: "rgba(129, 209, 219, 0.774)",
        //   },
        // },
        shortestPath: {
          "0%": {
            transform: "scale(0.6)",
            backgroundColor: "rgb(226, 184, 137)",
          },
          "50%": {
            transform: "scale(1.2)",
            backgroundColor: "rgb(214, 117, 7)",
          },
          "100%": {
            transform: "scale(1)",
            backgroundColor: "rgb(230, 214, 170)",
          },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        visitedAnimation: "visitedAnimation 1s ease-out forwards running",
        // visitedAnimation:
        //   "visitedAnimation 2s ease-out 2 alternate 1 forwards running",
        shortestPath:
          "shortestPath 1.5s ease-out 0 alternate 1 forwards running",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
