import { useGetUserInfoQuery } from "@/pages/auth/authApi";

const PROFILE_OVERRIDES_STORAGE_KEY = "team-nest-profile-overrides";

const defaultNotifications = {
  email: true,
  push: false,
  marketing: false,
};

const parseRoleLabel = (role) => {
  if (!role) {
    return "Member";
  }

  return String(role)
    .replace(/^ROLE_/, "")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getOverrideKey = (user) => {
  if (!user) {
    return "";
  }

  if (user.id !== undefined && user.id !== null) {
    return String(user.id);
  }

  return user.email || "";
};

const readProfileOverrides = () => {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const stored = window.localStorage.getItem(PROFILE_OVERRIDES_STORAGE_KEY);
    if (!stored) {
      return {};
    }

    const parsed = JSON.parse(stored);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

const writeProfileOverrides = (overrides) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      PROFILE_OVERRIDES_STORAGE_KEY,
      JSON.stringify(overrides),
    );
  } catch {
    // Ignore local storage errors and keep profile functional.
  }
};

export const saveProfileOverridesForUser = (user, updates) => {
  const key = getOverrideKey(user);
  if (!key) {
    return;
  }

  const existing = readProfileOverrides();
  existing[key] = {
    ...existing[key],
    ...updates,
  };
  writeProfileOverrides(existing);
};

export const getUserFullName = (user) => {
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  return fullName || "User";
};

export const getUserInitials = (user) => {
  const fullName = getUserFullName(user);
  return fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0] || "")
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const getUserPrimaryRole = (user) => {
  const firstRole = user?.roles?.[0];
  return parseRoleLabel(firstRole);
};

export const getUserOrganization = (user) => {
  const tenantIdPrefix = user?.tenantId ? String(user.tenantId).split("-")[0] : "";
  return tenantIdPrefix ? `Tenant ${tenantIdPrefix}` : "Workspace";
};

const mergeUserWithOverrides = (user) => {
  if (!user) {
    return null;
  }

  const overrides = readProfileOverrides();
  const key = getOverrideKey(user);
  const userOverrides = (key && overrides[key]) || {};

  return {
    ...user,
    firstName: userOverrides.firstName ?? user.firstName ?? "",
    lastName: userOverrides.lastName ?? user.lastName ?? "",
    bio: userOverrides.bio ?? "",
    avatar: userOverrides.avatar ?? null,
    notifications: {
      ...defaultNotifications,
      ...(userOverrides.notifications || {}),
    },
  };
};

export function useAuthUser(queryOptions = {}) {
  const query = useGetUserInfoQuery(undefined, queryOptions);
  const user = mergeUserWithOverrides(query.data);

  return {
    ...query,
    user,
  };
}

export default useAuthUser;
