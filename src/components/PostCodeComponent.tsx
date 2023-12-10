import { Autocomplete } from "@common/Autocomplete";
import { styleLeftLabel } from "@common/SmartForm";
import { useFetchAddresses } from "@reducers/api/postCodeApi";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import TextField from "./common/TextField";

type PostCodeComponentProps = {
  labelPosition: "left" | "top";
  setAddress: (address: string) => void;
  setPostcode: (postcode: string) => void;
  setValue: UseFormSetValue<any>;
  postcode: string | undefined;
};

export const PostCodeComponent: React.FC<PostCodeComponentProps> = ({
  labelPosition,
  setAddress,
  setPostcode,
  postcode,
  setValue,
}) => {
  const [searchKey, setSearchKey] = useState<string>("");

  const suggestions = useFetchAddresses(searchKey);
  const modifiedAddressList = suggestions?.map((suggestion) => ({
    value: `${
      suggestion?.address.formatted_address.filter(Boolean).join(", ") ?? ""
    }, ${suggestion?.address.postcode ?? ""}`,
    id: suggestion?.id ?? "",
  }));

  useEffect(() => {
    if (postcode) {
      setSearchKey(postcode);
    }
  }, [postcode]);

  return (
    <Autocomplete<{ value: string; id: string }, false>
      options={modifiedAddressList}
      inputValue={searchKey}
      fullWidth={labelPosition !== "left"}
      renderInput={(params) => (
        <TextField
          {...params}
          name='postcode'
          label='Postcode'
          variant='outlined'
          fullWidth
          placeholder='Postcode'
          sx={labelPosition !== "left" ? null : styleLeftLabel}
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <div>{option.value}</div>
        </li>
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
        setAddress(value?.value ?? "");
        const suggestion = suggestions.find(
          (suggestion) => suggestion?.id === value?.id,
        );
        setPostcode(suggestion?.address.postcode ?? "");
        setValue("latitude", suggestion?.address.latitude);
        setValue("longitude", suggestion?.address.longitude);
      }}
    />
  );
};
