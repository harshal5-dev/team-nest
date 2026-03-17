/**
 * AvatarGallery Data — 65 self-contained SVG avatars grouped by category.
 *
 * Each avatar is a pure inline data-URI so the app has zero external
 * dependencies for profile pictures.
 */

/* ─── helpers ─── */
const svg = (inner, vb = "0 0 100 100") =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${inner}</svg>`)}`;

/* ─── People ─── */
const people = [
  // 1 – Blue-cap person
  svg(
    `<circle cx="50" cy="50" r="50" fill="#dbeafe"/><circle cx="50" cy="42" r="18" fill="#fcd34d"/><path d="M50 62c-16 0-28 10-28 22v16h56V84c0-12-12-22-28-22z" fill="#3b82f6"/><circle cx="50" cy="42" r="14" fill="#fef3c7"/><circle cx="44" cy="40" r="2" fill="#1e293b"/><circle cx="56" cy="40" r="2" fill="#1e293b"/><path d="M46 47q4 3 8 0" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M32 36c0-16 14-22 18-22s18 6 18 22c0 0-4-12-18-12S32 36 32 36z" fill="#3b82f6"/>`,
  ),
  // 2 – Pink-hair person
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fce7f3"/><circle cx="50" cy="44" r="16" fill="#fde68a"/><circle cx="50" cy="44" r="12" fill="#fef9c3"/><circle cx="45" cy="42" r="1.8" fill="#1e293b"/><circle cx="55" cy="42" r="1.8" fill="#1e293b"/><path d="M46 49q4 2 8 0" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M34 40c0-18 12-24 16-24s16 6 16 24c0 0-4-14-16-14S34 40 34 40z" fill="#ec4899"/><path d="M50 62c-14 0-26 9-26 20v18h52V82c0-11-12-20-26-20z" fill="#a855f7"/>`,
  ),
  // 3 – Green-hoodie person
  svg(
    `<circle cx="50" cy="50" r="50" fill="#dcfce7"/><circle cx="50" cy="42" r="15" fill="#fed7aa"/><circle cx="44" cy="40" r="1.8" fill="#1e293b"/><circle cx="56" cy="40" r="1.8" fill="#1e293b"/><path d="M46 47q4 3 8 0" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M35 36c0-14 10-20 15-20s15 6 15 20c0 0-3-12-15-12S35 36 35 36z" fill="#854d0e"/><path d="M50 60c-15 0-27 10-27 22v18h54V82c0-12-12-22-27-22z" fill="#22c55e"/><path d="M42 60v12h16V60" fill="#16a34a"/>`,
  ),
  // 4 – Orange-scarf person
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fff7ed"/><circle cx="50" cy="42" r="15" fill="#fde68a"/><circle cx="44" cy="40" r="1.8" fill="#1e293b"/><circle cx="56" cy="40" r="1.8" fill="#1e293b"/><path d="M47 47q3 2 6 0" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M35 34c0-14 10-18 15-18s15 4 15 18" fill="#1e293b"/><path d="M50 60c-15 0-27 10-27 22v18h54V82c0-12-12-22-27-22z" fill="#f97316"/><ellipse cx="50" cy="62" rx="12" ry="4" fill="#ea580c"/>`,
  ),
  // 5 – Purple-beret person
  svg(
    `<circle cx="50" cy="50" r="50" fill="#f3e8ff"/><circle cx="50" cy="44" r="14" fill="#fef3c7"/><circle cx="45" cy="42" r="1.8" fill="#1e293b"/><circle cx="55" cy="42" r="1.8" fill="#1e293b"/><path d="M46 49q4 2 8 0" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><ellipse cx="50" cy="32" rx="18" ry="8" fill="#7c3aed"/><circle cx="50" cy="26" r="3" fill="#7c3aed"/><path d="M50 60c-14 0-26 10-26 22v18h52V82c0-12-12-22-26-22z" fill="#8b5cf6"/>`,
  ),
  // 6 – Red-shirt person with glasses
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fee2e2"/><circle cx="50" cy="42" r="15" fill="#fde68a"/><rect x="38" y="37" width="10" height="8" rx="3" fill="none" stroke="#1e293b" stroke-width="1.5"/><rect x="52" y="37" width="10" height="8" rx="3" fill="none" stroke="#1e293b" stroke-width="1.5"/><line x1="48" y1="41" x2="52" y2="41" stroke="#1e293b" stroke-width="1.5"/><circle cx="43" cy="41" r="1.5" fill="#1e293b"/><circle cx="57" cy="41" r="1.5" fill="#1e293b"/><path d="M46 49q4 2 8 0" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M35 34c0-14 10-18 15-18s15 4 15 18" fill="#92400e"/><path d="M50 60c-15 0-27 10-27 22v18h54V82c0-12-12-22-27-22z" fill="#ef4444"/>`,
  ),
  // 7 – Teal-jacket person with curly hair
  svg(
    `<circle cx="50" cy="50" r="50" fill="#ccfbf1"/><circle cx="50" cy="42" r="15" fill="#fef3c7"/><circle cx="44" cy="40" r="1.8" fill="#1e293b"/><circle cx="56" cy="40" r="1.8" fill="#1e293b"/><path d="M46 47q4 3 8 0" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M32 38c-2-18 12-26 18-26s20 8 18 26" fill="#292524"/><circle cx="34" cy="34" r="4" fill="#292524"/><circle cx="66" cy="34" r="4" fill="#292524"/><circle cx="38" cy="28" r="3" fill="#292524"/><circle cx="62" cy="28" r="3" fill="#292524"/><path d="M50 60c-15 0-27 10-27 22v18h54V82c0-12-12-22-27-22z" fill="#14b8a6"/><path d="M44 60v10h12V60" fill="#0d9488"/>`,
  ),
  // 8 – Yellow-sweater person with ponytail
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fefce8"/><circle cx="50" cy="42" r="14" fill="#fde68a"/><circle cx="50" cy="42" r="11" fill="#fef3c7"/><circle cx="45" cy="40" r="1.8" fill="#1e293b"/><circle cx="55" cy="40" r="1.8" fill="#1e293b"/><path d="M46 47q4 2 8 0" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M34 38c0-16 10-22 16-22s16 6 16 22" fill="#b45309"/><path d="M66 36q4 8 4 20" stroke="#b45309" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M50 60c-14 0-26 10-26 22v18h52V82c0-12-12-22-26-22z" fill="#eab308"/>`,
  ),
  // 9 – Navy-suit person
  svg(
    `<circle cx="50" cy="50" r="50" fill="#e0e7ff"/><circle cx="50" cy="42" r="14" fill="#fde68a"/><circle cx="50" cy="42" r="11" fill="#fef3c7"/><circle cx="45" cy="40" r="1.8" fill="#1e293b"/><circle cx="55" cy="40" r="1.8" fill="#1e293b"/><path d="M46 47q4 2 8 0" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M35 34c0-14 10-20 15-20s15 6 15 20" fill="#1e293b"/><path d="M50 60c-15 0-27 10-27 22v18h54V82c0-12-12-22-27-22z" fill="#1e3a5f"/><path d="M50 60v22" stroke="#fff" stroke-width="1.5"/><circle cx="50" cy="65" r="2" fill="#ef4444"/>`,
  ),
  // 10 – Coral-top person with headband
  svg(
    `<circle cx="50" cy="50" r="50" fill="#ffe4e6"/><circle cx="50" cy="44" r="14" fill="#fef3c7"/><circle cx="45" cy="42" r="1.8" fill="#1e293b"/><circle cx="55" cy="42" r="1.8" fill="#1e293b"/><path d="M46 49q4 2 8 0" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M34 40c0-16 10-24 16-24s16 8 16 24" fill="#78350f"/><rect x="34" y="32" width="32" height="4" rx="2" fill="#f43f5e"/><path d="M50 60c-14 0-26 10-26 22v18h52V82c0-12-12-22-26-22z" fill="#fb7185"/>`,
  ),
  // 11 – Blonde with Sunglasses
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fef3c7"/><circle cx="50" cy="42" r="16" fill="#fde68a"/><circle cx="50" cy="42" r="12" fill="#fef9c3"/><rect x="36" y="38" width="9" height="8" rx="4" fill="none" stroke="#1e293b" stroke-width="1.5"/><rect x="55" y="38" width="9" height="8" rx="4" fill="none" stroke="#1e293b" stroke-width="1.5"/><line x1="45" y1="42" x2="55" y2="42" stroke="#1e293b" stroke-width="1.2"/><path d="M44 49q6 3 12 0" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M30 36c0-14 10-20 20-20s20 6 20 20c0 0-5-10-20-10S30 36 30 36z" fill="#f59e0b"/><path d="M50 60c-15 0-27 10-27 22v18h54V82c0-12-12-22-27-22z" fill="#ec4899"/>`,
  ),
  // 12 – Brunette with Hat
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fed7aa"/><circle cx="50" cy="42" r="14" fill="#fed7aa"/><circle cx="50" cy="42" r="11" fill="#fef3c7"/><circle cx="45" cy="40" r="2" fill="#1e293b"/><circle cx="55" cy="40" r="2" fill="#1e293b"/><path d="M46 46q4 2 8 0" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M30 34c0-12 8-18 20-18s20 6 20 18" fill="#92400e"/><ellipse cx="50" cy="28" rx="24" ry="6" fill="#7c2d12"/><rect x="50" y="20" width="10" height="8" rx="2" fill="#92400e"/><path d="M50 60c-14 0-26 10-26 22v18h52V82c0-12-12-22-26-22z" fill="#dc2626"/>`,
  ),
  // 13 – Redhead with Freckles
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fee2e2"/><circle cx="50" cy="42" r="15" fill="#fef3c7"/><circle cx="50" cy="42" r="12" fill="#fefce8"/><circle cx="45" cy="40" r="1.8" fill="#1e293b"/><circle cx="55" cy="40" r="1.8" fill="#1e293b"/><circle cx="40" cy="45" r="0.8" fill="#ea580c"/><circle cx="45" cy="48" r="0.8" fill="#ea580c"/><circle cx="55" cy="48" r="0.8" fill="#ea580c"/><circle cx="60" cy="45" r="0.8" fill="#ea580c"/><path d="M46 48q4 2 8 0" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M32 36c0-14 10-20 18-20s18 6 18 20" fill="#92400e"/><path d="M50 60c-15 0-27 10-27 22v18h54V82c0-12-12-22-27-22z" fill="#dc2626"/>`,
  ),
  // 14 – Black Hair Straight
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fde68a"/><circle cx="50" cy="42" r="16" fill="#fef3c7"/><circle cx="45" cy="40" r="2" fill="#1e293b"/><circle cx="55" cy="40" r="2" fill="#1e293b"/><path d="M46 46q4 3 8 0" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M32 34c0-16 12-22 18-22s18 6 18 22c0 0-4-14-18-14S32 34 32 34z" fill="#1e293b"/><path d="M50 60c-15 0-27 10-27 22v18h54V82c0-12-12-22-27-22z" fill="#0ea5e9"/>`,
  ),
  // 15 – Curly Hair Afro
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fed7aa"/><circle cx="50" cy="42" r="18" fill="#fdb022"/><circle cx="45" cy="40" r="2" fill="#1e293b"/><circle cx="55" cy="40" r="2" fill="#1e293b"/><path d="M46 46q4 2 8 0" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="28" cy="30" r="4" fill="#d97706"/><circle cx="38" cy="22" r="3" fill="#d97706"/><circle cx="50" cy="20" r="3" fill="#d97706"/><circle cx="62" cy="22" r="3" fill="#d97706"/><circle cx="72" cy="30" r="4" fill="#d97706"/><circle cx="32" cy="38" r="3" fill="#d97706"/><circle cx="68" cy="38" r="3" fill="#d97706"/><path d="M50 60c-14 0-26 10-26 22v18h52V82c0-12-12-22-26-22z" fill="#8b5a3c"/>`,
  ),
  // 16 – Bob Cut
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fce7f3"/><circle cx="50" cy="42" r="14" fill="#fcd34d"/><circle cx="50" cy="42" r="11" fill="#fef3c7"/><circle cx="45" cy="40" r="1.8" fill="#1e293b"/><circle cx="55" cy="40" r="1.8" fill="#1e293b"/><path d="M46 47q4 2 8 0" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M32 38c0-12 10-20 18-20s18 8 18 20" fill="#92400e"/><path d="M30 56 Q30 50 32 42" stroke="#92400e" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M70 56 Q70 50 68 42" stroke="#92400e" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M50 60c-14 0-26 10-26 22v18h52V82c0-12-12-22-26-22z" fill="#f9a8d4"/>`,
  ),
  // 17 – Spiky Hair
  svg(
    `<circle cx="50" cy="50" r="50" fill="#dbeafe"/><circle cx="50" cy="42" r="15" fill="#fef3c7"/><circle cx="45" cy="40" r="2" fill="#1e293b"/><circle cx="55" cy="40" r="2" fill="#1e293b"/><path d="M46 47q4 2 8 0" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><polygon points="35,30 40,18 45,32" fill="#1e293b"/><polygon points="50,16 54,28 58,16" fill="#1e293b"/><polygon points="55,32 60,18 65,30" fill="#1e293b"/><circle cx="50" cy="56" r="20" fill="#3b82f6"/><path d="M50 60c-15 0-27 10-27 22v18h54V82c0-12-12-22-27-22z" fill="#60a5fa"/>`,
  ),
];

/* ─── Animals ─── */
const animals = [
  // 1 – Cat
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fef3c7"/><ellipse cx="50" cy="55" rx="20" ry="18" fill="#fb923c"/><polygon points="32,40 36,20 44,38" fill="#fb923c"/><polygon points="68,40 64,20 56,38" fill="#fb923c"/><polygon points="34,38 38,24 43,37" fill="#fed7aa"/><polygon points="66,38 62,24 57,37" fill="#fed7aa"/><circle cx="43" cy="48" r="3" fill="#1e293b"/><circle cx="57" cy="48" r="3" fill="#1e293b"/><circle cx="43" cy="47" r="1" fill="#fff"/><circle cx="57" cy="47" r="1" fill="#fff"/><ellipse cx="50" cy="55" rx="3" ry="2" fill="#f472b6"/><path d="M47 57q3 3 6 0" stroke="#1e293b" stroke-width="1.2" fill="none" stroke-linecap="round"/><line x1="28" y1="50" x2="40" y2="52" stroke="#1e293b" stroke-width="0.8"/><line x1="28" y1="54" x2="40" y2="54" stroke="#1e293b" stroke-width="0.8"/><line x1="60" y1="52" x2="72" y2="50" stroke="#1e293b" stroke-width="0.8"/><line x1="60" y1="54" x2="72" y2="54" stroke="#1e293b" stroke-width="0.8"/>`,
  ),
  // 2 – Dog
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fde68a"/><ellipse cx="50" cy="54" rx="18" ry="17" fill="#a16207"/><ellipse cx="50" cy="54" rx="14" ry="13" fill="#d97706"/><ellipse cx="32" cy="42" rx="8" ry="14" fill="#92400e" transform="rotate(-15,32,42)"/><ellipse cx="68" cy="42" rx="8" ry="14" fill="#92400e" transform="rotate(15,68,42)"/><circle cx="43" cy="48" r="3" fill="#1e293b"/><circle cx="57" cy="48" r="3" fill="#1e293b"/><circle cx="44" cy="47" r="1" fill="#fff"/><circle cx="58" cy="47" r="1" fill="#fff"/><ellipse cx="50" cy="56" rx="4" ry="3" fill="#1e293b"/><path d="M46 60q4 3 8 0" stroke="#1e293b" stroke-width="1.2" fill="none" stroke-linecap="round"/><circle cx="50" cy="62" r="1" fill="#f472b6"/>`,
  ),
  // 3 – Bear
  svg(
    `<circle cx="50" cy="50" r="50" fill="#f5f5f4"/><circle cx="34" cy="30" r="10" fill="#78716c"/><circle cx="66" cy="30" r="10" fill="#78716c"/><circle cx="34" cy="30" r="6" fill="#d6d3d1"/><circle cx="66" cy="30" r="6" fill="#d6d3d1"/><circle cx="50" cy="52" r="22" fill="#78716c"/><ellipse cx="50" cy="58" rx="12" ry="9" fill="#d6d3d1"/><circle cx="42" cy="48" r="3" fill="#1e293b"/><circle cx="58" cy="48" r="3" fill="#1e293b"/><ellipse cx="50" cy="55" rx="4" ry="3" fill="#1e293b"/><path d="M46 60q4 3 8 0" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
  ),
  // 4 – Panda
  svg(
    `<circle cx="50" cy="50" r="50" fill="#e0f2fe"/><circle cx="50" cy="52" r="22" fill="#fff"/><circle cx="34" cy="30" r="10" fill="#1e293b"/><circle cx="66" cy="30" r="10" fill="#1e293b"/><ellipse cx="42" cy="48" rx="7" ry="6" fill="#1e293b"/><ellipse cx="58" cy="48" rx="7" ry="6" fill="#1e293b"/><circle cx="42" cy="47" r="2.5" fill="#fff"/><circle cx="58" cy="47" r="2.5" fill="#fff"/><circle cx="42" cy="47" r="1.2" fill="#1e293b"/><circle cx="58" cy="47" r="1.2" fill="#1e293b"/><ellipse cx="50" cy="56" rx="3" ry="2" fill="#1e293b"/><path d="M47 59q3 2 6 0" stroke="#1e293b" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,
  ),
  // 5 – Fox
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fff7ed"/><polygon points="26,48 38,18 46,44" fill="#ea580c"/><polygon points="74,48 62,18 54,44" fill="#ea580c"/><ellipse cx="50" cy="55" rx="20" ry="18" fill="#f97316"/><path d="M50 42 L36 58 Q50 70 64 58 Z" fill="#fff"/><circle cx="42" cy="48" r="2.5" fill="#1e293b"/><circle cx="58" cy="48" r="2.5" fill="#1e293b"/><ellipse cx="50" cy="55" rx="3" ry="2" fill="#1e293b"/><path d="M47 58q3 2 6 0" stroke="#1e293b" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,
  ),
  // 6 – Owl
  svg(
    `<circle cx="50" cy="50" r="50" fill="#ede9fe"/><ellipse cx="50" cy="55" rx="22" ry="20" fill="#78350f"/><circle cx="40" cy="46" r="10" fill="#fef3c7"/><circle cx="60" cy="46" r="10" fill="#fef3c7"/><circle cx="40" cy="46" r="5" fill="#1e293b"/><circle cx="60" cy="46" r="5" fill="#1e293b"/><circle cx="41" cy="45" r="1.5" fill="#fff"/><circle cx="61" cy="45" r="1.5" fill="#fff"/><polygon points="50,52 47,58 53,58" fill="#f59e0b"/><polygon points="30,36 40,38 34,30" fill="#92400e"/><polygon points="70,36 60,38 66,30" fill="#92400e"/><path d="M38 64q12 8 24 0" stroke="#92400e" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
  ),
  // 7 – Penguin
  svg(
    `<circle cx="50" cy="50" r="50" fill="#e0f2fe"/><ellipse cx="50" cy="56" rx="20" ry="22" fill="#1e293b"/><ellipse cx="50" cy="58" rx="13" ry="16" fill="#f8fafc"/><circle cx="42" cy="46" r="3" fill="#fff"/><circle cx="58" cy="46" r="3" fill="#fff"/><circle cx="42" cy="46" r="1.5" fill="#1e293b"/><circle cx="58" cy="46" r="1.5" fill="#1e293b"/><polygon points="50,52 47,56 53,56" fill="#f97316"/><ellipse cx="30" cy="60" rx="6" ry="12" fill="#1e293b" transform="rotate(-15,30,60)"/><ellipse cx="70" cy="60" rx="6" ry="12" fill="#1e293b" transform="rotate(15,70,60)"/>`,
  ),
  // 8 – Bunny
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fdf2f8"/><ellipse cx="50" cy="56" rx="18" ry="17" fill="#f9a8d4"/><ellipse cx="40" cy="26" rx="6" ry="18" fill="#f9a8d4"/><ellipse cx="60" cy="26" rx="6" ry="18" fill="#f9a8d4"/><ellipse cx="40" cy="26" rx="3.5" ry="12" fill="#fbcfe8"/><ellipse cx="60" cy="26" rx="3.5" ry="12" fill="#fbcfe8"/><circle cx="43" cy="50" r="3" fill="#1e293b"/><circle cx="57" cy="50" r="3" fill="#1e293b"/><circle cx="44" cy="49" r="1" fill="#fff"/><circle cx="58" cy="49" r="1" fill="#fff"/><ellipse cx="50" cy="56" rx="3" ry="2" fill="#ec4899"/><path d="M47 58q3 2 6 0" stroke="#1e293b" stroke-width="1.2" fill="none" stroke-linecap="round"/><circle cx="38" cy="56" r="4" fill="#fbcfe8" opacity="0.6"/><circle cx="62" cy="56" r="4" fill="#fbcfe8" opacity="0.6"/>`,
  ),
  // 9 – Frog
  svg(
    `<circle cx="50" cy="50" r="50" fill="#dcfce7"/><ellipse cx="50" cy="56" rx="22" ry="18" fill="#22c55e"/><circle cx="38" cy="38" r="10" fill="#22c55e"/><circle cx="62" cy="38" r="10" fill="#22c55e"/><circle cx="38" cy="38" r="7" fill="#fff"/><circle cx="62" cy="38" r="7" fill="#fff"/><circle cx="38" cy="38" r="3.5" fill="#1e293b"/><circle cx="62" cy="38" r="3.5" fill="#1e293b"/><path d="M40 60q10 6 20 0" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="36" cy="60" r="4" fill="#f87171" opacity="0.4"/><circle cx="64" cy="60" r="4" fill="#f87171" opacity="0.4"/>`,
  ),
  // 10 – Koala
  svg(
    `<circle cx="50" cy="50" r="50" fill="#f1f5f9"/><circle cx="32" cy="38" r="12" fill="#94a3b8"/><circle cx="68" cy="38" r="12" fill="#94a3b8"/><circle cx="32" cy="38" r="7" fill="#f8fafc"/><circle cx="68" cy="38" r="7" fill="#f8fafc"/><circle cx="50" cy="52" r="20" fill="#94a3b8"/><ellipse cx="50" cy="58" rx="10" ry="7" fill="#cbd5e1"/><circle cx="43" cy="48" r="3" fill="#1e293b"/><circle cx="57" cy="48" r="3" fill="#1e293b"/><circle cx="44" cy="47" r="1" fill="#fff"/><circle cx="58" cy="47" r="1" fill="#fff"/><ellipse cx="50" cy="55" rx="4" ry="3" fill="#1e293b"/><path d="M46 60q4 2 8 0" stroke="#1e293b" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,
  ),
  // 11 – Monkey
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fde68a"/><circle cx="50" cy="50" r="24" fill="#92400e"/><circle cx="50" cy="50" r="18" fill="#d97706"/><circle cx="40" cy="46" r="8" fill="#a16207"/><circle cx="60" cy="46" r="8" fill="#a16207"/><circle cx="40" cy="46" r="4" fill="#d97706"/><circle cx="60" cy="46" r="4" fill="#d97706"/><circle cx="39" cy="45" r="2" fill="#1e293b"/><circle cx="61" cy="45" r="2" fill="#1e293b"/><circle cx="39" cy="44" r="0.8" fill="#fff"/><circle cx="61" cy="44" r="0.8" fill="#fff"/><ellipse cx="50" cy="58" rx="4" ry="3" fill="#1e293b"/><polygon points="50,66 48,72 52,72" fill="#d97706"/>`,
  ),
  // 12 – Elephant
  svg(
    `<circle cx="50" cy="50" r="50" fill="#e5e7eb"/><ellipse cx="50" cy="55" rx="24" ry="22" fill="#9ca3af"/><circle cx="35" cy="38" r="8" fill="#9ca3af"/><circle cx="65" cy="38" r="8" fill="#9ca3af"/><ellipse cx="50" cy="70" rx="5" ry="8" fill="#9ca3af"/><circle cx="42" cy="50" r="3" fill="#1e293b"/><circle cx="58" cy="50" r="3" fill="#1e293b"/><path d="M50 60 Q48 70 46 78" stroke="#9ca3af" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="50" cy="75" rx="3" ry="2" fill="#6b7280"/>`,
  ),
  // 13 – Giraffe
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fff7ed"/><circle cx="50" cy="35" r="14" fill="#f59e0b"/><rect x="48" y="20" width="4" height="12" rx="2" fill="#d97706"/><rect x="50" y="18" width="4" height="14" rx="2" fill="#d97706"/><ellipse cx="50" cy="55" rx="20" ry="16" fill="#fbbf24"/><circle cx="40" cy="48" r="2" fill="#1e293b"/><circle cx="60" cy="48" r="2" fill="#1e293b"/><ellipse cx="50" cy="58" rx="3" ry="2" fill="#d97706"/><path d="M45 62q5 3 10 0" stroke="#d97706" stroke-width="1.2" fill="none" stroke-linecap="round"/><circle cx="38" cy="50" r="1.5" fill="#f59e0b"/><circle cx="62" cy="50" r="1.5" fill="#f59e0b"/>`,
  ),
  // 14 – Zebra
  svg(
    `<circle cx="50" cy="50" r="50" fill="#f8fafc"/><ellipse cx="50" cy="55" rx="22" ry="20" fill="#fff"/><path d="M30 50 Q40 45 50 45 Q60 45 70 50" stroke="#1e293b" stroke-width="3" fill="none"/><path d="M30 55 Q40 60 50 60 Q60 60 70 55" stroke="#1e293b" stroke-width="3" fill="none"/><circle cx="42" cy="50" r="3" fill="#1e293b"/><circle cx="58" cy="50" r="3" fill="#1e293b"/><ellipse cx="50" cy="56" rx="3" ry="2" fill="#1e293b"/><polygon points="50,64 48,68 52,68" fill="#1e293b"/>`,
  ),
  // 15 – Butterfly
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fce7f3"/><ellipse cx="35" cy="40" rx="10" ry="15" fill="#ec4899"/><ellipse cx="65" cy="40" rx="10" ry="15" fill="#ec4899"/><ellipse cx="35" cy="60" rx="8" ry="12" fill="#f472b6"/><ellipse cx="65" cy="60" rx="8" ry="12" fill="#f472b6"/><rect x="48" y="30" width="4" height="40" rx="2" fill="#1e293b"/><circle cx="50" cy="35" r="2" fill="#fbbf24"/><circle cx="50" cy="45" r="2" fill="#fbbf24"/>`,
  ),
];

/* ─── Robots ─── */
const robots = [
  // 1 – Friendly bot
  svg(
    `<circle cx="50" cy="50" r="50" fill="#e0e7ff"/><rect x="30" y="32" width="40" height="34" rx="8" fill="#6366f1"/><rect x="34" y="36" width="32" height="22" rx="4" fill="#c7d2fe"/><circle cx="43" cy="47" r="4" fill="#1e293b"/><circle cx="57" cy="47" r="4" fill="#1e293b"/><circle cx="44" cy="46" r="1.2" fill="#6366f1"/><circle cx="58" cy="46" r="1.2" fill="#6366f1"/><rect x="42" y="54" width="16" height="3" rx="1.5" fill="#1e293b"/><line x1="50" y1="24" x2="50" y2="32" stroke="#6366f1" stroke-width="2"/><circle cx="50" cy="22" r="3" fill="#a5b4fc"/><rect x="22" y="44" width="8" height="4" rx="2" fill="#6366f1"/><rect x="70" y="44" width="8" height="4" rx="2" fill="#6366f1"/><rect x="36" y="70" width="10" height="12" rx="3" fill="#6366f1"/><rect x="54" y="70" width="10" height="12" rx="3" fill="#6366f1"/>`,
  ),
  // 2 – Round bot
  svg(
    `<circle cx="50" cy="50" r="50" fill="#dbeafe"/><circle cx="50" cy="50" r="24" fill="#3b82f6"/><circle cx="50" cy="50" r="20" fill="#93c5fd"/><circle cx="42" cy="46" r="4" fill="#1e293b"/><circle cx="58" cy="46" r="4" fill="#1e293b"/><circle cx="43" cy="45" r="1.2" fill="#93c5fd"/><circle cx="59" cy="45" r="1.2" fill="#93c5fd"/><path d="M43 56q7 5 14 0" stroke="#1e293b" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="46" y="22" width="8" height="6" rx="2" fill="#3b82f6"/><circle cx="50" cy="20" r="3" fill="#60a5fa"/><rect x="20" y="46" width="8" height="8" rx="3" fill="#3b82f6"/><rect x="72" y="46" width="8" height="8" rx="3" fill="#3b82f6"/>`,
  ),
  // 3 – Square bot
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fef9c3"/><rect x="28" y="28" width="44" height="44" rx="6" fill="#eab308"/><rect x="32" y="32" width="36" height="30" rx="4" fill="#fef08a"/><rect x="38" y="40" width="8" height="8" rx="2" fill="#1e293b"/><rect x="54" y="40" width="8" height="8" rx="2" fill="#1e293b"/><rect x="40" y="54" width="20" height="4" rx="2" fill="#1e293b"/><line x1="46" y1="54" x2="46" y2="58" stroke="#fef08a" stroke-width="1.5"/><line x1="50" y1="54" x2="50" y2="58" stroke="#fef08a" stroke-width="1.5"/><line x1="54" y1="54" x2="54" y2="58" stroke="#fef08a" stroke-width="1.5"/><line x1="50" y1="20" x2="50" y2="28" stroke="#eab308" stroke-width="2"/><circle cx="50" cy="18" r="3" fill="#facc15"/><rect x="18" y="44" width="10" height="6" rx="2" fill="#eab308"/><rect x="72" y="44" width="10" height="6" rx="2" fill="#eab308"/>`,
  ),
  // 4 – Cute bot
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fce7f3"/><rect x="30" y="30" width="40" height="38" rx="14" fill="#ec4899"/><rect x="34" y="34" width="32" height="26" rx="10" fill="#fbcfe8"/><circle cx="42" cy="46" r="4" fill="#1e293b"/><circle cx="58" cy="46" r="4" fill="#1e293b"/><circle cx="43" cy="45" r="1.5" fill="#ec4899"/><circle cx="59" cy="45" r="1.5" fill="#ec4899"/><path d="M44 54q6 4 12 0" stroke="#1e293b" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="35" cy="54" r="4" fill="#f9a8d4" opacity="0.5"/><circle cx="65" cy="54" r="4" fill="#f9a8d4" opacity="0.5"/><rect x="46" y="22" width="8" height="8" rx="4" fill="#ec4899"/><rect x="36" y="72" width="8" height="10" rx="3" fill="#ec4899"/><rect x="56" y="72" width="8" height="10" rx="3" fill="#ec4899"/>`,
  ),
  // 5 – Retro bot
  svg(
    `<circle cx="50" cy="50" r="50" fill="#d1fae5"/><rect x="30" y="30" width="40" height="36" rx="4" fill="#059669"/><rect x="34" y="34" width="14" height="10" rx="2" fill="#6ee7b7"/><rect x="52" y="34" width="14" height="10" rx="2" fill="#6ee7b7"/><circle cx="41" cy="39" r="3" fill="#1e293b"/><circle cx="59" cy="39" r="3" fill="#1e293b"/><rect x="40" y="52" width="20" height="4" rx="2" fill="#6ee7b7"/><circle cx="44" cy="54" r="1.5" fill="#059669"/><circle cx="50" cy="54" r="1.5" fill="#059669"/><circle cx="56" cy="54" r="1.5" fill="#059669"/><rect x="46" y="22" width="8" height="8" rx="2" fill="#059669"/><circle cx="50" cy="20" r="2" fill="#34d399"/><rect x="36" y="70" width="10" height="14" rx="3" fill="#059669"/><rect x="54" y="70" width="10" height="14" rx="3" fill="#059669"/>`,
  ),
  // 6 – Cyclops bot
  svg(
    `<circle cx="50" cy="50" r="50" fill="#e0e7ff"/><rect x="28" y="32" width="44" height="36" rx="10" fill="#4f46e5"/><ellipse cx="50" cy="46" rx="12" ry="10" fill="#c7d2fe"/><circle cx="50" cy="46" r="6" fill="#1e293b"/><circle cx="52" cy="44" r="2" fill="#818cf8"/><rect x="38" y="58" width="24" height="4" rx="2" fill="#a5b4fc"/><rect x="20" y="42" width="10" height="6" rx="3" fill="#4f46e5"/><rect x="70" y="42" width="10" height="6" rx="3" fill="#4f46e5"/><line x1="50" y1="24" x2="50" y2="32" stroke="#4f46e5" stroke-width="2.5"/><circle cx="50" cy="22" r="4" fill="#818cf8"/>`,
  ),
  // 7 – Tank bot
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fef3c7"/><rect x="26" y="30" width="48" height="30" rx="6" fill="#d97706"/><rect x="30" y="34" width="16" height="10" rx="3" fill="#fef08a"/><rect x="54" y="34" width="16" height="10" rx="3" fill="#fef08a"/><circle cx="38" cy="39" r="3" fill="#1e293b"/><circle cx="62" cy="39" r="3" fill="#1e293b"/><rect x="40" y="50" width="20" height="4" rx="2" fill="#fef08a"/><rect x="26" y="62" width="48" height="10" rx="5" fill="#b45309"/><circle cx="32" cy="67" r="4" fill="#92400e"/><circle cx="50" cy="67" r="4" fill="#92400e"/><circle cx="68" cy="67" r="4" fill="#92400e"/><rect x="46" y="22" width="8" height="8" rx="2" fill="#d97706"/><circle cx="50" cy="20" r="3" fill="#fbbf24"/>`,
  ),
  // 8 – Tall bot
  svg(
    `<circle cx="50" cy="50" r="50" fill="#f0fdf4"/><rect x="36" y="24" width="28" height="42" rx="8" fill="#16a34a"/><rect x="40" y="30" width="20" height="14" rx="4" fill="#bbf7d0"/><circle cx="46" cy="37" r="3" fill="#1e293b"/><circle cx="54" cy="37" r="3" fill="#1e293b"/><path d="M44 50q6 4 12 0" stroke="#bbf7d0" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="24" y="38" width="12" height="5" rx="2.5" fill="#16a34a"/><rect x="64" y="38" width="12" height="5" rx="2.5" fill="#16a34a"/><rect x="40" y="68" width="8" height="14" rx="3" fill="#16a34a"/><rect x="52" y="68" width="8" height="14" rx="3" fill="#16a34a"/>`,
  ),
  // 9 – Heart bot
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fce7f3"/><rect x="30" y="32" width="40" height="34" rx="10" fill="#e11d48"/><rect x="34" y="36" width="32" height="22" rx="6" fill="#fda4af"/><circle cx="42" cy="46" r="3.5" fill="#1e293b"/><circle cx="58" cy="46" r="3.5" fill="#1e293b"/><circle cx="43" cy="45" r="1" fill="#fda4af"/><circle cx="59" cy="45" r="1" fill="#fda4af"/><path d="M50 52 C44 50 40 54 44 58 L50 62 L56 58 C60 54 56 50 50 52z" fill="#e11d48"/><rect x="46" y="22" width="8" height="10" rx="4" fill="#e11d48"/><circle cx="50" cy="20" r="4" fill="#fb7185"/><rect x="22" y="44" width="8" height="5" rx="2.5" fill="#e11d48"/><rect x="70" y="44" width="8" height="5" rx="2.5" fill="#e11d48"/>`,
  ),
  // 10 – Steampunk bot
  svg(
    `<circle cx="50" cy="50" r="50" fill="#faf5ff"/><rect x="28" y="30" width="44" height="38" rx="6" fill="#7e22ce"/><circle cx="40" cy="46" r="8" fill="#e9d5ff"/><circle cx="60" cy="46" r="8" fill="#e9d5ff"/><circle cx="40" cy="46" r="4" fill="#1e293b"/><circle cx="60" cy="46" r="4" fill="#1e293b"/><circle cx="41" cy="45" r="1.2" fill="#e9d5ff"/><circle cx="61" cy="45" r="1.2" fill="#e9d5ff"/><rect x="42" y="58" width="16" height="3" rx="1.5" fill="#e9d5ff"/><circle cx="50" cy="24" r="6" fill="#7e22ce" stroke="#a855f7" stroke-width="2"/><circle cx="50" cy="24" r="3" fill="#d8b4fe"/><rect x="18" y="42" width="10" height="8" rx="3" fill="#7e22ce"/><rect x="72" y="42" width="10" height="8" rx="3" fill="#7e22ce"/>`,
  ),
  // 11 – Ninja bot
  svg(
    `<circle cx="50" cy="50" r="50" fill="#e5e7eb"/><rect x="28" y="28" width="44" height="42" rx="4" fill="#1e293b"/><rect x="32" y="32" width="36" height="32" rx="3" fill="#292524"/><circle cx="40" cy="50" r="5" fill="#fef3c7"/><circle cx="60" cy="50" r="5" fill="#fef3c7"/><circle cx="40" cy="50" r="2.5" fill="#1e293b"/><circle cx="60" cy="50" r="2.5" fill="#1e293b"/><rect x="42" y="60" width="16" height="2" rx="1" fill="#fef3c7"/><polygon points="50,20 55,25 50,30 45,25" fill="#1e293b"/>`,
  ),
  // 12 – Solar bot
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fef9c3"/><rect x="26" y="26" width="48" height="48" rx="8" fill="#facc15" transform="rotate(45,50,50)"/><rect x="32" y="32" width="36" height="36" rx="6" fill="#fef08a" transform="rotate(45,50,50)"/><circle cx="50" cy="50" r="18" fill="#92400e"/><circle cx="50" cy="50" r="12" fill="#fbbf24"/><circle cx="42" cy="46" r="2" fill="#1e293b"/><circle cx="58" cy="46" r="2" fill="#1e293b"/><path d="M45 54q5 3 10 0" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
  ),
];

/* ─── Abstract / Geometric ─── */
const abstract = [
  // 1 – Gradient rings
  svg(
    `<circle cx="50" cy="50" r="50" fill="#f0fdf4"/><circle cx="50" cy="50" r="30" fill="none" stroke="#22c55e" stroke-width="4"/><circle cx="50" cy="50" r="22" fill="none" stroke="#4ade80" stroke-width="4"/><circle cx="50" cy="50" r="14" fill="none" stroke="#86efac" stroke-width="4"/><circle cx="50" cy="50" r="6" fill="#22c55e"/>`,
  ),
  // 2 – Diamond
  svg(
    `<circle cx="50" cy="50" r="50" fill="#eff6ff"/><rect x="30" y="30" width="40" height="40" rx="4" fill="#3b82f6" transform="rotate(45,50,50)"/><rect x="36" y="36" width="28" height="28" rx="2" fill="#93c5fd" transform="rotate(45,50,50)"/><circle cx="50" cy="50" r="6" fill="#1d4ed8"/>`,
  ),
  // 3 – Hexagon pattern
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fdf4ff"/><polygon points="50,20 76,35 76,65 50,80 24,65 24,35" fill="#a855f7"/><polygon points="50,28 68,39 68,61 50,72 32,61 32,39" fill="#d8b4fe"/><polygon points="50,38 58,44 58,56 50,62 42,56 42,44" fill="#a855f7"/>`,
  ),
  // 4 – Sunrise
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fef3c7"/><rect x="0" y="50" width="100" height="50" fill="#f59e0b" rx="0"/><circle cx="50" cy="50" r="18" fill="#fbbf24"/><circle cx="50" cy="50" r="12" fill="#fef08a"/><line x1="50" y1="26" x2="50" y2="18" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/><line x1="72" y1="36" x2="78" y2="30" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/><line x1="28" y1="36" x2="22" y2="30" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/><line x1="78" y1="50" x2="86" y2="50" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/><line x1="22" y1="50" x2="14" y2="50" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>`,
  ),
  // 5 – Wave circles
  svg(
    `<circle cx="50" cy="50" r="50" fill="#ecfeff"/><circle cx="30" cy="50" r="16" fill="#06b6d4" opacity="0.7"/><circle cx="50" cy="50" r="16" fill="#22d3ee" opacity="0.7"/><circle cx="70" cy="50" r="16" fill="#67e8f9" opacity="0.7"/>`,
  ),
  // 6 – Star burst
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fef2f2"/><polygon points="50,16 56,40 80,40 60,54 66,78 50,64 34,78 40,54 20,40 44,40" fill="#ef4444"/><polygon points="50,26 54,42 70,42 58,52 62,68 50,60 38,68 42,52 30,42 46,42" fill="#fca5a5"/><circle cx="50" cy="48" r="6" fill="#ef4444"/>`,
  ),
  // 7 – Mosaic
  svg(
    `<circle cx="50" cy="50" r="50" fill="#faf5ff"/><rect x="22" y="22" width="24" height="24" rx="4" fill="#8b5cf6"/><rect x="54" y="22" width="24" height="24" rx="4" fill="#a78bfa"/><rect x="22" y="54" width="24" height="24" rx="4" fill="#c4b5fd"/><rect x="54" y="54" width="24" height="24" rx="4" fill="#7c3aed"/><circle cx="34" cy="34" r="6" fill="#ddd6fe"/><circle cx="66" cy="66" r="6" fill="#ede9fe"/>`,
  ),
  // 8 – Yin-yang
  svg(
    `<circle cx="50" cy="50" r="50" fill="#f1f5f9"/><circle cx="50" cy="50" r="28" fill="#1e293b"/><path d="M50 22 A28 28 0 0 1 50 78 A14 14 0 0 1 50 50 A14 14 0 0 0 50 22" fill="#f8fafc"/><circle cx="50" cy="36" r="4" fill="#1e293b"/><circle cx="50" cy="64" r="4" fill="#f8fafc"/>`,
  ),
  // 9 – Overlapping triangles
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fff1f2"/><polygon points="50,18 78,72 22,72" fill="#f43f5e" opacity="0.8"/><polygon points="50,82 22,28 78,28" fill="#fb923c" opacity="0.6"/><circle cx="50" cy="50" r="8" fill="#fff" opacity="0.8"/>`,
  ),
  // 10 – Flower
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fdf4ff"/><circle cx="50" cy="34" r="10" fill="#e879f9" opacity="0.7"/><circle cx="64" cy="42" r="10" fill="#c084fc" opacity="0.7"/><circle cx="60" cy="58" r="10" fill="#a78bfa" opacity="0.7"/><circle cx="40" cy="58" r="10" fill="#f0abfc" opacity="0.7"/><circle cx="36" cy="42" r="10" fill="#f9a8d4" opacity="0.7"/><circle cx="50" cy="48" r="8" fill="#fbbf24"/>`,
  ),
  // 11 – Spiral
  svg(
    `<circle cx="50" cy="50" r="50" fill="#f0f9ff"/><path d="M50 30 Q70 50 50 70 Q30 50 50 30 Q65 50 50 65 Q35 50 50 30" stroke="#0284c7" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="50" cy="50" r="4" fill="#0284c7"/>`,
  ),
  // 12 – Gradient Mesh
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fef2f2"/><rect x="25" y="25" width="50" height="50" fill="#fecaca"/><rect x="25" y="25" width="25" height="25" fill="#fca5a5"/><rect x="50" y="50" width="25" height="25" fill="#fca5a5"/><rect x="25" y="50" width="25" height="25" fill="#f87171"/><rect x="50" y="25" width="25" height="25" fill="#f87171"/><circle cx="50" cy="50" r="8" fill="#fff" opacity="0.5"/>`,
  ),
  // 13 – Tech Circles
  svg(
    `<circle cx="50" cy="50" r="50" fill="#f0f4f8"/><circle cx="50" cy="50" r="38" fill="none" stroke="#064e3b" stroke-width="1.5"/><circle cx="50" cy="50" r="30" fill="none" stroke="#059669" stroke-width="1.5"/><circle cx="50" cy="50" r="22" fill="none" stroke="#10b981" stroke-width="1.5"/><circle cx="50" cy="50" r="14" fill="none" stroke="#34d399" stroke-width="1.5"/><circle cx="50" cy="50" r="6" fill="#10b981"/>`,
  ),
  // 14 – Quantum
  svg(
    `<circle cx="50" cy="50" r="50" fill="#faf5ff"/><circle cx="35" cy="35" r="12" fill="#a855f7" opacity="0.6"/><circle cx="65" cy="35" r="12" fill="#a855f7" opacity="0.6"/><circle cx="50" cy="60" r="12" fill="#a855f7" opacity="0.6"/><circle cx="50" cy="50" r="8" fill="#7c3aed"/><line x1="35" y1="35" x2="65" y2="35" stroke="#a855f7" stroke-width="1"/><line x1="35" y1="35" x2="50" y2="60" stroke="#a855f7" stroke-width="1"/><line x1="65" y1="35" x2="50" y2="60" stroke="#a855f7" stroke-width="1"/>`,
  ),
  // 15 – Neon Wave
  svg(
    `<circle cx="50" cy="50" r="50" fill="#0f172a"/><path d="M20 50 Q35 35 50 40 T80 50" stroke="#06b6d4" stroke-width="2" fill="none"/><path d="M20 60 Q35 75 50 70 T80 60" stroke="#f9a8d4" stroke-width="2" fill="none"/><circle cx="50" cy="50" r="3" fill="#06b6d4"/>`,
  ),
  // 16 – Geometric Blend
  svg(
    `<circle cx="50" cy="50" r="50" fill="#f9fafb"/><polygon points="50,20 80,45 65,80 35,80 20,45" fill="#f3f4f6" opacity="0.6"/><circle cx="50" cy="50" r="20" fill="#e5e7eb" opacity="0.6"/><rect x="35" y="35" width="30" height="30" rx="4" fill="#d1d5db" opacity="0.4"/>`,
  ),
  // 17 – Wavy Gradient
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fef5e7"/><defs><linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ff6b6b"/><stop offset="50%" stop-color="#ffd93d"/><stop offset="100%" stop-color="#6bcf7f"/></linearGradient></defs><path d="M0 50 Q25 40 50 50 T100 50 L100 100 L0 100 Z" fill="url(#grad1)" opacity="0.7"/><circle cx="50" cy="50" r="12" fill="#fff"/>`,
  ),
  // 18 – Layered Circles
  svg(
    `<circle cx="50" cy="50" r="50" fill="#f0e6ff"/><circle cx="50" cy="50" r="40" fill="none" stroke="#c084fc" stroke-width="2" stroke-dasharray="5,5"/><circle cx="50" cy="50" r="30" fill="none" stroke="#a78bfa" stroke-width="2" stroke-dasharray="8,4"/><circle cx="50" cy="50" r="20" fill="none" stroke="#9f7aea" stroke-width="2" stroke-dasharray="10,3"/><circle cx="50" cy="50" r="10" fill="#7c3aed"/>`,
  ),
  // 19 – Radial Burst
  svg(
    `<circle cx="50" cy="50" r="50" fill="#f0fef9"/><line x1="50" y1="50" x2="50" y2="10" stroke="#10b981" stroke-width="2"/><line x1="50" y1="50" x2="80" y2="30" stroke="#10b981" stroke-width="2"/><line x1="50" y1="50" x2="90" y2="50" stroke="#10b981" stroke-width="2"/><line x1="50" y1="50" x2="80" y2="70" stroke="#10b981" stroke-width="2"/><line x1="50" y1="50" x2="50" y2="90" stroke="#10b981" stroke-width="2"/><line x1="50" y1="50" x2="20" y2="70" stroke="#10b981" stroke-width="2"/><line x1="50" y1="50" x2="10" y2="50" stroke="#10b981" stroke-width="2"/><line x1="50" y1="50" x2="20" y2="30" stroke="#10b981" stroke-width="2"/><circle cx="50" cy="50" r="5" fill="#10b981"/>`,
  ),
  // 20 – Chromatic
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fee"/><circle cx="35" cy="35" r="20" fill="#f87171" opacity="0.7"/><circle cx="65" cy="35" r="20" fill="#60a5fa" opacity="0.7"/><circle cx="50" cy="65" r="20" fill="#fbbf24" opacity="0.7"/><circle cx="50" cy="50" r="10" fill="#fff"/>`,
  ),
  // 21 – Retro Grid
  svg(
    `<circle cx="50" cy="50" r="50" fill="#fef3c7"/><line x1="30" y1="30" x2="70" y2="30" stroke="#f59e0b" stroke-width="1.5"/><line x1="30" y1="45" x2="70" y2="45" stroke="#f59e0b" stroke-width="1.5"/><line x1="30" y1="60" x2="70" y2="60" stroke="#f59e0b" stroke-width="1.5"/><line x1="30" y1="70" x2="70" y2="70" stroke="#f59e0b" stroke-width="1.5"/><line x1="30" y1="30" x2="30" y2="70" stroke="#f59e0b" stroke-width="1.5"/><line x1="45" y1="30" x2="45" y2="70" stroke="#f59e0b" stroke-width="1.5"/><line x1="60" y1="30" x2="60" y2="70" stroke="#f59e0b" stroke-width="1.5"/><line x1="70" y1="30" x2="70" y2="70" stroke="#f59e0b" stroke-width="1.5"/><rect x="35" y="35" width="10" height="10" fill="#f59e0b"/><rect x="55" y="55" width="10" height="10" fill="#f59e0b"/>`,
  ),
];

/* ─── Combine all ─── */
export const AVATAR_CATEGORIES = [
  { id: "people", label: "People" },
  { id: "animals", label: "Animals" },
  { id: "robots", label: "Robots" },
  { id: "abstract", label: "Abstract" },
];

export const AVATARS = [
  ...people.map((url, i) => ({
    id: `people-${i + 1}`,
    url,
    category: "people",
    label: `Person ${i + 1}`,
  })),
  ...animals.map((url, i) => ({
    id: `animal-${i + 1}`,
    url,
    category: "animals",
    label: `Animal ${i + 1}`,
  })),
  ...robots.map((url, i) => ({
    id: `robot-${i + 1}`,
    url,
    category: "robots",
    label: `Robot ${i + 1}`,
  })),
  ...abstract.map((url, i) => ({
    id: `abstract-${i + 1}`,
    url,
    category: "abstract",
    label: `Abstract ${i + 1}`,
  })),
];

export const getAvatarsByCategory = (categoryId) =>
  AVATARS.filter((a) => a.category === categoryId);

/* ─── Default avatar for new users ─── */
export const DEFAULT_AVATAR = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="bg" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#4f46e5"/><stop offset="50%" stop-color="#7c3aed"/><stop offset="100%" stop-color="#a78bfa"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(#bg)"/><circle cx="50" cy="50" r="42" fill="none" stroke="#e0e7ff" stroke-width="0.5" opacity="0.3"/><circle cx="50" cy="50" r="34" fill="none" stroke="#e0e7ff" stroke-width="0.4" opacity="0.2"/><circle cx="50" cy="38" r="13" fill="#e0e7ff"/><path d="M50 53c-15 0-26 8-26 18v29h52V71c0-10-11-18-26-18z" fill="#e0e7ff"/><circle cx="50" cy="38" r="10.5" fill="#f8fafc"/><circle cx="45.5" cy="36" r="1.5" fill="#3730a3"/><circle cx="54.5" cy="36" r="1.5" fill="#3730a3"/><path d="M46.5 42q3.5 2.5 7 0" stroke="#3730a3" stroke-width="1.2" fill="none" stroke-linecap="round"/><circle cx="42" cy="38" r="2.5" fill="#fde68a" opacity="0.15"/><circle cx="58" cy="38" r="2.5" fill="#fde68a" opacity="0.15"/></svg>`)}`;
