import { useState, useEffect } from "react";
import { getDeltagerList, Deltager, deleteDeltager } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function DeltagerList() {
  const [deltagerlist, setDeltagerlist] = useState<Deltager[]>([]);
  const [filteredDeltagerList, setFilteredDeltagerList] = useState<Deltager[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCriteria, setFilterCriteria] = useState({
    kon: "",
    aldersklasse: "",
    klub: "",
    disciplin: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getDeltagerList().then((data) => {
      console.log("Fetched data:", data);
      setDeltagerlist(data);
      setFilteredDeltagerList(data);
    });
  }, []);

  useEffect(() => {
    let filteredList = deltagerlist;

    if (searchTerm) {
      filteredList = filteredList.filter((deltager) =>
        deltager.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    console.log("Filtering by gender:", filterCriteria.kon);
    if (filterCriteria.kon) {
      filteredList = filteredList.filter((deltager) => {
        console.log("Deltager gender:", deltager.kon);
        return deltager.kon === filterCriteria.kon;
      });
    }

    if (filterCriteria.aldersklasse) {
      filteredList = filteredList.filter(
        (deltager) =>
          getAldersklasse(deltager.alder) === filterCriteria.aldersklasse
      );
    }

    if (filterCriteria.klub) {
      filteredList = filteredList.filter(
        (deltager) => deltager.klub === filterCriteria.klub
      );
    }

    if (filterCriteria.disciplin) {
      filteredList = filteredList.filter((deltager) =>
        deltager.discipliner.some((d) => d.navn === filterCriteria.disciplin)
      );
    }

    console.log("Filtered list:", filteredList);
    setFilteredDeltagerList(filteredList);
  }, [searchTerm, filterCriteria, deltagerlist]);

  const getAldersklasse = (alder) => {
    if (alder < 18) return "Under 18";
    if (alder < 30) return "18-29";
    if (alder < 40) return "30-39";
    return "40+";
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Er du sikker på, at du vil slette denne deltager?")) {
      try {
        await deleteDeltager(id);
        setDeltagerlist(deltagerlist.filter((deltager) => deltager.id !== id));
      } catch (error) {
        console.error("Failed to delete deltager:", error);
        alert("Failed to delete deltager. Check the console for more details.");
      }
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilterCriteria((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Deltager oversigt
        </h1>
        <div className="mb-4 flex flex-wrap justify-between">
          <input
            type="text"
            placeholder="Søg efter navn"
            value={searchTerm}
            onChange={handleSearchChange}
            className="shadow appearance-none border rounded w-full md:w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 md:mb-0"
          />
          <select
            name="kon"
            value={filterCriteria.kon}
            onChange={handleFilterChange}
            className="ml-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 md:mb-0"
          >
            <option value="">Filter efter køn</option>
            <option value="M">Mand</option>
            <option value="K">Kvinde</option>
          </select>
          <select
            name="aldersklasse"
            value={filterCriteria.aldersklasse}
            onChange={handleFilterChange}
            className="ml-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 md:mb-0"
          >
            <option value="">Filter efter aldersklasse</option>
            <option value="Under 18">Under 18</option>
            <option value="18-29">18-29</option>
            <option value="30-39">30-39</option>
            <option value="40+">40+</option>
          </select>
          <select
            name="klub"
            value={filterCriteria.klub}
            onChange={handleFilterChange}
            className="ml-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 md:mb-0"
          >
            <option value="">Filter efter klub</option>
            <option value="Klub1">Klub1</option>
            <option value="Klub2">Klub2</option>
            <option value="Klub3">Klub3</option>
          </select>
          <select
            name="disciplin"
            value={filterCriteria.disciplin}
            onChange={handleFilterChange}
            className="ml-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Filter efter disciplin</option>
            <option value="100m løb">100m løb</option>
            <option value="Spydkast">Spydkast</option>
            <option value="Diskoskast">Diskoskast</option>
            <option value="Trespring">Trespring</option>
            <option value="Højdespring">Højdespring</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Navn
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Alder
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Køn
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Medlemsklub
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Discipliner
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Resultater
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Handlinger
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredDeltagerList?.map((deltager) => (
                <tr key={deltager.id} className="border-t border-gray-200">
                  <td className="py-3 px-4">{deltager.name}</td>
                  <td className="py-3 px-4">{deltager.alder}</td>
                  <td className="py-3 px-4">{deltager.kon}</td>
                  <td className="py-3 px-4">{deltager.klub}</td>
                  <td className="py-3 px-4">
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {deltager.discipliner?.map((disciplin, index) => (
                        <li
                          key={`${disciplin.id}-${index}`}
                          className="text-gray-700"
                        >
                          {disciplin.navn} - {disciplin.resultatType}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-3 px-4">
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {deltager.resultater?.map((resultat, index) => (
                        <li
                          key={`${resultat.id}-${index}`}
                          className="text-gray-700"
                        >
                          {resultat.formattedResult}
                          {"   "}
                          {resultat.resultatType}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      onClick={() => navigate(`/deltager/${deltager.id}/edit`)}
                      className="text-indigo-600 font-bold hover:underline text-sm"
                    >
                      Rediger
                    </button>
                    <button
                      onClick={() => handleDelete(deltager.id)}
                      className="text-red-600 font-bold hover:underline text-sm"
                    >
                      Slet
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
