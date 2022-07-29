//UI Components
import { MultiSelect } from "@mantine/core";
import { useFormContext, Controller } from "react-hook-form";
//Icons
import { TbTags } from "react-icons/tb";

//TODO: Remove this later
const FAKE = ["tno", "msa", "mohammed", "sobhy", "omar", "hoda"];

const Tags = () => {
  const {
    trigger,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name="tags"
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <MultiSelect
          {...field}
          required
          name="tags"
          label="Tags"
          placeholder="Select or enter 3 tags"
          description="Select at least one tag"
          icon={<TbTags size={18} />}
          searchable //the ability to search for a certain tag
          data={FAKE} //take an array of data to auto complete
          limit={5} //number of suggestions at the same time
          maxSelectedValues={3} //max number of tags
          maxDropdownHeight={160}
          clearable //add a X button on the right to clear the field.
          clearButtonLabel="Clear selection"
          creatable //the ability to add new tags
          getCreateLabel={(query) => `+ Create ${query}`} //text shown when adding new tag
          error={errors?.tags?.message}
          onBlur={(e) => {
            trigger(e.target.name);
            field.onBlur(e);
          }}
        />
      )}
    />
  );
};

export default Tags;

//TODO: delete later
//  <MultiSelect
// required
// name="tags"
// label="Tags"
// placeholder="Select or enter 3 tags"
// icon={<FaTags />}
// searchable //the ability to search for a certain tag
// data={FAKE} //take an array of data to auto complete
// limit={5} //number of suggestions at the same time
// maxSelectedValues={3} //max number of tags
// maxDropdownHeight={160}
// clearable //add a X button on the right to clear the field.
// clearButtonLabel="Clear selection"
// creatable //the ability to add new tags
// getCreateLabel={(query) => `+ Create ${query}`} //text shown when adding new tag
// onChange={(e) => onChangeHandler(e)}
// />
