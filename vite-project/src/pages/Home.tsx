import NavHeader from "../components/NavHeader";

export default function HomePage() {
  return (
    <>
      <NavHeader />

      <main className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold text-gray-800">Home Page</h1>
        <p className="text-gray-600">
          Welcome to the home page of our website.
        </p>
      </main>
    </>
  );
}
