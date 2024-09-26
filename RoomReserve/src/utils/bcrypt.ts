import bcrypt from 'bcrypt';

export const HashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10); 
    return bcrypt.hashSync(password, salt);  
}

export const ComparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const match = await bcrypt.compare(password, hashedPassword);  
    return match;
}
