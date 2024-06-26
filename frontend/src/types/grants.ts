export const GrantType = {
    applied: "APPLIED",
    rejected: "REJECTED",
    accepted: "ACCEPTED",
} as const;

export type Grant = {
    _id: string,
    name: string,
    amount: number,
    foundation: string,
    deadline: string,
    location: string,
    areas: string[]
};


export type SavedGrant = {
    status: string,
    _id: string,
    feedback: string,
    matchDate: string,
    grant: Grant,
}