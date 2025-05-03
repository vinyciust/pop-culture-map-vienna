using System;
using System.Collections.Generic;

namespace PopCulture.Api.Models;

public partial class auth_user_group
{
    public long id { get; set; }

    public int user_id { get; set; }

    public int group_id { get; set; }

    public virtual auth_group group { get; set; } = null!;

    public virtual auth_user user { get; set; } = null!;
}
