namespace SportsworldAPI.Interfaces;

// Interface for Venue
interface IVenue
{
    int Id { get; set;}
    string Name { get; set; }
    int Capacity { get; set; }
    string Image { get; set; }
}