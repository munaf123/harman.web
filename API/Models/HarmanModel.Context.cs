﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace HarmanAssignment.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class HarmanDBEntities : DbContext
    {
        public HarmanDBEntities()
            : base("name=HarmanDBEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Adress> Adresses { get; set; }
        public virtual DbSet<Task> Tasks { get; set; }
        public virtual DbSet<Visitor> Visitors { get; set; }
        public virtual DbSet<Note> Notes { get; set; }
    }
}
