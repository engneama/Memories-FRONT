//Hooks
import { useState, useEffect } from "react";
//Actions
import { memory } from "services";
//UI Components
import { MultiSelect } from "@mantine/core";
import { useFormContext, Controller } from "react-hook-form";
//Icons
import { TbTags } from "react-icons/tb";

const Tags = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]);

  const {
    trigger,
    control,
    formState: { errors },
  } = useFormContext();

  const handleGetTags = async () => {
    setIsLoading(true);

    try {
      const { data } = await memory.getTags();
      setTags(data.data.tags);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetTags();
  }, []);

  return (
    <Controller
      name="tags"
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <MultiSelect
          {...field}
          required
          disabled={isLoading}
          name="tags"
          label="Tags"
          placeholder="Select or enter 3 tags"
          description="Select at least one tag"
          icon={<TbTags size={18} />}
          searchable //the ability to search for a certain tag
          data={tags} //take an array of data to auto complete
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
