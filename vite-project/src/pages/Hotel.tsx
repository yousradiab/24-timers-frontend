// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getHotelById } from "../api/api";
// import type { Deltager } from "../api/api";

// interface RouteParams {
//   id: number; // Angiv id som number
//   [key: string]: string | undefined;
// }

export default function Hotel() {
  //   const { id } = useParams<RouteParams>(); // Brug RouteParams som typen for useParams
  //   const [deltager, setdeltager] = useState<Deltager | null>(null);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState<string | null>(null);
  //   useEffect(() => {
  //     setLoading(true); // Angiv loading til true ved start af datahentning
  //     setError(null); // Nulstil fejl tilstand
  //     getHotelById(id) // Brug id direkte som number
  //       .then((data) => {
  //         setHotel(data);
  //       })
  //       .catch((error) => {
  //         setError("Fejl ved hentning af hotel data.");
  //         console.error(error);
  //       })
  //       .finally(() => {
  //         setLoading(false); // Slut med at indlæse, uanset om det var succesfuldt eller ej
  //       });
  //   }, [id]);
  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }
  //   if (error) {
  //     return <div>Der opstod en fejl: {error}</div>;
  //   }
  //   return (
  //     <div className="min-h-screen bg-gray-100 p-4">
  //       <div className="container mx-auto">
  //         <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
  //           {hotel?.name}
  //         </h1>
  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  //           {hotel?.rooms.map((room) => (
  //             <div
  //               key={room.id}
  //               className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
  //             >
  //               <div className="p-4">
  //                 <h2 className="text-lg font-semibold mb-1 text-gray-800">
  //                   Room {room.roomNumber}
  //                 </h2>
  //                 <p className="text-gray-600 text-sm mb-2">
  //                   {room.nunmberOfBeds} beds - {room.price}€
  //                 </p>
  //               </div>
  //               <div className="bg-gray-50 p-2 text-right">
  //                 <button className="text-indigo-600 font-bold hover:underline text-sm">
  //                   Book Now
  //                 </button>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
}
