import { Select } from "@chakra-ui/react";
import React from "react";
import { useCategoryQuery } from "../generated/graphql";

interface SelectFieldProps {
  value: string;
  onChange(e: any): void;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  value,
  onChange,
}) => {
  const categories = useCategoryQuery();

  const categoriesOptions = categories[0].data?.category;

  return (
    <div>
      <p>Select</p>
      <Select value={value} onChange={onChange}>
        <option value="" disabled>
          Select an option
        </option>
        {categoriesOptions?.map(({ _id, title }) => {
          return (
            <option key={_id} value={_id}>
              {title}
            </option>
          );
        })}
      </Select>
    </div>
  );
};
