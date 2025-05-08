namespace PopCulture.Api.Models
{
    public class LocationDto
    {
        public long   Id        { get; set; }       // era int, virou long
        public string Name      { get; set; } = string.Empty;
        public double Latitude  { get; set; }       // era decimal, virou double
        public double Longitude { get; set; }       // era decimal, virou double
    }
}
