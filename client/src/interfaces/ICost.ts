export interface ICost {
    id: number;
    name: string;
    description: string;
    lessonPrice: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICostStudentGroupId {
    id: number;
    costId: number;
    cost: ICost;
}
