import {
  Autocomplete as MAutocomplete,
  AutocompleteProps as MAutocompleteProps,
} from "@mui/material";
import React from "react";

type AutocompleteComponentType = <Value, Multiple extends boolean | undefined>(
  props: MAutocompleteProps<Value, Multiple, false, false>,
) => React.ReactElement;

export const Autocomplete: AutocompleteComponentType = (props) => {
  return <MAutocomplete {...props} />;
};
