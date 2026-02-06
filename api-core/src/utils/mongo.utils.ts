export const lookup = (from: string, localField: string, foreignField: string, as?: string) => ({
  $lookup: { 
    from: from, 
    localField: localField, 
    foreignField: foreignField, 
    as: as || localField
  }
});

export const unwindToObject = (path: string) => ({
  $unwind: {
    path: `$${path}`,
    preserveNullAndEmptyArrays: true
  }
});