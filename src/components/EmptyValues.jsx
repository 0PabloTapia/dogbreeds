import { ReactComponent as Doggie } from "../images/doggie.svg";

const EmptyValues = () => {
  return (
    <>
    <div style={{ marginTop: '5rem' }}>
      <h1 style={{ color: '#73c4ef', fontWeight: '100' }} >There seems to be no dogs wandering here :( </h1>
      <Doggie />
    </div>
    </>
  );
};

export default EmptyValues;
