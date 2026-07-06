import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

/**
 * Store a new contact form submission.
 * Called from app/api/contact/route.ts after the email is sent.
 */
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    organization: v.optional(v.string()),
    interest: v.optional(v.string()),
    message: v.string(),
    submittedAt: v.number(),
    userAgent: v.optional(v.string()),
    referrer: v.optional(v.string()),
    ip: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("contactSubmissions", args)
    return id
  },
})

/**
 * Paginated list, newest first. Handy for any future admin view.
 */
export const list = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50
    return await ctx.db
      .query("contactSubmissions")
      .withIndex("by_submitted_at")
      .order("desc")
      .take(limit)
  },
})
