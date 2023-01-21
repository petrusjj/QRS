import { useCallback } from "react";
import { API } from "aws-amplify";

type Props = {};

const VCards = (props: Props) => {
  const downloadContact = useCallback(async () => {
    const response = await API.get("qrsapi", "/downloadcontact", {});
    console.log(1337, "data", response);
    alert(response);
  }, []);

  return (
    <div className="h-screen flex grow items-center justify-center">
      <button onClick={downloadContact} className="h-10 bg-white rounded px-2">
        Download contact
      </button>
    </div>
  );
};

export default VCards;
