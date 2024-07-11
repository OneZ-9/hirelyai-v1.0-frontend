import { ColorRing } from "react-loader-spinner";

function SpinnerMini() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ColorRing
        visible={true}
        height="14"
        width="14"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#d9ff00", "#d9ff00", "#d9ff00", "#d9ff00", "#d9ff00"]}
      />
    </div>
  );
}

export default SpinnerMini;
