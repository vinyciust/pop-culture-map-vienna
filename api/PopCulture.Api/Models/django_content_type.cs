using System;
using System.Collections.Generic;

namespace PopCulture.Api.Models;

public partial class django_content_type
{
    public int id { get; set; }

    public string app_label { get; set; } = null!;

    public string model { get; set; } = null!;

    public virtual ICollection<auth_permission> auth_permissions { get; set; } = new List<auth_permission>();

    public virtual ICollection<django_admin_log> django_admin_logs { get; set; } = new List<django_admin_log>();
}
