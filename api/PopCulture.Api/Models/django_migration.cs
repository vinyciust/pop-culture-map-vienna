using System;
using System.Collections.Generic;

namespace PopCulture.Api.Models;

public partial class django_migration
{
    public long id { get; set; }

    public string app { get; set; } = null!;

    public string name { get; set; } = null!;

    public DateTime applied { get; set; }
}
