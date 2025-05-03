using System;
using System.Collections.Generic;

namespace PopCulture.Api.Models;

public partial class auth_user_user_permission
{
    public long id { get; set; }

    public int user_id { get; set; }

    public int permission_id { get; set; }

    public virtual auth_permission permission { get; set; } = null!;

    public virtual auth_user user { get; set; } = null!;
}
