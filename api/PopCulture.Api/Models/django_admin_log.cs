using System;
using System.Collections.Generic;

namespace PopCulture.Api.Models;

public partial class django_admin_log
{
    public int id { get; set; }

    public DateTime action_time { get; set; }

    public string? object_id { get; set; }

    public string object_repr { get; set; } = null!;

    public short action_flag { get; set; }

    public string change_message { get; set; } = null!;

    public int? content_type_id { get; set; }

    public int user_id { get; set; }

    public virtual django_content_type? content_type { get; set; }

    public virtual auth_user user { get; set; } = null!;
}
