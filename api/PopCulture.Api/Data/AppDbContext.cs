using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using PopCulture.Api.Models;

namespace PopCulture.Api.Data;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<api_location> api_location { get; set; }

    public virtual DbSet<auth_group> auth_groups { get; set; }

    public virtual DbSet<auth_group_permission> auth_group_permissions { get; set; }

    public virtual DbSet<auth_permission> auth_permissions { get; set; }

    public virtual DbSet<auth_user> auth_users { get; set; }

    public virtual DbSet<auth_user_group> auth_user_groups { get; set; }

    public virtual DbSet<auth_user_user_permission> auth_user_user_permissions { get; set; }

    public virtual DbSet<django_admin_log> django_admin_logs { get; set; }

    public virtual DbSet<django_content_type> django_content_types { get; set; }

    public virtual DbSet<django_migration> django_migrations { get; set; }

    public virtual DbSet<django_session> django_sessions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Port=5433;Database=pop_culture_db;Username=dbapop;Password=dbapop");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<api_location>(entity =>
        {
            entity.HasKey(e => e.id).HasName("api_location_pkey");

            entity.ToTable("api_location");

            entity.Property(e => e.category).HasMaxLength(50);
            entity.Property(e => e.city).HasMaxLength(100);
            entity.Property(e => e.country).HasMaxLength(100);
            entity.Property(e => e.image_url).HasMaxLength(200);
            entity.Property(e => e.name).HasMaxLength(100);
            entity.Property(e => e.origin).HasMaxLength(50);
        });

        modelBuilder.Entity<auth_group>(entity =>
        {
            entity.HasKey(e => e.id).HasName("auth_group_pkey");

            entity.ToTable("auth_group");

            entity.HasIndex(e => e.name, "auth_group_name_a6ea08ec_like").HasOperators(new[] { "varchar_pattern_ops" });

            entity.HasIndex(e => e.name, "auth_group_name_key").IsUnique();

            entity.Property(e => e.name).HasMaxLength(150);
        });

        modelBuilder.Entity<auth_group_permission>(entity =>
        {
            entity.HasKey(e => e.id).HasName("auth_group_permissions_pkey");

            entity.HasIndex(e => e.group_id, "auth_group_permissions_group_id_b120cbf9");

            entity.HasIndex(e => new { e.group_id, e.permission_id }, "auth_group_permissions_group_id_permission_id_0cd325b0_uniq").IsUnique();

            entity.HasIndex(e => e.permission_id, "auth_group_permissions_permission_id_84c5c92e");

            entity.HasOne(d => d.group).WithMany(p => p.auth_group_permissions)
                .HasForeignKey(d => d.group_id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("auth_group_permissions_group_id_b120cbf9_fk_auth_group_id");

            entity.HasOne(d => d.permission).WithMany(p => p.auth_group_permissions)
                .HasForeignKey(d => d.permission_id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("auth_group_permissio_permission_id_84c5c92e_fk_auth_perm");
        });

        modelBuilder.Entity<auth_permission>(entity =>
        {
            entity.HasKey(e => e.id).HasName("auth_permission_pkey");

            entity.ToTable("auth_permission");

            entity.HasIndex(e => e.content_type_id, "auth_permission_content_type_id_2f476e4b");

            entity.HasIndex(e => new { e.content_type_id, e.codename }, "auth_permission_content_type_id_codename_01ab375a_uniq").IsUnique();

            entity.Property(e => e.codename).HasMaxLength(100);
            entity.Property(e => e.name).HasMaxLength(255);

            entity.HasOne(d => d.content_type).WithMany(p => p.auth_permissions)
                .HasForeignKey(d => d.content_type_id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("auth_permission_content_type_id_2f476e4b_fk_django_co");
        });

        modelBuilder.Entity<auth_user>(entity =>
        {
            entity.HasKey(e => e.id).HasName("auth_user_pkey");

            entity.ToTable("auth_user");

            entity.HasIndex(e => e.username, "auth_user_username_6821ab7c_like").HasOperators(new[] { "varchar_pattern_ops" });

            entity.HasIndex(e => e.username, "auth_user_username_key").IsUnique();

            entity.Property(e => e.email).HasMaxLength(254);
            entity.Property(e => e.first_name).HasMaxLength(150);
            entity.Property(e => e.last_name).HasMaxLength(150);
            entity.Property(e => e.password).HasMaxLength(128);
            entity.Property(e => e.username).HasMaxLength(150);
        });

        modelBuilder.Entity<auth_user_group>(entity =>
        {
            entity.HasKey(e => e.id).HasName("auth_user_groups_pkey");

            entity.HasIndex(e => e.group_id, "auth_user_groups_group_id_97559544");

            entity.HasIndex(e => e.user_id, "auth_user_groups_user_id_6a12ed8b");

            entity.HasIndex(e => new { e.user_id, e.group_id }, "auth_user_groups_user_id_group_id_94350c0c_uniq").IsUnique();

            entity.HasOne(d => d.group).WithMany(p => p.auth_user_groups)
                .HasForeignKey(d => d.group_id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("auth_user_groups_group_id_97559544_fk_auth_group_id");

            entity.HasOne(d => d.user).WithMany(p => p.auth_user_groups)
                .HasForeignKey(d => d.user_id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("auth_user_groups_user_id_6a12ed8b_fk_auth_user_id");
        });

        modelBuilder.Entity<auth_user_user_permission>(entity =>
        {
            entity.HasKey(e => e.id).HasName("auth_user_user_permissions_pkey");

            entity.HasIndex(e => e.permission_id, "auth_user_user_permissions_permission_id_1fbb5f2c");

            entity.HasIndex(e => e.user_id, "auth_user_user_permissions_user_id_a95ead1b");

            entity.HasIndex(e => new { e.user_id, e.permission_id }, "auth_user_user_permissions_user_id_permission_id_14a6b632_uniq").IsUnique();

            entity.HasOne(d => d.permission).WithMany(p => p.auth_user_user_permissions)
                .HasForeignKey(d => d.permission_id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm");

            entity.HasOne(d => d.user).WithMany(p => p.auth_user_user_permissions)
                .HasForeignKey(d => d.user_id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id");
        });

        modelBuilder.Entity<django_admin_log>(entity =>
        {
            entity.HasKey(e => e.id).HasName("django_admin_log_pkey");

            entity.ToTable("django_admin_log");

            entity.HasIndex(e => e.content_type_id, "django_admin_log_content_type_id_c4bce8eb");

            entity.HasIndex(e => e.user_id, "django_admin_log_user_id_c564eba6");

            entity.Property(e => e.object_repr).HasMaxLength(200);

            entity.HasOne(d => d.content_type).WithMany(p => p.django_admin_logs)
                .HasForeignKey(d => d.content_type_id)
                .HasConstraintName("django_admin_log_content_type_id_c4bce8eb_fk_django_co");

            entity.HasOne(d => d.user).WithMany(p => p.django_admin_logs)
                .HasForeignKey(d => d.user_id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("django_admin_log_user_id_c564eba6_fk_auth_user_id");
        });

        modelBuilder.Entity<django_content_type>(entity =>
        {
            entity.HasKey(e => e.id).HasName("django_content_type_pkey");

            entity.ToTable("django_content_type");

            entity.HasIndex(e => new { e.app_label, e.model }, "django_content_type_app_label_model_76bd3d3b_uniq").IsUnique();

            entity.Property(e => e.app_label).HasMaxLength(100);
            entity.Property(e => e.model).HasMaxLength(100);
        });

        modelBuilder.Entity<django_migration>(entity =>
        {
            entity.HasKey(e => e.id).HasName("django_migrations_pkey");

            entity.Property(e => e.app).HasMaxLength(255);
            entity.Property(e => e.name).HasMaxLength(255);
        });

        modelBuilder.Entity<django_session>(entity =>
        {
            entity.HasKey(e => e.session_key).HasName("django_session_pkey");

            entity.ToTable("django_session");

            entity.HasIndex(e => e.expire_date, "django_session_expire_date_a5c62663");

            entity.HasIndex(e => e.session_key, "django_session_session_key_c0390e0f_like").HasOperators(new[] { "varchar_pattern_ops" });

            entity.Property(e => e.session_key).HasMaxLength(40);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
