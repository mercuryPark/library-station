import { atom } from "jotai";
import { Link } from "@/types/link";

export const linksState = atom<Link[]>([]);
export const filteredLinksState = atom<Link[] | null>(null);
export const bookmarkedLinksState = atom<any>(null);
export const projectLinksState = atom<any>(null);
