
export interface Booking {
    booking_id: string,
    guest_name: string,
    guest_email: string,
    guest_contact: string,
    order_date: string,
    check_in: string,
    check_out: string,
    special_request: string,
    room: Room,
    status: string
}

export interface Contact {
    contact_date: string,
    contact_id: string,
    guest_name: string,
    guest_email: string,
    guest_contact: string,
    content_title: string,
    content_text: string
}

export interface Room {
    room_id: string,
    type: string,
    number: string,
    price: number,
    discount: number,
    cancellation: string,
    description: string,
    amenities: string[],
    photos: string[],
    available: boolean
}

export interface User {
    user_id: string,
    photo: string,
    name: string,
    job: string,
    email: string,
    contact: string,
    start_date: string,
    job_description: string,
    status: string,
    password: string
}
