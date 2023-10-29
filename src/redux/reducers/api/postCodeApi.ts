import { useQuery } from "react-query";

const postCodeApi = "https://api.getaddress.io/v2/uk";
const apiKey = "3Ihph0lYAU6P1llsphU68Q5211";

type PostCodeResponse = {
  Latitude: number;
  Longitude: number;
  Addresses: string[];
};

export const fetchAddressesFromPostCode = async (postCode: string) => {
  const nonSpacedPostCode = postCode.replace(/\s/g, "");
  try {
    const response = await fetch(
      `${postCodeApi}/${nonSpacedPostCode}?api-key=${apiKey}`,
    );

    const postCodeResponse = (await response.json()) as PostCodeResponse;

    return postCodeResponse.Addresses;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("### error fetching address", error);
    return [];
  }
};

export const useFetchAddresses = (searchKey: string) => {
  const { data } = useQuery(`addresses_${searchKey}`, () =>
    fetchAddressesFromPostCode(searchKey),
  );
  return data ?? [];
};
