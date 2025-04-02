export interface Step {
    note: string;
    isActive: boolean;
}

export interface Sequence {
    steps: Step[];
    id: string;
}