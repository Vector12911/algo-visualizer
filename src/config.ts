const environment = process.env.NEXT_PUBLIC_ENV;
export const config = {
  environment,
  baseUrl:
    environment === "prod"
      ? "https://vector12911.github.io/algo-visualizer"
      : "localhost:3000",
};
