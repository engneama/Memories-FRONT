import { TextInput } from "@mantine/core";
import { useFormContext, Controller } from "react-hook-form";

const ControlledField = ({ name, label, type, holder, desc }) => {
  const {
    trigger,
    control,
    formState: { errors },
  } = useFormContext();

  //TODO: اسال الحاج هايب ليه مش بيجمع الفاليو لو عملت اكمال تلقائي
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
          onChange={(e) => {
            trigger(e.target.name);
            field.onChange(e);
          }}
        />
      )}
    />
  );
};

export default ControlledField;
