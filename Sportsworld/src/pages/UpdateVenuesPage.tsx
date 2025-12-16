import VenueForm from "../components/venues/VenueForm";

const UpdateVenuesPage = () => {
  return (
    <section className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Manage Venues
      </h1>
      <VenueForm />
    </section>
  );
};

export default UpdateVenuesPage;
