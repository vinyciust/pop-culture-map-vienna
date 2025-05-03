using System;
using System.Collections.Generic;

namespace PopCulture.Api.Models;

public partial class django_session
{
    public string session_key { get; set; } = null!;

    public string session_data { get; set; } = null!;

    public DateTime expire_date { get; set; }
}
