import { NotImplementedException as notImplementedException  } from "./Exceptions/NotImplementedException";
import nev from "./never"
import { getAllMatches as getallmatches } from "./RegexpUtils"
import arrayOperations from "./ArrayOperations/index"

export const NotImplementedException = notImplementedException
export const never = nev
export const getAllMatches   = getallmatches
export const ArrayOperations = arrayOperations