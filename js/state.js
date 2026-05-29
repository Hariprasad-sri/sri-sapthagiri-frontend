// Central runtime state — no localStorage, all data comes from the backend API
export const state = {
    currentUser: null,
    products: [],
    requests: [],
    logs: [],
    locations: [],
    pipeCategories: [],
    pipeColumns: ['4KG', '6KG', '10KG', '15KG', 'SLOTTED'],
    fittingColumns: ['1/2"', '3/4"', '1"', '1-1/4"', '1-1/2"', '2"'],
};
