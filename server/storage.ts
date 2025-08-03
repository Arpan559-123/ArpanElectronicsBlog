import { 
  users, categories, blogPosts, projects, contacts, newsletter, media,
  type User, type InsertUser, type Category, type InsertCategory,
  type BlogPost, type InsertBlogPost, type Project, type InsertProject,
  type Contact, type InsertContact, type Newsletter, type InsertNewsletter,
  type Media, type InsertMedia
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, like, sql } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Blog Posts
  getBlogPosts(limit?: number, offset?: number): Promise<BlogPost[]>;
  getPublishedBlogPosts(limit?: number, offset?: number): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<void>;
  incrementBlogPostViews(id: string): Promise<void>;

  // Projects
  getProjects(limit?: number, offset?: number): Promise<Project[]>;
  getPublishedProjects(limit?: number, offset?: number): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: string): Promise<void>;
  incrementProjectViews(id: string): Promise<void>;

  // Contacts
  getContacts(limit?: number, offset?: number): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContactStatus(id: string, status: string): Promise<void>;

  // Newsletter
  addToNewsletter(email: string): Promise<Newsletter>;
  getNewsletterSubscribers(): Promise<Newsletter[]>;

  // Media
  getMedia(limit?: number, offset?: number): Promise<Media[]>;
  uploadMedia(media: InsertMedia): Promise<Media>;
  deleteMedia(id: string): Promise<void>;

  // Analytics
  getAnalytics(): Promise<{
    totalPosts: number;
    totalProjects: number;
    totalViews: number;
    totalContacts: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories).orderBy(categories.name);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category || undefined;
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db.insert(categories).values(insertCategory).returning();
    return category;
  }

  // Blog Posts
  async getBlogPosts(limit = 50, offset = 0): Promise<BlogPost[]> {
    return await db.select().from(blogPosts)
      .orderBy(desc(blogPosts.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async getPublishedBlogPosts(limit = 50, offset = 0): Promise<BlogPost[]> {
    return await db.select().from(blogPosts)
      .where(eq(blogPosts.status, 'published'))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit)
      .offset(offset);
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(insertPost).returning();
    return post;
  }

  async updateBlogPost(id: string, updateData: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [post] = await db.update(blogPosts)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return post;
  }

  async deleteBlogPost(id: string): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  async incrementBlogPostViews(id: string): Promise<void> {
    await db.update(blogPosts)
      .set({ views: sql`${blogPosts.views} + 1` })
      .where(eq(blogPosts.id, id));
  }

  // Projects
  async getProjects(limit = 50, offset = 0): Promise<Project[]> {
    return await db.select().from(projects)
      .orderBy(desc(projects.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async getPublishedProjects(limit = 50, offset = 0): Promise<Project[]> {
    return await db.select().from(projects)
      .where(eq(projects.status, 'published'))
      .orderBy(desc(projects.publishedAt))
      .limit(limit)
      .offset(offset);
  }

  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.slug, slug));
    return project || undefined;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async updateProject(id: string, updateData: Partial<InsertProject>): Promise<Project> {
    const [project] = await db.update(projects)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return project;
  }

  async deleteProject(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  async incrementProjectViews(id: string): Promise<void> {
    await db.update(projects)
      .set({ views: sql`${projects.views} + 1` })
      .where(eq(projects.id, id));
  }

  // Contacts
  async getContacts(limit = 50, offset = 0): Promise<Contact[]> {
    return await db.select().from(contacts)
      .orderBy(desc(contacts.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db.insert(contacts).values(insertContact).returning();
    return contact;
  }

  async updateContactStatus(id: string, status: string): Promise<void> {
    await db.update(contacts)
      .set({ status })
      .where(eq(contacts.id, id));
  }

  // Newsletter
  async addToNewsletter(email: string): Promise<Newsletter> {
    const [subscription] = await db.insert(newsletter)
      .values({ email })
      .onConflictDoNothing()
      .returning();
    return subscription;
  }

  async getNewsletterSubscribers(): Promise<Newsletter[]> {
    return await db.select().from(newsletter)
      .where(eq(newsletter.status, 'active'))
      .orderBy(desc(newsletter.createdAt));
  }

  // Media
  async getMedia(limit = 50, offset = 0): Promise<Media[]> {
    return await db.select().from(media)
      .orderBy(desc(media.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async uploadMedia(insertMedia: InsertMedia): Promise<Media> {
    const [mediaFile] = await db.insert(media).values(insertMedia).returning();
    return mediaFile;
  }

  async deleteMedia(id: string): Promise<void> {
    await db.delete(media).where(eq(media.id, id));
  }

  // Analytics
  async getAnalytics(): Promise<{
    totalPosts: number;
    totalProjects: number;
    totalViews: number;
    totalContacts: number;
  }> {
    const [postStats] = await db.select({
      count: sql<number>`count(*)`,
      totalViews: sql<number>`sum(${blogPosts.views})`
    }).from(blogPosts);

    const [projectStats] = await db.select({
      count: sql<number>`count(*)`,
      totalViews: sql<number>`sum(${projects.views})`
    }).from(projects);

    const [contactStats] = await db.select({
      count: sql<number>`count(*)`
    }).from(contacts);

    return {
      totalPosts: postStats.count || 0,
      totalProjects: projectStats.count || 0,
      totalViews: (postStats.totalViews || 0) + (projectStats.totalViews || 0),
      totalContacts: contactStats.count || 0,
    };
  }
}

export const storage = new DatabaseStorage();
