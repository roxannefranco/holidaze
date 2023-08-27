import { atomWithStorage } from "jotai/utils";

// Logged user
const userAtom = atomWithStorage("user", null);

export { userAtom };
