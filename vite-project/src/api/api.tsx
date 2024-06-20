const endpoint = "http://localhost:8080";
const deltagerURL = `${endpoint}/deltager`;
const hotelbyId = `${endpoint}/hotel`;

export interface Disciplin {
  id: number;
  navn: string;
  resultatType: string;
}

export interface Resultat {
  id: number;
  resultatType: string;
  dato: Date;
  resultatVaerdi: string;
  formattedResult: string;
}

export interface Deltager {
  id: number;
  name: string;
  kon: string;
  alder: number;
  klub: string;
  discipliner: Disciplin[];
  resultater: Resultat[];
}
async function getDeltagerList() {
  const response = await fetch(deltagerURL);
  return response.json();
}

async function getHotelById(id: number) {
  const response = await fetch(`${hotelbyId}/${id}`);
  return response.json();
}

export { getDeltagerList, getHotelById };
