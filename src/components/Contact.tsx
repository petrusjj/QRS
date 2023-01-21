import { useCallback } from "react";
import { API } from "aws-amplify";
import { saveAs } from "file-saver";

type Props = {};

const VCards = (props: Props) => {
  const downloadContact = useCallback(async () => {
    const response = await API.get("qrsapi", "/downloadcontact", {});
    const blob = new Blob([response], { type: "text/vcard;charset=utf-8" });
    saveAs(blob, "enesser.vcf");
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
