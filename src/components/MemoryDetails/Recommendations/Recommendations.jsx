//UI Components
import { Center } from "@mantine/core";
import { Text, SimpleGrid } from "@mantine/core";
import { Common } from "components";
//Variables
const gridBreakPoints = [
  { maxWidth: 980, cols: 1, spacing: "md" },
  { maxWidth: 755, cols: 1, spacing: "sm" },
  { maxWidth: 600, cols: 1, spacing: "sm" },
];

const Recommendations = ({ recos }) => {
  return (
    <SimpleGrid
      cols={1}
      spacing="xs"
      // breakpoints={gridBreakPoints}
    >
      {recos.length > 0 ? (
        recos.map((reco) => (
          <Common.Cards.Recommendation key={reco.title} data={reco} />
        ))
      ) : (
        <Center>
          <Text color="dimmed">No similar memories were found</Text>
        </Center>
      )}
    </SimpleGrid>
  );
};

export default Recommendations;
