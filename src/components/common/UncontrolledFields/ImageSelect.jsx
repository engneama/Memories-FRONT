//Hooks
import { useState } from "react";
//UI Components
import { FileButton, Button, Text, Stack } from "@mantine/core";
import { ImageSelectHandler } from "helpers";
//Icon
import { TbUpload } from "react-icons/tb";

const ImageSelect = ({ data, err: errProp }) => {
  const [file, setFile] = useState(null);
  const [err, setErr] = useState(false);

  const handleOnChange = async (e) => {
    setFile(e);
    const base64 = await ImageSelectHandler(e);

    if (!base64) {
      return setErr(true);
    }
    setErr(false);
    data(base64);
  };

  return (
    <Stack spacing={0}>
      {/* Label */}
      <Text size="sm">
        Cover <span style={{ color: "red" }}>*</span>
      </Text>
      {/* Description */}
      <Text size="sm" color="dimmed">
        Image must be less than 30MB
      </Text>
      {/* Error message */}
      {err && (
        <Text size={12} color="red">
          Your image size exceeds the 30MB limit.
        </Text>
      )}
      {errProp && (
        <Text size={12} color="red">
          {errProp}
        </Text>
      )}
      {/* Select Button */}
      <FileButton
        onChange={handleOnChange}
        accept="image/png,image/jpeg,image/jpg,image/webp,image/gif,image/apng"
      >
        {(props) => (
          <Button
            {...props}
            color={err && "red"}
            leftIcon={<TbUpload size={18} />}
          >
            {file ? `picked image: ${file.name}` : "Upload an image"}
          </Button>
        )}
      </FileButton>
    </Stack>
  );
};

export default ImageSelect;
