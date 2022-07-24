import { TextInput } from "@mantine/core";
import { useFormContext, Controller } from "react-hook-form";

const ControlledField = ({ name, label, type, holder, desc }) => {
  const {
    trigger,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextInput
          {...field}
          required
          type={type}
          name={name}
          label={label}
          placeholder={holder}
          description={desc}
          error={errors?.[name]?.message}
          onBlur={(e) => {
            trigger(e.target.name);
            field.onBlur(e);
          }}
        />
      )}
    />
  );
};

export default ControlledField;
