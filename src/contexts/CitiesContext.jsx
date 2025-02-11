import { createContext } from "react";
import { useEffect, useState, useContext } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const response = await fetch(BASE_URL + "/cities");
                const data = await response.json();
                setCities(data);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();
    }, []);

    async function getCity(id) {
        try {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await response.json();
            setCurrentCity(data);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    async function createCity(newCity) {
        try {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            setCities((cities) => [...cities, data]);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider value={{ cities, isLoading, getCity, currentCity, createCity }}>
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
