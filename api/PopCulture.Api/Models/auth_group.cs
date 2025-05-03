using System;
using System.Collections.Generic;

namespace PopCulture.Api.Models;

public partial class auth_group
{
    public int id { get; set; }

    public string name { get; set; } = null!;

    public virtual ICollection<auth_group_permission> auth_group_permissions { get; set; } = new List<auth_group_permission>();

    public virtual ICollection<auth_user_group> auth_user_groups { get; set; } = new List<auth_user_group>();
}
