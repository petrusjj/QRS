import { API, Storage } from "aws-amplify";
import { useCallback } from "react";
import { downloadBlob } from "../utils/blob";

const useContacts = () => {
  const getContacts = useCallback(async () => {
    const list = await Storage.list("", { pageSize: "ALL" });
    console.log(list);
  }, []);

  const downloadContact = useCallback(async () => {
    const result: any = await Storage.get(`petrus.vcf`, {
      level: "public",
      download: true,
    });
    downloadBlob(result?.Body, "petrus.vcf");
  }, []);

  const uploadContact = useCallback(async () => {
    const response = await API.get("qrsapi", "/downloadcontact", {});
    await Storage.put("petrus.vcf", response);
  }, []);

  return { getContacts, downloadContact, uploadContact };
};

export default useContacts;
