using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Meeting_Room_Booking_Application.Models;

public partial class MeetingApplicationContext : DbContext
{
    public MeetingApplicationContext()
    {
    }

    public MeetingApplicationContext(DbContextOptions<MeetingApplicationContext> options)
        : base(options)
    {
    }

    public virtual DbSet<BookMeeting> BookMeetings { get; set; }

    public virtual DbSet<Location> Locations { get; set; }

    public virtual DbSet<Room> Rooms { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    { 

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BookMeeting>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BookMeet__3214EC27CEA4F2CB");

            entity.ToTable("BookMeeting");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.BookDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("date");
            entity.Property(e => e.MeetingId).HasColumnName("MeetingID");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Meeting).WithMany(p => p.BookMeetings)
                .HasForeignKey(d => d.MeetingId)
                .HasConstraintName("FK__BookMeeti__Meeti__3E52440B");

            entity.HasOne(d => d.User).WithMany(p => p.BookMeetings)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__BookMeeti__UserI__3F466844");
        });

        modelBuilder.Entity<Location>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Location__3214EC275C22DA5B");

            entity.ToTable("Location");

            entity.Property(e => e.Id).HasColumnName("ID");
        });

        modelBuilder.Entity<Room>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Rooms__3214EC277E5F58B0");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.LocationId).HasColumnName("LocationID");

            entity.HasOne(d => d.Location).WithMany(p => p.Rooms)
                .HasForeignKey(d => d.LocationId)
                .HasConstraintName("FK__Rooms__LocationI__398D8EEE");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC27CCAAF1FA");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.LocationId).HasColumnName("LocationID");

            entity.HasOne(d => d.Location).WithMany(p => p.Users)
                .HasForeignKey(d => d.LocationId)
                .HasConstraintName("FK__Users__Locationn__4BAC3F29");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
