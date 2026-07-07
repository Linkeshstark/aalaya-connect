// Mock auth — prototype only. No real credentials, no backend.
const KEY = "divyagram-auth";

export function isAuthed(): boolean {
  if (typeof localStorage === "undefined") return false;
  return localStorage.getItem(KEY) === "1";
}

export function signIn() {
  if (typeof localStorage !== "undefined") localStorage.setItem(KEY, "1");
}

export function signOut() {
  if (typeof localStorage !== "undefined") localStorage.removeItem(KEY);
}
