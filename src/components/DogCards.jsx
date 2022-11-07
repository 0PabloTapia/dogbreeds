import { Card, Badge } from "antd";
import EmptyValues from "./EmptyValues";
import { handleCardStyle } from "../utils/handlers";

const DogCards = ({ breedVals }) => {
  return (
    <Card style={{ marginTop: "10px",paddingLeft: "3rem", backgroundColor: '#F5F5F5' }}>
      {breedVals.length === 0 ? (
        <EmptyValues />
      ) : (
        breedVals.map((x, i) => {
          return (
            <Card.Grid style={handleCardStyle(x)} key={i}>
              <Badge.Ribbon
                text={x.typeof}
                color={x.typeof === "breed" ? "#edd973" : "#99d1f2"}
              >
                <Card hoverable={true} title={x.breed} style={{ borderRadius: '10px' }} cover={<img src={x.dog} alt={"dog_image"} />} />
              </Badge.Ribbon>
            </Card.Grid>
          );
        })
      )}
    </Card>
  );
};

export default DogCards;
