



//Una interface para que seedData extienda y se cambie todo en un solo lugar
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry{
    description: string,
    status: string,
    createdAt: number,
}

export const seedData: SeedData = {
    entries: [
        {   
            description: 'Pendiente: Duis aute irure dolor in reprehenderit in voluptate',
            status: 'pending',
            createdAt: Date.now(),
        },
        {   
            description: 'En-Progreso: Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            status: 'in-progress',
            createdAt: Date.now(),
        },
        {   
            description: 'Terminadas: Est dolore eu esse ipsum exercitation aute.',
            status: 'finished',
            createdAt: Date.now(),
        },    
    ]
}