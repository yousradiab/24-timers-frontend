import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Deltager, updateDeltager, getDeltagerById } from "../api/api";

export function UpdateDeltagerForm() {
  const { id } = useParams<{ id: string }>();
  const [deltager, setDeltager] = useState<Deltager | null>(null);
  const [newDisciplin, setNewDisciplin] = useState({
    id: 0,
    navn: "",
    resultatType: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getDeltagerById(parseInt(id))
        .then((data) => {
          console.log("Fetched deltager:", data);
          setDeltager(data);
        })
        .catch((error) => {
          console.error("Error fetching deltager:", error);
          alert(
            "Failed to fetch deltager. Check the console for more details."
          );
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (deltager) {
      const { name, value } = e.target;
      setDeltager((prevState) => prevState && { ...prevState, [name]: value });
    }
  };

  const handleDisciplinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDisciplin((prevState) => ({ ...prevState, [name]: value }));
  };

  const addDisciplin = () => {
    if (deltager) {
      setDeltager(
        (prevState) =>
          prevState && {
            ...prevState,
            discipliner: [
              ...prevState.discipliner,
              { ...newDisciplin, id: prevState.discipliner.length + 1 },
            ],
          }
      );
      setNewDisciplin({ id: 0, navn: "", resultatType: "" });
    }
  };

  const removeDisciplin = (index: number) => {
    if (deltager) {
      setDeltager(
        (prevState) =>
          prevState && {
            ...prevState,
            discipliner: prevState.discipliner.filter((_, i) => i !== index),
          }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (deltager) {
      try {
        console.log("Submitting deltager:", deltager);
        await updateDeltager(deltager.id, deltager);
        navigate("/deltager");
      } catch (error) {
        console.error("Failed to update deltager:", error);
        alert("Failed to update deltager. Check the console for more details.");
      }
    }
  };

  if (!deltager) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Rediger Deltager
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Navn
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={deltager.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="kon"
            >
              Køn
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="kon"
              type="text"
              name="kon"
              value={deltager.kon}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="alder"
            >
              Alder
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="alder"
              type="number"
              name="alder"
              value={deltager.alder}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="klub"
            >
              Medlemsklub
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="klub"
              type="text"
              name="klub"
              value={deltager.klub}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-1 text-gray-700">
              Discipliner
            </h3>
            {deltager.discipliner.map((disciplin, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-2"
              >
                <span>
                  {disciplin.navn} - {disciplin.resultatType}
                </span>
                <button
                  type="button"
                  onClick={() => removeDisciplin(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Fjern
                </button>
              </div>
            ))}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              id="disciplinNavn"
              type="text"
              name="navn"
              placeholder="Disciplin navn"
              value={newDisciplin.navn}
              onChange={handleDisciplinChange}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              id="disciplinResultatType"
              type="text"
              name="resultatType"
              placeholder="Resultat Type"
              value={newDisciplin.resultatType}
              onChange={handleDisciplinChange}
            />
            <button
              type="button"
              onClick={addDisciplin}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Tilføj Disciplin
            </button>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Opdater
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateDeltagerForm;
