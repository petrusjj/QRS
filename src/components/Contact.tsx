import { useCallback, useEffect } from "react";
import { API, Storage } from "aws-amplify";
// import { saveAs } from "file-saver";

const VCards = () => {
  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = useCallback(async () => {
    const list = await Storage.list("", { pageSize: "ALL" });
    console.log(list);
  }, []);

  const downloadBlob = (blob: any, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "download";
    const clickHandler = () => {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.removeEventListener("click", clickHandler);
      }, 150);
    };
    a.addEventListener("click", clickHandler, false);
    a.click();
    return a;
  };

  // https://docs.amplify.aws/lib/storage/download/q/platform/js/#file-download-option
  // https://www.reddit.com/r/learnprogramming/comments/ei9f2b/comment/fcp2ath/?utm_source=share&utm_medium=web2x&context=3
  const downloadContact = useCallback(async () => {
    const result = await Storage.get(`enesser.vcf`, { download: true });
    console.log(result);
    downloadBlob(result?.Body, "enesser.vcf");
    console.log(result);
  }, []);

  const uploadBlob = useCallback(async () => {
    const response = await API.get("qrsapi", "/downloadcontact", {});
    // const blob = new Blob([response], { type: "text/vcard;charset=utf-8" });
    await Storage.put("enesser.vcf", response);
    // downloadContact(blob);
    // saveAs(blob, "enesser.vcf");
  }, []);

  return (
    <div className="h-screen flex grow flex-col items-center justify-center">
      <img
        className="w-20 h20"
        alt="enesser"
        src="https://avatars2.githubusercontent.com/u/5659221?v=3&s=460"
      />
      <button onClick={uploadBlob} className="h-10 bg-white rounded px-2 mt-10">
        Upload contact
      </button>
      <button
        onClick={downloadContact}
        className="h-10 bg-white rounded px-2 mt-10"
      >
        Download contact
      </button>
    </div>
  );
};

export default VCards;
