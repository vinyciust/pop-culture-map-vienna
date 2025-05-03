namespace PopCulture.Api.Models
{
    public class LocationDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }
}
