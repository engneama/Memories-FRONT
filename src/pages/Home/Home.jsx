//Hooks
import { useEffect } from "react";
import { useStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "Hooks";
//Actions
import { getAll, like, _delete } from "store/memories/memories.thunk";
//UI Components
import { Common } from "components";
import { Container, Grid } from "@mantine/core";

const Home = () => {
  //Hookes
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { set } = useLocalStorage();
  //Selectors
  const data = useSelector((state) => state.memories);
  const { user } = useSelector((state) => state.auth);
  //Checkers
  const isReady = data.memories !== null;

  const likeMemory = async (data) => {
    try {
      await dispatch(like(data));
    } catch (error) {
      console.log("Home: ", error);
    }
  };

  const editMemory = (data) => {
    set("editMemory", data);
    navigate("/editMemory");
  };

  const deleteMemory = async (data) => {
    await dispatch(_delete(data));
  };

  const getAllMemories = async () => {
    await dispatch(getAll());
  };

  useEffect(() => {
    getAllMemories();
  }, []);

  const MemoriesArray =
    isReady &&
    data.memories?.map((memory, index) => (
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
          user={{ _id: user?._id, role: user?.role }}
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
