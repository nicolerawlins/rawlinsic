import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"
import { authTables } from "@convex-dev/auth/server"

export default defineSchema({
  ...authTables,

  /**
   * Contact form submissions. Every POST to /api/contact writes
   * one row here. View them in the Convex dashboard at
   * https://dashboard.convex.dev — Tables → contactSubmissions.
   */
  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    organization: v.optional(v.string()),
    interest: v.optional(v.string()),
    message: v.string(),
    submittedAt: v.number(), // Unix epoch ms
    userAgent: v.optional(v.string()),
    referrer: v.optional(v.string()),
    ip: v.optional(v.string()),
  })
    .index("by_submitted_at", ["submittedAt"])
    .index("by_email", ["email"]),
})
