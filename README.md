# Route Management System (RMS)

This is a **Route Management System** built with [Next.js](https://nextjs.org), [Zustand](https://github.com/pmndrs/zustand), and modern TypeScript-based design patterns.

It provides a fully functional admin panel for managing bus routes, types, amenities, drivers, points, and assignments — all connected via RESTful APIs.

---

## 🚀 Features

- 🚌 **Bus Management** – Create, edit, and assign drivers and types to buses
- 🎯 **Route Management** – CRUD for bus routes with schedule, timing, and routing info
- 🔀 **Route Lines Support** – Nested line management between bus points
- 📍 **Bus Points** – Manage origin, destination, and route stops
- 👨‍✈️ **Drivers Panel** – Track and manage driver data
- 🛠️ **Amenities Management** – Tag buses with available onboard features
- 🔎 **Search, Filter, Pagination** – For all major entities
- ⚙️ **Zustand Store (Slice Pattern)** – Global state for each feature module
- 🧠 **Reusable Components** – Tables, dropdowns, forms, dialogs, pagination, etc.

---

## 🛠 Tech Stack

- **Next.js 15+ (App Router)**
- **TypeScript**
- **Zustand (slice pattern)**
- **TailwindCSS**
- **Lucide Icons**
- **REST API Integration (via safeGet, safePost, safePut)**

---

## 🧪 Project Structure (Modular)

```

/app
/routes → Route listing, creation, editing
/buses → Buses management
/drivers → Driver CRUD UI
/configurations → Shared entities (bus-types, amenities, points)
/components → Reusable form & table components

/lib
/store
/slices → Zustand store slices (bus, route, driver, etc.)
/selectors → Hook-style selectors for UI consumption

/lib/api → safeGet, safePost, safePut wrappers
/components/ui → UI primitives

```


---

All API calls follow this structure:
```
{
  "success": true,
  "message": "Description",
  "data": [/* your payload */]
}
```

For paginated resources:
```
{
  "data": [...],
  "total": 12,
  "currentPage": 1,
  "lastPage": 3,
  ...


  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    lastPage: number;
    countPerPage: number;
    success: boolean;
    message: string;
}
}
```
🔧 Environment Setup
```
NEXT_PUBLIC_API_BASE=http://localhost:3300/api/v1
```
