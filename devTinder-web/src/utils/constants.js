// export const BASE_URL = "http://localhost:3000"; // convert loacal to "/api" for production

export const BASE_URL = location.hostname === "localhost" ? "http://localhost:3000" : "/api";