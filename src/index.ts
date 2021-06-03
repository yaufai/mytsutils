import { NotImplementedException as notImplementedException  } from "./Exceptions/NotImplementedException";
import nev from "./never"
import { getAllMatches as getallmatches } from "./RegexpUtils"
import arrayOperations from "./ArrayOperations/index"
import { atob as a2b, btoa as b2a } from "./atob-btoa"

export const NotImplementedException = notImplementedException
export const never = nev
export const getAllMatches   = getallmatches
export const ArrayOperations = arrayOperations
export const atob = a2b
export const btoa = b2a