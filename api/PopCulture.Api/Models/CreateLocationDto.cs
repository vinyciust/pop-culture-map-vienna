namespace PopCulture.Api.Models
{
    public class CreateLocationDto
    {
        public string Name        { get; set; } = string.Empty;
        public double Latitude    { get; set; }
        public double Longitude   { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Category    { get; set; } = string.Empty;
        public string ImageUrl    { get; set; } = string.Empty;
        public string City        { get; set; } = string.Empty;
        public string Country     { get; set; } = string.Empty;
        public string Origin      { get; set; } = string.Empty;
    }
}

namespace PopCulture.Api.Models
{
    public class UpdateLocationDto : CreateLocationDto
    {
        // herda todos e você pode adicionar validações específicas
    }
}
