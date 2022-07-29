const toolbar = [
  ["bold", "italic", "underline", "strike", "clean"],
  ["link", "video"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
];

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "clean",
  "header",
  "list",
  "align",
  "link",
  "video",
];

const placeholder = "What is on your minds...?";

const options = {
  modules: {
    magicUrl: true,
    toolbar,
  },
  formats,
  placeholder,
};

export default options;
