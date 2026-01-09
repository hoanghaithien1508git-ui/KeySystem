import keys from "../database/keys.json" assert { type: "json" };
import { signToken } from "./gemini.js";

export async function verifyKey(key, hwid) {
  const k = keys[key];
  if (!k) return { success: false, reason: "KEY_NOT_FOUND" };
  if (!k.sold) return { success: false, reason: "NOT_SOLD" };
  if (k.status !== "active") return { success: false, reason: "BANNED" };

  if (!k.lifetime) {
    if (Date.now() > new Date(k.expires_at).getTime())
      return { success: false, reason: "EXPIRED" };
  }

  if (k.hwid && k.hwid !== hwid)
    return { success: false, reason: "HWID_MISMATCH" }

  
  if (!k.hwid) k.hwid = hwid;

  const token = await signToken({ key, hwid, t: Date.now() });

  return {
    success: true,
    token,
    expires_in: 300
  };
}
