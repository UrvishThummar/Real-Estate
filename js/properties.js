// DOM Elements
const propertiesContainer = document.getElementById('propertiesContainer');
const loadingState = document.getElementById('loadingState');
const emptyState = document.getElementById('emptyState');
const resultsCount = document.getElementById('resultsCount');
const propertyModal = document.getElementById('propertyModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');
const viewButtons = document.querySelectorAll('.view-btn');

// Defensive checks for required DOM elements
if (!propertiesContainer) {
    console.error('Missing #propertiesContainer in HTML');
}
if (!loadingState) {
    console.error('Missing #loadingState in HTML');
}
if (!emptyState) {
    console.error('Missing #emptyState in HTML');
}
if (!resultsCount) {
    console.error('Missing #resultsCount in HTML');
}

// State variables
let currentView = 'grid';
let properties = [
    {
        id: 1,
        title: 'Luxury Penthouse with City Views',
        price: 2500000,
        location: 'Manhattan, NY',
        type: 'Penthouse',
        status: 'For Sale',
        featured: true,
        bedrooms: 4,
        bathrooms: 3.5,
        area: 3500,
        image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
        images: [
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg'
        ],
        agent: {
            name: 'John Smith',
            role: 'Senior Agent',
            image: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        description: 'Stunning penthouse with panoramic city views. Features include a private elevator, chef\'s kitchen, and rooftop terrace.',
        amenities: ['Private Elevator', 'Rooftop Terrace', 'Smart Home', 'Wine Cellar', 'Fitness Center']
    },
    {
        id: 2,
        title: 'Modern Waterfront Condo',
        price: 1850000,
        location: 'Brooklyn, NY',
        type: 'Condo',
        status: 'For Sale',
        featured: true,
        bedrooms: 3,
        bathrooms: 2.5,
        area: 2200,
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        images: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg'
        ],
        agent: {
            name: 'Sarah Johnson',
            role: 'Luxury Specialist',
            image: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        description: 'Contemporary waterfront condo with stunning harbor views. Features include floor-to-ceiling windows and a private balcony.',
        amenities: ['Waterfront View', 'Private Balcony', 'Concierge', 'Parking', 'Gym']
    },
    {
        id: 3,
        title: 'Historic Brownstone',
        price: 3200000,
        location: 'Brooklyn Heights, NY',
        type: 'Brownstone',
        status: 'For Sale',
        featured: true,
        bedrooms: 5,
        bathrooms: 4.5,
        area: 4200,
        image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
        images: [
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg'
        ],
        agent: {
            name: 'Michael Brown',
            role: 'Historic Properties Expert',
            image: 'https://randomuser.me/api/portraits/men/22.jpg'
        },
        description: 'Meticulously restored historic brownstone with original architectural details. Features include high ceilings, multiple fireplaces, and a private garden.',
        amenities: ['Garden', 'Fireplace', 'Original Details', 'Wine Cellar', 'Home Office']
    },
    {
        id: 4,
        title: 'Modern Loft in SoHo',
        price: 1950000,
        location: 'SoHo, NY',
        type: 'Loft',
        status: 'For Sale',
        featured: false,
        bedrooms: 2,
        bathrooms: 2,
        area: 1800,
        image: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
        images: [
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
        ],
        agent: {
            name: 'Emily Davis',
            role: 'Urban Living Specialist',
            image: 'https://randomuser.me/api/portraits/women/28.jpg'
        },
        description: 'Spacious loft in the heart of SoHo. Features include exposed brick walls, high ceilings, and an open floor plan.',
        amenities: ['Exposed Brick', 'High Ceilings', 'Open Floor Plan', 'Doorman', 'Storage']
    },
    {
        id: 5,
        title: 'Beachfront Villa',
        price: 4500000,
        location: 'Miami Beach, FL',
        type: 'Villa',
        status: 'For Sale',
        featured: true,
        bedrooms: 6,
        bathrooms: 5.5,
        area: 5800,
        image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
        images: [
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg'
        ],
        agent: {
            name: 'David Wilson',
            role: 'Luxury Beach Properties',
            image: 'https://randomuser.me/api/portraits/men/45.jpg'
        },
        description: 'Luxurious beachfront villa with private pool and direct beach access. Features include a gourmet kitchen and outdoor entertainment areas.',
        amenities: ['Private Pool', 'Beach Access', 'Outdoor Kitchen', 'Smart Home', 'Security System']
    },
    {
        id: 6,
        title: 'Modern Downtown Apartment',
        price: 850000,
        location: 'Financial District, NY',
        type: 'Apartment',
        status: 'For Sale',
        featured: false,
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        images: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg'
        ],
        agent: {
            name: 'Lisa Anderson',
            role: 'Downtown Specialist',
            image: 'https://randomuser.me/api/portraits/women/33.jpg'
        },
        description: 'Contemporary apartment in the heart of the Financial District. Features include modern finishes and city views.',
        amenities: ['City Views', 'Modern Finishes', 'Concierge', 'Gym', 'Parking']
    },
    {
        id: 7,
        title: 'Luxury High-Rise Condo',
        price: 3200000,
        location: 'Midtown, NY',
        type: 'Condo',
        status: 'For Sale',
        featured: true,
        bedrooms: 3,
        bathrooms: 3.5,
        area: 2800,
        image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
        images: [
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg'
        ],
        agent: {
            name: 'Robert Taylor',
            role: 'Luxury Condo Expert',
            image: 'https://randomuser.me/api/portraits/men/41.jpg'
        },
        description: 'Stunning high-rise condo with panoramic city views. Features include a private elevator and premium finishes.',
        amenities: ['Private Elevator', 'City Views', 'Smart Home', 'Wine Cellar', 'Fitness Center']
    },
    {
        id: 8,
        title: 'Townhouse in Greenwich Village',
        price: 5800000,
        location: 'Greenwich Village, NY',
        type: 'Townhouse',
        status: 'For Sale',
        featured: true,
        bedrooms: 5,
        bathrooms: 4.5,
        area: 4500,
        image: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
        images: [
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
        ],
        agent: {
            name: 'Jennifer White',
            role: 'Historic Properties',
            image: 'https://randomuser.me/api/portraits/women/29.jpg'
        },
        description: 'Elegant townhouse in the heart of Greenwich Village. Features include a private garden and original architectural details.',
        amenities: ['Private Garden', 'Original Details', 'Wine Cellar', 'Home Office', 'Security System']
    },
    {
        id: 9,
        title: 'Modern Loft in Tribeca',
        price: 4200000,
        location: 'Tribeca, NY',
        type: 'Loft',
        status: 'For Sale',
        featured: true,
        bedrooms: 3,
        bathrooms: 3.5,
        area: 3200,
        image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
        images: [
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg'
        ],
        agent: {
            name: 'Thomas Clark',
            role: 'Tribeca Specialist',
            image: 'https://randomuser.me/api/portraits/men/36.jpg'
        },
        description: 'Spacious loft in Tribeca with high ceilings and modern finishes. Features include a private terrace and custom kitchen.',
        amenities: ['Private Terrace', 'Custom Kitchen', 'High Ceilings', 'Doorman', 'Storage']
    },
    {
        id: 10,
        title: 'Luxury Apartment in Upper East Side',
        price: 2800000,
        location: 'Upper East Side, NY',
        type: 'Apartment',
        status: 'For Sale',
        featured: false,
        bedrooms: 3,
        bathrooms: 3,
        area: 2400,
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        images: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg'
        ],
        agent: {
            name: 'Patricia Moore',
            role: 'Upper East Side Expert',
            image: 'https://randomuser.me/api/portraits/women/31.jpg'
        },
        description: 'Elegant apartment in a prestigious Upper East Side building. Features include a formal dining room and custom finishes.',
        amenities: ['Formal Dining', 'Custom Finishes', 'Doorman', 'Gym', 'Parking']
    },
    {
        id: 11,
        title: 'Waterfront Penthouse',
        price: 8500000,
        location: 'Battery Park City, NY',
        type: 'Penthouse',
        status: 'For Sale',
        featured: true,
        bedrooms: 4,
        bathrooms: 4.5,
        area: 4200,
        image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
        images: [
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg'
        ],
        agent: {
            name: 'William Harris',
            role: 'Luxury Waterfront Specialist',
            image: 'https://randomuser.me/api/portraits/men/39.jpg'
        },
        description: 'Spectacular waterfront penthouse with panoramic harbor views. Features include a private elevator and rooftop terrace.',
        amenities: ['Private Elevator', 'Rooftop Terrace', 'Harbor Views', 'Smart Home', 'Wine Cellar']
    },
    {
        id: 12,
        title: 'Modern Condo in Chelsea',
        price: 1950000,
        location: 'Chelsea, NY',
        type: 'Condo',
        status: 'For Sale',
        featured: false,
        bedrooms: 2,
        bathrooms: 2.5,
        area: 1600,
        image: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
        images: [
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
        ],
        agent: {
            name: 'Elizabeth Taylor',
            role: 'Chelsea Specialist',
            image: 'https://randomuser.me/api/portraits/women/35.jpg'
        },
        description: 'Contemporary condo in the heart of Chelsea. Features include floor-to-ceiling windows and modern finishes.',
        amenities: ['Floor-to-Ceiling Windows', 'Modern Finishes', 'Concierge', 'Gym', 'Parking']
    },
    {
        id: 13,
        title: 'Luxury Apartment in Upper West Side',
        price: 3200000,
        location: 'Upper West Side, NY',
        type: 'Apartment',
        status: 'For Sale',
        featured: true,
        bedrooms: 3,
        bathrooms: 3.5,
        area: 2800,
        image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
        images: [
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg'
        ],
        agent: {
            name: 'Richard Brown',
            role: 'Upper West Side Expert',
            image: 'https://randomuser.me/api/portraits/men/37.jpg'
        },
        description: 'Elegant apartment with Central Park views. Features include a formal dining room and custom finishes.',
        amenities: ['Park Views', 'Formal Dining', 'Custom Finishes', 'Doorman', 'Gym']
    },
    {
        id: 14,
        title: 'Modern Loft in DUMBO',
        price: 2800000,
        location: 'DUMBO, Brooklyn',
        type: 'Loft',
        status: 'For Sale',
        featured: false,
        bedrooms: 2,
        bathrooms: 2.5,
        area: 2000,
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        images: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg'
        ],
        agent: {
            name: 'Margaret Wilson',
            role: 'Brooklyn Specialist',
            image: 'https://randomuser.me/api/portraits/women/38.jpg'
        },
        description: 'Spacious loft with Brooklyn Bridge views. Features include exposed brick walls and high ceilings.',
        amenities: ['Bridge Views', 'Exposed Brick', 'High Ceilings', 'Doorman', 'Storage']
    },
    {
        id: 15,
        title: 'Luxury Penthouse in Midtown',
        price: 12500000,
        location: 'Midtown, NY',
        type: 'Penthouse',
        status: 'For Sale',
        featured: true,
        bedrooms: 5,
        bathrooms: 5.5,
        area: 5800,
        image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
        images: [
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg'
        ],
        agent: {
            name: 'James Anderson',
            role: 'Luxury Penthouse Specialist',
            image: 'https://randomuser.me/api/portraits/men/40.jpg'
        },
        description: 'Spectacular penthouse with panoramic city views. Features include a private elevator and rooftop terrace.',
        amenities: ['Private Elevator', 'Rooftop Terrace', 'City Views', 'Smart Home', 'Wine Cellar']
    },
    {
        id: 16,
        title: 'Contemporary Apartment in Williamsburg',
        price: 950000,
        location: 'Williamsburg, Brooklyn',
        type: 'Apartment',
        status: 'For Sale',
        featured: false,
        bedrooms: 2,
        bathrooms: 2,
        area: 1400,
        image: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
        images: [
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
        ],
        agent: {
            name: 'Sophie Chen',
            role: 'Brooklyn Specialist',
            image: 'https://randomuser.me/api/portraits/women/42.jpg'
        },
        description: 'Modern apartment in the heart of Williamsburg. Features include an open kitchen and private balcony.',
        amenities: ['Open Kitchen', 'Private Balcony', 'Modern Finishes', 'Storage', 'Bike Room']
    },
    {
        id: 17,
        title: 'Luxury Condo in Battery Park',
        price: 3800000,
        location: 'Battery Park, NY',
        type: 'Condo',
        status: 'For Sale',
        featured: true,
        bedrooms: 3,
        bathrooms: 3.5,
        area: 2600,
        image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
        images: [
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg'
        ],
        agent: {
            name: 'Daniel Lee',
            role: 'Waterfront Specialist',
            image: 'https://randomuser.me/api/portraits/men/43.jpg'
        },
        description: 'Stunning waterfront condo with harbor views. Features include a gourmet kitchen and private balcony.',
        amenities: ['Harbor Views', 'Gourmet Kitchen', 'Private Balcony', 'Concierge', 'Gym']
    },
    {
        id: 18,
        title: 'Historic Townhouse in Park Slope',
        price: 4200000,
        location: 'Park Slope, Brooklyn',
        type: 'Townhouse',
        status: 'For Sale',
        featured: true,
        bedrooms: 4,
        bathrooms: 3.5,
        area: 3800,
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        images: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg'
        ],
        agent: {
            name: 'Rachel Green',
            role: 'Historic Properties Expert',
            image: 'https://randomuser.me/api/portraits/women/46.jpg'
        },
        description: 'Beautifully restored townhouse in Park Slope. Features include original details and a private garden.',
        amenities: ['Original Details', 'Private Garden', 'Fireplace', 'Wine Cellar', 'Home Office']
    },
    {
        id: 19,
        title: 'Modern Loft in Long Island City',
        price: 1650000,
        location: 'Long Island City, Queens',
        type: 'Loft',
        status: 'For Sale',
        featured: false,
        bedrooms: 2,
        bathrooms: 2,
        area: 1800,
        image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
        images: [
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg'
        ],
        agent: {
            name: 'Kevin Park',
            role: 'Queens Specialist',
            image: 'https://randomuser.me/api/portraits/men/47.jpg'
        },
        description: 'Contemporary loft with Manhattan skyline views. Features include high ceilings and an open floor plan.',
        amenities: ['Skyline Views', 'High Ceilings', 'Open Floor Plan', 'Doorman', 'Storage']
    },
    {
        id: 20,
        title: 'Luxury Apartment in Hudson Yards',
        price: 4500000,
        location: 'Hudson Yards, NY',
        type: 'Apartment',
        status: 'For Sale',
        featured: true,
        bedrooms: 3,
        bathrooms: 3.5,
        area: 3000,
        image: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
        images: [
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
        ],
        agent: {
            name: 'Amanda White',
            role: 'Luxury Specialist',
            image: 'https://randomuser.me/api/portraits/women/48.jpg'
        },
        description: 'Stunning apartment in the heart of Hudson Yards. Features include a chef\'s kitchen and private terrace.',
        amenities: ['Chef\'s Kitchen', 'Private Terrace', 'Smart Home', 'Concierge', 'Gym']
    },
    {
        id: 21,
        title: 'Waterfront Condo in Red Hook',
        price: 2200000,
        location: 'Red Hook, Brooklyn',
        type: 'Condo',
        status: 'For Sale',
        featured: false,
        bedrooms: 2,
        bathrooms: 2.5,
        area: 1800,
        image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
        images: [
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg'
        ],
        agent: {
            name: 'Michael Rodriguez',
            role: 'Waterfront Specialist',
            image: 'https://randomuser.me/api/portraits/men/49.jpg'
        },
        description: 'Beautiful waterfront condo with harbor views. Features include a modern kitchen and private balcony.',
        amenities: ['Harbor Views', 'Modern Kitchen', 'Private Balcony', 'Storage', 'Bike Room']
    },
    {
        id: 22,
        title: 'Luxury Penthouse in Downtown',
        price: 9500000,
        location: 'Downtown, NY',
        type: 'Penthouse',
        status: 'For Sale',
        featured: true,
        bedrooms: 4,
        bathrooms: 4.5,
        area: 4500,
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        images: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg'
        ],
        agent: {
            name: 'Jessica Martinez',
            role: 'Luxury Penthouse Specialist',
            image: 'https://randomuser.me/api/portraits/women/50.jpg'
        },
        description: 'Spectacular penthouse with panoramic city and harbor views. Features include a private elevator and rooftop terrace.',
        amenities: ['Private Elevator', 'Rooftop Terrace', 'City Views', 'Smart Home', 'Wine Cellar']
    },
    {
        id: 23,
        title: 'Modern Apartment in Astoria',
        price: 750000,
        location: 'Astoria, Queens',
        type: 'Apartment',
        status: 'For Sale',
        featured: false,
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
        images: [
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg'
        ],
        agent: {
            name: 'Christopher Lee',
            role: 'Queens Specialist',
            image: 'https://randomuser.me/api/portraits/men/51.jpg'
        },
        description: 'Contemporary apartment with Manhattan skyline views. Features include modern finishes and a private balcony.',
        amenities: ['Skyline Views', 'Modern Finishes', 'Private Balcony', 'Storage', 'Bike Room']
    },
    {
        id: 24,
        title: 'Luxury Condo in Gowanus',
        price: 1850000,
        location: 'Gowanus, Brooklyn',
        type: 'Condo',
        status: 'For Sale',
        featured: false,
        bedrooms: 2,
        bathrooms: 2.5,
        area: 1600,
        image: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
        images: [
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
        ],
        agent: {
            name: 'Sarah Thompson',
            role: 'Brooklyn Specialist',
            image: 'https://randomuser.me/api/portraits/women/52.jpg'
        },
        description: 'Modern condo in the heart of Gowanus. Features include an open kitchen and private outdoor space.',
        amenities: ['Open Kitchen', 'Private Outdoor Space', 'Modern Finishes', 'Storage', 'Bike Room']
    },
    {
        id: 25,
        title: 'Luxury Apartment in Harlem',
        price: 1250000,
        location: 'Harlem, NY',
        type: 'Apartment',
        status: 'For Sale',
        featured: false,
        bedrooms: 3,
        bathrooms: 2.5,
        area: 1800,
        image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
        images: [
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg'
        ],
        agent: {
            name: 'Marcus Johnson',
            role: 'Harlem Specialist',
            image: 'https://randomuser.me/api/portraits/men/53.jpg'
        },
        description: 'Spacious apartment in the heart of Harlem. Features include high ceilings and modern finishes.',
        amenities: ['High Ceilings', 'Modern Finishes', 'Storage', 'Bike Room', 'Laundry']
    },
    {
        id: 26,
        title: 'Waterfront Loft in Greenpoint',
        price: 2200000,
        location: 'Greenpoint, Brooklyn',
        type: 'Loft',
        status: 'For Sale',
        featured: true,
        bedrooms: 2,
        bathrooms: 2.5,
        area: 2000,
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        images: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg'
        ],
        agent: {
            name: 'Emma Wilson',
            role: 'Waterfront Specialist',
            image: 'https://randomuser.me/api/portraits/women/54.jpg'
        },
        description: 'Stunning waterfront loft with Manhattan skyline views. Features include high ceilings and an open floor plan.',
        amenities: ['Skyline Views', 'High Ceilings', 'Open Floor Plan', 'Storage', 'Bike Room']
    },
    {
        id: 27,
        title: 'Luxury Condo in Roosevelt Island',
        price: 1650000,
        location: 'Roosevelt Island, NY',
        type: 'Condo',
        status: 'For Sale',
        featured: false,
        bedrooms: 2,
        bathrooms: 2,
        area: 1400,
        image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
        images: [
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg'
        ],
        agent: {
            name: 'David Kim',
            role: 'Island Specialist',
            image: 'https://randomuser.me/api/portraits/men/55.jpg'
        },
        description: 'Modern condo with panoramic city views. Features include a gourmet kitchen and private balcony.',
        amenities: ['City Views', 'Gourmet Kitchen', 'Private Balcony', 'Concierge', 'Gym']
    },
    {
        id: 28,
        title: 'Luxury Apartment in Murray Hill',
        price: 1950000,
        location: 'Murray Hill, NY',
        type: 'Apartment',
        status: 'For Sale',
        featured: false,
        bedrooms: 2,
        bathrooms: 2.5,
        area: 1600,
        image: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
        images: [
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
        ],
        agent: {
            name: 'Rachel Chen',
            role: 'Midtown Specialist',
            image: 'https://randomuser.me/api/portraits/women/56.jpg'
        },
        description: 'Elegant apartment in the heart of Murray Hill. Features include a formal dining room and custom finishes.',
        amenities: ['Formal Dining', 'Custom Finishes', 'Doorman', 'Gym', 'Parking']
    },
    {
        id: 29,
        title: 'Modern Loft in Bushwick',
        price: 950000,
        location: 'Bushwick, Brooklyn',
        type: 'Loft',
        status: 'For Sale',
        featured: false,
        bedrooms: 2,
        bathrooms: 2,
        area: 1400,
        image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
        images: [
            'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg'
        ],
        agent: {
            name: 'Alex Rodriguez',
            role: 'Brooklyn Specialist',
            image: 'https://randomuser.me/api/portraits/men/57.jpg'
        },
        description: 'Contemporary loft with exposed brick walls. Features include high ceilings and an open floor plan.',
        amenities: ['Exposed Brick', 'High Ceilings', 'Open Floor Plan', 'Storage', 'Bike Room']
    },
    {
        id: 30,
        title: 'Luxury Penthouse in Financial District',
        price: 8500000,
        location: 'Financial District, NY',
        type: 'Penthouse',
        status: 'For Sale',
        featured: true,
        bedrooms: 4,
        bathrooms: 4.5,
        area: 4200,
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        images: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg'
        ],
        agent: {
            name: 'Sophia Lee',
            role: 'Luxury Penthouse Specialist',
            image: 'https://randomuser.me/api/portraits/women/58.jpg'
        },
        description: 'Spectacular penthouse with panoramic city and harbor views. Features include a private elevator and rooftop terrace.',
        amenities: ['Private Elevator', 'Rooftop Terrace', 'City Views', 'Smart Home', 'Wine Cellar']
    }
];
let filteredProperties = [...properties];

// Create and add search input
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search by property name, location, or description...';
searchInput.className = 'search-input';
propertiesContainer.parentNode.insertBefore(searchInput, propertiesContainer);

// Create and add filter container
const filterContainer = document.createElement('div');
filterContainer.className = 'filter-container';

// Create filter groups
const typeFilterGroup = document.createElement('div');
typeFilterGroup.className = 'filter-group';
const typeLabel = document.createElement('label');
typeLabel.className = 'filter-label';
typeLabel.textContent = 'Property Type';
typeFilterGroup.appendChild(typeLabel);

const typeFilter = document.createElement('select');
typeFilter.className = 'filter-select';
typeFilter.innerHTML = `
    <option value="">All Types</option>
    <option value="Apartment">Apartment</option>
    <option value="Condo">Condo</option>
    <option value="House">House</option>
    <option value="Penthouse">Penthouse</option>
    <option value="Villa">Villa</option>
`;
typeFilterGroup.appendChild(typeFilter);

const priceFilterGroup = document.createElement('div');
priceFilterGroup.className = 'filter-group';
const priceLabel = document.createElement('label');
priceLabel.className = 'filter-label';
priceLabel.textContent = 'Price Range';
priceFilterGroup.appendChild(priceLabel);

const priceFilter = document.createElement('select');
priceFilter.className = 'filter-select';
priceFilter.innerHTML = `
    <option value="">All Prices</option>
    <option value="0-500000">Under $500,000</option>
    <option value="500000-1000000">$500,000 - $1M</option>
    <option value="1000000-2000000">$1M - $2M</option>
    <option value="2000000-5000000">$2M - $5M</option>
    <option value="5000000-10000000">$5M - $10M</option>
    <option value="10000000-999999999">Over $10M</option>
`;
priceFilterGroup.appendChild(priceFilter);

const bedroomsFilterGroup = document.createElement('div');
bedroomsFilterGroup.className = 'filter-group';
const bedroomsLabel = document.createElement('label');
bedroomsLabel.className = 'filter-label';
bedroomsLabel.textContent = 'Bedrooms';
bedroomsFilterGroup.appendChild(bedroomsLabel);

const bedroomsFilter = document.createElement('select');
bedroomsFilter.className = 'filter-select';
bedroomsFilter.innerHTML = `
    <option value="">All Bedrooms</option>
    <option value="1">1+ Bedrooms</option>
    <option value="2">2+ Bedrooms</option>
    <option value="3">3+ Bedrooms</option>
    <option value="4">4+ Bedrooms</option>
    <option value="5">5+ Bedrooms</option>
`;
bedroomsFilterGroup.appendChild(bedroomsFilter);

// Add filter groups to container
filterContainer.appendChild(typeFilterGroup);
filterContainer.appendChild(priceFilterGroup);
filterContainer.appendChild(bedroomsFilterGroup);
propertiesContainer.parentNode.insertBefore(filterContainer, propertiesContainer);

// Reset all filters on page load
searchInput.value = '';
typeFilter.value = '';
priceFilter.value = '';
bedroomsFilter.value = '';

// Filter properties function
function filterProperties() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value;
    const selectedPrice = priceFilter.value;
    const selectedBedrooms = bedroomsFilter.value;

        filteredProperties = properties.filter(property => {
        // Search term filter
            const matchesSearch = property.title.toLowerCase().includes(searchTerm) ||
                            property.location.toLowerCase().includes(searchTerm) ||
                            property.description.toLowerCase().includes(searchTerm);

        // Type filter
            const matchesType = !selectedType || property.type === selectedType;

        // Price filter
            let matchesPrice = true;
            if (selectedPrice) {
                const [min, max] = selectedPrice.split('-').map(Number);
            matchesPrice = property.price >= min && property.price <= max;
        }

        // Bedrooms filter
        const matchesBedrooms = !selectedBedrooms || property.bedrooms >= parseInt(selectedBedrooms);

        return matchesSearch && matchesType && matchesPrice && matchesBedrooms;
    });

    // Update results count
    resultsCount.textContent = filteredProperties.length;

    // Show/hide empty state
    if (filteredProperties.length === 0) {
        emptyState.style.display = 'flex';
        propertiesContainer.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        propertiesContainer.style.display = 'grid';
    }

    // Render filtered properties
    renderProperties(filteredProperties);
}

// Render properties function
function renderProperties(propertiesToRender) {
    propertiesContainer.innerHTML = propertiesToRender.map(property => `
        <div class="property-card" data-id="${property.id}">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}">
                <div class="property-tags">
                    ${property.featured ? '<span class="tag featured">Featured</span>' : ''}
                    <span class="tag ${property.status.toLowerCase()}">${property.status}</span>
                </div>
                <button class="favorite-btn" title="Add to Favorites">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="property-info">
                <h3>${property.title}</h3>
                <p class="price">$${property.price.toLocaleString()}</p>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                <div class="features">
                    <span><i class="fas fa-bed"></i> ${property.bedrooms} Beds</span>
                    <span><i class="fas fa-bath"></i> ${property.bathrooms} Baths</span>
                    <span><i class="fas fa-ruler-combined"></i> ${property.area} sq ft</span>
                </div>
                <div class="agent-info">
                        <img src="${property.agent.image}" alt="${property.agent.name}">
                    <div>
                        <p class="agent-name">${property.agent.name}</p>
                        <p class="agent-role">${property.agent.role}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners for favorite buttons
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (localStorage.getItem('isAuthenticated') !== 'true') {
                alert('Please login first!');
                return;
            }
            const icon = btn.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
        });
    });
}

// Show all properties
function showAllProperties() {
    loadingState.style.display = 'flex';
    emptyState.style.display = 'none';
    propertiesContainer.style.display = 'none';

    setTimeout(() => {
        filteredProperties = [...properties];
        filterProperties();
        loadingState.style.display = 'none';
    }, 500);
}

// Add event listeners for search and filters
searchInput.addEventListener('input', filterProperties);
typeFilter.addEventListener('change', filterProperties);
priceFilter.addEventListener('change', filterProperties);
bedroomsFilter.addEventListener('change', filterProperties);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('properties.js loaded and DOMContentLoaded fired');
    showAllProperties();
});

// View toggle functionality
viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        viewButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentView = btn.classList.contains('grid-view') ? 'grid' : 'list';
        propertiesContainer.className = currentView === 'grid' ? 'grid-container' : 'list-container';
    });
});

// Property card click handler
propertiesContainer.addEventListener('click', (e) => {
    const propertyCard = e.target.closest('.property-card');
    if (propertyCard) {
        const propertyId = propertyCard.dataset.id;
        window.location.href = `property-details.html?id=${propertyId}`;
    }
});

// Property modal functionality
propertiesContainer.addEventListener('click', (e) => {
    const propertyCard = e.target.closest('.property-card');
    if (propertyCard) {
        const propertyId = parseInt(propertyCard.dataset.id);
        const property = properties.find(p => p.id === propertyId);
        if (property) {
            modalContent.innerHTML = `
                <div class="modal-header">
                    <h2>${property.title}</h2>
                    <button id="closeModal" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="property-gallery">
                        <div class="main-image">
                            <img src="${property.image}" alt="${property.title}">
                            <button class="gallery-nav prev">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <button class="gallery-nav next">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                        <div class="thumbnail-strip">
                            ${property.images.map((img, index) => `
                                <img src="${img}" alt="Thumbnail ${index + 1}" 
                                     class="${index === 0 ? 'active' : ''}"
                                     onclick="updateMainImage(this.src)">
                            `).join('')}
                        </div>
                    </div>
                    <div class="property-details">
                        <div class="detail-header">
                            <div class="price-status">
                                <span class="status">${property.status}</span>
                                <h2 class="price">$${property.price.toLocaleString()}</h2>
                            </div>
                            <button class="favorite-btn">
                                <i class="far fa-heart"></i>
                            </button>
                        </div>
                        <h1 class="title">${property.title}</h1>
                        <p class="location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${property.location}
                        </p>
                        <div class="features">
                            <div class="feature">
                                <i class="fas fa-bed"></i>
                                <span>${property.bedrooms} Bedrooms</span>
                            </div>
                            <div class="feature">
                                <i class="fas fa-bath"></i>
                                <span>${property.bathrooms} Bathrooms</span>
                            </div>
                            <div class="feature">
                                <i class="fas fa-ruler-combined"></i>
                                <span>${property.area} sq ft</span>
                            </div>
                            <div class="feature">
                                <i class="fas fa-building"></i>
                                <span>${property.type}</span>
                            </div>
                        </div>
                        <div class="description">
                            <h3>Description</h3>
                            <p>${property.description}</p>
                        </div>
                        <div class="amenities">
                            <h3>Amenities</h3>
                            <ul class="amenities-list">
                                ${property.amenities.map(amenity => `
                                    <li><i class="fas fa-check"></i> ${amenity}</li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="agent-info">
                            <img src="${property.agent.image}" alt="${property.agent.name}">
                            <div class="agent-details">
                                <h3>Listed by ${property.agent.name}</h3>
                                <p>${property.agent.role}</p>
                                <div class="agent-contact">
                                    <button class="btn btn-primary">
                                        <i class="fas fa-phone"></i> Call Agent
                                    </button>
                                    <button class="btn btn-outline">
                                        <i class="fas fa-envelope"></i> Email Agent
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            propertyModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // Add event listener for close button
            document.getElementById('closeModal').addEventListener('click', () => {
                propertyModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });

            // Add event listeners for gallery navigation
            let currentImageIndex = 0;
            const images = property.images;

            document.querySelector('.gallery-nav.prev').addEventListener('click', () => {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateMainImage(images[currentImageIndex]);
                updateThumbnails();
            });

            document.querySelector('.gallery-nav.next').addEventListener('click', () => {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateMainImage(images[currentImageIndex]);
                updateThumbnails();
            });

            // Add event listener for favorite button
            const favoriteBtn = document.querySelector('.favorite-btn');
            favoriteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (localStorage.getItem('isAuthenticated') !== 'true') {
                    alert('Please login first!');
                    return;
                }
                const icon = favoriteBtn.querySelector('i');
                icon.classList.toggle('far');
                icon.classList.toggle('fas');
            });
        }
    }
});

// Function to update main image
function updateMainImage(src) {
    document.querySelector('.main-image img').src = src;
    const thumbnails = document.querySelectorAll('.thumbnail-strip img');
    thumbnails.forEach(thumb => {
        thumb.classList.toggle('active', thumb.src === src);
    });
}

// Function to update thumbnails
function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail-strip img');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// Close modal when clicking outside
propertyModal.addEventListener('click', (e) => {
    if (e.target === propertyModal) {
        propertyModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});