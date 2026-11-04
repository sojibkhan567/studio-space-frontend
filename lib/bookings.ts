// "#a582c2" style short id
export const shortId = (id: string) => `#${id.slice(-6)}`
export const formatHours = (h: number) => `${h} ${h === 1 ? "hr" : "hrs"}`
