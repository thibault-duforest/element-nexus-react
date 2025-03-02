export const countTruthyValues = (data: { [key: string]: boolean }) => Object.values(data).filter((v) => v).length
