import { createContext, useReducer } from "react";
import { useEffect, useState, useContext } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                isLoading: true,
            };
        case "cities/loaded":
            return {
                ...state,
                isLoading: false,
                cities: action.payload,
            };
        case "city/loaded":
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload,
            };
        case "city/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };
        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter((city) => city.id !== action.payload),
                currentCity: {},
            };
        case "rejected":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: "",
};

function CitiesProvider({ children }) {
    const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: "loading" });

        async function fetchCities() {
            try {
                const response = await fetch(BASE_URL + "/cities");
                const data = await response.json();
                dispatch({ type: "cities/loaded", payload: data });
            } catch (err) {
                dispatch({ type: "rejected", payload: err.message });
            }
        }

        fetchCities();
    }, []);

    async function getCity(id) {
        if (Number(id) === currentCity.id) return;

        dispatch({ type: "loading" });
        try {
            const response = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await response.json();
            dispatch({ type: "city/loaded", payload: data });
        } catch (err) {
            dispatch({ type: "rejected", payload: err.message });
        }
    }

    async function createCity(newCity) {
        dispatch({ type: "loading" });
        try {
            const response = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            dispatch({ type: "city/created", payload: data });
        } catch (err) {
            dispatch({ type: "rejected", payload: err.message });
        }
    }

    async function deleteCity(id) {
        dispatch({ type: "loading" });
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
            dispatch({ type: "city/deleted", payload: id });
        } catch (err) {
            dispatch({ type: "rejected", payload: err.message });
        }
    }

    return (
        <CitiesContext.Provider value={{ cities, isLoading, getCity, currentCity, createCity, deleteCity, error }}>
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);

    if (!context) {
        throw new Error("useCities must be used within a CitiesProvider");
    }

    return context;
}

export { CitiesProvider, useCities };
