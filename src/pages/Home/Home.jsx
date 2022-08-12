//Hooks
import { useEffect } from "react";
import { useStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
//Actions
import { getAll } from "store/memories/memories.thunk";
//UI Components
import { Common } from "components";
import { Container, Grid } from "@mantine/core";

const Home = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const memoriesData = useSelector((state) => state.memories);
  const { user: userData } = useSelector((state) => state.auth);

  const isReady = memoriesData.memories !== null;

  const likeMemory = async (data) => {
    console.log("likeMemory: ", data);
  };

  const editMemory = async (data) => {
    console.log("editMemory: ", data);
  };

  const deleteMemory = async (data) => {
    console.log("deleteMemory: ", data);
  };

  const getAllMemories = async () => {
    await dispatch(getAll());
  };

  useEffect(() => {
    getAllMemories();
  }, []);

  const MemoriesArray =
    isReady &&
    memoriesData.memories?.map((memory, index) => (
      <Grid.Col
        key={memory._id + index}
        xs={12}
        sm={6}
        md={6}
        lg={3}
        sx={{ display: "flex", flexGrow: 1 }}
      >
        <Common.Cards.Memory
          key={memory._id}
          data={memory}
          userId={userData?._id}
          like={likeMemory}
          edit={editMemory}
          _delete={deleteMemory}
        />
      </Grid.Col>
    ));

  return (
    <section className={classes.section}>
      <Container size="xl">
        <Grid>{MemoriesArray}</Grid>
      </Container>
    </section>
  );
};

export default Home;
