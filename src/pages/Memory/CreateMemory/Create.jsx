//Packages
import { yupResolver } from "@hookform/resolvers/yup";
//Hooks
import { useStyles } from "./styes";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
//Helpers
import { tagsHandler, descriptionHandler } from "helpers";
//rules
import { memorySchema } from "rules";
//UI Components
import { Common, RichEditor } from "components";
import { Stack, Paper, Button, Title, Container } from "@mantine/core";
//Icons
import { TbPencil, TbSend } from "react-icons/tb";
//Actions
import { create } from "store/memories/memories.thunk";

const Create = () => {
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(memorySchema),
  });

  const handleImageSelect = (data) => {
    methods.register("cover");
    methods.setValue("cover", data);
  };

  const handleBodyChange = (data) => {
    methods.setValue("body", data.body);

    //register and setValue to new field
    methods.register("description");
    methods.setValue("description", data.description);
  };

  const handleOnSubmit = async (data) => {
    setIsLoading(true);

    data.tags = await tagsHandler(data.tags);
    data.description = await descriptionHandler(data.description);
    data.author = auth?.user?._id;

    const { payload } = await dispatch(create(data));

    if (payload?.memory) {
      navigate("/");
    }

    setIsLoading(false);
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
                <Common.ControlledFields.Text
                  type="text"
                  name="title"
                  label="Title"
                  holder="Your memory's title"
                  icon={<TbPencil />}
                />
                {/* Tags */}
                <Common.ControlledFields.Tags />
                {/* Image Select */}
                <Common.UncontrolledFields.ImageSelect
                  data={handleImageSelect}
                  err={methods.formState.errors?.cover?.message}
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
              loading={isLoading}
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

export default Create;
