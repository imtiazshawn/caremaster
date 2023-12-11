import { config } from "@config/index";
import Client from "getaddress-api";
import { useQuery } from "react-query";

// const postCodeApi = "https://api.getaddress.io/v2/uk";
// TODO: We have to remove this API KEY and place it to the .env file
const apiKey = config.GET_ADDRESS_API_KEY;

const addressApi = new Client(apiKey);

export const fetchAddressesFromPostCode = async (postCode: string) => {
  const nonSpacedPostCode = postCode.replace(/\s/g, "");
  try {
    const autocompleteResult = await addressApi.autocomplete(nonSpacedPostCode);
    if (autocompleteResult.isSuccess) {
      const success = autocompleteResult.toSuccess();

      const allSuggestions = await Promise.all(
        success.suggestions.map(async (suggestion) => ({
          suggestion: await addressApi.get(suggestion.id),
          id: suggestion.id,
        })),
      );

      const all = allSuggestions
        .map(({ suggestion, id }) => {
          if (suggestion.isSuccess) {
            return { id, address: suggestion.toSuccess().address };
          }
          return null;
        })
        .filter(Boolean);

      return all;
    }
    return [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("### error fetching address", error);
    return [];
  }
};

export const useFetchAddresses = (searchKey: string) => {
  const { data } = useQuery(`addresses_${searchKey}`, () => {
    try {
      const response = fetchAddressesFromPostCode(searchKey);
      return response;
    } catch {
      return [];
    }
  });
  return data ?? [];
};
