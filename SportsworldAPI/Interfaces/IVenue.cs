namespace SportsworldAPI.Interfaces;

interface IVenue
{
    int Id { get; set;}
    string Name { get; set; }
    int Capacity { get; set; }
    string Image { get; set; }
}