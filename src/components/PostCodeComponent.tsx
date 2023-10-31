import { Autocomplete } from "@common/Autocomplete";
import { useFetchAddresses } from "@reducers/api/postCodeApi";
import { useState } from "react";
import TextField from "./common/TextField";

type PostCodeComponentProps = {
  setAddress: (address: string) => void;
  setPostcode: (postcode: string) => void;
};

export const PostCodeComponent: React.FC<PostCodeComponentProps> = ({
  setAddress,
  setPostcode,
}) => {
  const [searchKey, setSearchKey] = useState<string>("");

  const addressList = useFetchAddresses(searchKey);
  const modifiedAddressList = addressList?.map((address) =>
    // eslint-disable-next-line unicorn/better-regex
    address.replace(/[,\s]+/g, ", ").replace(/,\s$/g, ""),
  );

  return (
    <div>
      <Autocomplete<string, false>
        options={modifiedAddressList}
        value={searchKey}
        inputValue={searchKey}
        renderInput={(params) => (
          <TextField
            {...params}
            name='postcode'
            label='Postcode'
            variant='outlined'
            fullWidth
            placeholder='Postcode'
          />
        )}
        filterOptions={(options) => {
          return options;
        }}
        onInputChange={(e, value, reason) => {
          // Note: reason can be "input" or "reset" or many more
          // we only want to update the searchKey when the user is typing
          if (!e || reason !== "input") {
            return;
          }
          setPostcode(value);
          setSearchKey(value);
        }}
        onChange={(_, value) => {
          setAddress(value ?? "");
        }}
      />
    </div>
  );
};
