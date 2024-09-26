export interface createUserDto {
    name: string,
    email: string,
    isAdmin: boolean,
}

export type updateUserDto=Partial<createUserDto>