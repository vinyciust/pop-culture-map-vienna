using System;
using System.Collections.Generic;

namespace PopCulture.Api.Models;

public partial class auth_user
{
    public int id { get; set; }

    public string password { get; set; } = null!;

    public DateTime? last_login { get; set; }

    public bool is_superuser { get; set; }

    public string username { get; set; } = null!;

    public string first_name { get; set; } = null!;

    public string last_name { get; set; } = null!;

    public string email { get; set; } = null!;

    public bool is_staff { get; set; }

    public bool is_active { get; set; }

    public DateTime date_joined { get; set; }

    public virtual ICollection<auth_user_group> auth_user_groups { get; set; } = new List<auth_user_group>();

    public virtual ICollection<auth_user_user_permission> auth_user_user_permissions { get; set; } = new List<auth_user_user_permission>();

    public virtual ICollection<django_admin_log> django_admin_logs { get; set; } = new List<django_admin_log>();
}
