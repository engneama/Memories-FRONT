//UI Components
import { Common } from "components";
import { Title, Center, ScrollArea } from "@mantine/core";

const List = ({ data, user }) => {
  //Data Array
  const comments = data.map((comment) => (
    <Common.Cards.Comment key={comment._id} data={comment} user={user} />
  ));
  return (
    <div>
      {!data.length > 0 && (
        <Center>
          <Title order={4}>Be the first to comment!</Title>
        </Center>
      )}
      {data.length > 0 && (
        <ScrollArea.Autosize maxHeight={"102vh"}>
          {comments}
        </ScrollArea.Autosize>
      )}
    </div>
  );
};

export default List;
