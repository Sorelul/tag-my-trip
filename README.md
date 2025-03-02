# TagMyTrip

TagMyTrip is a React application that helps you keep track of your travels by tagging cities and countries you have visited. The app uses Vite for fast development and includes features like geolocation, city and country management, and user authentication.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Project Structure](#project-structure)
-   [Hooks](#hooks)
-   [Available Scripts](#available-scripts)

## Installation

### 1. Clone the repository:

```sh
git clone https://github.com/Sorelul/tag-my-trip.git
cd tag-my-trip
```

### 2. Install dependencies:

```sh
npm install
```

### 3. Start the development server:

```sh
npm run dev
```

### 4. Start the JSON server:

```sh
npm run server
```

## Usage

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## Project Structure

```
.eslintrc.cjs
.gitignore
data/
    cities.json
eslintrc.json
index.html
package.json
public/
    bg.jpg
    icon.png
    img-1.jpg
    img-2.jpg
    logo.png
    vite.svg
README.md
src/
    App.jsx
    components/
        AppNav.jsx
        AppNav.module.css
        BackButton.jsx
        Button.jsx
        Button.module.css
        City.jsx
        City.module.css
        CityItem.jsx
        CityItem.module.css
        CityList.jsx
        CityList.module.css
        CountriesList.jsx
        CountryItem.jsx
        CountryItem.module.css
        CountryList.module.css
        Form.jsx
        Form.module.css
        Logo.jsx
        Logo.module.css
        Map.jsx
        Map.module.css
        Message.jsx
        Message.module.css
        PageNav.jsx
        PageNav.module.css
        Sidebar.jsx
        Sidebar.module.css
        Spinner.jsx
        Spinner.module.css
        SpinnerFullPage.jsx
        SpinnerFullPage.module.css
        User.jsx
        User.module.css
    contexts/
        CitiesContext.jsx
        FakeAuthContext.jsx
    hooks/
        useGeoLocation.js
        useUrlPosition.js
    index.css
    main.jsx
    pages/
        AppLayout.jsx
        AppLayout.module.css
        Homepage.jsx
        Homepage.module.css
        Login.jsx
        Login.module.css
        PageNotFound.jsx
        Pricing.jsx
        Product.jsx
        Product.module.css
        ProtectedRoute.jsx
vite.config.js
```

## Hooks

### `useGeoLocation`

This hook is used to get the user's current geolocation.

```js
import { useState } from "react";

function useGeoLocation(defaultPosition = null) {
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState(defaultPosition);
    const [error, setError] = useState(null);

    function getPosition() {
        if (!navigator.geolocation) return setError("Your browser does not support geolocation");

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
                setIsLoading(false);
            },
            (error) => {
                setError(error.message);
                setIsLoading(false);
            }
        );
    }

    return { isLoading, position, error, getPosition };
}

export { useGeoLocation };
```

### `useUrlPosition`

This hook is used to get the latitude and longitude from the URL search parameters.

```js
import { useSearchParams } from "react-router-dom";

function useUrlPosition() {
    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return [lat, lng];
}

export { useUrlPosition };
```

## React Hooks

The following React hooks are used throughout the application:

-   **useState**: Used to manage state in functional components.
-   **useEffect**: Used to perform side effects in functional components.
-   **useContext**: Used to access context values.
-   **useReducer**: Used to manage complex state logic.
-   **useRef**: Used to create mutable object references.
-   **useMemo**: Used to memoize expensive calculations.
-   **useCallback**: Used to memoize callback functions.
-   **useLayoutEffect**: Used to perform side effects that require DOM measurements.
-   **useDebugValue**: Used to display a label for custom hooks in React DevTools.

## React Router Hooks

The following React Router hooks are used in the application:

-   **useNavigate**: Used to programmatically navigate between routes.
-   **useParams**: Used to access URL parameters.
-   **useLocation**: Used to access the current location object.
-   **useSearchParams**: Used to read and modify the URL query string.

## Available Scripts

### `npm run dev`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.
