using System;
using System.Collections.Generic;

namespace PopCulture.Api.Models;

public partial class auth_group_permission
{
    public long id { get; set; }

    public int group_id { get; set; }

    public int permission_id { get; set; }

    public virtual auth_group group { get; set; } = null!;

    public virtual auth_permission permission { get; set; } = null!;
}
