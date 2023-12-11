type Config = {
  BACKEND_URL: string;
  GOOGLE_MAPS_API_KEY: string;
  GET_ADDRESS_API_KEY: string;
};

export const config = Object.fromEntries(
  Object.entries(import.meta.env).map(([key, value]) => {
    if (key.startsWith("CAREMASTER_")) {
      return [key.replace(/^CAREMASTER_/, ""), value];
    }
    return [key, value];
  }),
) as Config;
