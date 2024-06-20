import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDeltagerById, updateDeltager, Deltager } from "../api/api";

export default function EditDeltagerForm() {
  const { id } = useParams<{ id: string }>();
  const [deltager, setDeltager] = useState<Deltager | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getDeltagerById(Number(id)).then((data) => {
      setDeltager(data);
    });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeltager((prevState) =>
      prevState ? { ...prevState, [name]: value } : null
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deltager) {
      updateDeltager(deltager.id, deltager).then(() => {
        navigate("/deltager");
      });
    }
  };

  if (!deltager) {
    return <div>Loading...</div>;
  }

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
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Gem Ændringer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
