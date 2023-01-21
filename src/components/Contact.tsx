import { useCallback } from "react";
import { API } from "aws-amplify";
// import { saveAs } from "file-saver";

const VCards = () => {
  const downloadContact = useCallback((blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "enesser";
    const clickHandler = () => {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.removeEventListener("click", clickHandler);
      }, 150);
    };
    a.addEventListener("click", clickHandler, false);
    a.click();
    return a;
  }, []);

  const fetchBlob = useCallback(async () => {
    const response = await API.get("qrsapi", "/downloadcontact", {});
    const blob = new Blob([response], { type: "text/vcard;charset=utf-8" });
    downloadContact(blob);
    // saveAs(blob, "enesser.vcf");
  }, []);

  return (
    <div className="h-screen flex grow flex-col items-center justify-center">
      <img
        className="w-20 h20"
        alt="enesser"
        src="https://avatars2.githubusercontent.com/u/5659221?v=3&s=460"
      />
      <button onClick={fetchBlob} className="h-10 bg-white rounded px-2 mt-10">
        Download contact
      </button>
    </div>
  );
};

export default VCards;
