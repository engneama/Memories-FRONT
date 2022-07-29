//Packages
import { yupResolver } from "@hookform/resolvers/yup";
//Hooks
import { useStyles } from "./styes";
import { useForm, FormProvider } from "react-hook-form";
//Components
//Helpers
import { tagsHandler, descriptionHandler } from "helpers";
//rules
import { memorySchema } from "rules";
//UI Components
import { Stack, Paper, Button, Title, Container } from "@mantine/core";
import { ControlledFields } from "components/common";
import { RichEditor } from "components";
import ImageSelect from "components/common/UncontrolledFields/ImageSelect";
//Icons
import { TbPencil, TbSend } from "react-icons/tb";

const CreateMemory = () => {
  const { classes } = useStyles();
  const methods = useForm({
    resolver: yupResolver(memorySchema),
  });

  const handleImageSelect = (data) => {
    methods.register("image");
    methods.setValue("image", data);
  };

  const handleBodyChange = (data) => {
    methods.setValue("body", data.body);

    //register and setValue to new field
    methods.register("description");
    methods.setValue("description", data.description);
  };

  const handleOnSubmit = async (data) => {
    data.tags = await tagsHandler(data.tags);
    data.description = await descriptionHandler(data.description);
  };

  return (
    <section className={classes.section}>
      <Container size="xs">
        <Title align="center" className={classes.title}>
          Create new Memory!
        </Title>
        <Paper withBorder className={classes.paper}>
          <form onSubmit={methods.handleSubmit(handleOnSubmit)}>
            <FormProvider {...methods}>
              <Stack>
                {/* Title */}
                <ControlledFields.Text
                  type="text"
                  name="title"
                  label="Title"
                  holder="Your memory's title"
                  icon={<TbPencil />}
                />
                {/* Tags */}
                <ControlledFields.Tags />
                {/* Image Select */}
                <ImageSelect
                  data={handleImageSelect}
                  err={methods.formState.errors?.image?.message}
                />
                {/* Body */}
                <div>
                  <RichEditor.Memory
                    data={handleBodyChange}
                    err={methods.formState.errors?.body?.message}
                  />
                </div>
              </Stack>
            </FormProvider>
            <Button
              mt="xl"
              type="submit"
              loaderPosition="right"
              leftIcon={<TbSend size={18} />}
              fullWidth
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </section>
  );
};

export default CreateMemory;
