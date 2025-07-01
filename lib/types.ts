export interface BusType {
    id: number;
    name: string;
    layout: string;
}

export interface Driver {
    id: number;
    name: string;
}

export interface Bus {
    id: number | null;
    plateNumber: string;
    busTypeId: number;
    driverId: number;
    assignmentDate: string;
    createdAt?: string;
    updatedAt?: string;
    busType?: BusType; // nested object
    driver?: Driver;   // nested object
}


export interface Pagination {
    total: number;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    lastPage: number;
    countPerPage: number;
}