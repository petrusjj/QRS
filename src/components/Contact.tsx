import useContacts from "../hooks/useContacts";

const VCards = () => {
  const { uploadContact, downloadContact } = useContacts();

  return (
    <div className="h-screen flex grow flex-col items-center justify-center">
      <img
        className="w-20 h20"
        alt="enesser"
        src="https://avatars2.githubusercontent.com/u/5659221?v=3&s=460"
      />
      <button
        onClick={uploadContact}
        className="h-10 bg-white rounded px-2 mt-10"
      >
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
