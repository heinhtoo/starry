const prodURL = process.env.NEXT_PUBLIC_PRODUCTION_URL;
const devURL = "http://localhost:3000";

const baseURL = process.env.NODE_ENV === "development" ? devURL : prodURL;
const assetsURL = devURL + "/assets";

export { baseURL, assetsURL };
