//Hooks
import { useStyles } from "./styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
//Actions
import { memory } from "services";
//UI Components
import { Container, Grid, Divider } from "@mantine/core";
import { MemoryDetails } from "components";
import { Common } from "components";

const Details = () => {
  const { classes } = useStyles();
  const { _id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [memoryData, setMemoryData] = useState(null);
  const [recosData, setRecosData] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const isMemoryReady = memoryData !== null;
  const isRecosReady = recosData !== null;

  const hanldeLike = async () => {
    console.log("LIKE");
  };

  const handleGetMemorysDetails = async () => {
    setIsLoading(true);
    try {
      const { data } = await memory.getSingle({ _id });
      setMemoryData(data.data.memory);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetRecommendations = async () => {
    try {
      const { data } = await memory.getRecommendations({ _id });
      setRecosData(data.data.recommendations);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetMemorysDetails();
    handleGetRecommendations();
  }, [_id]);

  return (
    <Container className={classes.section}>
      {!isMemoryReady && <Common.LoadingOverlay />}
      {isMemoryReady && (
        <MemoryDetails.Memory data={memoryData} like={hanldeLike} user={user} />
      )}
      <Grid>
        <Grid.Col xs={12} sm={8}>
          {/* COMMENTS SECTION */}
          <div>
            <Divider
              label="Comments"
              labelPosition="center"
              variant="dashed"
              my="xl"
              size="sm"
            />
            {/* <Comments /> */}
            COMMENTS
          </div>
        </Grid.Col>

        <Grid.Col xs={12} sm={4}>
          {/* RECOMMENDATION SECTION */}
          <div>
            <Divider
              label="You may also like"
              labelPosition="center"
              variant="dashed"
              my="xl"
              size="sm"
            />
            {!isRecosReady && <Common.LoadingOverlay />}
            {isRecosReady && (
              <MemoryDetails.Recommendations recos={recosData} />
            )}
          </div>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Details;
