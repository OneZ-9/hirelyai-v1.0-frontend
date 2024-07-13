import { ColorRing } from "react-loader-spinner";

function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#219ebc", "#219ebc", "#219ebc", "#219ebc", "#219ebc"]}
      />
    </div>
  );
}

export default Spinner;
