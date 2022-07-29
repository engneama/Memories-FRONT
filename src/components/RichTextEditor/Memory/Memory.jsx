//Hooks
import { useEffect } from "react";
import { useQuill } from "react-quilljs";
//UI Components
import "quill/dist/quill.snow.css";
import { Text } from "@mantine/core";
//Options
import options from "./options";

const Memory = ({ data, err }) => {
  const { quill, quillRef, Quill } = useQuill(options);

  //Auto-Recognition links (conver them to <a />)
  if (Quill && !quill) {
    const MagicUrl = require("quill-magic-url").default;
    Quill.register("modules/magicUrl", MagicUrl);
  }

  useEffect(() => {
    if (quill) {
      //send body data to parent
      quill.on("text-change", () => {
        data({
          body: quill.root.innerHTML,
          description: quill.getText(),
        });
      });
      //prevent the user from adding images
      quill.clipboard.addMatcher("IMG", () => {
        const Delta = Quill.import("delta");
        return new Delta().insert("");
      });
      quill.clipboard.addMatcher("PICTURE", () => {
        const Delta = Quill.import("delta");
        return new Delta().insert("");
      });
    }
  }, [quill, Quill]);

  return (
    <>
      <Text size="sm">
        Body <span style={{ color: "red" }}>*</span>
      </Text>
      {err && (
        <Text size={12} color="red">
          {err}
        </Text>
      )}
      <div>
        <div ref={quillRef} />
      </div>
    </>
  );
};

export default Memory;
