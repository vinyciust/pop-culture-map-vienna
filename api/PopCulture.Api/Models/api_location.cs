using System;
using System.Collections.Generic;

namespace PopCulture.Api.Models;

public partial class api_location
{
    public long id { get; set; }

    public string name { get; set; } = null!;

    public string description { get; set; } = null!;

    public double latitude { get; set; }

    public double longitude { get; set; }

    public string category { get; set; } = null!;

    public string image_url { get; set; } = null!;

    public string city { get; set; } = null!;

    public string country { get; set; } = null!;

    public string origin { get; set; } = null!;
}
