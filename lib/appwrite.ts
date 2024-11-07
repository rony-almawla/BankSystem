"use server"; // This file contains server-side actions

import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  // Get the environment variables
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
  
  if (!endpoint || !project) {
    throw new Error("Missing required environment variables.");
  }

  // Initialize the Appwrite client
  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(project);

  // Await the cookies and retrieve the session cookie
  const cookieStore = await cookies();
  const session = cookieStore.get("appwrite-session");

  if (!session || !session.value) {
    throw new Error("No session cookie found.");
  }

  // Assuming you have a way to validate the session before using it.
  // This might involve calling the Account service to verify the session
  client.setSession(session.value); // Replace with actual Appwrite session logic

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  // Get environment variables
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
  const apiKey = process.env.NEXT_APPWRITE_KEY;
  
  if (!endpoint || !project || !apiKey) {
    throw new Error("Missing required environment variables.");
  }

  // Initialize the Appwrite client
  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(project)
    .setKey(apiKey);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get user() {
      return new Users(client);
    },
  };
}