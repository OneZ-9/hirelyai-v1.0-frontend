import { ColorRing } from "react-loader-spinner";

function SpinnerMini({ variant }) {
  // const variants = variant{

  // }
  return (
    <span>
      <ColorRing
        visible={true}
        height="16"
        width="16"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        // colors={["#d9ff00", "#d9ff00", "#d9ff00", "#d9ff00", "#d9ff00"]}
        colors={["#232320", "#232320", "#232320", "#232320", "#232320"]}
      />
    </span>
  );
}

export default SpinnerMini;
