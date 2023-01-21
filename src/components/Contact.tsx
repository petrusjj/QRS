import { useCallback, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { saveAs } from "file-saver";

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

  const downloadContactThroughAPIAndBlob = useCallback(async () => {
    const response = await API.get("qrsapi", "/downloadcontact", {});
    const blob = new Blob([response], { type: "text/vcard;charset=utf-8" });
    downloadBlob(blob, "enesser.vcf");
  }, []);

  const downloadContactThroughAPIAndSaveAs = useCallback(async () => {
    const response = await API.get("qrsapi", "/downloadcontact", {});
    const blob = new Blob([response], { type: "text/vcard;charset=utf-8" });
    saveAs(blob, "enesser.vcf");
  }, []);

  const downloadContactThroughS3AndBlob = useCallback(async () => {
    const result = await Storage.get(`enesser.vcf`, {
      level: "public",
      download: true,
    });
    downloadBlob(result?.Body, "enesser.vcf");
  }, []);

  const downloadContactThroughS3AndSaveAs = useCallback(async () => {
    const result: any = await Storage.get(`enesser.vcf`, {
      level: "public",
      download: true,
    });
    saveAs(result?.Body, "enesser.vcf");
  }, []);

  const uploadBlob = useCallback(async () => {
    const response = await API.get("qrsapi", "/downloadcontact", {});
    await Storage.put("enesser.vcf", response);
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
        onClick={downloadContactThroughAPIAndBlob}
        className="h-10 bg-white rounded px-2 mt-10"
      >
        Download contact through API and Blob
      </button>
      <button
        onClick={downloadContactThroughAPIAndSaveAs}
        className="h-10 bg-white rounded px-2 mt-10"
      >
        Download contact through API and Save as
      </button>
      <button
        onClick={downloadContactThroughS3AndBlob}
        className="h-10 bg-white rounded px-2 mt-10"
      >
        Download contact through S3 and Blob
      </button>
      <button
        onClick={downloadContactThroughS3AndSaveAs}
        className="h-10 bg-white rounded px-2 mt-10"
      >
        Download contact through S3 and Save as
      </button>
    </div>
  );
};

export default VCards;
