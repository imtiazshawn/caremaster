import { Autocomplete } from "@common/Autocomplete";
import { useFetchAddresses } from "@reducers/api/postCodeApi";
import { useState } from "react";
import TextField from "./common/TextField";

const styleLeftLabel = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  "& .MuiFormLabel-root": {
    width: "200px",
  },
  "& .MuiInputBase-root": {
    flexGrow: 1,
  },
};

type PostCodeComponentProps = {
  labelPosition?: "left" | "top";
  setAddress: (address: string) => void;
  setPostcode: (postcode: string) => void;
};

export const PostCodeComponent: React.FC<PostCodeComponentProps> = ({
  labelPosition,
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
          fullWidth={labelPosition !== "left"}
          placeholder='Postcode'
          sx={labelPosition !== "left" ? null : styleLeftLabel}
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
  );
};
