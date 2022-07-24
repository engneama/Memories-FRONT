import { PasswordInput } from "@mantine/core";
import { useFormContext, Controller } from "react-hook-form";

const ControlledPasswordField = ({ name, label, holder, desc }) => {
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
        <PasswordInput
          {...field}
          required
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

export default ControlledPasswordField;
